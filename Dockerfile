FROM node:23-alpine

WORKDIR /home/hawardjie/gitprojects/chatgpt-nodejs

COPY package.json .
RUN npm install
COPY . .

CMD ["node", "index.js"]