# Multi-stage build for frontend with Bun
# =========================================

# Stage 1: Dependencies
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
RUN npm install -g bun@latest

WORKDIR /app

# Copy lockfile first for better caching
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Stage 2: Builder (optional - for production builds)
FROM node:20-alpine AS builder
RUN npm install -g bun@latest
WORKDIR /app

# Copy dependencies from previous stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
# RUN bun run build

# Stage 3: Runtime (development)
FROM node:20-alpine AS runner

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Install Bun
RUN npm install -g bun@latest

WORKDIR /app

# Copy source code first
COPY --chown=nextjs:nodejs . .

# Copy dependencies
COPY --from=deps /app/node_modules ./node_modules

# Set environment variables
ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1

# Expose port
EXPOSE 3000

# Start the development server
CMD ["bun", "run", "dev"]
