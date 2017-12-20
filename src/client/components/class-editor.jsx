import React from 'react';

const graphSchemaPrimitiveTypes = ['string', 'boolean', 'integer', 'float'];

export default class ClassEditor extends React.Component {
  updateClassName = e => this.props.updateClassName(e.target.textContent);

  updateAttributeName = e =>
    this.props.updateAttributeName(
      this.props.selectedClass.getIn(['props', e.target.dataset.globalIndex]),
      e.target.textContent
    );

  updateAttributeType = e =>
    this.props.updateAttributeType(
      this.props.selectedClass.getIn(['props', e.target.dataset.globalIndex]),
      e.target.value
    );

  deleteAttribute = e =>
    this.props.deleteAttribute(
      this.props.selectedClass.getIn(['props', e.target.dataset.globalIndex])
    );

  editAttribute = e =>
    this.props.editAttribute(
      this.props.selectedClass.getIn(['props', e.target.dataset.globalIndex])
    );

  editClassLink = e =>
    this.props.editClassLink(
      this.props.stagedClassLinks.get(e.target.dataset.globalIndex)
    );

  addNewLink = () => this.props.addNewLink(this.props.selectedClass);

  updateLinkName = e =>
    this.props.updateLinkName(
      this.props.stagedClassLinks.get(e.target.dataset.globalIndex),
      e.target.textContent
    );

  updateLinkSource = e =>
    this.props.updateLinkSource(
      this.props.stagedClassLinks.get(e.target.dataset.globalIndex),
      this.props.classes.get(e.target.value)
    );

  updateLinkTarget = e =>
    this.props.updateLinkTarget(
      this.props.stagedClassLinks.get(e.target.dataset.globalIndex),
      this.props.classes.get(e.target.value)
    );

  deleteLink = e =>
    this.props.deleteLink(
      this.props.stagedClassLinks.get(e.target.dataset.globalIndex)
    );

  render() {
    const {
      selectedClass,
      stagedClassLinks,
      classes,
      isEditing,
      saveEdit,
      closeEdit,
      addNewAttribute,
      editClassName,
      cancelEdit
    } = this.props;

    return (
      <div className="panel schema-editor">
        <div className="panel-heading">
          <span
            onBlur={this.updateClassName}
            contentEditable={selectedClass.get('isEditingName')}
            dangerouslySetInnerHTML={{ __html: selectedClass.get('name') }}
          />
          <a
            className={`hover-button button is-small is-text fa fa-pencil ${(selectedClass.get(
              'isEditingName'
            ) &&
              'is-invisible') ||
              ''}`}
            onClick={editClassName}
          />
          <a
            className={`close-editor button is-pulled-right is-medium ${
              isEditing ? 'is-invisible' : ''
            }`}
            onClick={closeEdit}
          >
            <span className="icon is-medium fa fa-times fa-lg" />
          </a>
          <div
            className={`field is-grouped is-pulled-right ${
              isEditing ? '' : 'is-invisible'
            }`}
          >
            <p className="control">
              <a className="button is-small is-primary" onClick={saveEdit}>
                Save
              </a>
            </p>
            <p className="control">
              <a className="button is-small" onClick={cancelEdit}>
                Cancel
              </a>
            </p>
          </div>
        </div>
        <div className="panel-block is-size-7">
          <form className="column is-half">
            <div className="subtitle">Attributes</div>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th className="is-narrow" />
                  <th className="is-narrow" />
                </tr>
              </thead>
              <tbody>
                {selectedClass
                  .get('props')
                  .valueSeq()
                  .map(prop => (
                    <tr key={prop.get('globalIndex')}>
                      <td>
                        <div
                          data-global-index={prop.get('globalIndex')}
                          onBlur={this.updateAttributeName}
                          contentEditable={prop.get('isEditing')}
                          dangerouslySetInnerHTML={{ __html: prop.get('name') }}
                        />
                      </td>
                      <td>
                        {prop.get('isEditing') ? (
                          <div className="select">
                            <select
                              data-global-index={prop.get('globalIndex')}
                              value={prop.get('type')}
                              onChange={this.updateAttributeType}
                            >
                              {graphSchemaPrimitiveTypes.map(t => (
                                <option key={t}>{t}</option>
                              ))}
                            </select>
                          </div>
                        ) : (
                          prop.get('name')
                        )}
                      </td>
                      <td className="is-narrow">
                        <a
                          data-global-index={prop.get('globalIndex')}
                          className={`hover-button fa fa-pencil ${
                            prop.get('isEditing') ? 'is-invisible' : ''
                          }`}
                          onClick={this.editAttribute}
                        />
                      </td>
                      <td className="is-narrow">
                        <a
                          data-global-index={prop.get('globalIndex')}
                          className="fa fa-trash hover-button"
                          onClick={this.deleteAttribute}
                        />
                      </td>
                    </tr>
                  ))}
                <tr>
                  <td colSpan="4">
                    <a
                      onClick={addNewAttribute}
                      className="button is-link is-outlined is-fullwidth"
                    >
                      <span className="panel-icon">
                        <i className="fa fa-plus" />
                      </span>
                      Add a new attribute
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
          <form className="column is-half">
            <div className="subtitle">Links</div>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Source</th>
                  <th>target</th>
                  <td className="is-narrow" />
                  <th className="is-narrow" />
                </tr>
              </thead>
              <tbody>
                {stagedClassLinks.valueSeq().map(link => (
                  <tr key={link.get('globalIndex')}>
                    <td>
                      <div
                        data-global-index={link.get('globalIndex')}
                        onBlur={this.updateLinkName}
                        contentEditable={link.get('isEditing')}
                        dangerouslySetInnerHTML={{ __html: link.get('name') }}
                      />
                    </td>
                    <td>
                      {link.get('isEditing') ? (
                        <div className="select">
                          <select
                            value={link.get('source')}
                            data-global-index={link.get('globalIndex')}
                            onChange={this.updateLinkSource}
                          >
                            {classes.valueSeq().map(cls => (
                              <option
                                key={cls.get('globalIndex')}
                                value={cls.get('globalIndex')}
                              >
                                {cls.get('name')}
                              </option>
                            ))}
                          </select>
                        </div>
                      ) : (
                        link.get('source')
                      )}
                    </td>
                    <td>
                      {link.get('isEditing') ? (
                        <div className="select">
                          <select
                            value={link.get('target')}
                            data-global-index={link.get('globalIndex')}
                            onChange={this.updateLinkTarget}
                          >
                            {classes.valueSeq().map(cls => (
                              <option
                                key={cls.get('globalIndex')}
                                value={cls.get('globalIndex')}
                              >
                                {cls.get('name')}
                              </option>
                            ))}
                          </select>
                        </div>
                      ) : (
                        link.get('target')
                      )}
                    </td>
                    <td className="is-narrow">
                      <a
                        className={`hover-button fa fa-pencil ${
                          link.get('isEditing') ? 'is-invisible' : ''
                        }`}
                        data-global-index={link.get('globalIndex')}
                        onClick={this.editClassLink}
                      />
                    </td>
                    <td className="is-narrow">
                      <a
                        className="hover-button fa fa-trash"
                        data-global-index={link.get('globalIndex')}
                        onClick={this.deleteLink}
                      />
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="5">
                    <a
                      onClick={this.addNewLink}
                      className="button is-link is-outlined is-fullwidth"
                    >
                      <span className="panel-icon">
                        <i className="fa fa-plus" />
                      </span>
                      Add a new link
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </div>
    );
  }
}
