FROM node:latest

WORKDIR /var/www/orchestrator

COPY package*.json ./

ENV PORT=4000
ENV PASSWORD=zDuRPOzyPFu3YV1HPLgXq36fugTE8KIF

RUN npm install && npm cache clean --force
RUN npm install -g nodemon

COPY ./ ./

EXPOSE 4000

CMD ["npm", "run", "start"]