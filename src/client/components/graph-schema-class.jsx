const React = require('react');
const {connect} = require('react-redux');
const {createSelector} = require('reselect');
const d3 = require('d3-shape');
const R = require('ramda');
const anime = require('animejs');
const {updateClassOuterRadius} = require('../action-creators/graph-schema');

const {
  CLASS_INNER_RADIUS,
  CLASS_OUTER_RADIUS,
  CLASS_PAD_ANGLE,
  FONT_SIZE,
} = require('../graph-schema');

const ClassName = require('./graph-schema-class-name.jsx');
const ClassArc = require('./graph-schema-class-arc.jsx');
const ClassPropName = require('./graph-schema-class-prop-name.jsx');
const ClassPropTooltip = require('./graph-schema-class-prop-tooltip.jsx');

const getLengthSum = R.compose(R.sum, R.map((x) => x.length));

const getClassPropAngles = createSelector(
  (cls) => cls.get('props'),
  (classProps) => {
    const classPropNames = classProps.keySeq().toJS;
    const classPropNamesLengthSum = getLengthSum(classPropNames);

    const classPropAngles = R.reduce(
      (angles, classPropName) => {
        const start = (R.last(angles) || {end: 0}).endAngle;

        const end = Math.min(
          start + 2 * Math.PI * (classPropName.length / classPropNamesLengthSum),
          2 * Math.PI
        );

        angles.push({classPropName, start, end});
        return angles;
      },
      [],
      classPropNames
    );

    return classPropAngles;
  }
);

const getClassOuterRadius = (cls) => cls.get('outerRadius');

const getClassArcGenerator = createSelector(
  getClassOuterRadius,
  (classOuterRadius) => d3
    .arc()
    .innerRadius(CLASS_INNER_RADIUS)
    .outerRadius(classOuterRadius)
    .padAngle(CLASS_PAD_ANGLE)
    .startAngle((d) => d.start)
    .endAngle((d) => d.end)
);

const getClassPropNameRadius = createSelector(
  getClassOuterRadius,
  (classOuterRadius) => 0.5 * (classOuterRadius + CLASS_INNER_RADIUS)
);

const getClassPropNameArcPath = createSelector(
  getClassPropNameRadius,
  (classPropNameRadius) => {
    const arc = d3
      .arc()
      .innerRadius(0)
      .outerRadius(classPropNameRadius)
      .startAngle(0)
      .endAngle(2 * Math.PI);

    return arc();
  }
);

const getClassPropNameVisibility = createSelector(
  getClassOuterRadius,
  (classOuterRadius) =>
    classOuterRadius > CLASS_INNER_RADIUS ? 'visible' : 'hidden'
);

const getClassPropTooltipRadius = createSelector(
  getClassOuterRadius,
  (classOuterRadius) => classOuterRadius + 10
);

const getClassPropTooltipArcPath = createSelector(
  getClassPropTooltipRadius,
  (classPropTooltipRadius) => {
    const arc = d3
      .arc()
      .innerRadius(0)
      .outerRadius(classPropTooltipRadius)
      .startAngle(0)
      .endAngle(2 * Math.PI);

    return arc();
  }
);

class Class extends React.Component {
  constructor(props) {
    super(props);
  }

  static get displayName() {
    return 'Graph Schema Class';
  }

  render() {
    const {
      cls,
      handleMouseEnter,
      handleMouseLeave,
    } = this.props;

    const className = cls.get('name');
    const tooltipVisibleProp = cls.get('tooltipVisibleProp');
    const classArcGenerator = getClassArcGenerator(cls);
    const classPropNameRadius = getClassPropNameRadius(cls);
    const classPropNameArcPath = getClassPropNameArcPath(cls);
    const classPropNameVisibility = getClassPropNameVisibility(cls);
    const classPropTooltipRadius = getClassPropTooltipRadius(cls);
    const classPropTooltipArcPath = getClassPropTooltipArcPath(cls);

    return (
      <g
        className="graph-schema-class"
        transform={`translate(${cls.get('x')}, ${cls.get('y')})`}
        onMouseEnter={() => handleMouseEnter(cls)}
        onMouseLeave={() => handleMouseLeave(cls)}>

        <ClassName
          name={cls.get('name')}
          radius={CLASS_INNER_RADIUS}
          fontSize={FONT_SIZE} />

        {
          getClassPropAngles(cls).map(({classPropName, start, end}, i) => {
            const classArcPath = classArcGenerator({start, end});
            const rotation = 180 * ((start + end) * 0.5 / Math.PI - 1);

            return (
              <g key={classPropName}>
                <ClassArc
                  path={classArcPath}
                  className={className}
                  classPropName={classPropName} />
                <ClassPropName
                  id={i}
                  rotation={rotation}
                  clipPath={classArcPath}
                  classPropNameArcPath={classPropNameArcPath}
                  classPropNameRadius={classPropNameRadius}
                  classPropNameVisibility={classPropNameVisibility}
                  className={className}
                  classPropName={classPropName} />
                <ClassPropTooltip
                  id={i}
                  rotation={rotation}
                  classPropTooltipArcPath={classPropTooltipArcPath}
                  classPropTooltipRadius={classPropTooltipRadius}
                  visible={tooltipVisibleProp === classPropName}
                  classPropName={classPropName} />
              </g>
            );
          })
        }
      </g>
    );
  }

  componentWillUnmount() {
    this.props.handleComponentWillUnmount(this.props.cls);
  }
}

const classOuterRadiusAnimationIndex = {};

const stopClassOuterRadiusAnimation = (className) => {
  if (classOuterRadiusAnimationIndex[className]) {
    classOuterRadiusAnimationIndex[className].pause();
  }
};

const playClassOuterRadiusAnimation =
  (className, classOuterRadius, targetRadius, handleUpdate) => {
    stopClassOuterRadiusAnimation(className);

    const target = {r: classOuterRadius};

    classOuterRadiusAnimationIndex[className] = anime({
      targets: target,
      r: targetRadius,
      update: () => handleUpdate(target.r),
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
    handleComponentWillUnmount: (cls) =>
      dispatch(updateClassOuterRadius(cls.get('name'), CLASS_INNER_RADIUS)),
  };
}

module.exports = connect(null, mapDispatchToProps)(Class);
