FROM node:current

RUN mkdir -p /app
COPY package.json *yarn* /app/
WORKDIR /app
RUN yarn

WORKDIR /

COPY . /app

WORKDIR /app

RUN yarn build

CMD [ "yarn", "start" ]