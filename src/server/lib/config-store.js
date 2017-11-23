import R from 'ramda';
import { loadYamlSync } from './util';
import P from 'bluebird';
import redis from 'redis';

const config = loadYamlSync(__dirname, 'config-store.yaml');

P.promisifyAll(redis.RedisClient.prototype);
P.promisifyAll(redis.Multi.prototype);

let redisClient = null;

const logRedisError = R.tap(error =>
  console.log(`Redis error is caught by the failure handler. ${error}`)
);

const resolveRedisKey = (namespace, key) => {
  return [config.redis.rootNamespace, namespace, key].join(
    config.redis.namespaceSeparator
  );
};

const resolveRedisSetKey = namespace => {
  return [config.redis.rootNamespace, `${namespace}s`].join(
    config.redis.namespaceSeparator
  );
};

/**
 * Represents a nonexistent key error in Redis.
 */
export class NonexistentKeyError extends Error {
  constructor(key) {
    super(`Configuration key "${key}" does not exist.`);
    this.key = key;
  }
}

/**
 * Disconnects from Redis server.
 */
export function disconnect() {
  if (redisClient !== null) {
    redisClient.quit();
    redisClient = null;
  }
}

/**
 * Connects to Redis server.
 * @return {RedisClient} Only for internal and testing use.
 */
export function connect() {
  // TODO: May need to redesign the connection logic to avoid too much queueing when connection
  // status is bad.

  if (redisClient === null) {
    redisClient = redis.createClient();

    redisClient
      .on('connect', () => {
        console.log('Connection to Redis has been established');
      })
      .on('reconnecting', info => {
        console.log(
          `Reconnecting to Redis: attempt=${info.attempt}, delay=${info.delay}.`
        );
      })
      .on('error', error => {
        console.log(
          `Redis error is caught by the global error handler. ${error}`
        );
      });
  }

  return redisClient;
}

/**
 * Retrieves a configuration definition.
 * @param {string} type - The type of the configuration.
 * @param {string} name - The name of the configuration.
 * @return {Promise<string>} If resolved, will give the definition of the configuration.
 */
export function getConfig(type, name) {
  const key = resolveRedisKey(type, name);

  return connect()
    .getAsync(key)
    .tapCatch(logRedisError)
    .tap(content => {
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
export function defineConfig(type, name, content) {
  return connect()
    .multi()
    .set(resolveRedisKey(type, name), content)
    .sadd(resolveRedisSetKey(type), name)
    .execAsync()
    .tapCatch(logRedisError);
}

/**
 * Deletes a configuration.
 * @param {string} type - The type of the configuration.
 * @param {string} name - The name of the configuration.
 * @return {Promise}
 */
export function deleteConfig(type, name) {
  const key = resolveRedisKey(type, name);
  const setKey = resolveRedisSetKey(type);

  return connect()
    .multi()
    .srem(setKey, name)
    .del(key)
    .execAsync()
    .tapCatch(logRedisError)
    .tap(([defSetMemberDeleted, defKeyDeleted]) => {
      if (defSetMemberDeleted === 0 || defKeyDeleted === 0) {
        throw new NonexistentKeyError(key);
      }
    });
}

/**
 * Lists names of configuration of a specific type.
 * @param {string} type - The type of the configurations.
 * @return {Promise<string[]>} If resolved, will give an array of configuration names.
 */
export function listConfigs(type) {
  return connect()
    .smembersAsync(resolveRedisSetKey(type))
    .tapCatch(logRedisError);
}

/**
 * Lists all configuration types.
 * @return {Promise<string[]>} If resolved, will give an array of configuration types.
 */
export function listConfigTypes() {
  return P.resolve(config.redis.configTypes);
}

connect();
