#!/bin/bash

docker run -d \
-p 10864:8082 \
-e SERVER_PORT=8082 \
-e IDENTITY_SERVICE_ENDPOINT=http://192.168.0.14:10865 \
-e DRILL_SERVICE_ENDPOINT=http://192.168.0.14:10866 \
--name gateway \
gateway:0.1.0
