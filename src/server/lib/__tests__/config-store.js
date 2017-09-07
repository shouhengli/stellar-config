const store = require('../config-store');
const fs = require('fs');
const path = require('path');
const P = require('bluebird');

const util = require('../util');
const config = util.loadYamlSync(__dirname, '../config-store.yaml');

function readFileSync(filePath) {
  return fs.readFileSync(filePath, {encoding: 'utf8'});
}

describe('store', () => {
  const configType = 'source';

  const configNames = ['people', 'places', 'vehicles'];

  const configs = configNames.map((name) => {
    const filePath = path.join(__dirname, `${configType}-${name}.yaml`);

    return {
      name,
      content: readFileSync(filePath),
    };
  });

  beforeEach(() =>
    P.all(
      configs.map((config) => store.defineConfig(configType, config.name, config.content))
    )
  );

  test('can get configuration definition', () =>
    P.all(configs.map((config) => store.getConfig(configType, config.name)))
     .then((contents) => {
       const expected = configs.map((config) => config.content);
       expect(contents).toEqual(expected);
     })
  );

  test('can list configuration names', () =>
    store.listConfigs(configType)
         .then((names) => {
           const expected = configNames.slice().sort();
           expect(names.sort()).toEqual(expected);
         })
  );

  test('can list configuration types', () =>
    store.listConfigTypes()
         .then((types) => {
           const expected = config.redis.configTypes.slice().sort();
           expect(types.sort()).toEqual(expected);
         })
  );

  afterEach(() => {
    P.all(configs.map((config) => store.deleteConfig(configType, config.name)))
     .catch(
       store.NonexistentKeyError,
       (error) => {
         console.log(`Key ${error.key} is expected to be nonexistent.`);
       }
     )
     .finally(() => store.disconnect());
  });
});
