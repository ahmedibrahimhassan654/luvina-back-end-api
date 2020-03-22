# version of node to use
FROM node:11.5.0

ENV NODE_ENV=production

# make dir for the application build output
RUN mkdir -p /usr/src/app
RUN chown node -R /usr/src/app

# install some useful dependicies
RUN apt-get update && apt-get install -y git curl wget g++ make python bzip2

# copy package.json and install npm dependicies
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install --only=production --allow-root && npm install -g pm2

# copy all our source code into the working directory
COPY . .

# change the root user for security reasons
USER node

# expose port 3000 for our server to run on
EXPOSE 3000

# start command as per package.json
CMD ["pm2-runtime", "start", "app.js"]
