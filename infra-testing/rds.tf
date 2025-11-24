# RDS PostgreSQL Database
resource "aws_db_subnet_group" "main" {
  name       = "${local.project}-db-subnet-group"
  subnet_ids = [aws_subnet.private_1.id, aws_subnet.private_2.id]

  tags = merge(local.tags, {
    Name = "${local.project}-db-subnet-group"
  })
}

resource "aws_security_group" "rds" {
  name        = "${local.project}-rds-sg"
  description = "Security group for RDS PostgreSQL"
  vpc_id      = aws_vpc.main.id

  ingress {
    description     = "PostgreSQL from ECS"
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.ecs.id]
  }

  egress {
    description = "Allow all outbound"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(local.tags, {
    Name = "${local.project}-rds-sg"
  })
}

resource "aws_db_instance" "postgres" {
  identifier             = "${local.project}-postgres"
  engine                 = "postgres"
  engine_version         = "14.13"
  instance_class         = "db.t3.micro"
  allocated_storage      = 20
  storage_type           = "gp2"
  
  db_name  = var.db_name
  username = var.db_username
  password = var.db_password
  
  db_subnet_group_name   = aws_db_subnet_group.main.name
  vpc_security_group_ids = [aws_security_group.rds.id]
  
  publicly_accessible    = false
  skip_final_snapshot    = true
  
  backup_retention_period = 7
  backup_window          = "03:00-04:00"
  maintenance_window     = "mon:04:00-mon:05:00"

  tags = merge(local.tags, {
    Name = "${local.project}-postgres-rds"
  })
}
