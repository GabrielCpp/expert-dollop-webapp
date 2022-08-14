FROM node:16-bullseye-slim as base 

WORKDIR /app
COPY package.json package.json 
COPY yarn.lock yarn.lock 
RUN yarn install 

# ------------------------------------------------ build ------------------------------------------------
FROM base as build
COPY tsconfig.json ./tsconfig.json
COPY public ./public
COPY src ./src
RUN yarn build

# ------------------------------------------------ test ------------------------------------------------
FROM base as test 
ENTRYPOINT [ "bash" "-c", "CI=true npm test" ]

# ------------------------------------------------ release ------------------------------------------------
FROM nginx:1.23.0-alpine as release
COPY --from=build /app/build /usr/share/nginx/html
COPY ./configs/default /etc/nginx/sites-available/default 
ENTRYPOINT ["/usr/sbin/nginx", "-g", "daemon off;"]