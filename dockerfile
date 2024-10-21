FROM node:18-alpine as base
RUN apk add --no-cache libc6-compat

FROM base as builder
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM builder as production
WORKDIR /app
RUN npm install --global pm2
RUN addgroup --system --gid 1002 nextgroup
RUN adduser --system --uid 1002 nextuser
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextuser:nextgroup /app/.next/standalone ./
COPY --from=builder --chown=nextuser:nextgroup /app/.next/static ./.next/static
COPY --from=builder --chown=nextuser:nextgroup /app/ecosystem.config.js ./
USER nextuser
ENTRYPOINT ["pm2-runtime", "start","ecosystem.config.js"]