# Build stage
FROM node:20-alpine as build

WORKDIR /app

# Copy package.json and lockfile explicitly
COPY package.json package-lock.json* ./

RUN npm install

# Copy source code and build
COPY . .

RUN npm run build

# Production stage (Nginx)
FROM nginx:alpine

# Copy built assets
COPY --from=build /app/dist /usr/share/nginx/html

# Replace default Nginx configuration to support client-side routing
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/default.conf /etc/nginx/conf.d/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
