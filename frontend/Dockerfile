FROM node:16
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN chown -R node:node /usr/src/app
USER node
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]
