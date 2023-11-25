FROM node:18-alpine as runner
WORKDIR /build-space

COPY . ./
RUN npm i
COPY . .
RUN npm run build
CMD [ "npm", "run", "start" ]