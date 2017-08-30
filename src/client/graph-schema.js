/**
 * Creates a class.
 * @param {string} name - Unique identifier.
 * @param {object} props - The name-to-type mapping of class properties.
 * @param {number} x
 * @param {number} y
 * @param {string} tooltipVisibleProp
 * @return {object}
 */
function createClass(name, props, x, y, tooltipVisibleProp) {
  return {
    name,
    props,
    x,
    y,
    tooltipVisibleProp,
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
 * @param {number} x - The x-coordinate of the link's control node.
 * @param {number} y - The y-coordinate of the link's control node.
 * @param {number} length
 * @return {object}
 */
function createClassLink(name, source, target, x, y, length) {
  return {
    name,
    source,
    target,
    x,
    y,
    length,
  };
}

module.exports = {
  createClass,
  createClassLink,
};
