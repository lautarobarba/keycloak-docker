#Desarrollo
FROM node:18 AS development

WORKDIR /app

RUN apt update -y && apt upgrade -y
RUN npm install -g serve

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

# Produccion
FROM development AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
