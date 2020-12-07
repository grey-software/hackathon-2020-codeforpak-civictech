FROM node:current

RUN mkdir -p /api
COPY . /api
WORKDIR /api

RUN yarn

CMD [ "yarn", "start" ]