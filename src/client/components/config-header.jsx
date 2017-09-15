const React = require('react');

module.exports = ({configType, configName}) => {
  return (
    <div className="tags has-addons">
      <span className="tag is-medium is-primary">
        {configType}
      </span>
      <span className="tag is-medium">
        {configName}
      </span>
    </div>
  );
};
