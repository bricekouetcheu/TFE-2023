FROM node:18.15.0
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./

RUN echo "REACT_APP_KEY=${REACT_APP_KEY}" >> .env
RUN npm i
RUN apt update

EXPOSE 3000
#RUN npm run build

CMD ["npm", "run","start"]