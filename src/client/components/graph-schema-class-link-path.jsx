const React = require('react');

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

const ClassLinkPath = ({id, x0, y0, x1, y1, x2, y2, markerId}) => {
  const {cx0, cy0, cx1, cy1} = locateBezierControlPoints(x0, y0, x1, y1, x2, y2);
  const pathData = `M${x0},${y0}Q${cx0},${cy0} ${x1},${y1}Q${cx1},${cy1} ${x2},${y2}`;

  return (
    <path id={`graph-schema-class-link-path-${id}`}
      d={pathData}
      markerMid={`url(#${markerId})`} />
  );
};

module.exports = {
  locateBezierControlPoints,
  ClassLinkPath,
};
