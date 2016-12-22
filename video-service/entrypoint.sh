#!/bin/bash

sed s@{{SERVER_PORT}}@$SERVER_PORT@g config/production.json | \
sed s@{{UPLOAD_DIR}}@$UPLOAD_DIR@g | \
sed s@{{S3_BUCKET}}@$S3_BUCKET@g | \
sed s@{{PIPELINE_ID}}@$PIPELINE_ID@g > config/default.json
node server
