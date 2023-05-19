# Desarrollo
FROM node:18 AS development

WORKDIR /backend

RUN apt update -y && apt upgrade -y
RUN npm i -g @nestjs/cli

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

# Produccion
FROM development AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}