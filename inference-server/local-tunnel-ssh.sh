#!/bin/bash


# --------------------------------- Constants -------------------------------- #

SCRIPT_PATH=$(realpath $0)
SCRIPT_DIR=$(dirname $SCRIPT_PATH)
. $SCRIPT_DIR/constants.sh

# ----------------------------------- Main ----------------------------------- #

if [ "$DEV" = true ]; then
    echo "Container IP: $CONTAINER_IP"
    echo "SSH Port: $SSH_PORT_HOST"
    echo "User: $USER_NAME"
fi

if [ -z "$CONTAINER_IP" ]; then
    echo "Failed to retrieve container IP for $CONTAINER_NAME"
    exit 1
fi

# Establish SSH tunnel to the container
ssh -L $SSH_PORT_HOST:localhost:$SSH_PORT_HOST $USER_NAME@$CONTAINER_IP
