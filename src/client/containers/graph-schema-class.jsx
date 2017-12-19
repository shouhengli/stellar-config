const React = require('react');
const { connect } = require('react-redux');
const R = require('ramda');
const anime = require('animejs');
const {
  updateClassOuterRadius
} = require('../action-creators/ui/split-view/graph-schema');
const {
  CLASS_OUTER_RADIUS,
  CLASS_INNER_RADIUS
} = require('../ingestion-profile');

const ClassName = require('./graph-schema-class-name.jsx');
const ClassArc = require('./graph-schema-class-arc.jsx');
const ClassPropName = require('./graph-schema-class-prop-name.jsx');
const ClassPropTooltip = require('../components/graph-schema-class-prop-tooltip.jsx');
const Class = require('../components/graph-schema-class.jsx');

const classOuterRadiusAnimationIndex = {};

const stopClassOuterRadiusAnimation = globalIndex => {
  if (classOuterRadiusAnimationIndex[globalIndex]) {
    classOuterRadiusAnimationIndex[globalIndex].pause();
    delete classOuterRadiusAnimationIndex[globalIndex];
  }
};

const playClassOuterRadiusAnimation = (
  globalIndex,
  classOuterRadius,
  targetRadius,
  handleUpdate
) => {
  stopClassOuterRadiusAnimation(globalIndex);

  const target = { r: classOuterRadius };

  classOuterRadiusAnimationIndex[globalIndex] = anime({
    targets: target,
    r: targetRadius,
    update: () => handleUpdate(Number(target.r))
  });
};

const startClassOuterRadiusAnimation = R.curry(playClassOuterRadiusAnimation)(
  R.__,
  R.__,
  CLASS_OUTER_RADIUS
);

const reverseClassOuterRadiusAnimation = R.curry(playClassOuterRadiusAnimation)(
  R.__,
  R.__,
  CLASS_INNER_RADIUS
);

function mapDispatchToProps(dispatch) {
  return {
    handleMouseEnter: cls =>
      startClassOuterRadiusAnimation(
        cls.get('globalIndex'),
        cls.get('outerRadius'),
        radius =>
          dispatch(updateClassOuterRadius(cls.get('globalIndex'), radius))
      ),
    handleMouseLeave: cls =>
      reverseClassOuterRadiusAnimation(
        cls.get('globalIndex'),
        cls.get('outerRadius'),
        radius =>
          dispatch(updateClassOuterRadius(cls.get('globalIndex'), radius))
      ),
    handleComponentWillUnmount: cls => {
      stopClassOuterRadiusAnimation(cls.get('globalindex'));
    }
  };
}

module.exports = connect(null, mapDispatchToProps)(props => (
  <Class
    ClassName={ClassName}
    ClassArc={ClassArc}
    ClassPropName={ClassPropName}
    ClassPropTooltip={ClassPropTooltip}
    {...props}
  />
));
