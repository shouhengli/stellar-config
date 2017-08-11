const config = require('./config-store.json');
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
      .on('reconnecting', (delay, attempt) => {
        console.log(`Reconnecting to Redis: attempt=${attempt}, delay=${delay}.`);
      })
      .on('error', (error) => {
        console.log(`Redis error caught by the global error handler: ${error}`);
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

function swallow() {}

function logRedisErrorAndThrow(error) {
  console.log(`Redis error caught by the failure handler: ${error}`);
  throw error;
}

function resolveName(namespace, name) {
  return `${namespace}:${name}`;
}

function getDef(namespace, name) {
  return connect()
    .getAsync(resolveName(namespace, name))
    .catch(logRedisErrorAndThrow);
}

function setDef(namespace, name, content, defSetKey) {
  const defKey = resolveName(namespace, name);

  return connect()
    .multi()
    .set(defKey, content)
    .sadd(defSetKey, defKey)
    .execAsync()
    .then(swallow, logRedisErrorAndThrow);
}

/**
 * Represents a nonexistent key error in Redis.
 */
class NonexistentKeyError extends Error {
  constructor(key) {
    super(`Failed to delete nonexistent definition with key "${key}".`);
    this.key = key;
  }
}

function delDef(namespace, name, defSetKey) {
  const defKey = resolveName(namespace, name);

  return connect()
    .multi()
    .srem(defSetKey, defKey)
    .del(defKey)
    .execAsync()
    .then(
      ([defSetMemberDeleted, defKeyDeleted]) => {
        if (defSetMemberDeleted === 0 || defKeyDeleted === 0) {
          throw new NonexistentKeyError(defKey);
        }
      },
      logRedisErrorAndThrow
    );
}

function listDefNames(defSetKey) {
  return connect()
    .smembersAsync(defSetKey)
    .catch(logRedisErrorAndThrow);
}

/**
 * Retrieves a source definition.
 * @param {string} name
 * @return {Promise<string>} Will be resolved with the definition content if the requeted operation
 *                           is successful.
 */
function getSourceDef(name) {
  return getDef(config.redis.namespaces.source, name);
}

/**
 * Sets a source definition.
 * @param {string} name
 * @param {string} content
 * @return {Promise} Will be resolved if the requested operation is successful.
 */
function setSourceDef(name, content) {
  return setDef(config.redis.namespaces.source, name, content, config.redis.keys.sources);
}

/**
 * Deletes a source definition.
 * @param {string} name
 * @return {Promise} Will be resolved if the requested operation is successful. Can be rejected with
 *                   a {@link NonexistentKeyError} object.
 */
function delSourceDef(name) {
  return delDef(config.redis.namespaces.source, name, config.redis.keys.sources);
}

/**
 * Lists source definition names.
 * @return {Promise<string[]>} Will be resolved with an array of definition names if the requested
 *                             operation is successful.
 */
function listSourceDefNames() {
  return listDefNames(config.redis.keys.sources);
}

/**
 * Retrieves a mapping definition.
 * @param {string} name
 * @return {Promise<string>} Will be resolved with the definition content if the requeted operation
 *                           is successful.
 */
function getMappingDef(name) {
  return getDef(config.redis.namespaces.mapping, name);
}

/**
 * Sets a mapping definition.
 * @param {string} name
 * @param {string} content
 * @return {Promise} Will be resolved if the requested operation is successful.
 */
function setMappingDef(name, content) {
  return setDef(config.redis.namespaces.mapping, name, content, config.redis.keys.mappings);
}

/**
 * Deletes a mapping definition.
 * @param {string} name
 * @return {Promise} Will be resolved if the requested operation is successful. Can be rejected with
 *                   a {@link NonexistentKeyError} object.
 */
function delMappingDef(name) {
  return delDef(config.redis.namespaces.mapping, name, config.redis.keys.mappings);
}

/**
 * Lists mapping definition names.
 * @return {Promise<string[]>} Will be resolved with an array of definition names if the requested
 *                             operation is successful.
 */
function listMappingDefNames() {
  return listDefNames(config.redis.keys.mappings);
}

/**
 * Retrieves a graph schema definition.
 * @param {string} name
 * @return {Promise<string>} Will be resolved with the definition content if the requeted operation
 *                           is successful.
 */
function getGraphSchemaDef(name) {
  return getDef(config.redis.namespaces.graphSchema, name);
}

/**
 * Sets a graph schema definition.
 * @param {string} name
 * @param {string} content
 * @return {Promise} Will be resolved if the requested operation is successful.
 */
function setGraphSchemaDef(name, content) {
  return setDef(config.redis.namespaces.graphSchema, name, content, config.redis.keys.graphSchemas);
}

/**
 * Deletes a graph schema definition.
 * @param {string} name
 * @return {Promise} Will be resolved if the requested operation is successful. Can be rejected with
 *                   a {@link NonexistentKeyError} object.
 */
function delGraphSchemaDef(name) {
  return delDef(config.redis.namespaces.graphSchema, name, config.redis.keys.graphSchemas);
}

/**
 * Lists graph schema definition names.
 * @return {Promise<string[]>} Will be resolved with an array of definition names if the requested
 *                             operation is successful.
 */
function listGraphSchemaDefNames() {
  return listDefNames(config.redis.keys.graphSchemas);
}

module.exports = {
  getSourceDef,
  setSourceDef,
  delSourceDef,
  listSourceDefNames,
  getMappingDef,
  setMappingDef,
  delMappingDef,
  listMappingDefNames,
  getGraphSchemaDef,
  setGraphSchemaDef,
  delGraphSchemaDef,
  listGraphSchemaDefNames,
  connect,
  disconnect,
  NonexistentKeyError,
};
