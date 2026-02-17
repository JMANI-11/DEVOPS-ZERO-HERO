#!/bin/bash

echo "=== Forward Proxy vs Reverse Proxy Demo ===\n"

echo "1. Testing Direct Access to Backend Server"
echo "   Running: curl http://<BACKEND_SERVER_IP>:5000"
echo "   This should show the direct response from the backend server.\n"

echo "2. Testing Forward Proxy Configuration"
echo "   Running: curl -x http://<FORWARD_PROXY_IP>:8080 http://example.com"
echo "   This routes your request through the forward proxy.\n"

echo "3. Testing Reverse Proxy Configuration"
echo "   Running: curl http://<REVERSE_PROXY_IP>"
echo "   This shows the backend server's response through the reverse proxy.\n"

echo "=== Demo Instructions ===\n"
echo "1. First, set up three EC2 instances:"
echo "   - Backend Server: Run backend/setup.sh"
echo "   - Forward Proxy: Run forward-proxy/setup.sh"
echo "   - Reverse Proxy: Run reverse-proxy/setup.sh (update the backend IP in the config)"

echo "\n2. Update the demo script with your actual IP addresses:"
echo "   - Replace <BACKEND_SERVER_IP> with your backend server's public IP"
echo "   - Replace <FORWARD_PROXY_IP> with your forward proxy's public IP"
echo "   - Replace <REVERSE_PROXY_IP> with your reverse proxy's public IP"

echo "\n3. Run the demo script to see both proxy types in action!"
echo "   $ chmod +x demo.sh"
echo "   $ ./demo.sh"

echo "\n=== Key Differences ==="
echo "\nForward Proxy:"
echo "- Client-side proxy"
echo "- Hides client IP from the internet"
echo "- Can be used for content filtering, caching, or bypassing restrictions"

echo "\nReverse Proxy:"
echo "- Server-side proxy"
echo "- Hides backend servers from clients"
echo "- Used for load balancing, SSL termination, and caching"
