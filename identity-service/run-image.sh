#!/bin/bash

docker run -d \
-p 10865:8080 \
-e DB_HOST=mongodb://192.168.0.14/keeperteacher \
--name identityservice \
identityservice:0.0.1
