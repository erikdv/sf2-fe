FROM node:20 AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build -- --base-href=/messages/

FROM nginx:1.25.0-alpine


COPY /conf/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/sf2-fe/browser /usr/share/nginx/html/

CMD ["/bin/sh",  "-c",  "exec nginx -g 'daemon off;'"]

EXPOSE 8080
