FROM node:18-alpine as builder

WORKDIR /app

COPY package.json .

COPY package-lock.json .

COPY . .

RUN npm install

RUN npm run build


FROM nginx:alpine

COPY ./nginx.conf /etc/nginx/nginx.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 3000

ENTRYPOINT ["nginx", "-g", "daemon off;"]
