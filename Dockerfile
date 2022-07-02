FROM node:16-bullseye-slim as base 

WORKDIR /app
COPY package.json package.json 
COPY yarn.lock yarn.lock 
RUN yarn install 

COPY tsconfig.json /app/tsconfig.json
COPY public /app/public
COPY src /app/src

FROM base as build
RUN yarn build

FROM nginx:1.23.0-alpine as release
COPY --from=build /app/build /usr/share/nginx/html