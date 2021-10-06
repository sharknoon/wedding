FROM node:14 as build-stage
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

FROM node:14 as production-stage
WORKDIR /app
COPY --from=build-stage /app/build .
RUN echo "{\"type\": \"module\"}" > package.json
EXPOSE 3000
CMD ["node", "."]