const React = require('react');

const FullView = ({children}) => {
  return (
    <div className="pane">
      {children}
    </div>
  );
};

module.exports = FullView;
