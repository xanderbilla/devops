##############################################
# variables.tf
# Centralized variables for the infra
##############################################

variable "region" {
  description = "AWS region to deploy into"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Deployment environment"
  type        = string
  default     = "dev"
}

variable "owner" {
  description = "Owner tag"
  type        = string
  default     = "ankit"
}

variable "frontend_bucket_name" {
  description = "S3 bucket name for frontend (must be globally unique)"
  type        = string
  default     = "frontend-app-ankit-demo-123" # change to unique value
}

variable "postgres_instance_type" {
  description = "EC2 instance type for Postgres"
  type        = string
  default     = "t3.micro"
}

variable "postgres_ami" {
  description = "AMI id for EC2 running Postgres (Amazon Linux 2 recommended)"
  type        = string
  default     = "ami-0c02fb55956c7d316" # <-- change if region differs
}

variable "db_username" {
  description = "Postgres DB username - MUST be provided via GitHub Secrets"
  type        = string
  
  validation {
    condition     = can(regex("^[a-zA-Z][a-zA-Z0-9_]*$", var.db_username))
    error_message = "The db_username must start with a letter and contain only alphanumeric characters and underscores."
  }
}

variable "db_password" {
  description = "Postgres DB password (minimum 8 characters) - MUST be provided via GitHub Secrets"
  type        = string
  sensitive   = true
  
  validation {
    condition     = length(var.db_password) >= 8 && length(var.db_password) <= 128
    error_message = "The db_password must be between 8 and 128 characters long."
  }
  
  validation {
    condition     = can(regex("^[a-zA-Z0-9!@#$%^&*()_+=-]+$", var.db_password))
    error_message = "The db_password can only contain alphanumeric characters and these special characters: !@#$%^&*()_+=-. No spaces or control characters allowed."
  }
}

variable "db_name" {
  description = "Postgres DB name"
  type        = string
  default     = "mydb"
}

variable "ecr_repo_name" {
  description = "ECR repository name for backend image"
  type        = string
  default     = "springboot-backend"
}

variable "alb_subnet_ids" {
  description = "List of public subnets for ALB (auto-detected from vpc.tf if not provided)"
  type        = list(string)
  default     = []
}

# Optional terraform remote state S3 backend values
variable "tfstate_bucket" {
  description = "(optional) S3 bucket for terraform state backend"
  type        = string
  default     = ""
}

variable "tfstate_key" {
  description = "(optional) S3 key for terraform state"
  type        = string
  default     = "infra/terraform.tfstate"
}

# ECS task defaults
variable "ecs_cpu" {
  description = "ECS task CPU"
  type        = string
  default     = "512"
}

variable "ecs_memory" {
  description = "ECS task memory (MB)"
  type        = string
  default     = "1024"
}
