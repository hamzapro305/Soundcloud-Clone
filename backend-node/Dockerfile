# Use Node.js Alpine as the base image with a specific version
FROM node:20.10.0-alpine3.18 as runner

# Set the working directory inside the container
WORKDIR /build-space

# Copy package.json and package-lock.json to the working directory
COPY ./package.json ./

# Install dependencies using npm
RUN npm i

# Install basic tools like bash using the Alpine package manager
RUN apk --no-cache add bash curl

# Copy the entire application to the working directory
COPY . ./

# Run the build script to build the application
RUN npm run build

# Expose port 3001 for the application to listen on
EXPOSE 3001

# Specify the default command to run when the container starts
CMD ["bash", "entryPoint.sh"]