#!/bin/bash

if [[ -n ${DB_HOST+x} ]]
then
	sed s@{{SERVER_PORT}}@$SERVER_PORT@g config/production.json | \
	sed s@{{DB_HOST}}@$DB_HOST@g > config/default.json
	node server
else
	echo 'environment variable: $DB_HOST missing'
	exit 1
fi
