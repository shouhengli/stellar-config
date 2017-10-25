const React = require('react');
const R = require('ramda');
const {isNotEmpty} = require('../util');

const ActiveDropDownContainer = ({children}) =>
  <div className="dropdown is-active">{children}</div>;

const InactiveDropDownContainer = ({children}) =>
  <div className="dropdown">{children}</div>;

const ActiveDropDownButton = ({handleClick, children}) =>
  <button
    className="button is-active"
    onClick={() => handleClick()}>
    <span>{children}</span>
    <span className="icon is-small">
      <i className="fa fa-angle-down"></i>
    </span>
  </button>;

const InactiveDropDownButton = ({handleClick, children}) =>
  <button
    className="button"
    onClick={() => handleClick()}>
    <span>{children}</span>
    <span className="icon is-small">
      <i className="fa fa-angle-down"></i>
    </span>
  </button>;

const MenuContainer = ({children}) => <ul>{children}</ul>;
const RootMenuContainer = ({children}) => <ul className="menu-list">{children}</ul>;

const InactiveMenuItem = ({handleClick, depth, item}) =>
  <li><a onClick={() => handleClick(depth, item)}>{item}</a></li>;

const ActiveMenuItem =
  ({
    depth,
    item,
    subItemLists,
    activeSubItems,
    handleClick,
  }) =>
    <li>
      <a className="is-active" onClick={() => handleClick(depth, item)}>
        {item}
      </a>
      {
        isNotEmpty(subItemLists) && (
          <MenuContainer>
            <MenuItemList
              itemLists={subItemLists}
              activeItems={activeSubItems}
              depth={depth + 1}
              handleClick={handleClick} />
          </MenuContainer>
        )
      }
    </li>;

const MenuItemList =
  ({
    depth,
    itemLists,
    activeItems,
    handleClick,
  }) =>
    R.pipe(
      R.head,
      R.map(
        R.ifElse(
          R.equals(R.head(activeItems)),
          (item) =>
            <ActiveMenuItem
              key={item}
              depth={depth}
              item={item}
              subItemLists={R.tail(itemLists)}
              activeSubItems={R.tail(activeItems)}
              handleClick={handleClick} />,
          (item) =>
            <InactiveMenuItem
              key={item}
              depth={depth}
              item={item}
              handleClick={handleClick} />
        )
      )
    )(itemLists);

const DropDownMenu =
  ({
    children,
    active,
    itemLists,
    activeItems,
    handleItemClick,
    handleButtonClick,
  }) => {
    const DropDownContainer = active
      ? ActiveDropDownContainer
      : InactiveDropDownContainer;

    const DropDownButton = active
      ? ActiveDropDownButton
      : InactiveDropDownButton;

    return (
      <DropDownContainer>
        <div className="dropdown-trigger">
          <DropDownButton handleClick={() => handleButtonClick(!active)}>
            {children}
          </DropDownButton>
        </div>
        <div className="dropdown-menu">
          <div className="dropdown-content">
            {
              isNotEmpty(itemLists) && (
                <div className="dropdown-item">
                  <div className="menu">
                    <RootMenuContainer>
                      <MenuItemList
                        depth={0}
                        itemLists={itemLists}
                        activeItems={activeItems}
                        handleClick={handleItemClick} />
                    </RootMenuContainer>
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </DropDownContainer>
    );
  };

module.exports = DropDownMenu;
