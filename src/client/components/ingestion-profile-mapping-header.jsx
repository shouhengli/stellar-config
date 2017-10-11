const React = require('react');

const ActiveDropDownContainer = ({children}) =>
  <div className="dropdown is-active">{children}</div>;

const InactiveDropDownContainer = ({children}) =>
  <div className="dropdown">{children}</div>;

const ActiveDropDownButton = ({handleClick, text}) =>
  <button
    className="button is-primary is-active"
    onClick={() => handleClick()}>
    <span>{text}</span>
  </button>;

const InactiveDropDownButton = ({handleClick, text}) =>
  <button
    className="button is-primary is-outlined"
    onClick={() => handleClick()}>
    <span>{text}</span>
  </button>;

const InactiveClassName = ({handleClick, className}) =>
  <li><a onClick={() => handleClick(className)}>{className}</a></li>;

const ActiveClassName =
  ({
    handlePropClick,
    className,
    propNames,
  }) =>
    <li>
      <a className="is-active">
        {className}
      </a>
      <ul>
        {
          propNames.map((propName) =>
            <li key={propName}>
              <a onClick={() => handlePropClick(className, propName)}>
                {propName}
              </a>
            </li>
          )
        }
      </ul>
    </li>;

const MappingHeader = (props) => {
  const {
    active,
    classNames,
    selectedClassName,
    propNamesForSelectedClass,
    handlePropClick,
    handleClassClick,
    handleToggleDropDownButton,
  } = props;

  const DropDownContainer = active
                          ? ActiveDropDownContainer
                          : InactiveDropDownContainer;

  const DropDownButton = active
                       ? ActiveDropDownButton
                       : InactiveDropDownButton;

  return (
    <DropDownContainer>
      <div>
        <DropDownButton handleClick={() => handleToggleDropDownButton(!active)} />
      </div>
      <div className="dropdown-menu">
        <div className="dropdown-content">
          <div className="dropdown-item">
            <div className="menu">
              <ul className="menu-list">
                {
                  classNames.map((className) => {
                    if (className === selectedClassName) {
                      return <ActiveClassName
                               className={className}
                               propNames={propNamesForSelectedClass}
                               handlePropClick={handlePropClick} />;
                    } else {
                      return <InactiveClassName
                               className={className}
                               handleClassClick={handleClassClick} />;
                    }
                  })
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DropDownContainer>
  );
};

module.exports = MappingHeader;
