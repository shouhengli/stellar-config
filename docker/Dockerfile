FROM node:8.9.4-alpine

ENV BRANCH=SERENE-709

RUN apk add --no-cache --virtual .build-deps curl unzip \
  && curl -Lo src.zip https://github.com/data61/stellar-config/archive/$BRANCH.zip \
  && unzip src.zip \
  && cd stellar-config-$BRANCH \
  && sed -i 's/"host": "localhost"/"host": "redis"/g' ./src/server/server.json \
  && yarn && yarn build \
  && rm -rf ../src.zip \
  && apk del .build-deps

CMD cd "stellar-config-$BRANCH" && yarn start-dist