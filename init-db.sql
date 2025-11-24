-- Database initialization script
-- This script runs automatically when PostgreSQL container starts for the first time

-- Create database if it doesn't exist (handled by POSTGRES_DB env var)
-- Additional initialization can be added here

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE certcook_db TO certcook_user;

-- Create extensions if needed
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Log initialization
SELECT 'Database initialized successfully' AS status;
