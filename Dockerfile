FROM node:alpine AS backend-build

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
COPY backend/package.json ./backend/
RUN npm ci --workspace=backend

COPY backend ./backend

RUN npm run build --workspace=backend


FROM node:alpine AS frontend-build

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
COPY frontend/package.json ./frontend/
RUN npm ci --workspace=frontend

COPY frontend ./frontend

RUN npm run build --workspace=frontend


FROM node:alpine
WORKDIR /usr/src/app

COPY package.json package-lock.json ./
COPY backend/package.json ./backend/
COPY frontend/package.json ./frontend/

COPY --from=backend-build /usr/src/app/backend/build ./build
COPY --from=frontend-build /usr/src/app/frontend/dist ./build/dist
COPY backend/assets ./build/assets

RUN npm ci --omit=dev && \
    npm cache clean --force && \
    addgroup -g 1001 -S appuser && \
    adduser -S -u 1001 -G appuser appuser

EXPOSE 3000
CMD ["node", "build/src/index.js"]