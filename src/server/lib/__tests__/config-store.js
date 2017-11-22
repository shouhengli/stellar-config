import fs from 'fs';
import path from 'path';
import P from 'bluebird';

describe('config store module', () => {
  let mockRedisClient, redis;
  const mockConfig = {
    redis: {
      rootNamespace: 'config',
      namespaceSeparator: ':',
      configTypes: ['ingestion profile', 'other profile']
    }
  };

  beforeEach(() => {
    mockRedisClient = {
      on: jest.fn(function() {
        return this;
      }),
      quit: jest.fn()
    };
    redis = jest.mock('redis', () => {
      redis = require.requireActual('redis');
      redis.createClient = jest.fn().mockReturnValue(mockRedisClient);
      return redis;
    });
    jest.mock('../util', () => ({
      loadYamlSync: jest.fn().mockReturnValue(mockConfig)
    }));
    jest.spyOn(console, 'log');
  });

  afterEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  describe('when imported', () => {
    it('connects to Redis server', () => {
      require('../config-store');
      expect(redis.createClient).toHaveBeenCalledTimes(1);
    });
  });

  describe('redis connection', () => {
    it('prints log message when connection is established', () => {
      mockRedisClient.on = jest.fn(function(event, callback) {
        if (event === 'connect') callback();
        return this;
      });
      require('../config-store');
      expect(console.log).toHaveBeenCalledWith(
        'Connection to Redis has been established'
      );
    });
    it('prints log message when connection is reconnecting', () => {
      mockRedisClient.on = jest.fn(function(event, callback) {
        if (event === 'reconnecting') callback({ attempt: 5, delay: 10 });
        return this;
      });
      require('../config-store');
      expect(console.log).toHaveBeenCalledWith(
        'Reconnecting to Redis: attempt=5, delay=10.'
      );
    });
    it('prints log message when connection has errors', () => {
      mockRedisClient.on = jest.fn(function(event, callback) {
        if (event === 'error') callback('mockError');
        return this;
      });
      require('../config-store');
      expect(console.log).toHaveBeenCalledWith(
        'Redis error is caught by the global error handler. mockError'
      );
    });
  });

  describe('#disconnect', () => {
    it('quits redis connection', () => {
      require('../config-store').disconnect();
      expect(mockRedisClient.quit).toHaveBeenCalledTimes(1);
    });

    it('do nothing when already disconnected', () => {
      const store = require('../config-store');
      store.disconnect();
      store.disconnect();
      expect(mockRedisClient.quit).toHaveBeenCalledTimes(1);
    });
  });

  describe('#connect', () => {
    it('connects to Redis server', () => {
      const store = require('../config-store');
      store.disconnect();
      store.connect();
      expect(redis.createClient).toHaveBeenCalledTimes(2);
    });
  });

  describe('#getConfig', () => {
    it('returns configuration definition', async () => {
      mockRedisClient.getAsync = jest.fn(
        key => key === 'config:type:name' && P.resolve('mockContent')
      );
      expect(
        await require('../config-store').getConfig('type', 'name')
      ).toEqual('mockContent');
    });

    it('logs error when request failed', done => {
      mockRedisClient.getAsync = jest
        .fn()
        .mockReturnValue(P.reject('mockError'));

      require('../config-store')
        .getConfig('type', 'name')
        .catch(e => {
          expect(e).toEqual('mockError');
          expect(console.log).toHaveBeenCalledWith(
            'Redis error is caught by the failure handler. mockError'
          );
          done();
        });
    });

    it('throws error when config content is nil', done => {
      mockRedisClient.getAsync = jest.fn(
        key => key === 'config:type:name' && P.resolve(null)
      );
      require('../config-store')
        .getConfig('type', 'name')
        .catch(e => {
          expect(e instanceof Error).toBeTruthy();
          expect(e.message).toEqual(
            'Configuration key "config:type:name" does not exist.'
          );
          done();
        });
    });

    describe('when redis connection is dropped', () => {
      it('tries to reconnect', async () => {
        mockRedisClient.getAsync = jest.fn(
          key => key === 'config:type:name' && P.resolve('mockContent')
        );
        const { disconnect, getConfig } = require('../config-store');
        disconnect();
        await getConfig('type', 'name');
        expect(redis.createClient).toHaveBeenCalledTimes(2);
      });
    });
  });

  describe('#defineConfig', () => {
    beforeEach(() => {
      Object.assign(mockRedisClient, {
        multi: jest.fn().mockReturnThis(),
        set: jest.fn().mockReturnThis(),
        sadd: jest.fn().mockReturnThis(),
        execAsync: jest.fn().mockReturnValue(P.resolve('mockResponse'))
      });
    });

    it('sets the key-value pair', async () => {
      await require('../config-store').defineConfig('type', 'name', 'content');
      expect(mockRedisClient.set).toHaveBeenCalledWith(
        'config:type:name',
        'content'
      );
    });

    it('adds the config name to set', async () => {
      await require('../config-store').defineConfig('type', 'name', 'content');
      expect(mockRedisClient.sadd).toHaveBeenCalledWith('config:types', 'name');
    });

    it('batches commands and exec them all at once asynchronously', async () => {
      await require('../config-store').defineConfig('type', 'name', 'content');
      expect(mockRedisClient.multi).toHaveBeenCalled();
      expect(mockRedisClient.execAsync).toHaveBeenCalled();
    });

    it('logs error when request failed', done => {
      mockRedisClient.execAsync = jest
        .fn()
        .mockReturnValue(P.reject('mockError'));

      require('../config-store')
        .defineConfig('type', 'name', 'content')
        .catch(e => {
          expect(e).toEqual('mockError');
          expect(console.log).toHaveBeenCalledWith(
            'Redis error is caught by the failure handler. mockError'
          );
          done();
        });
    });

    it('returns response', async () => {
      const r = await require('../config-store').defineConfig(
        'type',
        'name',
        'content'
      );
      expect(r).toEqual('mockResponse');
    });

    describe('when redis connection is dropped', () => {
      it('tries to reconnect', async () => {
        const { disconnect, defineConfig } = require('../config-store');
        disconnect();
        await defineConfig('type', 'name', 'content');
        expect(redis.createClient).toHaveBeenCalledTimes(2);
      });
    });
  });

  describe('#deleteConfig', () => {
    let mockResponse;

    beforeEach(() => {
      mockResponse = [1, 1];
      Object.assign(mockRedisClient, {
        multi: jest.fn().mockReturnThis(),
        srem: jest.fn().mockReturnThis(),
        del: jest.fn().mockReturnThis(),
        execAsync: jest.fn().mockReturnValue(P.resolve(mockResponse))
      });
    });

    it('removes config name from set', async () => {
      await require('../config-store').deleteConfig('type', 'name');
      expect(mockRedisClient.srem).toHaveBeenCalledWith('config:types', 'name');
    });

    it('removes config key', async () => {
      await require('../config-store').deleteConfig('type', 'name');
      expect(mockRedisClient.del).toHaveBeenCalledWith('config:type:name');
    });

    it('batches commands and exec them all at once asynchronously', async () => {
      await require('../config-store').deleteConfig('type', 'name');
      expect(mockRedisClient.multi).toHaveBeenCalled();
      expect(mockRedisClient.execAsync).toHaveBeenCalled();
    });

    it('logs error when request failed', done => {
      mockRedisClient.execAsync = jest
        .fn()
        .mockReturnValue(P.reject('mockError'));

      require('../config-store')
        .deleteConfig('type', 'name')
        .catch(e => {
          expect(e).toEqual('mockError');
          expect(console.log).toHaveBeenCalledWith(
            'Redis error is caught by the failure handler. mockError'
          );
          done();
        });
    });

    it('returns response', async () => {
      const r = await require('../config-store').deleteConfig('type', 'name');
      expect(r).toEqual(mockResponse);
    });

    describe('when redis connection is dropped', () => {
      it('tries to reconnect', async () => {
        const { disconnect, deleteConfig } = require('../config-store');
        disconnect();
        await require('../config-store').deleteConfig('type', 'name');
        expect(redis.createClient).toHaveBeenCalledTimes(2);
      });
    });

    it('throws error when config key not removed from set', done => {
      mockResponse[0] = 0;
      require('../config-store')
        .deleteConfig('type', 'name')
        .catch(e => {
          expect(e instanceof Error).toBeTruthy();
          expect(e.message).toEqual(
            'Configuration key "config:type:name" does not exist.'
          );
          done();
        });
    });

    it('throws error when config key-value pair not removed', done => {
      mockResponse[1] = 0;
      require('../config-store')
        .deleteConfig('type', 'name')
        .catch(e => {
          expect(e instanceof Error).toBeTruthy();
          expect(e.message).toEqual(
            'Configuration key "config:type:name" does not exist.'
          );
          done();
        });
    });
  });

  describe('#listConfigs', () => {
    const mockConfigs = ['c1', 'c2'];
    beforeEach(() => {
      Object.assign(mockRedisClient, {
        smembersAsync: jest.fn().mockReturnValue(P.resolve(mockConfigs))
      });
    });

    it('returns available configs in set', async () => {
      let configs = await require('../config-store').listConfigs('type');
      expect(mockRedisClient.smembersAsync).toHaveBeenCalledWith(
        'config:types'
      );
      expect(configs).toEqual(mockConfigs);
    });

    it('logs error when request failed', done => {
      mockRedisClient.smembersAsync = jest
        .fn()
        .mockReturnValue(P.reject('mockError'));

      require('../config-store')
        .listConfigs('type')
        .catch(e => {
          expect(e).toEqual('mockError');
          expect(console.log).toHaveBeenCalledWith(
            'Redis error is caught by the failure handler. mockError'
          );
          done();
        });
    });

    describe('when redis connection is dropped', () => {
      it('tries to reconnect', async () => {
        const { disconnect, listConfigs } = require('../config-store');
        disconnect();
        await listConfigs('type');
        expect(redis.createClient).toHaveBeenCalledTimes(2);
      });
    });
  });

  describe('#listConfigTypes', () => {
    it('returns a list of config types', async () => {
      expect(await require('../config-store').listConfigTypes()).toEqual([
        'ingestion profile',
        'other profile'
      ]);
    });

    it('returns null if no config types', async () => {
      mockConfig.redis.configTypes = null;
      expect(await require('../config-store').listConfigTypes()).toBeNull();
    });
  });

  describe('integration', () => {
    let util, store, config;
    const configType = 'source',
      configNames = ['people', 'places', 'vehicles'],
      configs = configNames.map(name => {
        const filePath = path.join(
          __dirname,
          `data/${configType}-${name}.yaml`
        );
        return {
          name,
          content: readFileSync(filePath)
        };
      });

    function readFileSync(filePath) {
      return fs.readFileSync(filePath, { encoding: 'utf8' });
    }

    beforeEach(() => {
      jest.unmock('redis');
      jest.unmock('../util');
      util = require('../util');
      store = require('../config-store');
      config = util.loadYamlSync(__dirname, '../config-store.yaml');
      P.all(
        configs.map(config =>
          store.defineConfig(configType, config.name, config.content)
        )
      );
    });

    afterEach(() => {
      P.all(configs.map(config => store.deleteConfig(configType, config.name)))
        .catch(store.NonexistentKeyError, error => {
          console.log(`Key ${error.key} is expected to be nonexistent.`);
        })
        .finally(() => store.disconnect());
    });

    it('can get configuration definition', () =>
      P.all(
        configs.map(config => store.getConfig(configType, config.name))
      ).then(contents => {
        const expected = configs.map(config => config.content);
        expect(contents).toEqual(expected);
      }));

    it('can list configuration names', () =>
      store.listConfigs(configType).then(names => {
        const expected = configNames.slice().sort();
        expect(names.sort()).toEqual(expected);
      }));

    it('can list configuration types', () =>
      store.listConfigTypes().then(types => {
        const expected = config.redis.configTypes.slice().sort();
        expect(types.sort()).toEqual(expected);
      }));
  });
});
