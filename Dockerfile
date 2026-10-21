# syntax=docker/dockerfile:1

FROM oven/bun:1.4.2 AS base
WORKDIR /app

# Build
FROM base AS builder
COPY package.json bun.lock .env.production ./
RUN bun install --frozen-lockfile
# Bust the COPY cache per commit. The Fractal operator always builds
# --cache-from <name>:buildcache and injects GIT_SHA; importing that registry
# cache can false-hit "COPY . ." so a new commit reuses a stale source layer and
# ships old code. Consuming GIT_SHA before the copy forces a re-copy every commit
ARG GIT_SHA=unknown
RUN echo "source-cache-bust ${GIT_SHA}"
COPY . .
RUN bun run build

# Bun doesn't properly resolve externalized Nitro packages (srvx, react-dom/server)
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
# Bake the built commit so the running commit is observable and a stale build is
# detectable (compare BUILD_SHA against the expected commit)
ARG GIT_SHA=unknown
ENV BUILD_SHA=${GIT_SHA}

COPY --from=builder /app/.output ./.output

EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
