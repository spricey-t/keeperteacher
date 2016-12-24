#!/bin/bash

sed s@{{SERVER_PORT}}@$SERVER_PORT@g config/production.json | \
sed s@{{LEGACY_ENDPOINT}}@$LEGACY_ENDPOINT@g | \
sed s@{{LEGACY_EMAIL}}@$LEGACY_EMAIL@g | \
sed s@{{LEGACY_PASSWORD}}@$LEGACY_PASSWORD@g | \
sed s@{{DB_HOST}}@$DB_HOST@g > config/default.json
node server
