FROM node:18.15.0
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./

RUN echo "REACT_APP_KEY=${REACT_APP_KEY}" >> .env
RUN npm i
RUN apt update
RUN apt install -y nginx

COPY default.nginx /etc/nginx/sites-available/default
COPY default.nginx /etc/nginx/sites-enable/default
EXPOSE 3000
RUN npm run build

RUN chmod +x /app/start.sh


CMD ["/app/start.sh"]
#CMD ["npm", "run","start"]