FROM node:16-alpine

# Add the following lines to get react (CRA) to work with docker-ingress-nginx
ENV CI=true
ENV WDS_SOCKET_PORT=0

WORKDIR /app

COPY package.json ./
RUN npm install
COPY ./ ./

CMD ["npm", "start"]