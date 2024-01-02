FROM node:20.10.0-alpine3.18 as runner

WORKDIR /build-space
COPY . ./
RUN npm i
RUN npm run build
EXPOSE 3001
CMD ["npm", "run", "start"]