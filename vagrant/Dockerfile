FROM ubuntu
RUN apt-get update && apt-get install -y curl sudo 
RUN curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash - && apt-get install -y nodejs build-essential
RUN npm install -g npm@latest
RUN npm install -g gulp bower node-gyp

USER vagrant
WORKDIR /vagrant
RUN npm install && bower install
RUN gulp serve
