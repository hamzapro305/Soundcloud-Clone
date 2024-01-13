FROM node:20.10.0-alpine3.18 as runner

WORKDIR /build-space
COPY . ./
RUN npm i
EXPOSE 5555
CMD ["npx", "prisma","db" ,"pull", "&&", "npx", "prisma", "studio"]