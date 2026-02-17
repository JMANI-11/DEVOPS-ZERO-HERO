# Forward Proxy Setup (Squid)

This sets up a Squid forward proxy server that clients can use to route their internet traffic.

## What is a Forward Proxy?

A forward proxy sits between clients and the internet:
- **Client → Forward Proxy → Internet**
- Hides client IP addresses from destination servers
- Can be used for content filtering, caching, and access control
- Client must configure their browser/system to use the proxy

## Manual Setup Instructions

### Step 1: SSH into your EC2 instance
```bash
ssh -i your-key.pem ubuntu@<FORWARD_PROXY_IP>
```

### Step 2: Update system and install Squid
```bash
sudo apt-get update
sudo apt-get install -y squid
```

### Step 3: Backup the original configuration
```bash
sudo cp /etc/squid/squid.conf /etc/squid/squid.conf.original
```

### Step 4: Create a new Squid configuration

**Option A: Upload the config file**
```bash
# From your local machine
scp -i your-key.pem squid.conf ubuntu@<FORWARD_PROXY_IP>:~/
# Then on the EC2 instance
sudo mv ~/squid.conf /etc/squid/squid.conf
```

**Option B: Create manually**
```bash
sudo nano /etc/squid/squid.conf
```

Copy the entire content from `squid.conf` file in this directory, or add the following configuration (replace the entire file):
```
# Squid Forward Proxy Configuration
http_port 8080

# Recommended minimum configuration:
acl SSL_ports port 443
acl Safe_ports port 80          # http
acl Safe_ports port 21          # ftp
acl Safe_ports port 443         # https
acl Safe_ports port 70          # gopher
acl Safe_ports port 210         # wais
acl Safe_ports port 1025-65535  # unregistered ports
acl Safe_ports port 280         # http-mgmt
acl Safe_ports port 488         # gss-http
acl Safe_ports port 591         # filemaker
acl Safe_ports port 777         # multiling http

acl CONNECT method CONNECT

# Deny requests to certain unsafe ports
http_access deny !Safe_ports

# Deny CONNECT to other than secure SSL ports
http_access deny CONNECT !SSL_ports

# Only allow cachemgr access from localhost
http_access allow localhost manager
http_access deny manager

# Allow access from all (DEMO ONLY - NOT FOR PRODUCTION)
http_access allow all

# And finally deny all other access to this proxy
http_access deny all

# Squid normally listens to port 3128
coredump_dir /var/spool/squid
```

Save and exit (Ctrl+X, then Y, then Enter)

### Step 5: Test the configuration
```bash
sudo squid -k parse
```

If there are no errors, continue. If there are errors, fix them in the config file.

### Step 6: Initialize Squid cache directory
```bash
sudo squid -z
```

### Step 7: Restart Squid service
```bash
sudo systemctl restart squid
sudo systemctl enable squid
```

### Step 8: Verify Squid is running
```bash
sudo systemctl status squid
```

If it fails, check the logs:
```bash
sudo tail -50 /var/log/squid/cache.log
```

### Step 9: Configure firewall (optional)
```bash
sudo ufw allow 8080/tcp
```

### Step 10: Test locally on the EC2 instance
```bash
curl -x http://localhost:8080 http://example.com
```

## Testing the Forward Proxy

### Test 1: Basic connectivity
From your local machine or another EC2 instance:

```bash
# Test with curl using the proxy
curl -x http://<FORWARD_PROXY_IP>:8080 http://example.com
```

### Test 2: Verify proxy is actually being used
```bash
# Check your IP WITHOUT proxy (shows your real IP)
curl http://ifconfig.me

# Check your IP THROUGH proxy (should show proxy server's IP)
curl -x http://<FORWARD_PROXY_IP>:8080 http://ifconfig.me
```

The second command should return the **proxy server's public IP**, proving traffic is routed through it.

### Test 3: Demonstrate website blocking (Content Filtering)
The proxy is configured to block Facebook, Twitter, and Instagram to demonstrate filtering capability.

```bash
# This should work (allowed site)
curl -x http://<FORWARD_PROXY_IP>:8080 http://example.com

# This should be BLOCKED by the proxy
curl -x http://<FORWARD_PROXY_IP>:8080 http://facebook.com
# Expected output: "ERROR: The requested URL could not be retrieved"

# This should also be BLOCKED
curl -x http://<FORWARD_PROXY_IP>:8080 http://twitter.com
```

### Test 4: Monitor proxy logs in real-time
On the proxy server, watch requests as they come in:

```bash
sudo tail -f /var/log/squid/access.log
```

Then make requests from your client machine and see them appear in the logs.

## Security Group Configuration

Make sure your EC2 security group allows:
- **Inbound:** Port 8080 from your IP or test client IPs
- **Outbound:** All traffic (so proxy can reach the internet)

## Troubleshooting

### If Squid fails to start:

1. **Check the error logs:**
   ```bash
   sudo tail -50 /var/log/squid/cache.log
   ```

2. **Test the configuration syntax:**
   ```bash
   sudo squid -k parse
   ```

3. **Check if cache directory exists:**
   ```bash
   sudo ls -la /var/spool/squid
   ```

4. **Initialize cache directory if needed:**
   ```bash
   sudo squid -z
   ```

5. **Check permissions:**
   ```bash
   sudo chown -R proxy:proxy /var/spool/squid
   sudo chmod -R 755 /var/spool/squid
   ```

6. **Restart Squid:**
   ```bash
   sudo systemctl restart squid
   ```

### Other useful commands:

- **Check Squid status:** `sudo systemctl status squid`
- **View access logs:** `sudo tail -f /var/log/squid/access.log`
- **View cache logs:** `sudo tail -f /var/log/squid/cache.log`
- **Check config:** `sudo cat /etc/squid/squid.conf`
- **Test locally:** `curl -x http://localhost:8080 http://example.com`
- **Stop service:** `sudo systemctl stop squid`
- **Start service:** `sudo systemctl start squid`

## Important Notes

⚠️ **This configuration allows ALL traffic for demo purposes only!**

For production use, you should:
- Restrict access by IP/subnet
- Add authentication
- Configure content filtering
- Enable logging and monitoring
