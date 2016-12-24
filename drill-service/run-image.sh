#!/bin/bash

version=`cat app/package.json  | grep "version" | cut -d'"' -f4`

docker run -d \
-p 10866:8081 \
-e SERVER_PORT=8081 \
-e DB_HOST=mongodb://192.168.0.14/keeperteacher \
-e LEGACY_ENDPOINT=https://apps.keeperteacher.com:10865 \
-e LEGACY_EMAIL=email \
-e LEGACY_PASSWORD=password \
--name drillservice \
drillservice:$version
