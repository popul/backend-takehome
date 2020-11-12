FROM node:lts AS builder

COPY . .

RUN yarn install
RUN yarn build:docker

FROM node:lts

COPY --from=builder /dist/app ./dist/app
COPY --from=builder /dist/share ./dist/share
COPY --from=builder /node_modules ./node_modules

EXPOSE 8080
CMD [ "node", "./dist/app/src/server.js" ]
