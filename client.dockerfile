FROM node:lts-alpine AS deps

WORKDIR /app

COPY ./super-client/package.json ./
RUN yarn

FROM node:lts-alpine AS build

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY ./super-client/public ./public
COPY ./super-client/src ./src
COPY ./super-client/package.json ./
COPY ./super-client/tsconfig.json ./

RUN yarn build

FROM node:lts-alpine AS serve

WORKDIR /app

COPY --from=build /app/build /build
CMD npx serve ./build
