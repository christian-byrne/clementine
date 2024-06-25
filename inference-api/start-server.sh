
if [ -z "$PORT" ]; then
    echo "PORT is not set. Defaulting to 5000"
    PORT=5000
fi

docker run -d -p $PORT:5000 --build-arg PORT=$PORT --name inference-api inference-api 