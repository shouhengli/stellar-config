const React = require('react');
const R = require('ramda');
const {List} = require('immutable');
const {isNotEmpty} = require('../util');

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
      <a className="is-active">
        {item}
      </a>
      {
        !subItemLists.isEmpty() && (
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
    itemLists
      .get(0, List())
      .map(
        R.ifElse(
          R.equals(activeItems.get(0)),
          (item) =>
            <ActiveMenuItem
              key={item}
              depth={depth}
              item={item}
              subItemLists={itemLists.shift()}
              activeSubItems={activeItems.shift()}
              handleClick={handleClick} />,
          (item) =>
            <InactiveMenuItem
              key={item}
              depth={depth}
              item={item}
              handleClick={handleClick} />
        )
    );

const ActiveDropDownMenu =
  ({
    children,
    itemLists,
    activeItems,
    handleItemClick,
    handleButtonClick,
  }) =>
    <div className="dropdown is-active">
      <div className="dropdown-trigger">
        <button
          className="button is-active"
          onClick={() => handleButtonClick()}>
          {children}
          <span className="icon is-small">
            <i className="fa fa-angle-down"></i>
          </span>
        </button>
      </div>
      {
        isNotEmpty(itemLists) && (
          <div className="dropdown-menu">
            <div className="dropdown-content">
              <div className="dropdown-item">
                <div className="menu">
                  <RootMenuContainer>
                    <MenuItemList
                      depth={0}
                      itemLists={itemLists}
                      activeItems={activeItems}
                      handleClick={R.partial(handleItemClick, [itemLists, activeItems])} />
                  </RootMenuContainer>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div>;

module.exports = ActiveDropDownMenu;
