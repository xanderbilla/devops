#!/bin/bash

set -e

echo "=========================================="
echo "Testing Environment Secrets Setup"
echo "=========================================="
echo ""

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) is not installed."
    echo "Install it from: https://cli.github.com/"
    exit 1
fi

# Check if user is authenticated
if ! gh auth status &> /dev/null; then
    echo "❌ Not authenticated with GitHub CLI."
    echo "Run: gh auth login"
    exit 1
fi

echo "✅ GitHub CLI is ready"
echo ""

# Get repository info
REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner)
echo "Repository: $REPO"
echo ""

# Prompt for secrets
echo "Enter the following secrets for TESTING environment:"
echo ""

read -p "AWS Access Key ID: " AWS_ACCESS_KEY_ID
read -sp "AWS Secret Access Key: " AWS_SECRET_ACCESS_KEY
echo ""

read -p "Database Username (testing): " DB_USERNAME_TESTING
read -sp "Database Password (testing): " DB_PASSWORD_TESTING
echo ""

read -p "S3 Bucket Name (testing, e.g., frontend-testing-ankit-demo): " S3_BUCKET_NAME_TESTING

echo ""
echo "=========================================="
echo "Setting GitHub Secrets..."
echo "=========================================="

# Set secrets
gh secret set AWS_ACCESS_KEY_ID --body "$AWS_ACCESS_KEY_ID"
echo "✅ AWS_ACCESS_KEY_ID set"

gh secret set AWS_SECRET_ACCESS_KEY --body "$AWS_SECRET_ACCESS_KEY"
echo "✅ AWS_SECRET_ACCESS_KEY set"

gh secret set DB_USERNAME_TESTING --body "$DB_USERNAME_TESTING"
echo "✅ DB_USERNAME_TESTING set"

gh secret set DB_PASSWORD_TESTING --body "$DB_PASSWORD_TESTING"
echo "✅ DB_PASSWORD_TESTING set"

gh secret set S3_BUCKET_NAME_TESTING --body "$S3_BUCKET_NAME_TESTING"
echo "✅ S3_BUCKET_NAME_TESTING set"

echo ""
echo "=========================================="
echo "✅ All Testing Secrets Configured!"
echo "=========================================="
echo ""
echo "Next Steps:"
echo "1. Go to GitHub Actions"
echo "2. Run 'Testing Environment - Deploy' workflow"
echo "3. Select action: create-infra"
echo "4. Type: CONFIRM"
echo "5. Wait for infrastructure creation (~10-15 min)"
echo "6. Run workflow again with action: deploy-app"
echo ""
echo "Your testing environment will be ready!"
