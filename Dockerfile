FROM node:alpine

WORKDIR /usr/app
COPY package.json .
RUN yarn
RUN yarn migration:generate
RUN yarn migration:run
COPY .. .

EXPOSE 3000
CMD yarn dev

