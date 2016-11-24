#!/bin/bash

docker run -d \
-p 10865:8080 \
--name identityservice \
identityservice:0.0.1
