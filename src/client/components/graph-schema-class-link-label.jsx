const React = require('react');
const {connect} = require('react-redux');

const ClassLinkLabel = (props) => {
  const {
    classLinkId,
    classLinkName,
    classlinkPathLength,
    labelMargin,
    handleMouseDown,
  } = props;

  return (
    <text textAnchor="middle"
      dx={classlinkPathLength} dy={-labelMargin}
      onMouseDown={(event) => handleMouseDown(event)}>
      <textPath xlinkHref={`#graph-schema-class-link-path-${classLinkId}`}>
        {classLinkName}
      </textPath>
    </text>
  );
};

function mapDispatchToProps(state) {
  return {
    handleMouseDown: (event, classLinkId) => {
      event.preventDefault();
      // ontologyActions.stopOntologyGraphSimulation();
      // ontologyActions.startDraggingClassLink(classLinkId);
    },
  };
}

module.exports = connect(null, mapDispatchToProps)(ClassLinkLabel);
