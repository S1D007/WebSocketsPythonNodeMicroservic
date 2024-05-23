FROM node:alpine AS base

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

FROM node:alpine

WORKDIR /usr/src/app

COPY --from=base /usr/src/app .

EXPOSE 8766

CMD ["node", "index.js"]
