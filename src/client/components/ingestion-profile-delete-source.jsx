const React = require('react');
const Close = require('./delete-button.jsx');

module.exports = props => {
  const {
    selectedSource,
    handleYesButtonClick,
    handleCancelButtonClick
  } = props;

  return (
    <div className="message is-danger">
      <div className="message-header">
        Confirmation
        <Close handleClick={handleCancelButtonClick} />
      </div>
      <div className="message-body">
        <div className="content">
          <p>The following source will be deleted. Are you sure?</p>
          <blockquote>{selectedSource}</blockquote>
        </div>
        <div className="field is-grouped is-grouped-centered">
          <div className="control">
            <button
              className="button is-danger"
              onClick={() => handleYesButtonClick(selectedSource)}>
              Yes
            </button>
          </div>
          <div className="control">
            <button className="button" onClick={handleCancelButtonClick}>
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
