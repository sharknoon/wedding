FROM node:21-slim as build-stage
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

FROM node:21-slim as production-stage
#RUN apt update -y && apt install -y ffmpeg
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build-stage /app/package*.json ./
RUN npm ci
COPY --from=build-stage /app/build .
EXPOSE 3000
CMD ["node", "."]