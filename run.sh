#!/bin/bash

echo $ENV env

npm install

if [ "$ENV" = "production" ]; then
  #ng serve --configuration=production --aot --host 0.0.0.0 --disable-host-check --disableHostCheck --base-href=/saas_web/ --public-host=$SAAS_WEB_PUBLIC_URL
  # Angular use universal for prod
  npm run build:ssr && npm run serve:ssr
else
  ng serve --aot --host 0.0.0.0 --disable-host-check --disableHostCheck --base-href=/saas_web/ --public-host=$SAAS_WEB_PUBLIC_URL
fi
