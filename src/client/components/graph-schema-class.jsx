const React = require('react');
const { createSelector } = require('reselect');
const R = require('ramda');
const d3 = require('d3-shape');

const {
  CLASS_INNER_RADIUS,
  CLASS_PAD_ANGLE,
  FONT_SIZE
} = require('../ingestion-profile');

const getLengthSum = R.compose(R.sum, R.map(x => x.length));

class Class extends React.Component {
  constructor(props) {
    super(props);

    this.getClassPropAngles = createSelector(
      cls => cls.get('props'),
      classProps => {
        const classPropNames = classProps
          .valueSeq()
          .map(p => p.get('name'))
          .toJS();
        const classPropNamesLengthSum = getLengthSum(classPropNames);

        const classPropAngles = R.reduce(
          (angles, classPropName) => {
            const start = (R.last(angles) || { end: 0 }).end;

            const end = Math.min(
              start +
                2 * Math.PI * (classPropName.length / classPropNamesLengthSum),
              2 * Math.PI
            );

            angles.push({ classPropName, start, end });
            return angles;
          },
          [],
          classPropNames
        );

        return classPropAngles;
      }
    );

    this.getClassOuterRadius = cls => cls.get('outerRadius');

    this.getClassArcGenerator = createSelector(
      this.getClassOuterRadius,
      classOuterRadius =>
        d3
          .arc()
          .innerRadius(CLASS_INNER_RADIUS)
          .outerRadius(classOuterRadius)
          .padAngle(CLASS_PAD_ANGLE)
          .startAngle(d => d.start)
          .endAngle(d => d.end)
    );

    this.getClassPropNameRadius = createSelector(
      this.getClassOuterRadius,
      classOuterRadius => 0.5 * (classOuterRadius + CLASS_INNER_RADIUS)
    );

    this.getClassPropNameArcPath = createSelector(
      this.getClassPropNameRadius,
      classPropNameRadius => {
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
      classOuterRadius =>
        classOuterRadius > CLASS_INNER_RADIUS ? 'visible' : 'hidden'
    );

    this.getClassPropTooltipRadius = createSelector(
      this.getClassOuterRadius,
      classOuterRadius => classOuterRadius + 10
    );

    this.getClassPropTooltipArcPath = createSelector(
      this.getClassPropTooltipRadius,
      classPropTooltipRadius => {
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
      ClassName,
      ClassArc,
      ClassPropName,
      ClassPropTooltip,
      cls,
      handleMouseEnter,
      handleMouseLeave
    } = this.props;

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
        transform={`translate(${cls.get('x').toFixed()}, ${cls
          .get('y')
          .toFixed()})`}
        onMouseEnter={() => handleMouseEnter(cls)}
        onMouseLeave={() => handleMouseLeave(cls)}
      >
        <ClassName
          name={cls.get('name')}
          radius={CLASS_INNER_RADIUS}
          fontSize={FONT_SIZE}
        />

        {this.getClassPropAngles(cls).map(
          ({ classPropName, start, end }, i) => {
            const classArcPath = classArcGenerator({ start, end });
            const rotation = 180 * ((start + end) * 0.5 / Math.PI - 1);
            const classPropId = `${classGlobalIndex}-${i}`;

            return (
              <g key={classPropName} transform="rotate(180)">
                <ClassArc
                  path={classArcPath}
                  globalIndex={classGlobalIndex}
                  classPropName={classPropName}
                />
                <ClassPropName
                  id={classPropId}
                  rotation={rotation}
                  clipPath={classArcPath}
                  classPropNameArcPath={classPropNameArcPath}
                  classPropNameRadius={classPropNameRadius}
                  classPropNameVisibility={classPropNameVisibility}
                  globalIndex={classGlobalIndex}
                  classPropName={classPropName}
                  fontSize={FONT_SIZE}
                />
                <ClassPropTooltip
                  id={classPropId}
                  rotation={rotation}
                  classPropTooltipArcPath={classPropTooltipArcPath}
                  classPropTooltipRadius={classPropTooltipRadius}
                  visible={tooltipVisibleProp === classPropName}
                  classPropName={classPropName}
                />
              </g>
            );
          }
        )}
      </g>
    );
  }

  componentWillUnmount() {
    this.props.handleComponentWillUnmount(this.props.cls);
  }
}

module.exports = Class;
