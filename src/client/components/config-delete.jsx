const React = require('react');
const Close = require('./delete-button.jsx');

module.exports = (props) => {
  const {
    name,
    deleteName,
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
            <input
              className="input is-danger"
              type="text"
              value={deleteName}
              onChange={(event) => handleNameChange(event.target.value)} />
          </div>
          <div className="control">
            {
              name === deleteName
              ? (
                <button
                  className="button is-danger"
                  onClick={() => handleDeleteButtonClick(name)}>
                  Delete
                </button>
              )
              : (
                <button
                  className="button is-danger"
                  disabled={true}>
                  Delete
                </button>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};
