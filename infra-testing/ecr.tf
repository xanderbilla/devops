resource "aws_ecr_repository" "backend" {
  name         = "springboot-backend"
  force_delete = true

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = merge(local.tags, {
    Name = "${local.project}-backend-ecr"
  })
}
