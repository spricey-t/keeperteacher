#!/bin/bash

version=`cat app/package.json  | grep "version" | cut -d'"' -f4`

npm install

docker build -t videoservice:$version .

