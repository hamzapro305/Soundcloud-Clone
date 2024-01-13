#!/bin/bash

npx prisma migrate dev --name init
npx prisma generate 
npx prisma studio &
npm run start