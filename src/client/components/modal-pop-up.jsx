const React = require('react');

const ModalView = ({ children }) => {
  return (
    <div className="modal is-active">
      <div className="modal-background" />
      <div className="modal-content">{children}</div>
    </div>
  );
};

module.exports = ModalView;
