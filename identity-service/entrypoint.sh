#!/bin/bash

if [[ -n ${DB_HOST+x} ]]
then
	sed -i s@{{DB_HOST}}@$DB_HOST@g config/default.json
	node server
else
	echo 'environment variable: $DB_HOST missing'
	exit 1
fi
