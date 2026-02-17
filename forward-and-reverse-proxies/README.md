# Forward Proxy vs Reverse Proxy Demo

This project demonstrates the difference between forward and reverse proxies using AWS EC2 instances.

## Architecture

We'll set up:
1. A simple web application (Backend Server)
2. A forward proxy server
3. A reverse proxy server
4. Client machine for testing

## Prerequisites

- AWS Account
- 3x EC2 instances (t2.micro is sufficient)
- Basic knowledge of Linux commands
- Python 3.6+

## Setup Instructions

1. Launch 3 EC2 instances (Ubuntu 20.04 recommended):
   - Backend Server
   - Forward Proxy
   - Reverse Proxy

2. Update security groups to allow necessary traffic:
   - Backend Server: Allow HTTP (80) from Reverse Proxy
   - Forward Proxy: Allow HTTP (8080) from your IP
   - Reverse Proxy: Allow HTTP (80) from anywhere

3. Follow the setup instructions in each directory to configure the services.
