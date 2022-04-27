FROM node:lts-alpine

WORKDIR /app

COPY ./package.json ./
RUN yarn

COPY ./public ./public
COPY ./src ./src
COPY ./tsconfig.json ./

CMD yarn start
