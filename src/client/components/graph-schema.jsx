import React from 'react';
import R from 'ramda';
import { is, fromJS } from 'immutable';

class GraphSchema extends React.Component {
  constructor(props) {
    super(props);

    this.classLinkPaths = {};
  }

  static get displayName() {
    return 'Graph Schema';
  }

  render() {
    const {
      Arrow,
      ClassLink,
      ClassLinkPath,
      ClassLinkLabel,
      Class,
      positionedClassLinks,
      positionedClasses,
      drag,
      handleMouseMove,
      handleMouseUp,
      handleMouseDown,
      handleWheel,
      zoom,
      pan,
      coordinates
    } = this.props;

    return (
      <div className="graph-schema">
        <svg
          ref={ref => (this.svg = ref)}
          onMouseMove={event => handleMouseMove(event, drag, zoom)}
          onMouseUp={() => handleMouseUp()}
          onMouseDown={event => handleMouseDown(event, zoom)}
          onWheel={event => handleWheel(event, coordinates, drag)}
        >
          <g
            transform={`scale(${zoom}) translate(${pan.get('x')}, ${pan.get(
              'y'
            )})`}
          >
            <defs>
              <Arrow id="graph-schema-arrow" />
            </defs>
            <g className="graph-schema-class-links">
              {positionedClassLinks
                .filterNot(l => l.get('isDeleted'))
                .valueSeq()
                .map(l => {
                  return (
                    <ClassLink key={l.get('globalIndex')}>
                      <ClassLinkPath
                        ref={p => {
                          if (R.isNil(p)) {
                            delete this.classLinkPaths[l.get('globalIndex')];
                          } else {
                            this.classLinkPaths[l.get('globalIndex')] = {
                              l,
                              p
                            };
                          }
                        }}
                        id={l.get('globalIndex')}
                        x0={positionedClasses.getIn([
                          l.get('sourceIndex'),
                          'x'
                        ])}
                        y0={positionedClasses.getIn([
                          l.get('sourceIndex'),
                          'y'
                        ])}
                        x1={l.get('x')}
                        y1={l.get('y')}
                        x2={positionedClasses.getIn([
                          l.get('targetIndex'),
                          'x'
                        ])}
                        y2={positionedClasses.getIn([
                          l.get('targetIndex'),
                          'y'
                        ])}
                        markerId="graph-schema-arrow"
                      />
                      <ClassLinkLabel id={l.get('globalIndex')} classLink={l} />
                    </ClassLink>
                  );
                })}
            </g>
            <g className="graph-schema-classes">
              {positionedClasses.valueSeq().map(c => {
                return <Class key={c.get('globalIndex')} cls={c} />;
              })}
            </g>
          </g>
        </svg>
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    const dimensions = fromJS([this.svg.clientWidth, this.svg.clientHeight]);
    if (
      is(prevProps.classes, this.props.classes) &&
      is(prevProps.classLinks, this.props.classLinks) &&
      is(prevProps.dimensions, dimensions)
    ) {
      if (this.props.shouldUpdateClassLinkLengths) {
        this.props.updateClassLinkLengths(this.classLinkPaths);
      }
      return;
    }
    const { left, top } = this.svg.getBoundingClientRect();
    this.props.init(
      fromJS([this.svg.clientWidth, this.svg.clientHeight]),
      fromJS([left, top])
    );
  }

  componentDidMount() {
    const { left, top } = this.svg.getBoundingClientRect();
    this.props.init(
      fromJS([this.svg.clientWidth, this.svg.clientHeight]),
      fromJS([left, top])
    );
  }

  componentWillUnmount() {
    this.props.stopLayout();
  }
}

module.exports = GraphSchema;
