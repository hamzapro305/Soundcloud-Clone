#!/bin/bash

npx prisma generate 
npx prisma studio &
npm run start