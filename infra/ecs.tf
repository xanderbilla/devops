##########################################
# ECS Cluster
##########################################
resource "aws_ecs_cluster" "main" {
  name = "${local.project}-cluster"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }

  tags = merge(local.tags, {
    Name = "${local.project}-ecs-cluster"
  })
}

##########################################
# CloudWatch Log Group
##########################################
resource "aws_cloudwatch_log_group" "backend" {
  name              = "/ecs/${local.project}-backend"
  retention_in_days = 7

  tags = merge(local.tags, {
    Name = "${local.project}-backend-logs"
  })
}

##########################################
# IAM Role for ECS Task Execution
##########################################
resource "aws_iam_role" "ecs_execution_role" {
  name = "${local.project}-ecs-execution-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      }
    ]
  })

  tags = local.tags
}

resource "aws_iam_role_policy_attachment" "ecs_execution_role_policy" {
  role       = aws_iam_role.ecs_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

##########################################
# IAM Role for ECS Task
##########################################
resource "aws_iam_role" "ecs_task_role" {
  name = "${local.project}-ecs-task-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      }
    ]
  })

  tags = local.tags
}

##########################################
# ECS Task Definition
##########################################
resource "aws_ecs_task_definition" "backend" {
  family                   = "${local.project}-backend"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "512"
  memory                   = "1024"
  execution_role_arn       = aws_iam_role.ecs_execution_role.arn
  task_role_arn            = aws_iam_role.ecs_task_role.arn

  container_definitions = jsonencode([
    {
      name      = "backend"
      image     = "${aws_ecr_repository.backend.repository_url}:latest"
      essential = true

      portMappings = [
        {
          containerPort = 8080
          protocol      = "tcp"
        }
      ]

      environment = [
        {
          name  = "SPRING_DATASOURCE_URL"
          value = "jdbc:postgresql://${aws_db_instance.postgres.address}:5432/${var.db_name}"
        },
        {
          name  = "SPRING_DATASOURCE_USERNAME"
          value = var.db_username
        },
        {
          name  = "SPRING_DATASOURCE_PASSWORD"
          value = var.db_password
        },
        {
          name  = "SPRING_DATASOURCE_DRIVER_CLASS_NAME"
          value = "org.postgresql.Driver"
        },
        {
          name  = "SPRING_JPA_HIBERNATE_DDL_AUTO"
          value = "update"
        },
        {
          name  = "JWT_SECRET"
          value = "5367566B59703373367639792F423F4528482B4D6251655468576D5A71347437"
        },
        {
          name  = "CORS_ALLOWED_ORIGINS"
          value = "https://${aws_cloudfront_distribution.frontend_cf.domain_name},http://${aws_s3_bucket.frontend.bucket}.s3-website-${var.region}.amazonaws.com,http://localhost:5173,https://localhost:5173"
        }
      ]

      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = aws_cloudwatch_log_group.backend.name
          "awslogs-region"        = var.region
          "awslogs-stream-prefix" = "backend"
        }
      }

      healthCheck = {
        command     = ["CMD-SHELL", "wget --no-verbose --tries=1 --spider http://localhost:8080/actuator/health || exit 1"]
        interval    = 30
        timeout     = 5
        retries     = 3
        startPeriod = 60
      }
    }
  ])

  tags = merge(local.tags, {
    Name = "${local.project}-backend-task"
  })
}

##########################################
# ECS Service
##########################################
resource "aws_ecs_service" "backend" {
  name            = "${local.project}-backend-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.backend.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = [aws_subnet.private_1.id, aws_subnet.private_2.id]
    security_groups  = [aws_security_group.ecs.id]
    assign_public_ip = false
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.backend_tg.arn
    container_name   = "backend"
    container_port   = 8080
  }

  depends_on = [
    aws_lb_listener.backend_listener,
    aws_iam_role_policy_attachment.ecs_execution_role_policy
  ]

  tags = merge(local.tags, {
    Name = "${local.project}-backend-service"
  })
}
