FROM node:latest

# set working directory

RUN mkdir /usr/src/app

COPY . /usr/src/app

WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

ARG ENV="development"

ARG PORT=4200

EXPOSE ${PORT}

RUN npm install

# start app
CMD ./run.sh
