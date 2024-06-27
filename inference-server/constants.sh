#!/bin/bash

SCRIPT_PATH=$(realpath $0)
SCRIPT_DIR=$(dirname $SCRIPT_PATH)

# ---------------------------------- docker ---------------------------------- #

CONTAINER_NAME="inference-server"
CONTAINER_IP=$(sudo docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $CONTAINER_NAME)
# DOCKER_IMAGE="docker pull ghcr.io/ai-dock/comfyui:cuda-11.8.0-runtime-22.04"
DOCKER_IMAGE="ghcr.io/ai-dock/comfyui:cuda-12.1.0-runtime-22.04-719fb2c"


# ----------------------------------- .env ----------------------------------- #

ENV_FILE_RELPATH="env/s.env"

SERVICEPORTAL_PORT_HOST=1111
SSH_PORT_HOST=22
USER_NAME=user
USER_PASSWORD=p
WEB_ENABLE_AUTH=false
WEB_USER=user
WEB_PASSWORD=p
WORKSPACE=/workspace/

# set -a
# source $SCRIPT_DIR/$ENV_FILE_RELPATH
# set +a


# ------------------------------------ dev ----------------------------------- #

DEV=true
WEB_URL=$CONTAINER_IP:$SERVICEPORTAL_PORT_HOST/processes
