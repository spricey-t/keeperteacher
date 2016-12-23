#!/bin/bash

sed s@{{SERVER_PORT}}@$SERVER_PORT@g config/production.json | \
sed s@{{IDENTITY_SERVICE_ENDPOINT}}@$IDENTITY_SERVICE_ENDPOINT@g | \
sed s@{{VIDEO_SERVICE_ENDPOINT}}@$VIDEO_SERVICE_ENDPOINT@g | \
sed s@{{DRILL_SERVICE_ENDPOINT}}@$DRILL_SERVICE_ENDPOINT@g > config/default.json
node server
