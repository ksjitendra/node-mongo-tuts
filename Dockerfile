FROM node:18 

WORKDIR /user/src/app

COPY . .
RUN npm install

EXPOSE 3000
CMD ["node", "app.js"]