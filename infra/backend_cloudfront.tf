# CloudFront distribution for Backend API
# This provides HTTPS access to the HTTP-only ALB

resource "aws_cloudfront_distribution" "backend_cf" {
  enabled             = true
  comment             = "Backend API CloudFront Distribution"
  price_class         = "PriceClass_100"
  http_version        = "http2and3"
  is_ipv6_enabled     = true

  origin {
    domain_name = aws_lb.backend.dns_name
    origin_id   = "backend-alb"

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD", "OPTIONS"]
    target_origin_id = "backend-alb"

    forwarded_values {
      query_string = true
      headers      = ["Authorization", "Origin", "Access-Control-Request-Method", "Access-Control-Request-Headers"]

      cookies {
        forward = "all"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 0
    max_ttl                = 0
    compress               = true
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  tags = merge(local.tags, {
    Name = "${local.project}-backend-cloudfront"
  })
}

# Output the CloudFront URL for backend
output "backend_cloudfront_domain" {
  description = "CloudFront domain for backend API (HTTPS)"
  value       = aws_cloudfront_distribution.backend_cf.domain_name
}

output "backend_cloudfront_url" {
  description = "Full HTTPS URL for backend API"
  value       = "https://${aws_cloudfront_distribution.backend_cf.domain_name}"
}
