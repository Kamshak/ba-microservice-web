FROM node:6
RUN npm install -g gulp

ADD . /opt/app
WORKDIR /opt/app
VOLUME /opt/app/dist

CMD ["gulp", "build-continuous"]
