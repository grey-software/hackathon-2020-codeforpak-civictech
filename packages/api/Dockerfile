FROM node:current

RUN mkdir -p /api
COPY package.json *yarn* /api/
WORKDIR /api
RUN yarn

WORKDIR /

COPY . /api

WORKDIR /api

CMD [ "yarn", "start" ]