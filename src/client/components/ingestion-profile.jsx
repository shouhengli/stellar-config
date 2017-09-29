const React = require('react');

module.exports = (props) => {
  const {
    Sources,
    GraphSchemas,
    DataTable,
  } = props;

  return (
    <div className="ingestion-profile">
      <div className="control-pane">
        <div className="box">
          <Sources />
          <GraphSchemas />
        </div>
      </div>
      <div className="data-table-view box">
        <div className="scroll-pane">
          <DataTable />
        </div>
      </div>
    </div>
  );
};
