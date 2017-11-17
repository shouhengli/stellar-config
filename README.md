# SEAWEED

[![Build Status](https://travis-ci.org/data61/stellar-config.svg?branch=dev)](https://travis-ci.org/data61/stellar-config)


### Pre-requisite
1. Install and run [Redis](https://redis.io/).
On Ubuntu, can install using `sudo apt-get install redis-server`
2. Run Ingestion server. Grab the jar file from 
```
smb://OSM-19-CDC.it.csiro.au/OSM_CBR_D61_SERENE_work/Users/amm00b/Shark/serene-shark-0.0.1-SNAPSHOT-standalone.jar
```
Add some sample CSV files to the same folder, run it with `java -cp serene-shark-0.0.1-SNAPSHOT-standalone.jar serene_shark.rest`

### Install
1. Install [NodeJs](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/en/) if you haven't
2. Install dependencies
```
yarn
```

### Build
Build dist files
```
yarn build
```

### Run
Run server
```
node dist/server.js
```
Now you can access config UI from http://localhost:6161
