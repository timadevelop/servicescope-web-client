#!/bin/bash

echo $ENV env;

npm install

if [ "$ENV" = "production" ]; then
    ng serve --host 0.0.0.0
else
    ng serve --host 0.0.0.0
fi
