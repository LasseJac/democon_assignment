# This Dockerfile utilizes a multi-stage build to optimize final image size, and to make it easier to reason about
# Usage: "docker build . --target=dev" (development) / "DOCKER_BUILDKIT=1 docker build ." (production)
# 
ARG NODE_VERSION=13.7-slim

# Installing shared dependencies
FROM node:$NODE_VERSION as shared_deps

WORKDIR /install/shared

COPY ./package*.json ./

RUN npm install

# Installing server dependencies
FROM node:$NODE_VERSION as server_deps

WORKDIR /install/server

COPY ./src/server/package*.json ./

RUN npm install

# Base image; has all files and dependencies included
FROM node:$NODE_VERSION as base

WORKDIR /app

COPY --from=server_deps /install/server/node_modules ./server/node_modules
COPY --from=shared_deps /install/shared/node_modules ./node_modules
COPY . .

# Development build; runs webpack in watch mode and has all dependencies included
# Use DOCKER_BUILDKIT=1 to skip dev stage entirely (the subsequent stages do not copy from it, so it will not be run if you enable BuildKit)
FROM base as dev

CMD ["npm", "run", "dev"]

# Client build - for production
FROM base as build

RUN npm run build

# Production target
# Doesn't inherit from base image because it doesn't need all dependencies to run (they are only needed at build-time)
# This is also why we split dependencies into shared and server; the server image can remain as lean as possible by 
# not including unnecessary dependencies
FROM node:$NODE_VERSION

WORKDIR /app

COPY . . 
COPY --from=build /app/dist /app/dist
COPY --from=server_deps /install/server/node_modules ./server/node_modules

CMD ["npm", "run", "prod"]