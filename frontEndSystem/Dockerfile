FROM node:20 AS build

WORKDIR /app

COPY public ./public
COPY src ./src
COPY index.html ./ 
COPY package*.json ./
COPY tsconfig.json ./
COPY tsconfig.node.json ./
COPY vite.config.ts ./

RUN npm install
RUN npm run build

FROM nginx:1.25.3-alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
