FROM node:22-alpine
WORKDIR /app
RUN corepack enable
COPY package.json tsconfig.json ./
COPY prisma ./prisma
COPY src ./src
RUN pnpm install
RUN pnpm prisma:generate
RUN pnpm build
EXPOSE 4000
CMD ["pnpm", "start"]
