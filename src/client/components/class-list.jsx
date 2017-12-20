import React from 'react';

export default class ClassList extends React.Component {
  handleClassClicked = e => {
    const globalIndex = e.target.dataset.globalIndex;
    const selectedCls = this.props.classes.get(globalIndex);
    this.props.handleClassClicked(selectedCls);
  };

  handleDeleteClass = e => {
    const globalIndex = e.target.dataset.globalIndex;
    const selectedCls = this.props.classes.get(globalIndex);
    this.props.handleDeleteClass(selectedCls);
  };

  render() {
    const { classes, handleCreateNewClass, isEditing } = this.props;

    return (
      <nav className="panel class-list">
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

        {classes.valueSeq().map(cls => (
          <a
            key={cls.get('globalIndex')}
            className={
              'panel-block' + (cls.get('selected') ? ' is-active' : '')
            }
          >
            <span
              className="class-name"
              data-global-index={cls.get('globalIndex')}
              onClick={this.handleClassClicked}
            >
              {cls.get('name')}
            </span>
            <span
              data-global-index={cls.get('globalIndex')}
              className="fa fa-trash hover-button"
              onClick={this.handleDeleteClass}
            />
          </a>
        ))}

        <div className={'panel-block' + (isEditing ? ' is-invisible' : '')}>
          <button
            onClick={handleCreateNewClass}
            className="button is-link is-outlined is-fullwidth"
          >
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
