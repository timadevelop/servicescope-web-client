#!/bin/bash

echo $ENV env;

npm install

if [ "$ENV" = "production" ]; then
    ng serve --host 0.0.0.0 --disable-host-check --disableHostCheck
else
    ng serve --host 0.0.0.0 --disable-host-check --disableHostCheck --base-href=/saas_web/ --public-host=$SAAS_WEB_PUBLIC_HOST
fi
