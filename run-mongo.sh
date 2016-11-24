#!/bin/bash


docker run -d \
-p 27017:27017 \
-v ~/tmp/mdata/:/data/db \
--name mongo \
mongo
