FROM node:lts-alpine

WORKDIR /app

COPY ./super-api/package.json ./
RUN npm i

COPY ./super-api/tsconfig.json ./
COPY ./super-api/ormconfig.json ./
COPY ./super-api/src ./src

RUN npm run build

CMD cd dist && node ./index.js