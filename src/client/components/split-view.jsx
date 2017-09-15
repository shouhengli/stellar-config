const React = require('react');

const SplitView = ({children}) => {
  const [leftChild, rightChild] = React.Children.toArray(children);
  return (
    <div>
      <div className="pane is-half is-pulled-left">
        {leftChild}
      </div>
      <div className="pane is-half is-pulled-right">
        {rightChild}
      </div>
    </div>
  );
};

module.exports = SplitView;
