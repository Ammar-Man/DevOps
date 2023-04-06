FROM node:16.17.0
RUN mkdir -p app
WORKDIR /app


# Install app dependencies
COPY package*.json ./

RUN npm install
RUN npm init -y
RUN npm install bcrypt 
RUN npm install cors 
RUN npm install dotenv 
RUN npm install express 
RUN npm install jsonwebtoken 
RUN npm install mongoose   


# RUN node --version
# RUN npm --version




# Bundle app source
COPY . .

EXPOSE 3040
CMD ["npm","start"]

