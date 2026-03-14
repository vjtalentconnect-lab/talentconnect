FROM node:20-alpine

WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json* ./

# Install only production dependencies
RUN npm install --production

# Copy source code
COPY . .

# Expose API port
EXPOSE 5000

CMD ["npm", "start"]
