const config = require('./config-store.json');
const P = require('bluebird');

const redis = require('redis');
P.promisifyAll(redis.RedisClient.prototype);
P.promisifyAll(redis.Multi.prototype);

const redisClient = redis.createClient();

const errorHandler = (error) => {
  console.log(`Redis error caught by the global error handler: ${error}`);
};

redisClient.on('error', errorHandler);

class NonexistentKeyError extends Error {
  constructor(key) {
    super(`Failed to delete nonexistent definition with key "${key}".`);
  }
}

const failureHandler = (error) => {
  console.log(`Redis error caught by the failure handler: ${error}`);
  throw error;
};

function setDef(prefix, name, content) {
  return redisClient
    .setAsync(`${prefix}${name}`, content)
    .catch(failureHandler);
}

function delDef(prefix, name) {
  return redisClient
    .del(`${prefix}${name}`)
    .then(
      (deleted) => {
        if (deleted === 0) {
          throw new NonexistentKeyError(`${prefix}${name}`);
        }
      },
      failureHandler
    );
}

/**
 * Set a source definition.
 * @param {string} name
 * @param {string} content
 * @return {Promise} Will be resolved if the requested operation is successful.
 */
function setSourceDef(name, content) {
  return setDef(config.sourceKeyPrefix, name, content);
}

/**
 * Delete a source definition.
 * @param {string} name
 * @return {Promise} Will be resolved if the requested operation is successful. Can be rejected with
 *                   a {@link NonexistentKeyError} object.
 */
function delSourceDef(name) {
  return delDef(config.sourceKeyPrefix, name);
}

/**
 * Set a mapping definition.
 * @param {string} name
 * @param {string} content
 * @return {Promise} Will be resolved if the requested operation is successful.
 */
function setMappingDef(name, content) {
  return setDef(config.mappingKeyPrefix, name, content);
}

/**
 * Delete a mapping definition.
 * @param {string} name
 * @return {Promise} Will be resolved if the requested operation is successful. Can be rejected with
 *                   a {@link NonexistentKeyError} object.
 */
function delMappingDef(name) {
  return delDef(config.mappingKeyPrefix, name);
}

/**
 * Set a graph schema definition.
 * @param {string} name
 * @param {string} content
 * @return {Promise} Will be resolved if the requested operation is successful.
 */
function setGraphSchemaDef(name, content) {
  return setDef(config.graphSchemaKeyPrefix, name, content);
}

/**
 * Delete a graph schema definition.
 * @param {string} name
 * @return {Promise} Will be resolved if the requested operation is successful. Can be rejected with
 *                   a {@link NonexistentKeyError} object.
 */
function delGraphSchemaDef(name) {
  return delDef(config.graphSchemaKeyPrefix, name);
}

module.exports = {
  setSourceDef,
  delSourceDef,
  setMappingDef,
  delMappingDef,
  setGraphSchemaDef,
  delGraphSchemaDef,
};
