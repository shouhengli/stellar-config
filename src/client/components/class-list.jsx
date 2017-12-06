import React from 'react';

export default class ClassList extends React.Component {
  render() {
    const { classes, handleClassClicked, handleCreateNewClass } = this.props;

    return (
      <nav className="panel">
        <p className="panel-heading">Classes</p>
        <div className="panel-block">
          <p className="control has-icons-left">
            <input
              className="input is-small"
              type="text"
              placeholder="search"
            />
            <span className="icon is-small is-left">
              <i className="fa fa-search" />
            </span>
          </p>
        </div>

        {classes.map(cls => (
          <a
            key={cls.get('name')}
            onClick={() => handleClassClicked(cls)}
            className="panel-block is-active">
            {cls.get('name')}
          </a>
        ))}

        <div className="panel-block">
          <button
            onClick={handleCreateNewClass}
            className="button is-link is-outlined is-fullwidth">
            <span className="panel-icon">
              <i className="fa fa-plus" />
            </span>
            Add new class
          </button>
        </div>
      </nav>
    );
  }
}
