# Backend Server Setup

This is a simple Flask application that serves as the backend for the proxy demonstration.

## Deployment Instructions

1. **Upload files to EC2 instance:**
   ```bash
   # From your local machine
   scp -i your-key.pem app.py setup.sh ubuntu@<EC2_IP>:~/
   ```

2. **SSH into the EC2 instance:**
   ```bash
   ssh -i your-key.pem ubuntu@<EC2_IP>
   ```

3. **Run the setup script:**
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```

4. **Verify the service is running:**
   ```bash
   sudo systemctl status backend
   ```

5. **Test the application:**
   ```bash
   curl http://localhost:5000
   ```

## Manual Testing

If you want to run the app manually (without systemd):
```bash
python3 -m venv venv
source venv/bin/activate
pip install flask gunicorn
python3 app.py
```

## Troubleshooting

- **Check logs:** `sudo journalctl -u backend -f`
- **Restart service:** `sudo systemctl restart backend`
- **Check if port is in use:** `sudo netstat -tulpn | grep 5000`
