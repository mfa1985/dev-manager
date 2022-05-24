### STAGE 1: Build ###
FROM node:16
WORKDIR /app
COPY . .
RUN npm i
RUN npm run build

### STAGE 2: Run ###
CMD npm run start:prod