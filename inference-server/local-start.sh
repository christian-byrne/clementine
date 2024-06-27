#!/bin/bash


# --------------------------------- Constants -------------------------------- #

SCRIPT_PATH=$(realpath $0)
SCRIPT_DIR=$(dirname $SCRIPT_PATH)
. $SCRIPT_DIR/constants.sh

# ----------------------------------- Main ----------------------------------- #

sudo docker run -d --name $CONTAINER_NAME --gpus all --env-file ./$ENV_FILE_RELPATH -p $SERVICEPORTAL_PORT_HOST:$SERVICEPORTAL_PORT_HOST $DOCKER_IMAGE

if [ $DEV = true ]; then
    if command -v xdg-open &> /dev/null
    then
        xdg-open http://$WEB_URL
    elif command -v open &> /dev/null
    then
        open http://$WEB_URL
    elif command -v google-chrome &> /dev/null
    then
        google-chrome http://$WEB_URL
    elif command -v firefox &> /dev/null
    then
        firefox http://$WEB_URL
    else
        echo "Please open a browser and navigate to http://$WEB_URL"
    fi 
fi