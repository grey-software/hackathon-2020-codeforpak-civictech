FROM node:current

RUN mkdir -p /api
COPY package.json *yarn* /api/
WORKDIR /api
RUN yarn

WORKDIR /
COPY . /api

WORKDIR /api/portal
RUN yarn
RUN yarn build

WORKDIR /api
EXPOSE 8000
CMD [ "yarn", "start" ]