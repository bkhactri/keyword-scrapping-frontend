FROM node:20.11.0 as build

WORKDIR /app

COPY . .

RUN npm ci --legacy-peer-deps

RUN npm run build:prod

FROM nginx:alpine as runtime

WORKDIR /app

COPY --from=build /app/dist/ /usr/share/nginx/html/
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]