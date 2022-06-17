FROM node:16-alpine as dependencies
WORKDIR /usr/src/app
ADD package.json ./
ADD yarn.lock ./
RUN yarn
COPY . .
RUN yarn global add nodemon sucrase
RUN apk update && apk upgrade
EXPOSE 9001
CMD ["yarn", "dev:prod"]