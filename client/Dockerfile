FROM node:alpine

WORKDIR /app

# Below * indicates multiple occurence whereas ./ (ie. Destination) indicates current working directory (ie. app)
COPY package*.json ./
RUN npm install

# Below . indicates current directory ./ (ie. Destination) indicates current working directory (ie. app)
COPY . ./
RUN npm run build

FROM nginx
EXPOSE 3000

COPY ./nginx/default.config /etc/nginx/conf.d/default.conf

# In React like application we don't have '.html' as the main file hence we need a mapping corresponding to the 'index.js' file to .html file while building out application and dhiping it to the 'nginx/html'
COPY --from=0 /app/build /usr/share/nginx/html
