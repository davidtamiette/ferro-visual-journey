# Use the official Node.js 18 Alpine image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production --silent

# Copy source code (excluding supabase functions)
COPY . .
RUN rm -rf supabase/functions

# Build the application
RUN npm run build

# Expose port
EXPOSE 8080

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8080

# Start the application
CMD ["npm", "run", "preview"]
