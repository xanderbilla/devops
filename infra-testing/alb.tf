resource "aws_lb" "backend" {
  name               = "backend-alb"
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb.id]
  subnets            = [aws_subnet.public_1.id, aws_subnet.public_2.id]

  tags = merge(local.tags, {
    Name = "${local.project}-backend-alb"
  })

  depends_on = [
    aws_internet_gateway.main,
    aws_route_table_association.public_1,
    aws_route_table_association.public_2
  ]
}

resource "aws_lb_target_group" "backend_tg" {
  name        = "${local.project}-backend-tg"
  port        = 8080
  protocol    = "HTTP"
  vpc_id      = aws_vpc.main.id
  target_type = "ip"

  deregistration_delay = 30

  health_check {
    enabled             = true
    healthy_threshold   = 2
    interval            = 30
    matcher             = "200"
    path                = "/actuator/health"
    port                = "traffic-port"
    protocol            = "HTTP"
    timeout             = 5
    unhealthy_threshold = 3
  }

  tags = merge(local.tags, {
    Name = "${local.project}-backend-tg"
  })

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_lb_listener" "backend_listener" {
  load_balancer_arn = aws_lb.backend.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.backend_tg.arn
  }
}
