const R = require('ramda');
const P = require('bluebird');
const {Map} = require('immutable');
const yaml = require('js-yaml');
const ClientError = require('./error');

const FONT_SIZE = 16;
const CLASS_INNER_RADIUS = 75;
const CLASS_OUTER_RADIUS = 125;
const CLASS_PAD_ANGLE = 0.02;
const CLASS_LINK_LABEL_MARGIN = 10;

const ZOOM_STEP = 0.02;
const MIN_ZOOM = 0.1;
const MAX_ZOOM = 5;

const GRAPH_SCHEMA_CONFIG_TYPE = 'graph schema';

const createGlobalIndexGenerator = () => {
  let id = 0;
  return () => id++;
};

const generateClassGlobalIndex = createGlobalIndexGenerator();
const generateClassLinkGlobalIndex = createGlobalIndexGenerator();

/**
 * Creates a class.
 * @param {string} name - Unique identifier.
 * @param {object} props - The name-to-type mapping of class properties.
 * @param {number} [x=0]
 * @param {number} [y=0]
 * @param {string} [tooltipVisibleProp=false]
 * @param {number} [outerRadius=75]
 * @param {boolean} [shouldGenerateGlobalIndex=true]
 * @return {object}
 */
function createClass(
  name,
  props,
  x = 0,
  y = 0,
  tooltipVisibleProp = null,
  outerRadius = CLASS_INNER_RADIUS,
  shouldGenerateGlobalIndex = true
) {
  let cls = {
    name,
    props,
    x,
    y,
    tooltipVisibleProp,
    outerRadius,
  };

  if (shouldGenerateGlobalIndex) {
    cls.globalIndex = generateClassGlobalIndex();
  }

  return cls;
}

/**
 * Extracts properties of a class for persistence.
 * @param {object} cls
 * @return {object}
 */
function createPersistentClass(cls) {
  return {
    name: cls.name,
    props: R.clone(cls.props),
  };
}

/**
 * Creates a class link.
 *
 * Name, source and target together form a unique identifier for a class link.
 *
 * @param {string} name - This is NOT an unique identifier.
 * @param {string} source - The name of source class.
 * @param {string} target - The name of target class.
 * @param {number} [x=0] - The x-coordinate of the link's control node.
 * @param {number} [y=0] - The y-coordinate of the link's control node.
 * @param {number} [length=0]
 * @param {boolean} [shouldGenerateGlobalIndex=true]
 * @return {object}
 */
function createClassLink(
  name,
  source,
  target,
  x = 0,
  y = 0,
  length = 0,
  shouldGenerateGlobalIndex = true
) {
  let classLink = {
    name,
    source,
    target,
    x,
    y,
    length,
  };

  if (shouldGenerateGlobalIndex) {
    classLink.globalIndex = generateClassLinkGlobalIndex();
  }

  return classLink;
}

/**
 * Extracts properties of a class link for persistence.
 * @param {object} classLink
 * @return {object}
 */
function createPersistentClassLink(classLink) {
  return {
    name: classLink.name,
    source: classLink.source,
    target: classLink.target,
  };
}

/**
 * Extracts name, source and target from a class link to form an ID.
 * @param {object | Map} classLink
 * @return {string[]} The ID of the class link.
 */
function getClassLinkId(classLink) {
  if (Map.isMap(classLink)) {
    return {
      'source': classLink.get('source'),
      'name': classLink.get('name'),
    };
  }

  return {
    source: classLink.source,
    name: classLink.name,
  };
}

/**
 * Extracts name, source and target from a class link to form an key.
 * @func
 * @param {object} classLink
 * @return {List<string>} The key of the class link.
 */
const getClassLinkKey = R.compose(Map, getClassLinkId);

class GraphSchemaFormatError extends ClientError {
  constructor(cause) {
    super(cause);
  }
}

const graphSchemaPrimitiveTypes = ['string', 'boolean', 'integer', 'float'];
const isInGraphSchemaPrimitiveTypes = R.contains(R.__, graphSchemaPrimitiveTypes);

function convertGraphSchemaToClassesAndLinks(graphSchema) {
  if (R.type(graphSchema) !== 'Object') {
    throw new GraphSchemaFormatError('Graph schema is not a mapping.');
  }

  const [classes, classLinkLists] = R.pipe(
    R.toPairs,
    R.map(([className, classProps]) => {
      if (R.type(classProps) !== 'Object') {
        throw new GraphSchemaFormatError(
          `Properties of class "${className}" is not a mapping.`
        );
      }

      const [primitivePropPairs, linkPropPairs] =
        R.partition(
          ([n, t]) => isInGraphSchemaPrimitiveTypes(t),
          R.toPairs(classProps)
        );

      const cls = createClass(className, R.fromPairs(primitivePropPairs));

      const classLinks =
        linkPropPairs.map(([n, t]) => createClassLink(n, className, t));

      return [
        cls,
        classLinks,
      ];
    }),
    R.transpose
  )(graphSchema);

  const classLinks = R.unnest(classLinkLists);

  classLinks.forEach((l) => {
    if (!R.has(l.target, graphSchema)) {
      throw new GraphSchemaFormatError(
        `Cannot find class link target "${l.target}".`
      );
    }
  });

  return {
    classes,
    classLinks,
  };
}

function parseYaml(yamlDoc) {
  return P
    .try(() => yaml.safeLoad(yamlDoc))
    .catch((error) => {
      throw new GraphSchemaFormatError(error);
    })
    .then(convertGraphSchemaToClassesAndLinks);
}

const INGESTION_PROFILE_CONFIG_TYPE = 'ingestion profile';
const TAB_SOURCE = 'Source';
const TAB_GRAPH_SCHEMA = 'Graph Schema';
const TAB_MAPPING = 'Mapping';

const MAPPING_NODE_TYPE_KEY = '@type';
const MAPPING_NODE_ID_KEY = '@id';
const MAPPING_LINK_TYPE_KEY = '@type';
const MAPPING_LINK_SOURCE_KEY = '@src';
const MAPPING_LINK_DESTINATION_KEY = '@dest';

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
  INGESTION_PROFILE_CONFIG_TYPE,
  TAB_SOURCE,
  TAB_GRAPH_SCHEMA,
  TAB_MAPPING,
  MAPPING_NODE_ID_KEY,
  MAPPING_NODE_TYPE_KEY,
  MAPPING_LINK_TYPE_KEY,
  MAPPING_LINK_SOURCE_KEY,
  MAPPING_LINK_DESTINATION_KEY,
  FONT_SIZE,
  CLASS_INNER_RADIUS,
  CLASS_OUTER_RADIUS,
  CLASS_PAD_ANGLE,
  CLASS_LINK_LABEL_MARGIN,
  ZOOM_STEP,
  MIN_ZOOM,
  MAX_ZOOM,
  GRAPH_SCHEMA_CONFIG_TYPE,
  createIngestionProfile,
  createMappingNode,
  createClass,
  createPersistentClass,
  createClassLink,
  createPersistentClassLink,
  getClassLinkId,
  getClassLinkKey,
  parseYaml,
  convertGraphSchemaToClassesAndLinks,
  GraphSchemaFormatError,
};
