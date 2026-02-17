#!/bin/bash

# Update package list and install required packages
sudo apt-get update
sudo apt-get install -y python3-pip python3-venv

# Create and activate virtual environment (in current directory where app.py is)
python3 -m venv venv
source venv/bin/activate

# Install Python dependencies
pip install flask gunicorn

# Get the current directory (where app.py is located)
CURRENT_DIR=$(pwd)

# Create systemd service file
cat <<EOT | sudo tee /etc/systemd/system/backend.service
[Unit]
Description=Backend Server
After=network.target

[Service]
User=ubuntu
WorkingDirectory=$CURRENT_DIR
Environment="PATH=$CURRENT_DIR/venv/bin"
ExecStart=$CURRENT_DIR/venv/bin/gunicorn --bind 0.0.0.0:5000 app:app
Restart=always

[Install]
WantedBy=multi-user.target
EOT

# Reload systemd and start the service
sudo systemctl daemon-reload
sudo systemctl enable backend
sudo systemctl start backend
