FROM node:latest

WORKDIR /var/www/service-user

COPY package*.json ./

ENV DATABASE_URL=mongodb+srv://legawap12:l577lHfQx4AbNoqS@cluster0.g2glqrn.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp
ENV PORT=4001

RUN npm install && npm cache clean --force
RUN npm i -D nodemon

COPY ./ ./

EXPOSE 4001

CMD ["npm", "run", "start"]
