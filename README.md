# trabalhoLBD - NutriSafe
Welcome. This is a simple college project that uses [Prisma](https://www.prisma.io/) and [Postgresql](https://www.postgresql.org/) to build a system called **NutriSafe**.

## How to depoloy it?
The easiest way for running it up is using [Docker](https://www.docker.com/):
```bash
docker-compose up . -d
```
But you can also do it by the good old way.
With an Postgresql database running, update the connection string on `./backEndSystem/.env` file.

Inside the `backEndSystem` folder, install the NodeJS packages needed:
```bash
npm install
```
Build the TypeScript code:
```bash
npm run build
```
And, finnaly, run the app:
```bash
node ./dist/index.js
```

Some migration operations may be needed. Checkout the [Prisma CLI doc](https://www.prisma.io/docs/concepts/components/prisma-cli) for more info.

## Some API doc?
Absolutly! You can check some pre-built tests on our [Postman API doc](https://documenter.getpostman.com/view/18339857/2s9YXe8Q5i#f7e8b660-1971-40bd-b96d-b99d812ac04e)
