const R = require('ramda');

const util = require('./util');
const config = util.loadYamlSync(__dirname, 'config-store.yaml');

const P = require('bluebird');
const redis = require('redis');
P.promisifyAll(redis.RedisClient.prototype);
P.promisifyAll(redis.Multi.prototype);

let redisClient = null;

/**
 * Connects to Redis server.
 * @return {RedisClient} Only for internal and testing use.
 */
function connect() {
  // TODO: May need to redesign the connection logic to avoid too much queueing when connection
  // status is bad.

  if (redisClient === null) {
    redisClient = redis.createClient();

    redisClient
      .on('connect', () => {
        console.log('Connection to Redis has been established');
      })
      .on('reconnecting', (info) => {
        console.log(`Reconnecting to Redis: attempt=${info.attempt}, delay=${info.delay}.`);
      })
      .on('error', (error) => {
        console.log(`Redis error is caught by the global error handler. ${error}`);
      });
  }

  return redisClient;
}

/**
 * Disconnects from Redis server.
 */
function disconnect() {
  if (redisClient !== null) {
    redisClient.quit();
    redisClient = null;
  }
}

const logRedisError = R.tap((error) =>
  console.log(`Redis error is caught by the failure handler. ${error}`)
);

function resolveRedisKey(namespace, key) {
  return [config.redis.rootNamespace, namespace, key].join(config.redis.namespaceSeparator);
}

function resolveRedisSetKey(namespace) {
  return `${config.redis.rootNamespace}${config.redis.namespaceSeparator}${namespace}s`;
}

/**
 * Represents a nonexistent key error in Redis.
 */
class NonexistentKeyError extends Error {
  constructor(key) {
    super(`Configuration key "${key}" does not exist.`);
    this.key = key;
  }
}

/**
 * Retrieves a configuration definition.
 * @param {string} type - The type of the configuration.
 * @param {string} name - The name of the configuration.
 * @return {Promise<string>} If resolved, will give the definition of the configuration.
 */
function getConfig(type, name) {
  const key = resolveRedisKey(type, name);

  return connect()
    .getAsync(key)
    .tapCatch(logRedisError)
    .tap((content) => {
      if (R.isNil(content)) {
        throw new NonexistentKeyError(key);
      }
    });
}

/**
 * Defines a configuration.
 * @param {string} type - The type of the configuration.
 * @param {string} name - The name of the configuration.
 * @param {string} content - The definition of the configuration.
 * @return {Promise}
 */
function defineConfig(type, name, content) {
  return connect()
    .multi()
    .set(resolveRedisKey(type, name), content)
    .sadd(resolveRedisSetKey(type), name)
    .execAsync()
    .tapCatch(logRedisError)
    .then(R.always());
}

/**
 * Deletes a configuration.
 * @param {string} type - The type of the configuration.
 * @param {string} name - The name of the configuration.
 * @return {Promise}
 */
function deleteConfig(type, name) {
  const key = resolveRedisKey(type, name);
  const setKey = resolveRedisSetKey(type);

  return connect()
    .multi()
    .srem(setKey, name)
    .del(key)
    .execAsync()
    .tapCatch(logRedisError)
    .then(
      ([defSetMemberDeleted, defKeyDeleted]) => {
        if (defSetMemberDeleted === 0 || defKeyDeleted === 0) {
          throw new NonexistentKeyError(key);
        }
      }
    );
}

/**
 * Lists names of configuration of a specific type.
 * @param {string} type - The type of the configurations.
 * @return {Promise<string[]>} If resolved, will give an array of configuration names.
 */
function listConfigs(type) {
  return connect()
    .smembersAsync(resolveRedisSetKey(type))
    .tapCatch(logRedisError);
}

/**
 * Lists all configuration types.
 * @return {Promise<string[]>} If resolved, will give an array of configuration types.
 */
function listConfigTypes() {
  return P.resolve(config.redis.configTypes.slice());
}

module.exports = {
  getConfig,
  defineConfig,
  deleteConfig,
  listConfigs,
  listConfigTypes,
  connect,
  disconnect,
  NonexistentKeyError,
  resolveRedisKey,
  resolveRedisSetKey,
};
