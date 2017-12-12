import React from 'react';

const graphSchemaPrimitiveTypes = ['string', 'boolean', 'integer', 'float'];

export default class ClassEditor extends React.Component {
  render() {
    const {
      selectedClass,
      relatedClassLinks,
      editAttribute,
      editClassLink,
      classAttributeIndexesToEdit,
      classLinkIndexesToEdit,
      classNames,
      isEditing,
      isEditingClassName,
      saveEdit,
      cancelEdit,
      closeEdit,
      addNewAttribute,
      addNewLink,
      editClassName,
      updateAttributeName,
      updateAttributeType,
      updateClassName
    } = this.props;

    return (
      <div className="panel schema-editor">
        <div className="panel-heading">
          <span
            onBlur={updateClassName}
            contentEditable={isEditingClassName}
            dangerouslySetInnerHTML={{ __html: selectedClass.get('name') }}
          />
          <a
            className={`hover-button button is-small is-text fa fa-pencil ${(isEditingClassName &&
              'is-invisible') ||
              ''}`}
            onClick={editClassName}
          />
          <a
            className={`close-editor button is-pulled-right is-medium ${
              isEditing ? 'is-invisible' : ''
            }`}
            onClick={closeEdit}>
            <span className="icon is-medium fa fa-times fa-lg" />
          </a>
          <div
            className={`field is-grouped is-pulled-right ${
              isEditing ? '' : 'is-invisible'
            }`}>
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
                  .entrySeq()
                  .map((entry, index) => (
                    <tr key={index}>
                      <td>
                        <div
                          onBlur={updateAttributeName}
                          contentEditable={classAttributeIndexesToEdit.contains(
                            index
                          )}
                          dangerouslySetInnerHTML={{ __html: entry[0] }}
                        />
                      </td>
                      <td>
                        {classAttributeIndexesToEdit.contains(index) ? (
                          <div className="select">
                            <select
                              value={entry[1]}
                              onChange={updateAttributeType}>
                              {graphSchemaPrimitiveTypes.map(t => (
                                <option key={t}>{t}</option>
                              ))}
                            </select>
                          </div>
                        ) : (
                          entry[1]
                        )}
                      </td>
                      <td className="is-narrow">
                        <a
                          className={`hover-button fa fa-pencil ${
                            classAttributeIndexesToEdit.contains(index)
                              ? 'is-invisible'
                              : ''
                          }`}
                          onClick={() => editAttribute(index)}
                        />
                      </td>
                      <td className="is-narrow">
                        <a className="fa fa-times hover-button" />
                      </td>
                    </tr>
                  ))}
                <tr>
                  <td colSpan="4">
                    <a
                      onClick={addNewAttribute}
                      className="button is-link is-outlined is-fullwidth">
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
                {relatedClassLinks.toJS().map((link, index) => (
                  <tr key={link.name}>
                    <td>
                      <div
                        contentEditable={classLinkIndexesToEdit.contains(index)}
                        dangerouslySetInnerHTML={{ __html: link.name }}
                      />
                    </td>
                    <td>
                      {classLinkIndexesToEdit.contains(index) ? (
                        <div className="select">
                          <select value={link.source}>
                            {classNames.map(t => <option key={t}>{t}</option>)}
                          </select>
                        </div>
                      ) : (
                        link.source
                      )}
                    </td>
                    <td>
                      {classLinkIndexesToEdit.contains(index) ? (
                        <div className="select">
                          <select value={link.target}>
                            {classNames.map(t => <option key={t}>{t}</option>)}
                          </select>
                        </div>
                      ) : (
                        link.target
                      )}
                    </td>
                    <td className="is-narrow">
                      <a
                        className={`hover-button fa fa-pencil ${
                          classLinkIndexesToEdit.contains(index)
                            ? 'is-invisible'
                            : ''
                        }`}
                        onClick={() => editClassLink(index)}
                      />
                    </td>
                    <td className="is-narrow">
                      <a className="hover-button fa fa-times" />
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="5">
                    <a
                      onClick={addNewLink}
                      className="button is-link is-outlined is-fullwidth">
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
