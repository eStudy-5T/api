FROM node:16-alpine as dependencies
ENV APP_PORTAL_HOST_V2=https://letmeet.xyz
ENV GOOGLE_CALLBACK_URL=https://api.letmeet.xyz/api/auth/google/callback
ENV FACEBOOK_CALLBACK_URL=https://api.letmeet.xyz/api/auth/facebook/callback
ENV VNPAY_RETURN_BASE_URL=https://letmeet.xyz/course-details
WORKDIR /usr/src/app
ADD package.json ./
ADD yarn.lock ./
RUN yarn
COPY . .
RUN yarn global add nodemon sucrase
RUN apk update && apk upgrade
EXPOSE 9001
CMD ["yarn", "dev:prod"]