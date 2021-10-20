FROM node:16-alpine as main

WORKDIR /app
COPY package*.json /
COPY . /

FROM main as development
ENV NODE_ENV=development
RUN npm install
ENTRYPOINT ["npm", "run", "dev"]

FROM main as production
ENV NODE_ENV=production
RUN npm ci --only=production
RUN npm cache clean --force
RUN knex migrate:latest
RUN npm run build 
ENTRYPOINT ["node, "dist/index.js"]