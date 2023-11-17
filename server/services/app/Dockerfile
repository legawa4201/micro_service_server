FROM node:latest

WORKDIR /var/www/service-app

ENV NODE_ENV=production
ENV DATABASE_URL=postgresql://postgres:6tyBabfi52npculn@db.ixzanywhhfwcstbdhjih.supabase.co:5432/postgres
ENV PORT=4002

COPY package*.json ./

RUN npm install && npm cache clean --force
RUN npm install -g nodemon

COPY ./ ./

EXPOSE 4002

CMD ["npm", "run", "start"]
