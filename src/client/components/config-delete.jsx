const React = require('react');
const Confirmation = require('./config-delete-confirmation.jsx');
const Close = require('./delete-button.jsx');
const Yes = require('./config-delete-yes.jsx');

module.exports = (props) => {
  const {
    configType,
    configName,
    configDeleteName,
    confirmed,
    handleNameChange,
    handleCloseButtonClick,
    handleDeleteButtonClick,
  } = props;

  return (
    <div className="message is-danger">
      <div className="message-header">
        Confirmation
        <Close handleClick={handleCloseButtonClick} />
      </div>
      <div className="message-body">
        <p>
          Please type the configuration name to confirm the deletion.
        </p>
        <div className="field has-addons">
          <div className="control is-expanded">
            <Confirmation
              configDeleteName={configDeleteName}
              handleChange={handleNameChange} />
          </div>
          <div className="control">
            {
              confirmed
              ?
              <Yes
                configType={configType}
                configName={configName}
                handleClick={handleDeleteButtonClick} />
              :
              <button
                className="button is-danger"
                disabled={true}>
                Delete
              </button>
            }
          </div>
        </div>
      </div>
    </div>
  );
};
