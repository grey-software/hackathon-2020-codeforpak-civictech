FROM node:current

RUN mkdir -p /dashboard
COPY package.json *yarn* /dashboard/
WORKDIR /dashboard
RUN yarn

WORKDIR /

COPY . /dashboard

WORKDIR /dashboard

RUN yarn build

CMD [ "yarn", "start" ]