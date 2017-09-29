const React = require('react');
const R = require('ramda');

const {getClassLinkKey} = require('../graph-schema');

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
      classLinks,
      classes,
      drag,
      handleMouseMove,
      handleMouseUp,
      handleMouseDown,
      handleWheel,
      zoom,
      pan,
      coordinates,
    } = this.props;

    return (
      <div className="graph-schema">
        <svg
          ref={(ref) => this.svg = ref}
          onMouseMove={
            (event) => handleMouseMove(
              event,
              drag,
              zoom
            )
          }
          onMouseUp={() => handleMouseUp()}
          onMouseDown={(event) => handleMouseDown(event, zoom)}
          onWheel={(event) => handleWheel(event, coordinates, drag)}>
          <g
            transform={
              `scale(${zoom}) translate(${pan.get('x')}, ${pan.get('y')})`
            }>
            <defs>
              <Arrow id="graph-schema-arrow" />
            </defs>
            <g className="graph-schema-class-links">
              {
                classLinks.toList().map((l) => {
                  return (
                    <ClassLink key={getClassLinkKey(l)}>
                      <ClassLinkPath
                        ref={
                          (p) => {
                            if (R.isNil(p)) {
                              delete this.classLinkPaths[l.get('globalIndex')];
                            } else {
                              this.classLinkPaths[l.get('globalIndex')] = {l, p};
                            }
                          }
                        }
                        id={l.get('globalIndex')}
                        x0={classes.getIn([l.get('source'), 'x'])}
                        y0={classes.getIn([l.get('source'), 'y'])}
                        x1={l.get('x')}
                        y1={l.get('y')}
                        x2={classes.getIn([l.get('target'), 'x'])}
                        y2={classes.getIn([l.get('target'), 'y'])}
                        markerId="graph-schema-arrow" />
                      <ClassLinkLabel
                        id={l.get('globalIndex')}
                        classLink={l} />
                    </ClassLink>
                  );
                })
              }
            </g>
            <g className="graph-schema-classes">
              {
                classes.toList().map((c) => {
                  return <Class key={c.get('name')} cls={c} />;
                })
              }
            </g>
          </g>
        </svg>
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.editorContent !== this.props.editorContent) {
      this.props.handleEditorContentChange(
        this.props.editorContent,
        this.props.dimensions.toJS(),
        this.props.classes,
        this.props.classLinks
      );
    } else if (this.props.shouldUpdateClassLinkLengths) {
      this.props.updateClassLinkLengths(this.classLinkPaths);
    }
  }

  componentDidMount() {
    const {left, top} = this.svg.getBoundingClientRect();
    this.props.init(
      [this.svg.clientWidth, this.svg.clientHeight],
      [left, top],
      this.props.editorContent
    );
  }

  componentWillUnmount() {
    this.props.stopLayout();
  }
}

module.exports = GraphSchema;
