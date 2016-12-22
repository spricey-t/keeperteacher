#!/bin/bash

version=`cat app/package.json  | grep "version" | cut -d'"' -f4`

docker run -d \
-p 8089:8089 \
-e SERVER_PORT=8089 \
-e UPLOAD_DIR=/upload \
-e S3_BUCKET=keeper-teacher-admin-input \
-e PIPELINE_ID=1450324759499-wnzqzx \
--name videoservice \
videoservice:$version