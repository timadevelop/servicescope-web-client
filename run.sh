#!/bin/bash

echo $ENV env

npm install
npx npm-force-resolutions
npm install


bash ./scripts/parse_env.sh

if [ "$ENV" = "production" ]; then
  #ng serve --configuration=production --aot --host 0.0.0.0 --disable-host-check --disableHostCheck --base-href=/saas_web/ --public-host=$WEBCLIENT_PUBLIC_URL
  # Angular use universal for prod
  npm run build:ssr && npm run serve:ssr
else
  ng serve --aot --host 0.0.0.0 --disable-host-check --disableHostCheck --base-href=/saas_web/ --public-host=$WEBCLIENT_PUBLIC_URL
fi
