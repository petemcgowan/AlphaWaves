# Use a lightweight Node image
FROM node:alpine

# Install http-server globally
RUN npm install -g http-server

# Create a directory to serve
WORKDIR /usr/src/app

# Copy your DASH content to the container
COPY hls/ ./hls/

RUN ls -al hls/

# Expose the port http-server will run on
EXPOSE 8080

# Start http-server
CMD ["http-server", "hls/", "-p", "8080"]

