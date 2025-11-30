FROM oven/bun:1.2 AS base

WORKDIR /app

# Install dependencies
COPY package.json bun.lock* ./
RUN bun install

# Copy source code
COPY . .

# Generate Prisma client
RUN bun prisma generate

# Expose port
EXPOSE 3001

# Start the development server
CMD ["bun", "run", "dev"]
