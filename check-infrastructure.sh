#!/bin/bash

# Script to check if infrastructure exists

echo "========================================="
echo "Infrastructure Status Check"
echo "========================================="
echo ""

# Check if AWS CLI is configured
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI is not installed"
    exit 1
fi

echo "Checking AWS credentials..."
if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ AWS credentials are not configured or expired"
    echo ""
    echo "Please configure AWS credentials:"
    echo "  aws configure"
    echo ""
    echo "Or update GitHub Secrets:"
    echo "  gh secret set AWS_ACCESS_KEY_ID"
    echo "  gh secret set AWS_SECRET_ACCESS_KEY"
    exit 1
fi

echo "✅ AWS credentials valid"
echo ""

echo "========================================="
echo "TESTING INFRASTRUCTURE"
echo "========================================="
echo ""

# Check ECS Cluster
echo "Checking ECS Cluster (ankit-testing-cluster)..."
if aws ecs describe-clusters --clusters ankit-testing-cluster --query 'clusters[0].status' --output text 2>/dev/null | grep -q "ACTIVE"; then
    echo "  ✅ ECS Cluster exists and is ACTIVE"
else
    echo "  ❌ ECS Cluster not found or not active"
fi

# Check VPC
echo "Checking VPC (ankit-testing-vpc)..."
VPC_ID=$(aws ec2 describe-vpcs --filters "Name=tag:Name,Values=ankit-testing-vpc" --query 'Vpcs[0].VpcId' --output text 2>/dev/null)
if [ -n "$VPC_ID" ] && [ "$VPC_ID" != "None" ]; then
    echo "  ✅ VPC exists: $VPC_ID"
else
    echo "  ❌ VPC not found"
fi

# Check RDS
echo "Checking RDS Database (ankit-testing-db)..."
if aws rds describe-db-instances --db-instance-identifier ankit-testing-db --query 'DBInstances[0].DBInstanceStatus' --output text 2>/dev/null | grep -q "available"; then
    echo "  ✅ RDS Database exists and is available"
    DB_ENDPOINT=$(aws rds describe-db-instances --db-instance-identifier ankit-testing-db --query 'DBInstances[0].Endpoint.Address' --output text 2>/dev/null)
    echo "     Endpoint: $DB_ENDPOINT"
else
    echo "  ❌ RDS Database not found or not available"
fi

# Check S3 Bucket
echo "Checking S3 Bucket..."
if [ -n "$1" ]; then
    BUCKET_NAME="$1"
    if aws s3 ls "s3://$BUCKET_NAME" &> /dev/null; then
        echo "  ✅ S3 Bucket exists: $BUCKET_NAME"
    else
        echo "  ❌ S3 Bucket not found: $BUCKET_NAME"
    fi
else
    echo "  ⏭️  Skipped (provide bucket name as argument)"
fi

echo ""
echo "========================================="
echo "PRODUCTION INFRASTRUCTURE"
echo "========================================="
echo ""

# Check ECS Cluster
echo "Checking ECS Cluster (ankit-demo-cluster)..."
if aws ecs describe-clusters --clusters ankit-demo-cluster --query 'clusters[0].status' --output text 2>/dev/null | grep -q "ACTIVE"; then
    echo "  ✅ ECS Cluster exists and is ACTIVE"
else
    echo "  ❌ ECS Cluster not found or not active"
fi

# Check VPC
echo "Checking VPC (ankit-demo-vpc)..."
VPC_ID=$(aws ec2 describe-vpcs --filters "Name=tag:Name,Values=ankit-demo-vpc" --query 'Vpcs[0].VpcId' --output text 2>/dev/null)
if [ -n "$VPC_ID" ] && [ "$VPC_ID" != "None" ]; then
    echo "  ✅ VPC exists: $VPC_ID"
else
    echo "  ❌ VPC not found"
fi

# Check RDS
echo "Checking RDS Database (ankit-demo-db)..."
if aws rds describe-db-instances --db-instance-identifier ankit-demo-db --query 'DBInstances[0].DBInstanceStatus' --output text 2>/dev/null | grep -q "available"; then
    echo "  ✅ RDS Database exists and is available"
    DB_ENDPOINT=$(aws rds describe-db-instances --db-instance-identifier ankit-demo-db --query 'DBInstances[0].Endpoint.Address' --output text 2>/dev/null)
    echo "     Endpoint: $DB_ENDPOINT"
else
    echo "  ❌ RDS Database not found or not available"
fi

# Check ALB
echo "Checking Application Load Balancer (ankit-demo-alb)..."
if aws elbv2 describe-load-balancers --names ankit-demo-alb --query 'LoadBalancers[0].State.Code' --output text 2>/dev/null | grep -q "active"; then
    echo "  ✅ ALB exists and is active"
    ALB_DNS=$(aws elbv2 describe-load-balancers --names ankit-demo-alb --query 'LoadBalancers[0].DNSName' --output text 2>/dev/null)
    echo "     DNS: $ALB_DNS"
else
    echo "  ❌ ALB not found or not active"
fi

echo ""
echo "========================================="
echo "SUMMARY"
echo "========================================="
echo ""
echo "To create missing infrastructure:"
echo "  • Testing: Actions → 'Create Testing Infra' → Type 'CREATE'"
echo "  • Production: Actions → 'Create Production Infra' → Type 'CREATE-PROD'"
echo ""
echo "Usage: ./check-infrastructure.sh [s3-bucket-name]"
