FROM node:lts-alpine AS deps

WORKDIR /app

COPY ./package.json ./
RUN yarn

FROM node:lts-alpine AS build

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY ./public ./public
COPY ./src ./src
COPY ./package.json ./
COPY ./tsconfig.json ./

RUN yarn build

FROM node:lts-alpine AS serve

WORKDIR /app

COPY --from=build /app/build /build
CMD npx serve ./build
