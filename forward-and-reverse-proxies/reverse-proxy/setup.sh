#!/bin/bash

# Install Nginx
sudo apt-get update
sudo apt-get install -y nginx

# Configure Nginx as reverse proxy
cat <<EOT | sudo tee /etc/nginx/sites-available/reverse-proxy
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://YOUR_BACKEND_IP:5000;  # Replace with your backend server's private IP
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOT

# Enable the site
sudo ln -s /etc/nginx/sites-available/reverse-proxy /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default

# Test and reload Nginx
sudo nginx -t
sudo systemctl restart nginx

# Configure firewall
sudo ufw allow 'Nginx HTTP'
sudo ufw enable

echo "Reverse proxy setup complete. Nginx is now proxying requests to the backend server"
