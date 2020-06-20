#!/bin/bash

echo $ENV env

npm install
npx npm-force-resolutions
npm install

bash ./scripts/parse_env.sh

if [ "$ENV" = "production" ]; then
  # Angular use universal for prod
  if [ "$LOCALE" = "bg" ]; then
    npm run build:ssr-bg && npm run serve:ssr
  else
    npm run build:ssr && npm run serve:ssr
  fi
else
  if [ "$LOCALE" = "bg" ]; then
    ng serve --configuration=bg --aot --host 0.0.0.0 --disable-host-check --disableHostCheck --base-href=$WEBCLIENT_BASE_HREF/ --public-host=$WEBCLIENT_PUBLIC_URL
  else
    ng serve --aot --host 0.0.0.0 --disable-host-check --disableHostCheck --base-href=$WEBCLIENT_BASE_HREF/ --public-host=$WEBCLIENT_PUBLIC_URL
  fi
fi
