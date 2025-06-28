FROM node:18-alpine as builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM nginx:alpine
COPY --from=builder /app/dist/ton-projet /usr/share/nginx/html
