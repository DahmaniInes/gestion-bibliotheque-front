# Dockerfile (Angular)
FROM node:20-alpine as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

FROM nginx:alpine
COPY --from=build /app/dist/dev-ops /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
