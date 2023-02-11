FROM node:lts

WORKDIR /app

COPY ["package.json", "package-lock.json", "tsconfig.json" , "./"] 

RUN npm install

COPY . .

RUN npx tsc
