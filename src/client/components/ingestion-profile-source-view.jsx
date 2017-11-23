const React = require('react');
const ModalPopUp = require('./modal-pop-up.jsx');
const Sources = require('./ingestion-profile-sources.jsx');
const DataTable = require('./ingestion-profile-data-table.jsx');
const DeleteSource = require('./ingestion-profile-delete-source.jsx');
const FullView = require('./full-view.jsx');
const { isNotEmpty } = require('../util');

module.exports = ({
  newSourceVisible,
  newSource,
  deleteSourceVisible,
  sources,
  selectedSource,
  sample,
  handleSourceChange,
  handleDeleteButtonClick,
  handleAddButtonClick,
  handleNewSourceChange,
  handleNewSourceAddButtonClick,
  handleNewSourceCancelButtonClick,
  handleDeleteSourceYesButtonClick,
  handleDeleteSourceCancelButtonClick
}) => (
  <FullView>
    <div className="ingestion-profile-source-view">
      <div className="control-pane">
        <div className="box">
          <Sources
            newSourceVisible={newSourceVisible}
            newSource={newSource}
            sources={sources}
            selectedSource={selectedSource}
            handleSourceChange={handleSourceChange}
            handleDeleteButtonClick={handleDeleteButtonClick}
            handleAddButtonClick={handleAddButtonClick}
            handleNewSourceChange={handleNewSourceChange}
            handleNewSourceAddButtonClick={handleNewSourceAddButtonClick}
            handleNewSourceCancelButtonClick={handleNewSourceCancelButtonClick}
          />
        </div>
      </div>
      {isNotEmpty(sample) && (
        <div className="data-table box">
          <div className="scroll-pane">
            <DataTable sample={sample} />
          </div>
        </div>
      )}
      {deleteSourceVisible && (
        <ModalPopUp>
          <DeleteSource
            selectedSource={selectedSource}
            handleYesButtonClick={handleDeleteSourceYesButtonClick}
            handleCancelButtonClick={handleDeleteSourceCancelButtonClick}
          />
        </ModalPopUp>
      )}
    </div>
  </FullView>
);
