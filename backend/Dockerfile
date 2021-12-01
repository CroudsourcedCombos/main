FROM node:14.17.6-stretch-slim as base
RUN apt-get update && apt-get install --no-install-recommends --yes openssl
WORKDIR /app

FROM base
COPY package-lock.json package.json ./
RUN npm i
COPY .eslintrc.js tsconfig.json ./
COPY src /app/src/
COPY prisma /app/prisma/
RUN npm run prisma && npm run build
EXPOSE 4000
COPY wait-for-it.sh ./
RUN chmod +x wait-for-it.sh
CMD ["npm", "run", "start"]
