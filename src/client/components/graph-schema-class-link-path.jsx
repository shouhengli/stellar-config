const React = require('react');

/**
 * Computes two control points' coordinates based on three anchor points.
 *
 * Example positions of the points:
 *
 *  (cx0, cy0)         (x1, y1)         (cx1, cy1)
 *        * --------------- * -------------- *
 *       /                 /                /
 *      /                 /                /
 *     /                 /                /
 *    * -------------------------------- *
 * (x0, y0)                           (x2, y2)
 *
 * @param {number} x0 - The x-coordinate of the first anchor point.
 * @param {number} y0 - The y-coordinate of the first anchor point.
 * @param {number} x1 - The x-coordinate of the second anchor point.
 * @param {number} y1 - The y-coordinate of the second anchor point.
 * @param {number} x2 - The x-coordinate of the third anchor point.
 * @param {number} y2 - The y-coordinate of the third anchor point.
 * @return {object} An object whose properties are cx0, cy0, cx1 and cy1.
 */
function locateBezierControlPoints(x0, y0, x1, y1, x2, y2) {
  if (x0 == x2 && y0 == y2) {
    let dx = x1 - x0;
    let dy = y1 - y0;

    return {
      cx0: x1 - dy,
      cy0: y1 + dx,
      cx1: x1 + dy,
      cy1: y1 - dx,
    };
  } else {
    let dx = 0.5 * (x2 - x0);
    let dy = 0.5 * (y2 - y0);

    return {
      cx0: x1 - dx,
      cy0: y1 - dy,
      cx1: x1 + dx,
      cy1: y1 + dy,
    };
  }
}

class ClassLinkPath extends React.Component {
  constructor(props) {
    super(props);
  }

  static get displayName() {
    return 'Graph Schema';
  }

  render() {
    const {id, markerId} = this.props;
    let {x0, y0, x1, y1, x2, y2} = this.props;
    let {cx0, cy0, cx1, cy1} = locateBezierControlPoints(x0, y0, x1, y1, x2, y2);

    // The toFixed() method forces the output number format to be fixed-point
    // notation, which can be understood by the path element.
    [x0, y0, x1, y1, x2, y2, cx0, cy0, cx1, cy1] =
      [x0, y0, x1, y1, x2, y2, cx0, cy0, cx1, cy1].map((x) => x.toFixed());

    const pathData =
      `M${x0},${y0}Q${cx0},${cy0} ${x1},${y1}Q${cx1},${cy1} ${x2},${y2}`;

    return (
      <path
        id={`graph-schema-class-link-path-${id}`}
        d={pathData}
        markerMid={`url(#${markerId})`}
        ref={(path) => this.getLength = () => path.getTotalLength()}/>
    );
  }
}

module.exports = ClassLinkPath;
