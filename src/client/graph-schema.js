const FONT_SIZE = 16;
const CLASS_INNER_RADIUS = 75;
const CLASS_OUTER_RADIUS = 125;
const CLASS_PAD_ANGLE = 0.02;
const CLASS_LINK_LABEL_MARGIN = 10;

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

module.exports = {
  createClass,
  createClassLink,
  getClassLinkId,
  FONT_SIZE,
  CLASS_INNER_RADIUS,
  CLASS_OUTER_RADIUS,
  CLASS_PAD_ANGLE,
  CLASS_LINK_LABEL_MARGIN,
};
