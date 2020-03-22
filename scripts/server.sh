sudo apt-get update
sudo apt -y upgrade
sudo apt-get install nano
sudo apt -y install curl dirmngr apt-transport-https lsb-release ca-certificates
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install nodejs -y
sudo apt-get install build-essential -y
sudo npm install -g pm2
pm2 startup systemd
sudo apt-get install nginx ufw -y
sudo ufw allow ssh
sudo ufw allow 'Nginx HTTP' 
sudo ufw allow 'Nginx Full'
yes | sudo ufw enable
sudo chmod 777 /etc/nginx/sites-available/default
sudo rm -rf /etc/nginx/sites-available/default
sudo -s
sudo echo "server {" >> /etc/nginx/sites-available/default
sudo echo "listen 80 default_server;" >> /etc/nginx/sites-available/default
sudo echo "listen [::]:80 default_server;" >> /etc/nginx/sites-available/default
sudo echo "location / {" >> /etc/nginx/sites-available/default
sudo echo "    proxy_pass http://localhost:3000;" >> /etc/nginx/sites-available/default
sudo echo "    proxy_set_header   X-Forwarded-For \$remote_addr;" >> /etc/nginx/sites-available/default
sudo echo "    proxy_set_header   Host \$http_host;" >> /etc/nginx/sites-available/default
sudo echo "}" >> /etc/nginx/sites-available/default
sudo echo "}" >> /etc/nginx/sites-available/default
sudo apt-get install git -y
sudo systemctl restart nginx
sudo apt install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
sudo apt update
apt-cache policy docker-ce
sudo apt install docker-ce -y
sudo groupadd docker
sudo usermod -aG docker $USER
wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list
sudo apt-get update
sudo apt-get install -y mongodb-org