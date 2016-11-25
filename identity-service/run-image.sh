#!/bin/bash

docker run -d \
-p 10865:8080 \
-e SERVER_PORT=8080 \
-e DB_HOST=mongodb://192.168.0.14/keeperteacher \
-e JWT_SECRET=supersecretjwtthing \
--name identityservice \
identityservice:0.1.5
