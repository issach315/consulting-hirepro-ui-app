# ---------- Stage 1: Build ----------
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Build app
RUN npm run build


# ---------- Stage 2: Production ----------
FROM node:18-alpine

WORKDIR /app

# Install serve package globally
RUN npm install -g serve

# Copy build output from builder
COPY --from=builder /app/dist ./dist

# Railway uses PORT env variable
ENV PORT=3000

EXPOSE 3000

# Start app
CMD ["sh", "-c", "serve -s dist -l $PORT"]
