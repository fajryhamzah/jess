FROM node:16-alpine as main

WORKDIR /app
COPY package*.json ./
COPY . ./

FROM main as production
ENV NODE_ENV=production
RUN npm ci --only=production
RUN npm install pm2 -g
RUN npm install typescript -g
RUN npm cache clean --force
RUN npm run migrate
RUN npm run build
ENTRYPOINT ["pm2-runtime", "dist/index.js"]

FROM main as development
ENV NODE_ENV=development
RUN npm install
ENTRYPOINT ["npm", "run", "dev"]