#!/bin/bash

docker run -d \
-p 10866:8081 \
-e SERVER_PORT=8081 \
-e DB_HOST=mongodb://192.168.0.14/keeperteacher \
--name drillservice \
drillservice:0.1.0
