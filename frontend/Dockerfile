# Stage 1: Install dependencies and build the app
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies first
COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps

# Copy all source files
COPY . .

# Build the Next.js app
RUN npm run build

# Stage 2: Run the app in production mode
FROM node:20-alpine AS runner

WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app/package.json /app/package-lock.json* ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Expose port for Next.js
EXPOSE 3000

# Start Next.js in production mode
CMD ["npm", "run", "preview"]
