#!/bin/sh

ENV_FILE_TEMPLATE_PATH='./src/environments/environment.template'

DESTINATION_FILE='./src/environments/environment.ts'
DESTINATION_FILE_PROD='./src/environments/environment.prod.ts'

echo "env: $(env)"
echo "Configuring environment using template ($ENV_FILE_TEMPLATE_PATH): "
cat $ENV_FILE_TEMPLATE_PATH

envsubst "`env | awk -F = '{printf \" \\\\$%s\", $1}'`" < $ENV_FILE_TEMPLATE_PATH > $DESTINATION_FILE
envsubst "`env | awk -F = '{printf \" \\\\$%s\", $1}'`" < $ENV_FILE_TEMPLATE_PATH > $DESTINATION_FILE_PROD

echo "Configured environment: "

cat $DESTINATION_FILE
