FROM node:20-alpine

WORKDIR /app

COPY package.json .
# Add package-lock.json for more reliable builds
COPY package-lock.json .

# Install dependencies with clean npm cache
RUN npm cache clean --force && \
    npm install

COPY . .

EXPOSE 5173

# Enable host networking for Vite
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]