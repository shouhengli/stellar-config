const React = require('react');
const R = require('ramda');
const { List } = require('immutable');
const { isNotEmpty } = require('../util');
const { defaultToEmptyList } = require('../util');

const MenuContainer = ({ children }) => <ul>{children}</ul>;
const RootMenuContainer = ({ children }) => (
  <ul className="menu-list">{children}</ul>
);

const InactiveMenuItem = ({ ItemComponent, depth, item, handleClick }) => (
  <li>
    <a onClick={() => handleClick(depth, item)}>
      {R.isNil(ItemComponent) ? item : <ItemComponent item={item} />}
    </a>
  </li>
);

const ActiveMenuItem = ({
  ItemComponent,
  depth,
  item,
  subItemComponents,
  subItemLists,
  activeSubItems,
  handleClick
}) => (
  <li>
    <a className="is-active">
      {R.isNil(ItemComponent) ? item : <ItemComponent item={item} />}
    </a>
    {!subItemLists.isEmpty() && (
      <MenuContainer>
        <MenuItemList
          itemLists={subItemLists}
          activeItems={activeSubItems}
          itemComponents={subItemComponents}
          depth={depth + 1}
          handleClick={handleClick}
        />
      </MenuContainer>
    )}
  </li>
);

const MenuItemList = ({
  depth,
  itemLists,
  activeItems,
  itemComponents,
  handleClick
}) =>
  itemLists
    .get(0, List())
    .map(
      R.ifElse(
        R.equals(activeItems.get(0)),
        item => (
          <ActiveMenuItem
            key={item}
            depth={depth}
            item={item}
            ItemComponent={itemComponents.get(0)}
            subItemComponents={itemComponents.shift()}
            subItemLists={itemLists.shift()}
            activeSubItems={activeItems.shift()}
            handleClick={handleClick}
          />
        ),
        item => (
          <InactiveMenuItem
            ItemComponent={itemComponents.get(0)}
            key={item}
            depth={depth}
            item={item}
            handleClick={handleClick}
          />
        )
      )
    );

const ActiveDropDownMenu = ({
  children,
  itemLists,
  activeItems,
  itemComponents,
  handleItemClick,
  handleButtonClick
}) => (
  <div className="dropdown is-active">
    <div className="dropdown-trigger">
      <button className="button is-active" onClick={() => handleButtonClick()}>
        {children}
        <span className="icon is-small">
          <i className="fa fa-angle-down" />
        </span>
      </button>
    </div>
    {isNotEmpty(itemLists) && (
      <div className="dropdown-menu">
        <div className="dropdown-content">
          <div className="dropdown-item">
            <div className="menu">
              <RootMenuContainer>
                <MenuItemList
                  depth={0}
                  itemLists={defaultToEmptyList(itemLists)}
                  activeItems={defaultToEmptyList(activeItems)}
                  itemComponents={defaultToEmptyList(itemComponents)}
                  handleClick={R.partial(handleItemClick, [
                    itemLists,
                    activeItems
                  ])}
                />
              </RootMenuContainer>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
);

module.exports = ActiveDropDownMenu;
