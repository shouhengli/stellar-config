import React from 'react';
import { createSelector } from 'reselect';
import { last } from 'ramda';
import { arc as d3arc } from 'd3-shape';
import {
  CLASS_INNER_RADIUS,
  CLASS_PAD_ANGLE,
  FONT_SIZE
} from '../ingestion-profile';

class Class extends React.Component {
  constructor(props) {
    super(props);

    this.getClassPropAngles = createSelector(
      cls => cls.get('props'),
      classProps => {
        const classPropNamesLengthSum = classProps.reduce(
          (sum, prop) => sum + prop.get('name').length,
          0
        );
        const classPropAngles = classProps.reduce((angles, classProp) => {
          const { name, globalIndex } = classProp.toJS();
          const start = (last(angles) || { end: 0 }).end;
          const end = Math.min(
            start +
              2 * Math.PI * (name.length / (classPropNamesLengthSum || 1)),
            2 * Math.PI
          );

          angles.push({ name, start, end, globalIndex });
          return angles;
        }, []);

        return classPropAngles;
      }
    );

    this.getClassOuterRadius = cls => cls.get('outerRadius');

    this.getClassArcGenerator = createSelector(
      this.getClassOuterRadius,
      classOuterRadius =>
        d3arc()
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
        const arc = d3arc()
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
        const arc = d3arc()
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
          ({ name, start, end, globalIndex }, i) => {
            const classArcPath = classArcGenerator({ start, end });
            const rotation = 180 * ((start + end) * 0.5 / Math.PI - 1);

            return (
              <g key={globalIndex} transform="rotate(180)">
                <ClassArc
                  path={classArcPath}
                  globalIndex={classGlobalIndex}
                  classPropName={name}
                />
                <ClassPropName
                  id={globalIndex}
                  rotation={rotation}
                  clipPath={classArcPath}
                  classPropNameArcPath={classPropNameArcPath}
                  classPropNameRadius={classPropNameRadius}
                  classPropNameVisibility={classPropNameVisibility}
                  globalIndex={classGlobalIndex}
                  classPropName={name}
                  fontSize={FONT_SIZE}
                />
                <ClassPropTooltip
                  id={globalIndex}
                  rotation={rotation}
                  classPropTooltipArcPath={classPropTooltipArcPath}
                  classPropTooltipRadius={classPropTooltipRadius}
                  visible={tooltipVisibleProp === name}
                  classPropName={name}
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
