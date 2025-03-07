FROM node:20.18.3-alpine as build

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn run build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
