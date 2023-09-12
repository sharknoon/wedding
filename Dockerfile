FROM oven/bun:1.0 as build-stage
WORKDIR /app
COPY . .
RUN bun i
RUN bun run build

FROM oven/bun:1.0 as production-stage
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build-stage /app/package.json /app/bun.lockb ./
RUN bun i
COPY --from=build-stage /app/build .
EXPOSE 3000
CMD ["bun", "run", "start"]