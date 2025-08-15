FROM node:22 as frontend

WORKDIR /app

COPY frontend/package*.json ./

RUN npm install

COPY frontend/public ./public
COPY frontend/src ./src

RUN npm run build

FROM node:22 as backend

WORKDIR /app

COPY backend/package*.json ./

RUN npm install

COPY backend/src ./src
COPY --from=frontend /app/build ./build

CMD ["npm", "start"]