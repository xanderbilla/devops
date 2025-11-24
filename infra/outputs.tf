##############################################
# outputs.tf
# Useful outputs after apply
##############################################

output "region" {
  description = "Region where infra was created"
  value       = var.region
}

output "frontend_bucket_name" {
  description = "S3 bucket used for frontend"
  value       = aws_s3_bucket.frontend.id
}

output "cloudfront_domain" {
  description = "CloudFront distribution domain (frontend)"
  value       = aws_cloudfront_distribution.frontend_cf.domain_name
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID"
  value       = aws_cloudfront_distribution.frontend_cf.id
}

output "alb_dns" {
  description = "Application Load Balancer DNS name (backend)"
  value       = aws_lb.backend.dns_name
}

output "ecr_repository_url" {
  description = "ECR repository URL for backend images"
  value       = aws_ecr_repository.backend.repository_url
}

output "backend_target_group_arn" {
  description = "Backend target group ARN"
  value       = aws_lb_target_group.backend_tg.arn
}

output "ecs_cluster_name" {
  description = "ECS cluster name"
  value       = aws_ecs_cluster.main.name
}

output "ecs_service_name" {
  description = "ECS service name"
  value       = aws_ecs_service.backend.name
}

output "db_endpoint" {
  description = "RDS PostgreSQL endpoint"
  value       = aws_db_instance.postgres.endpoint
}

output "db_address" {
  description = "RDS PostgreSQL address"
  value       = aws_db_instance.postgres.address
}

output "db_connection_string" {
  description = "Connection string example (internal)"
  value       = "postgresql://${var.db_username}:${var.db_password}@${aws_db_instance.postgres.address}:5432/${var.db_name}"
  sensitive   = true
}

output "s3_website_endpoint" {
  description = "S3 website endpoint (HTTP)"
  value       = "http://${aws_s3_bucket.frontend.bucket}.s3-website-${var.region}.amazonaws.com"
}
