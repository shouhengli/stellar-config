const config = require('./config-store.json');
const P = require('bluebird');

const redis = require('redis');
P.promisifyAll(redis.RedisClient.prototype);
P.promisifyAll(redis.Multi.prototype);

const redisClient = redis.createClient();

redisClient.on('error', (error) => {
  console.log(`Redis error caught by the global error handler: ${error}`);
});

function logRedisErrorAndThrow(error) {
  console.log(`Redis error caught by the failure handler: ${error}`);
  throw error;
}

function swallow() {}

function setDef(namespace, name, content, defSetKey) {
  const defKey = `${namespace}:${name}`;
  return redisClient
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
  }
}

function delDef(namespace, name, defSetKey) {
  const defKey = `${namespace}:${name}`;

  return redisClient
    .multi()
    .srem(defSetKey, defKey)
    .del(defKey)
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
  return redisClient
    .smembersAsync(defSetKey)
    .catch(logRedisErrorAndThrow);
}

/**
 * Set a source definition.
 * @param {string} name
 * @param {string} content
 * @return {Promise} Will be resolved if the requested operation is successful.
 */
function setSourceDef(name, content) {
  return setDef(config.namespaces.source, name, content, config.keys.sources);
}

/**
 * Delete a source definition.
 * @param {string} name
 * @return {Promise} Will be resolved if the requested operation is successful. Can be rejected with
 *                   a {@link NonexistentKeyError} object.
 */
function delSourceDef(name) {
  return delDef(config.namespaces.source, name, config.keys.sources);
}

/**
 * Lists source definition names.
 * @return {Promise<string[]>} Will be resolved with an array of definition names if the requested
 *                             operation is successful.
 */
function listSourceDefNames() {
  return listDefNames(config.keys.sources);
}

/**
 * Set a mapping definition.
 * @param {string} name
 * @param {string} content
 * @return {Promise} Will be resolved if the requested operation is successful.
 */
function setMappingDef(name, content) {
  return setDef(config.namespaces.mapping, name, content, config.keys.mappings);
}

/**
 * Delete a mapping definition.
 * @param {string} name
 * @return {Promise} Will be resolved if the requested operation is successful. Can be rejected with
 *                   a {@link NonexistentKeyError} object.
 */
function delMappingDef(name) {
  return delDef(config.namespaces.mapping, name, config.keys.mappings);
}

/**
 * Lists mapping definition names.
 * @return {Promise<string[]>} Will be resolved with an array of definition names if the requested
 *                             operation is successful.
 */
function listMappingDefNames() {
  return listDefNames(config.keys.mappings);
}

/**
 * Set a graph schema definition.
 * @param {string} name
 * @param {string} content
 * @return {Promise} Will be resolved if the requested operation is successful.
 */
function setGraphSchemaDef(name, content) {
  return setDef(config.namespaces.graphSchema, name, content, config.keys.graphSchemas);
}

/**
 * Delete a graph schema definition.
 * @param {string} name
 * @return {Promise} Will be resolved if the requested operation is successful. Can be rejected with
 *                   a {@link NonexistentKeyError} object.
 */
function delGraphSchemaDef(name) {
  return delDef(config.namespaces.graphSchema, name, config.keys.graphSchemas);
}

/**
 * Lists graph schema definition names.
 * @return {Promise<string[]>} Will be resolved with an array of definition names if the requested
 *                             operation is successful.
 */
function listGraphSchemaDefNames() {
  return listDefNames(config.keys.graphSchemas);
}

module.exports = {
  setSourceDef,
  delSourceDef,
  listSourceDefNames,
  setMappingDef,
  delMappingDef,
  listMappingDefNames,
  setGraphSchemaDef,
  delGraphSchemaDef,
  listGraphSchemaDefNames,
};
