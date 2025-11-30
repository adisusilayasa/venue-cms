# Multi-stage build for backend
# ===============================

# Stage 1: Dependencies
FROM node:20-alpine AS deps

# Install OpenSSL and other required packages
RUN apk add --no-cache openssl ca-certificates libc6-compat

# Install Bun
RUN npm install -g bun@latest

WORKDIR /app

# Copy lockfile first for better caching
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Stage 2: Builder
FROM node:20-alpine AS builder

# Install build dependencies
RUN apk add --no-cache openssl ca-certificates
RUN npm install -g bun@latest

WORKDIR /app

# Copy dependencies from previous stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client and build the application
RUN bunx prisma generate
RUN bun run build

# Stage 3: Runtime (development)
FROM node:20-alpine AS runner

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs

# Install only runtime dependencies
RUN apk add --no-cache openssl ca-certificates

# Install Bun
RUN npm install -g bun@latest

WORKDIR /app

# Copy source code
COPY --chown=nodejs:nodejs . .

# Copy dependencies
COPY --from=builder /app/node_modules ./node_modules

# Set environment variables
ENV NODE_ENV=development
ENV PORT=3001

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 3001

# Optional health check (uncomment when /api/health is implemented)
# HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
#   CMD curl -f http://localhost:3001/api/health || exit 1

# Start the development server
CMD ["bun", "run", "dev"]
