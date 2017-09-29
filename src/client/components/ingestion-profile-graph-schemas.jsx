const React = require('react');

module.exports = () => {
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
              <select>
                <option>Package</option>
                <option>Person</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
