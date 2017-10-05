const R = require('ramda');
const React = require('react');
const ModalView = require('./modal-view.jsx');

module.exports = (props) => {
  const {
    Sources,
    GraphSchemas,
    DataTable,
    SourceDelete,
    sourceDeleteVisible,
    sample,
  } = props;

  return (
    <div className="ingestion-profile">
      <div className="control-pane">
        <div className="box">
          <Sources />
          <GraphSchemas />
        </div>
      </div>
      {
        R.not(R.isNil(sample)) && (
          <div className="data-table-view box">
            <div className="scroll-pane">
              <DataTable />
            </div>
          </div>
        )
      }
      {
        sourceDeleteVisible && (
          <ModalView>
            <SourceDelete />
          </ModalView>
        )
      }
    </div>
  );
};
