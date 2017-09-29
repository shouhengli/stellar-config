const React = require('react');

module.exports = () => {
  return (
    <div className="field is-horizontal">
      <div className="field-label is-normal">
        <label className="label">
          Source
        </label>
      </div>
      <div className="field-body">
        <div className="field is-grouped">
          <div className="control">
            <div className="select">
              <select>
                <option>http://source.me/people.csv</option>
                <option>http://source.me/vehicles.csv</option>
              </select>
            </div>
          </div>
          <div className="control">
            <button className="button">
              Add
            </button>
          </div>
          <div className="control">
            <input type="text" className="input" placeholder="http://..." />
          </div>
        </div>
      </div>
    </div>
  );
};
