FROM node:16.17-bullseye-slim as build
WORKDIR /app
COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install

COPY tsconfig.json tsconfig.json
COPY src src
COPY public public

ARG REACT_APP_AUTH0_DOMAIN
ARG REACT_APP_AUTH0_CLIENT_ID
ARG REACT_APP_AUTH0_AUDIENCE
ARG REACT_APP_AUTH0_REDIRECT_URI
RUN yarn build

FROM build as test
ENTRYPOINT [ "yarn", "test" ]

FROM build as staging
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

FROM nginx:1.23.1-alpine as release
COPY --from=staging /app/build /usr/share/nginx/html
COPY --from=staging /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf