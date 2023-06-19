FROM node:18.15.0
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN echo "REACT_APP_KEY=${REACT_APP_KEY}" >> .env
RUN npm i

EXPOSE 3000

CMD ["npm", "run","start"]