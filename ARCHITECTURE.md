# Infrastructure Architecture

## Testing Environment (Cost-Optimized)

```
┌─────────────────────────────────────────────────────────────────────┐
│                           AWS Cloud (us-east-1)                      │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    VPC (10.0.0.0/16)                         │   │
│  │                                                               │   │
│  │  ┌──────────────────────────────────────────────────────┐   │   │
│  │  │              Public Subnets                           │   │   │
│  │  │  ┌─────────────────┐    ┌─────────────────┐         │   │   │
│  │  │  │  Public Subnet 1│    │  Public Subnet 2│         │   │   │
│  │  │  │  10.0.1.0/24    │    │  10.0.2.0/24    │         │   │   │
│  │  │  │                 │    │                 │         │   │   │
│  │  │  │  ┌───────────┐ │    │                 │         │   │   │
│  │  │  │  │NAT Instance│ │    │                 │         │   │   │
│  │  │  │  │  t3.nano   │ │    │                 │         │   │   │
│  │  │  │  │ ~$3-5/mo   │ │    │                 │         │   │   │
│  │  │  │  └─────┬─────┘ │    │                 │         │   │   │
│  │  │  └────────┼────────┘    └─────────────────┘         │   │   │
│  │  └───────────┼──────────────────────────────────────────┘   │   │
│  │              │                                               │   │
│  │  ┌───────────┼──────────────────────────────────────────┐   │   │
│  │  │           │       Private Subnets                     │   │   │
│  │  │  ┌────────▼────────┐    ┌─────────────────┐         │   │   │
│  │  │  │ Private Subnet 1│    │ Private Subnet 2│         │   │   │
│  │  │  │  10.0.11.0/24   │    │  10.0.12.0/24   │         │   │   │
│  │  │  │                 │    │                 │         │   │   │
│  │  │  │  ┌───────────┐ │    │  ┌───────────┐  │         │   │   │
│  │  │  │  │ECS Tasks  │ │    │  │ECS Tasks  │  │         │   │   │
│  │  │  │  │(Fargate)  │ │    │  │(Fargate)  │  │         │   │   │
│  │  │  │  │Backend    │ │    │  │Backend    │  │         │   │   │
│  │  │  │  └───────────┘ │    │  └───────────┘  │         │   │   │
│  │  │  │                 │    │                 │         │   │   │
│  │  │  │  ┌───────────┐ │    │  ┌───────────┐  │         │   │   │
│  │  │  │  │    RDS    │ │    │  │    RDS    │  │         │   │   │
│  │  │  │  │PostgreSQL │ │    │  │(Standby)  │  │         │   │   │
│  │  │  │  │ db.t3.micro│ │    │  │           │  │         │   │   │
│  │  │  │  └───────────┘ │    │  └───────────┘  │         │   │   │
│  │  │  └─────────────────┘    └─────────────────┘         │   │   │
│  │  └───────────────────────────────────────────────────────┘   │   │
│  └───────────────────────────────────────────────────────────────┘   │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    CloudFront (CDN)                          │   │
│  │  ┌──────────────────────┐    ┌──────────────────────┐      │   │
│  │  │  Frontend CDN        │    │  Backend API CDN     │      │   │
│  │  │  (S3 Origin)         │    │  (ALB Origin)        │      │   │
│  │  └──────────────────────┘    └──────────────────────┘      │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                         ECR                                  │   │
│  │  ┌──────────────────────────────────────────────────────┐   │   │
│  │  │  springboot-backend:testing-latest                    │   │   │
│  │  └──────────────────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                         S3                                   │   │
│  │  ┌──────────────────────────────────────────────────────┐   │   │
│  │  │  Frontend Static Files (React Build)                 │   │   │
│  │  └──────────────────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────────────┘   │
└───────────────────────────────────────────────────────────────────────┘
```

### Request Flow (Testing)

```
User Browser
     │
     ▼
CloudFront (Frontend)
     │
     ▼
S3 Bucket (React App)
     │
     ▼ (API Calls)
CloudFront (Backend)
     │
     ▼
Application Load Balancer
     │
     ▼
ECS Fargate Tasks (Private Subnet)
     │
     ├──► RDS PostgreSQL (Private Subnet)
     │
     └──► Internet (via NAT Instance)
          └──► ECR (Pull Docker Images)
```

### Services Used (Testing)
- **VPC**: Network isolation
- **NAT Instance**: t3.nano for internet access (~$3-5/month)
- **ECS Fargate**: Serverless containers (512 CPU, 1024 MB)
- **RDS PostgreSQL**: db.t3.micro database
- **ALB**: Application Load Balancer
- **CloudFront**: 2 distributions (frontend + backend)
- **S3**: Frontend static hosting
- **ECR**: Docker image registry

**Monthly Cost: ~$30-40**

---

## Production Environment (High Availability)

