#!/bin/bash

docker run -d \
-p 10863:8083 \
-e SERVER_PORT=8083 \
--name admin-ui \
admin-ui:0.0.1
