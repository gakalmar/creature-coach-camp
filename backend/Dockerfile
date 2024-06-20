FROM node:18-alpine
WORKDIR /usr/src/app/backend
COPY package*.json ./
RUN npm install
RUN chown -R node:node /usr/src/app/backend
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
