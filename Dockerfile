FROM node
   
WORKDIR /.
 
COPY package*.json ./
  
RUN npm install
   
COPY . .

ENV REDIS_URL=redis://localhost:6379
   
EXPOSE 3000
 
CMD ["npm", "start"]