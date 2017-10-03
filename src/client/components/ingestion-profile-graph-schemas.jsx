const React = require('react');
const {defaultToEmptyList, defaultToEmptyString} = require('../util');

class GraphSchemas extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      configContent,
      graphSchemas,
      handleGraphSchemaChange,
    } = this.props;

    return (
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">
            Graph Schema
          </label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control">
              <div className="select">
                <select
                  value={defaultToEmptyString(configContent.get('graphSchema'))}
                  onChange={
                    (event) =>
                      handleGraphSchemaChange(configContent, event.target.value)
                  }>
                  <option>(None)</option>
                  {
                    defaultToEmptyList(graphSchemas).map((s, i) =>
                      <option key={i} value={s}>{s}</option>
                    )
                  }
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentWillMount() {
    this.props.loadGraphSchemas();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.configName !== this.props.configName) {
      this.props.loadGraphSchemas();
    }
  }
}

module.exports = GraphSchemas;
