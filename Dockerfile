FROM node:23-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run lint && npm run build

EXPOSE 4000

CMD ["npm", "run", "start"]