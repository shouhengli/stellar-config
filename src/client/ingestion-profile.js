const R = require('ramda');
const ClientError = require('./error');

export const FONT_SIZE = 16;
export const CLASS_INNER_RADIUS = 75;
export const CLASS_OUTER_RADIUS = 125;
export const CLASS_PAD_ANGLE = 0.02;
export const CLASS_LINK_LABEL_MARGIN = 10;

export const ZOOM_STEP = 0.02;
export const MIN_ZOOM = 0.1;
export const MAX_ZOOM = 5;

export const GRAPH_SCHEMA_CONFIG_TYPE = 'graph schema';

const createGlobalIndexGenerator = () => {
  let id = 0;
  return () => `${id++}`;
};

export const generateClassGlobalIndex = createGlobalIndexGenerator();
export const generateClassLinkGlobalIndex = createGlobalIndexGenerator();
export const generateClassPropGlobalIndex = createGlobalIndexGenerator();

/**
 * Extracts properties of a class for persistence.
 * @param {object} cls
 * @return {object}
 */
export const createPersistentClass = cls => ({
  name: cls.get('name'),
  props: cls
    .get('props')
    .valueSeq()
    .filterNot(p => p.get('isDeleted'))
    .map(p => ({
      name: p.get('name'),
      type: p.get('type')
    }))
    .toJS()
});

/**
 * Extracts properties of a class link for persistence.
 * @param {object} classLink
 * @return {object}
 */
export const createPersistentClassLink = classLink => ({
  name: classLink.get('name'),
  source: classLink.get('source'),
  target: classLink.get('target')
});

export class GraphSchemaFormatError extends ClientError {
  constructor(cause) {
    super(cause);
  }
}

export const INGESTION_PROFILE_CONFIG_TYPE = 'ingestion profile';
export const TAB_SOURCE = 'Source';
export const TAB_GRAPH_SCHEMA = 'Graph Schema';
export const TAB_MAPPING = 'Mapping';

export const MAPPING_NODE_TYPE_KEY = '@type';
export const MAPPING_NODE_ID_KEY = '@id';
export const MAPPING_LINK_TYPE_KEY = '@type';
export const MAPPING_LINK_SOURCE_KEY = '@src';
export const MAPPING_LINK_DESTINATION_KEY = '@dest';

/**
 * Creates a ingestion profile.
 * @param {string[]} sources - A list of data sources.
 * @param {object} graphSchema - The graph schema parsed from its YAML format.
 * @param {object} mapping - A key-value mapping in which the keys are full column names and the
 *                           values are corresponding full property names.
 * @return {object} A ingestion profile.
 */
export function createIngestionProfile(sources, graphSchema, mapping) {
  return {
    sources,
    graphSchema,
    mapping
  };
}

/**
 * Creates a mapping node.
 * @param {string} nodeType
 * @param {object} nodeId = Object of the form {source, column}.
 * @param {object} propSourceColumnMap - Object of the form {prop: {source, column}}.
 * @return {object}
 */
export function createMappingNode(nodeType, nodeId, propSourceColumnMap) {
  let node = R.clone(propSourceColumnMap);
  node[MAPPING_NODE_TYPE_KEY] = nodeType;
  node[MAPPING_NODE_ID_KEY] = nodeId;
  return node;
}
