FROM dockerfile/nodejs
RUN npm install -g bower gulp

ADD . /opt/app
WORKDIR /opt/app
VOLUMNE /opt/app/dist

CMD ["gulp", "build-continuous"]
