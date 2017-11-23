const React = require('react');

const { CLASS_LINK_LABEL_MARGIN } = require('../ingestion-profile');

module.exports = props => {
  const { id, classLink, zoom, handleMouseDown } = props;

  return (
    <text
      textAnchor="middle"
      dx={classLink.get('length') / 2}
      dy={-CLASS_LINK_LABEL_MARGIN}
      onMouseDown={event => handleMouseDown(event, classLink, zoom)}>
      <textPath xlinkHref={`#graph-schema-class-link-path-${id}`}>
        {classLink.get('name')}
      </textPath>
    </text>
  );
};
