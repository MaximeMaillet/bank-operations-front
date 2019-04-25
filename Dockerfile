FROM node:10.15.3 as build-stage

ENV NODE_ENV=production
RUN mkdir -p /app
WORKDIR /app
COPY ./ /app
RUN npm install --production && npm run build

FROM nginx:1.15

COPY --from=build-stage /app/build/ /usr/share/nginx/html
COPY --from=build-stage /app/Docker/nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build-stage /app/Docker/nginx/conf.d/prod.conf /etc/nginx/conf.d/default.conf
