FROM node

RUN mkdir -p /opt/wunderbaren
WORKDIR /opt/wunderbaren
COPY package.json /opt/wunderbaren
RUN npm install
COPY . /opt/wunderbaren

EXPOSE 4200

CMD [ "npm", "start" ]