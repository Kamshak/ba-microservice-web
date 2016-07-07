FROM node:6
RUN npm install -g gulp

ADD . /opt/app
WORKDIR /opt/app
VOLUMNE /opt/app/dist

CMD ["gulp", "build-continuous"]
