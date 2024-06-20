FROM node:18-alpine
WORKDIR /usr/src/app/frontend
COPY package*.json ./
RUN npm install
RUN chown -R node:node /usr/src/app/frontend
USER node
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]
