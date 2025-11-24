############################################
# VPC
############################################
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = merge(local.tags, {
    Name = "${local.project}-vpc"
  })
}

############################################
# Availability Zones
############################################
data "aws_availability_zones" "available" {
  state = "available"
}

############################################
# PUBLIC SUBNETS
############################################
resource "aws_subnet" "public_1" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = data.aws_availability_zones.available.names[0]
  map_public_ip_on_launch = true

  tags = merge(local.tags, {
    Name = "${local.project}-public-1"
  })
}

resource "aws_subnet" "public_2" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.2.0/24"
  availability_zone       = data.aws_availability_zones.available.names[1]
  map_public_ip_on_launch = true

  tags = merge(local.tags, {
    Name = "${local.project}-public-2"
  })
}

############################################
# PRIVATE SUBNETS
############################################
resource "aws_subnet" "private_1" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.11.0/24"
  availability_zone = data.aws_availability_zones.available.names[0]

  tags = merge(local.tags, {
    Name = "${local.project}-private-1"
  })
}

resource "aws_subnet" "private_2" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.12.0/24"
  availability_zone = data.aws_availability_zones.available.names[1]

  tags = merge(local.tags, {
    Name = "${local.project}-private-2"
  })
}

############################################
# INTERNET GATEWAY
############################################
resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = merge(local.tags, {
    Name = "${local.project}-igw"
  })
}

############################################
# PUBLIC ROUTE TABLE
############################################
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }

  tags = merge(local.tags, {
    Name = "${local.project}-public-rt"
  })
}

resource "aws_route_table_association" "public_1" {
  subnet_id      = aws_subnet.public_1.id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "public_2" {
  subnet_id      = aws_subnet.public_2.id
  route_table_id = aws_route_table.public.id
}

############################################
# NAT INSTANCE (COST-OPTIMIZED)
############################################

# Amazon Linux 2 (Supports yum + iptables)
data "aws_ami" "nat_instance" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*-x86_64-gp2"]
  }
}

# NAT Instance SG
resource "aws_security_group" "nat_instance" {
  name        = "${local.project}-nat-instance-sg"
  description = "SG for NAT instance"
  vpc_id      = aws_vpc.main.id

  # Allow inbound from private subnets
  ingress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = [
      aws_subnet.private_1.cidr_block,
      aws_subnet.private_2.cidr_block
    ]
  }

  # Allow outbound internet
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(local.tags, {
    Name = "${local.project}-nat-instance-sg"
  })
}

# NAT INSTANCE
resource "aws_instance" "nat" {
  ami                         = data.aws_ami.nat_instance.id
  instance_type               = "t3.nano"
  subnet_id                   = aws_subnet.public_1.id
  vpc_security_group_ids      = [aws_security_group.nat_instance.id]
  associate_public_ip_address = true
  source_dest_check           = false   # IMPORTANT !!

  user_data = <<-EOF
              #!/bin/bash
              set -e
              
              # Enable IP forwarding
              echo "net.ipv4.ip_forward = 1" | tee -a /etc/sysctl.conf
              sysctl -w net.ipv4.ip_forward=1
              
              # Install and configure iptables
              yum install -y iptables-services
              systemctl enable iptables
              systemctl start iptables
              
              # Clear existing rules
              iptables -F
              iptables -t nat -F
              
              # Set up NAT
              iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
              iptables -A FORWARD -i eth0 -o eth0 -m state --state RELATED,ESTABLISHED -j ACCEPT
              iptables -A FORWARD -i eth0 -o eth0 -j ACCEPT
              
              # Save rules
              service iptables save
              
              # Ensure rules persist on reboot
              systemctl enable iptables
              
              # Log completion
              echo "NAT instance configured successfully" > /var/log/nat-setup.log
              EOF

  tags = merge(local.tags, {
    Name = "${local.project}-nat-instance"
  })

  depends_on = [aws_internet_gateway.main]
}

############################################
# PRIVATE ROUTE TABLE (NAT INSTANCE)
############################################
resource "aws_route_table" "private" {
  vpc_id = aws_vpc.main.id

  tags = merge(local.tags, {
    Name = "${local.project}-private-rt"
  })
}

resource "aws_route" "private_nat" {
  route_table_id         = aws_route_table.private.id
  destination_cidr_block = "0.0.0.0/0"
  network_interface_id   = aws_instance.nat.primary_network_interface_id

  depends_on = [aws_instance.nat]
}

resource "aws_route_table_association" "private_1" {
  subnet_id      = aws_subnet.private_1.id
  route_table_id = aws_route_table.private.id
}

resource "aws_route_table_association" "private_2" {
  subnet_id      = aws_subnet.private_2.id
  route_table_id = aws_route_table.private.id
}
