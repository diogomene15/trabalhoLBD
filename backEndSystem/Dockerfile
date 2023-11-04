FROM node:20

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src
COPY prisma ./prisma
COPY .env ./

RUN npm install
RUN npm run build
RUN npm run gen-prisma

CMD [ "node", "./dist/index.js" ]