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

class Class extends React.Component {
  constructor(props) {
    super(props);

    this.getClassPropAngles = createSelector(
      (cls) => cls.get('props'),
      (classProps) => {
        const classPropNames = classProps.keySeq().toJS();
        const classPropNamesLengthSum = getLengthSum(classPropNames);

        const classPropAngles = R.reduce(
          (angles, classPropName) => {
            const start = (R.last(angles) || {end: 0}).end;

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

    this.getClassOuterRadius = (cls) => cls.get('outerRadius');

    this.getClassArcGenerator = createSelector(
      this.getClassOuterRadius,
      (classOuterRadius) => d3
        .arc()
        .innerRadius(CLASS_INNER_RADIUS)
        .outerRadius(classOuterRadius)
        .padAngle(CLASS_PAD_ANGLE)
        .startAngle((d) => d.start)
        .endAngle((d) => d.end)
    );

    this.getClassPropNameRadius = createSelector(
      this.getClassOuterRadius,
      (classOuterRadius) => 0.5 * (classOuterRadius + CLASS_INNER_RADIUS)
    );

    this.getClassPropNameArcPath = createSelector(
      this.getClassPropNameRadius,
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

    this.getClassPropNameVisibility = createSelector(
      this.getClassOuterRadius,
      (classOuterRadius) =>
        classOuterRadius > CLASS_INNER_RADIUS ? 'visible' : 'hidden'
    );

    this.getClassPropTooltipRadius = createSelector(
      this.getClassOuterRadius,
      (classOuterRadius) => classOuterRadius + 10
    );

    this.getClassPropTooltipArcPath = createSelector(
      this.getClassPropTooltipRadius,
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
    const classGlobalIndex = cls.get('globalIndex');
    const tooltipVisibleProp = cls.get('tooltipVisibleProp');
    const classArcGenerator = this.getClassArcGenerator(cls);
    const classPropNameRadius = this.getClassPropNameRadius(cls);
    const classPropNameArcPath = this.getClassPropNameArcPath(cls);
    const classPropNameVisibility = this.getClassPropNameVisibility(cls);
    const classPropTooltipRadius = this.getClassPropTooltipRadius(cls);
    const classPropTooltipArcPath = this.getClassPropTooltipArcPath(cls);

    return (
      <g
        className="graph-schema-class"
        transform={
          `translate(${cls.get('x').toFixed()}, ${cls.get('y').toFixed()})`
        }
        onMouseEnter={() => handleMouseEnter(cls)}
        onMouseLeave={() => handleMouseLeave(cls)}>

        <ClassName
          name={cls.get('name')}
          radius={CLASS_INNER_RADIUS}
          fontSize={FONT_SIZE} />

        {
          this.getClassPropAngles(cls).map(({classPropName, start, end}, i) => {
            const classArcPath = classArcGenerator({start, end});
            const rotation = 180 * ((start + end) * 0.5 / Math.PI - 1);
            const classPropId = `${classGlobalIndex}-${i}`;

            return (
              <g
                key={classPropName}
                transform="rotate(180)">
                <ClassArc
                  path={classArcPath}
                  className={className}
                  classPropName={classPropName} />
                <ClassPropName
                  id={classPropId}
                  rotation={rotation}
                  clipPath={classArcPath}
                  classPropNameArcPath={classPropNameArcPath}
                  classPropNameRadius={classPropNameRadius}
                  classPropNameVisibility={classPropNameVisibility}
                  className={className}
                  classPropName={classPropName}
                  fontSize={FONT_SIZE} />
                <ClassPropTooltip
                  id={classPropId}
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

module.exports = connect(null, mapDispatchToProps)(Class);
