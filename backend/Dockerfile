FROM node:22-alpine

WORKDIR /app

COPY . .

RUN npm install
RUN npx prisma generate
RUN npm run build

CMD ["node","dist/src/main.js"]
