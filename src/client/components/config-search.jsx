const React = require('react');

module.exports = (props) => {
  const {
    Tab,
    ActiveTab,
    Item,
    searchText,
    configTypes,
    activeConfigType,
    configNames,
    handleSearchTextChange,
    handleHideButtonClick,
  } = props;

  return (
    <nav className="panel config-search">
      <div className="panel-block config-search-input">
        <div className="field has-addons">
          <div className="control has-icons-left is-expanded">
            <input
              className="input is-medium"
              type="text"
              value={searchText}
              onChange={(event) => handleSearchTextChange(event)} />
            <span className="icon is-left">
              <i className="fa fa-search"></i>
            </span>
          </div>
          <div className="control">
            <button
              className="button is-medium"
              onClick={() => handleHideButtonClick()}>
              <span className="icon is-small">
                <i className="fa fa-times"></i>
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="panel-tabs">
        {
          configTypes.map((configType) => {
            if (configType === activeConfigType) {
              return <ActiveTab key={configType} title={configType} />;
            } else {
              return <Tab key={configType} title={configType} />;
            }
          })
        }
      </div>
      {
        configNames
            .filter((configName) =>
              configName.indexOf(searchText) >= 0
            )
            .map((configName) =>
              <Item
                key={configName}
                type={activeConfigType}
                name={configName} />
            )
      }
    </nav>
  );
};
