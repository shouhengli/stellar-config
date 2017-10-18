const React = require('react');
const ModalPopUp = require('./modal-pop-up.jsx');
const Sources = require('./ingestion-profile-sources.jsx');
const DataTable = require('./ingestion-profile-data-table.jsx');
const DeleteSource = require('./ingestion-profile-delete-source.jsx');
const {isNotEmpty} = require('../util');

module.exports = (props) => {
  const {
    newSourceVisible,
    newSource,
    deleteSourceVisible,
    sources,
    selectedSource,
    sample,
    handleSourceChange,
    handleSourceDidChange,
    handleDeleteButtonClick,
    handleAddButtonClick,
    handleNewSourceChange,
    handleNewSourceAddButtonClick,
    handleNewSourceCancelButtonClick,
    handleDeleteSourceYesButtonClick,
    handleDeleteSourceCancelButtonClick,
  } = props;

  return (
    <div className="ingestion-profile">
      <div className="control-pane">
        <div className="box">
          <Sources
            newSourceVisible={newSourceVisible}
            newSource={newSource}
            sources={sources}
            selectedSource={selectedSource}
            handleSourceChange={handleSourceChange}
            handleSourceDidChange={handleSourceDidChange}
            handleDeleteButtonClick={handleDeleteButtonClick}
            handleAddButtonClick={handleAddButtonClick}
            handleNewSourceChange={handleNewSourceChange}
            handleNewSourceAddButtonClick={handleNewSourceAddButtonClick}
            handleNewSourceCancelButtonClick={handleNewSourceCancelButtonClick} />
        </div>
      </div>
      {
        isNotEmpty(sample) && (
          <div className="data-table box">
            <div className="scroll-pane">
              <DataTable sample={sample} />
            </div>
          </div>
        )
      }
      {
        deleteSourceVisible && (
          <ModalPopUp>
            <DeleteSource
              selectedSource={selectedSource}
              handleYesButtonClick={handleDeleteSourceYesButtonClick}
              handleCancelButtonClick={handleDeleteSourceCancelButtonClick} />
          </ModalPopUp>
        )
      }
    </div>
  );
};
