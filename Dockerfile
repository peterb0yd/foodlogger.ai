# Use the official Docker image for PostgreSQL
FROM postgres:latest

# Set environment variables for default postgres user and password
ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD foodlogger

# Set the default database name
ENV POSTGRES_DB foodlogger