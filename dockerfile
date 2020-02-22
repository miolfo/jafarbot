FROM node:10

WORKDIR /usr/jafarbot

COPY package*.json ./
COPY jbconfig-prod.json ./jbconfig.json

RUN npm install

COPY . .

CMD [ "npm", "start" ]