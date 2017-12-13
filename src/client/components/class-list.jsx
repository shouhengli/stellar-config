import React from 'react';

export default class ClassList extends React.Component {
  handleClassClicked = e => {
    const index = e.target.dataset.globalIndex;
    const selectedCls = this.props.classes.find(
      cls => cls.get('globalIndex') == index
    );
    this.props.handleClassClicked(selectedCls);
  };

  render() {
    const {
      selectedClass,
      classes,
      handleCreateNewClass,
      isEditing
    } = this.props;

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
            key={cls.get('globalIndex')}
            data-global-index={cls.get('globalIndex')}
            onClick={this.handleClassClicked}
            className={
              'panel-block' +
              (selectedClass && cls.get('name') === selectedClass.get('name')
                ? ' is-active'
                : '')
            }>
            {cls.get('name')}
          </a>
        ))}

        <div className={'panel-block' + (isEditing ? ' is-invisible' : '')}>
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
