const P = require('bluebird');
const R = require('ramda');
const yaml = require('js-yaml');
const ClientError = require('./error');

const FONT_SIZE = 16;
const CLASS_INNER_RADIUS = 75;
const CLASS_OUTER_RADIUS = 125;
const CLASS_PAD_ANGLE = 0.02;
const CLASS_LINK_LABEL_MARGIN = 10;

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
 * @return {object}
 */
function createClass(
  name,
  props,
  x = 0,
  y = 0,
  tooltipVisibleProp = false,
  outerRadius = CLASS_INNER_RADIUS
) {
  return {
    globalIndex: generateClassGlobalIndex(),
    name,
    props,
    x,
    y,
    tooltipVisibleProp,
    outerRadius,
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
 * @return {object}
 */
function createClassLink(
  name,
  source,
  target,
  x=0,
  y=0,
  length=0
) {
  return {
    globalIndex: generateClassLinkGlobalIndex(),
    name,
    source,
    target,
    x,
    y,
    length,
  };
}

/**
 * Extracts name, source and target from a class link to form an ID.
 * @param {object} classLink
 * @return {string[]} The ID of the class link.
 */
function getClassLinkId(classLink) {
  return [classLink.source, classLink.name, classLink.target];
}

class GraphSchemaFormatError extends ClientError {
  constructor(cause) {
    super(cause);
  }
}

const graphSchemaPrimitiveTypes = ['string', 'boolean', 'integer', 'float'];
const isInGraphSchemaPrimitiveTypes = R.contains(R.__, graphSchemaPrimitiveTypes);

function parseYaml(yamlDoc) {
  return P
    .try(() => yaml.safeLoad(yamlDoc))
    .catch((error) => {
      throw new GraphSchemaFormatError(error);
    })
    .then((graphSchema) => {
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
    });
}

module.exports = {
  createClass,
  createClassLink,
  getClassLinkId,
  parseYaml,
  GraphSchemaFormatError,
  FONT_SIZE,
  CLASS_INNER_RADIUS,
  CLASS_OUTER_RADIUS,
  CLASS_PAD_ANGLE,
  CLASS_LINK_LABEL_MARGIN,
};
