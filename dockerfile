FROM node:20-alpine AS builder

WORKDIR /omniplex

COPY package.json yarn.lock ./

COPY . .

RUN yarn install

RUN yarn run build

FROM node:20-alpine AS runner

WORKDIR /omniplex

COPY --from=builder /omniplex/package.json ./
COPY --from=builder /omniplex/yarn.lock ./
COPY --from=builder /omniplex/next.config.mjs ./
COPY --from=builder /omniplex/public ./
COPY --from=builder /omniplex/.next/standalone ./
COPY --from=builder /omniplex/.next/static ./.next/static

EXPOSE 3000

ENTRYPOINT [ "node", "server.js" ]