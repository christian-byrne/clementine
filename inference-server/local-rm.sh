#!/bin/bash


# --------------------------------- Constants -------------------------------- #

SCRIPT_PATH=$(realpath $0)
SCRIPT_DIR=$(dirname $SCRIPT_PATH)
. $SCRIPT_DIR/constants.sh

# ----------------------------------- Main ----------------------------------- #

sudo docker stop $CONTAINER_NAME
sudo docker rm $CONTAINER_NAME

# Optionally, prune all stopped containers to clean up disk space
# sudo docker container prune -f