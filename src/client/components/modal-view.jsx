const React = require('react');

const ModalView = ({children, active}) => {
  return (
    <div className={active ? 'modal is-active' : 'modal'}>
      <div className="modal-background"></div>
      <div className="modal-content">
        {children}
      </div>
    </div>
  );
};

module.exports = ModalView;
