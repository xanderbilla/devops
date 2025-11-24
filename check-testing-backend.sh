#!/bin/bash

echo "=== Checking Testing Infrastructure ==="
echo ""

# Check ECS Cluster
echo "1. ECS Cluster Status:"
aws ecs describe-clusters --clusters ankit-testing-cluster --query 'clusters[0].status' --output text
echo ""

# Check ECS Service
echo "2. ECS Service Status:"
aws ecs describe-services --cluster ankit-testing-cluster --services ankit-testing-backend-service \
  --query 'services[0].{Status:status,Running:runningCount,Desired:desiredCount,Pending:pendingCount}' --output table
echo ""

# Check ECS Tasks
echo "3. ECS Tasks:"
TASK_ARN=$(aws ecs list-tasks --cluster ankit-testing-cluster --service-name ankit-testing-backend-service --query 'taskArns[0]' --output text)
if [ "$TASK_ARN" != "None" ] && [ -n "$TASK_ARN" ]; then
  echo "Task ARN: $TASK_ARN"
  aws ecs describe-tasks --cluster ankit-testing-cluster --tasks $TASK_ARN \
    --query 'tasks[0].{LastStatus:lastStatus,HealthStatus:healthStatus,StoppedReason:stoppedReason}' --output table
else
  echo "No running tasks found!"
fi
echo ""

# Check stopped tasks
echo "4. Recent Stopped Tasks (last 5):"
aws ecs list-tasks --cluster ankit-testing-cluster --service-name ankit-testing-backend-service \
  --desired-status STOPPED --max-results 5 --query 'taskArns' --output text | while read task; do
  if [ -n "$task" ]; then
    echo "Stopped Task: $task"
    aws ecs describe-tasks --cluster ankit-testing-cluster --tasks $task \
      --query 'tasks[0].{StoppedReason:stoppedReason,StopCode:stopCode}' --output table
  fi
done
echo ""

# Check RDS Status
echo "5. RDS Database Status:"
aws rds describe-db-instances --db-instance-identifier ankit-testing-postgres \
  --query 'DBInstances[0].{Status:DBInstanceStatus,Endpoint:Endpoint.Address,Port:Endpoint.Port}' --output table
echo ""

# Check NAT Instance
echo "6. NAT Instance Status:"
aws ec2 describe-instances --filters "Name=tag:Name,Values=ankit-testing-nat-instance" \
  --query 'Reservations[0].Instances[0].{State:State.Name,PrivateIP:PrivateIpAddress,PublicIP:PublicIpAddress}' --output table
echo ""

# Check ALB Target Health
echo "7. ALB Target Group Health:"
TG_ARN=$(aws elbv2 describe-target-groups --names ankit-testing-backend-tg --query 'TargetGroups[0].TargetGroupArn' --output text 2>/dev/null)
if [ -n "$TG_ARN" ] && [ "$TG_ARN" != "None" ]; then
  aws elbv2 describe-target-health --target-group-arn $TG_ARN --output table
else
  echo "Target group not found"
fi
echo ""

# Check CloudWatch Logs (last 20 lines)
echo "8. Recent Backend Logs:"
aws logs tail /ecs/ankit-testing-backend --since 10m --format short 2>/dev/null | tail -20 || echo "No logs available yet"
echo ""

echo "=== Diagnostic Complete ==="
