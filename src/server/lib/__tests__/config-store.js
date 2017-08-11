const store = require('../config-store');
const config = require('../config-store.json');
const fs = require('fs');
const path = require('path');
const P = require('bluebird');

function readFileSync(filePath) {
  return fs.readFileSync(filePath, {encoding: 'utf8'});
}

const sourceNames = ['people', 'places', 'vehicles'];
const sourceKeys = sourceNames.map((name) =>
  `${config.redis.namespaces.source}:${name}`
);

const sources = sourceNames.map((name) => {
  const filePath = path.join(__dirname, `source-${name}.yaml`);

  return {
    name,
    content: readFileSync(filePath),
  };
});

describe('store', () => {
  beforeEach(() =>
    P.all(
      sources.map((source) => store.setSourceDef(source.name, source.content))
    )
  );

  test('can get source definition content', () =>
    P.all(sources.map((source) => store.getSourceDef(source.name)))
     .then((contents) => {
       const expected = sources.map((source) => source.content);
       expect(contents).toEqual(expected);
     })
  );

  test('can list source definition names', () =>
    store.listSourceDefNames()
         .then((names) => {
           const expected = sourceKeys.slice().sort();
           names.sort();
           expect(names).toEqual(expected);
         })
  );

  afterEach(() => {
    P.all(sources.map((source) => store.delSourceDef(source.name)))
     .catch(
       store.NonexistentKeyError,
       (error) => {
         console.log(`Key ${error.key} is expected to be nonexistent.`);
       }
     )
     .finally(() => store.disconnect());
  });
});
