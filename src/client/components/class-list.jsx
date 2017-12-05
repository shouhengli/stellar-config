import React from 'react';

export default class ClassList extends React.Component {
  render() {
    const { classes, handleClassClicked } = this.props;

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

        {classes.toJS().map(cls => (
          <a
            key={cls.name}
            onClick={() => handleClassClicked(cls)}
            className="panel-block is-active">
            {cls.name}
          </a>
        ))}

        <div className="panel-block">
          <button className="button is-link is-outlined is-fullwidth">
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
