import R from 'ramda';
import P from 'bluebird';
import request from 'superagent';
import { ingestion as config } from '../server.json';

const getBody = R.prop('body');
const root = `http://${config.server}:${config.port}`;

export function getSample(source) {
  return P.fromCallback(callback =>
    request
      .get(`${root}/sampler/do-sample`)
      .accept('json')
      .query({
        file: source,
        samples: 25
      })
      .end(callback)
  ).then(getBody);
}
