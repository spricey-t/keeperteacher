#!/bin/bash

version=`cat app/package.json  | grep "version" | cut -d'"' -f4`
workdir=`pwd`
#-v $workdir/upload:/upload \

docker run -d \
-p 10867:8089 \
-e SERVER_PORT=8089 \
-e UPLOAD_DIR=/upload \
-e S3_BUCKET=keeper-teacher-admin-input \
-e PIPELINE_ID=1450324759499-wnzqzx \
--name videoservice \
videoservice:$version

docker exec videoservice mkdir -p /root/.aws
docker cp ~/.aws/credentials videoservice:/root/.aws/credentials