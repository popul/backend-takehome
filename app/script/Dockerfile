FROM node:lts AS builder

COPY . .

RUN yarn install
RUN yarn build:docker

FROM node:lts

COPY --from=builder /dist/script ./dist/script
COPY --from=builder /dist/share ./dist/share
COPY --from=builder /node_modules ./node_modules

CMD [ "node", "./dist/script/tasks.js" ]