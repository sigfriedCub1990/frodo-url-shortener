FROM      node:lts
LABEL     maintainer="sigfried <@sigfriedcub1990>"

ENV PORT 3000

WORKDIR /app

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
COPY . /app

RUN npm ci

EXPOSE 3000

CMD ["npm", "start"]

