#!/bin/sh

ENV_FILE_TEMPLATE_PATH='./src/environments/environment.template'

if [ "$ENV" = "production" ]; then
  DESTINATION_FILE='./src/environments/environment.prod.ts'
else
  DESTINATION_FILE='./src/environments/environment.ts'
fi

echo "env: $(env)"
echo "Configuring environment using template ($ENV_FILE_TEMPLATE_PATH): "
cat $ENV_FILE_TEMPLATE_PATH

envsubst "`env | awk -F = '{printf \" \\\\$%s\", $1}'`" < $ENV_FILE_TEMPLATE_PATH > $DESTINATION_FILE

echo "Configured environment ($DESTINATION_FILE): "

cat $DESTINATION_FILE
