#!/bin/bash

version=`cat app/package.json  | grep "version" | cut -d'"' -f4`

docker build -t admin-ui:$version .
