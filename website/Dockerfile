
# Dockerfile for client

# Stage 1: Build react client
FROM node:14.15.4-alpine3.10

# Working directory be app
WORKDIR /usr/app

COPY package*.json ./

# Install dependencies
RUN yarn install --network-timeout 100000

# copy local files to app folder
COPY . .

EXPOSE 3000

CMD ["yarn","start"]