```
┌─────────────────────────────────────────────────────────────────────┐
│                           AWS Cloud (us-east-1)                      │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    VPC (10.0.0.0/16)                         │   │
│  │                                                               │   │
│  │  ┌──────────────────────────────────────────────────────┐   │   │
│  │  │              Public Subnets                           │   │   │
│  │  │  ┌─────────────────┐    ┌─────────────────┐         │   │   │
│  │  │  │  Public Subnet 1│    │  Public Subnet 2│         │   │   │
│  │  │  │  10.0.1.0/24    │    │  10.0.2.0/24    │         │   │   │
│  │  │  │                 │    │                 │         │   │   │
│  │  │  │  ┌───────────┐ │    │                 │         │   │   │
│  │  │  │  │NAT Gateway│ │    │                 │         │   │   │
│  │  │  │  │ Managed   │ │    │                 │         │   │   │
│  │  │  │  │ ~$32/mo   │ │    │                 │         │   │   │
│  │  │  │  └─────┬─────┘ │    │                 │         │   │   │
│  │  │  │        │        │    │                 │         │   │   │
│  │  │  │  ┌─────▼─────┐ │    │  ┌───────────┐  │         │   │   │
│  │  │  │  │    ALB    │ │    │  │    ALB    │  │         │   │   │
│  │  │  │  │(Multi-AZ) │ │    │  │(Multi-AZ) │  │         │   │   │
│  │  │  │  └───────────┘ │    │  └───────────┘  │         │   │   │
│  │  │  └─────────────────┘    └─────────────────┘         │   │   │
│  │  └───────────┼──────────────────────────────────────────┘   │   │
│  │              │                                               │   │
│  │  ┌───────────┼──────────────────────────────────────────┐   │   │
│  │  │           │       Private Subnets                     │   │   │
│  │  │  ┌────────▼────────┐    ┌─────────────────┐         │   │   │
│  │  │  │ Private Subnet 1│    │ Private Subnet 2│         │   │   │
│  │  │  │  10.0.11.0/24   │    │  10.0.12.0/24   │         │   │   │
│  │  │  │                 │    │                 │         │   │   │
│  │  │  │  ┌───────────┐ │    │  ┌───────────┐  │         │   │   │
│  │  │  │  │ECS Tasks  │ │    │  │ECS Tasks  │  │         │   │   │
│  │  │  │  │(Fargate)  │ │    │  │(Fargate)  │  │         │   │   │
│  │  │  │  │Backend    │ │    │  │Backend    │  │         │   │   │
│  │  │  │  └───────────┘ │    │  └───────────┘  │         │   │   │
│  │  │  │                 │    │                 │         │   │   │
│  │  │  │  ┌───────────┐ │    │  ┌───────────┐  │         │   │   │
│  │  │  │  │    RDS    │ │    │  │    RDS    │  │         │   │   │
│  │  │  │  │PostgreSQL │ │    │  │(Standby)  │  │         │   │   │
│  │  │  │  │ db.t3.micro│ │    │  │Multi-AZ   │  │         │   │   │
│  │  │  │  └───────────┘ │    │  └───────────┘  │         │   │   │
│  │  │  └─────────────────┘    └─────────────────┘         │   │   │
│  │  └───────────────────────────────────────────────────────┘   │   │
│  └───────────────────────────────────────────────────────────────┘   │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    CloudFront (CDN)                          │   │
│  │  ┌──────────────────────┐    ┌──────────────────────┐      │   │
│  │  │  Frontend CDN        │    │  Backend API CDN     │      │   │
│  │  │  (S3 Origin)         │    │  (ALB Origin)        │      │   │
│  │  │  Global Edge Cache   │    │  Global Edge Cache   │      │   │
│  │  └──────────────────────┘    └──────────────────────┘      │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                         ECR                                  │   │
│  │  ┌──────────────────────────────────────────────────────┐   │   │
│  │  │  springboot-backend:latest                            │   │   │
│  │  │  springboot-backend:prod-{sha}                        │   │   │
│  │  └──────────────────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                         S3                                   │   │
│  │  ┌──────────────────────────────────────────────────────┐   │   │
│  │  │  Frontend Static Files (React Build)                 │   │   │
│  │  │  Versioned, Cached                                    │   │   │
│  │  └──────────────────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────────────┘   │
└───────────────────────────────────────────────────────────────────────┘
```

### Request Flow (Production)

```
User Browser
     │
     ▼
CloudFront (Frontend) - Global Edge Locations
     │
     ▼
S3 Bucket (React App)
     │
     ▼ (API Calls)
CloudFront (Backend) - Global Edge Locations
     │
     ▼
Application Load Balancer (Multi-AZ)
     │
     ▼
ECS Fargate Tasks (Multi-AZ, Private Subnets)
     │
     ├──► RDS PostgreSQL (Multi-AZ, Private Subnets)
     │
     └──► Internet (via NAT Gateway - Managed)
          └──► ECR (Pull Docker Images)
```

### Services Used (Production)
- **VPC**: Network isolation with Multi-AZ
- **NAT Gateway**: AWS-managed, highly available (~$32/month)
- **ECS Fargate**: Serverless containers (512 CPU, 1024 MB)
- **RDS PostgreSQL**: db.t3.micro with Multi-AZ
- **ALB**: Application Load Balancer (Multi-AZ)
- **CloudFront**: 2 distributions with global edge caching
- **S3**: Frontend static hosting with versioning
- **ECR**: Docker image registry with versioned tags

**Monthly Cost: ~$60-80**

---

## Key Differences

| Feature | Testing | Production |
|---------|---------|------------|
| **NAT** | NAT Instance (t3.nano) | NAT Gateway (Managed) |
| **Cost** | ~$30-40/month | ~$60-80/month |
| **Availability** | Single AZ | Multi-AZ |
| **Reliability** | Manual management | AWS-managed |
| **Use Case** | Development/Testing | Production workloads |

## Security

Both environments use:
- Private subnets for ECS and RDS
- Security groups for network isolation
- CloudFront for DDoS protection
- HTTPS only for all traffic
- No public access to database
- IAM roles for service authentication
