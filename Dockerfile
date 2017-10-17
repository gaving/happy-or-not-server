FROM node:7.9-alpine

WORKDIR /api

COPY package.json yarn.lock /api/
RUN yarn

COPY . /api

EXPOSE 3003

CMD ["yarn", "start"]
