#!/bin/bash

sed s@{{SERVER_PORT}}@$SERVER_PORT@g config/production.json > config/default.json
node server
