FROM node:18.15.0
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./

COPY ./ ./ 
RUN npm install nodemon
RUN npm rebuild bcrypt --build-from-source
RUN npm i
EXPOSE 4000
CMD ["node", "server"]