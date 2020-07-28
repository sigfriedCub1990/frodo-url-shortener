FROM node:lts-slim

ENV PORT 3000

WORKDIR /app

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

RUN npm dev

EXPOSE 3000

COPY . /app
