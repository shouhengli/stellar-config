const React = require('react');
const {connect} = require('react-redux');
const R = require('ramda');
const anime = require('animejs');
const {updateClassOuterRadius} = require('../action-creators/ui/graph-schema');
const {CLASS_OUTER_RADIUS, CLASS_INNER_RADIUS} = require('../graph-schema');

const ClassName = require('./graph-schema-class-name.jsx');
const ClassArc = require('./graph-schema-class-arc.jsx');
const ClassPropName = require('./graph-schema-class-prop-name.jsx');
const ClassPropTooltip = require('../components/graph-schema-class-prop-tooltip.jsx');
const Class = require('../components/graph-schema-class.jsx');

const classOuterRadiusAnimationIndex = {};

const stopClassOuterRadiusAnimation = (className) => {
  if (classOuterRadiusAnimationIndex[className]) {
    classOuterRadiusAnimationIndex[className].pause();
    delete classOuterRadiusAnimationIndex[className];
  }
};

const playClassOuterRadiusAnimation =
  (className, classOuterRadius, targetRadius, handleUpdate) => {
    stopClassOuterRadiusAnimation(className);

    const target = {r: classOuterRadius};

    classOuterRadiusAnimationIndex[className] = anime({
      targets: target,
      r: targetRadius,
      update: () => handleUpdate(Number(target.r)),
    });
  };

const startClassOuterRadiusAnimation =
  R.curry(playClassOuterRadiusAnimation)(R.__, R.__, CLASS_OUTER_RADIUS);

const reverseClassOuterRadiusAnimation =
  R.curry(playClassOuterRadiusAnimation)(R.__, R.__, CLASS_INNER_RADIUS);

function mapDispatchToProps(dispatch) {
  return {
    handleMouseEnter: (cls) =>
      startClassOuterRadiusAnimation(
        cls.get('name'),
        cls.get('outerRadius'),
        (radius) => dispatch(updateClassOuterRadius(cls.get('name'), radius))
      ),
    handleMouseLeave: (cls) =>
      reverseClassOuterRadiusAnimation(
        cls.get('name'),
        cls.get('outerRadius'),
        (radius) => dispatch(updateClassOuterRadius(cls.get('name'), radius))
      ),
    handleComponentWillUnmount: (cls) => {
      stopClassOuterRadiusAnimation(cls.name);
    },
  };
}

module.exports = connect(null, mapDispatchToProps)(
  (props) => <Class
               ClassName={ClassName}
               ClassArc={ClassArc}
               ClassPropName={ClassPropName}
               ClassPropTooltip={ClassPropTooltip}
               {...props} />
);
