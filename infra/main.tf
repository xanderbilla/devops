##############################################
# MAIN.TF — ROOT FILE FOR FULL INFRASTRUCTURE
##############################################

terraform {
  required_version = ">= 1.4.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # Remote state backend in S3 with DynamoDB locking
  backend "s3" {
    bucket         = "certcook-terraform-state-989080044677"
    key            = "infra/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "certcook-terraform-locks"
  }
}

provider "aws" {
  region = var.region
  # You can also set profile = var.aws_profile if you use named profiles
}

# NOTE:
# Terraform will automatically load all other .tf files in this directory:
# - vpc.tf
# - security_groups.tf
# - ec2_db.tf
# - ecr.tf
# - alb.tf
# - ecs.tf
# - frontend_s3_cloudfront.tf
# - variables.tf (this file)
# - outputs.tf (this file)
#
# No explicit "module" or "include" needed for local .tf files.

# Helpful local to reference tags across resources
locals {
  project = "ankit-demo"
  env     = var.environment
  tags = {
    Project = local.project
    Env     = local.env
    Owner   = var.owner
  }
}
