FROM node:lts AS builder

COPY . .

RUN yarn install
RUN yarn build

FROM node:lts

COPY --from=builder /dist ./dist
COPY --from=builder /node_modules ./node_modules

EXPOSE 8080
CMD [ "node", "./dist/index.js" ]
