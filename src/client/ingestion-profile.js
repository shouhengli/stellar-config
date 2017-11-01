const R = require('ramda');

const INGESTION_PROFILE_CONFIG_TYPE = 'ingestion profile';
const TAB_SOURCE = 'Source';
const TAB_GRAPH_SCHEMA = 'Graph Schema';
const TAB_MAPPING = 'Mapping';

const MAPPING_NODE_TYPE_KEY = '@type';
const MAPPING_NODE_ID_KEY = '@id';

/**
 * Creates a ingestion profile.
 * @param {string[]} sources - A list of data sources.
 * @param {object} graphSchema - The graph schema parsed from its YAML format.
 * @param {object} mapping - A key-value mapping in which the keys are full column names and the
 *                           values are corresponding full property names.
 * @return {object} A ingestion profile.
 */
function createIngestionProfile(sources, graphSchema, mapping) {
  return {
    sources,
    graphSchema,
    mapping,
  };
}

/**
 * Creates a mapping node.
 * @param {string} nodeType
 * @param {object} nodeId = Object of the form {source, column}.
 * @param {object} propSourceColumnMap - Object of the form {prop: {source, column}}.
 * @return {object}
 */
function createMappingNode(nodeType, nodeId, propSourceColumnMap) {
  let node = R.clone(propSourceColumnMap);
  node[MAPPING_NODE_TYPE_KEY] = nodeType;
  node[MAPPING_NODE_ID_KEY] = nodeId;
  return node;
}

module.exports = {
  createIngestionProfile,
  createMappingNode,
  INGESTION_PROFILE_CONFIG_TYPE,
  TAB_SOURCE,
  TAB_GRAPH_SCHEMA,
  TAB_MAPPING,
  MAPPING_NODE_ID_KEY,
  MAPPING_NODE_TYPE_KEY,
};
