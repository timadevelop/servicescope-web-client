FROM node:latest

RUN \
  apt-get update \
  && apt-get -y install gettext-base \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# set working directory

RUN mkdir -p /usr/src/app/node_modules/.bin/

# COPY . /usr/src/app

WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

ARG ENV="development"

ARG PORT=4200

EXPOSE ${PORT}

# RUN npm install
# RUN npx npm-force-resolutions
# RUN npm install
#
# # start app
CMD ./run.sh
