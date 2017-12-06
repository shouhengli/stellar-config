import React from 'react';

const graphSchemaPrimitiveTypes = ['string', 'boolean', 'integer', 'float'];

export default class ClassEditor extends React.Component {
  render() {
    const {
      selectedClass,
      relatedClassLinks,
      editAttribute,
      editClassLink,
      classIndexesToEdit,
      classLinkIndexesToEdit,
      classNames
    } = this.props;

    return (
      <div className="panel schema-editor">
        <div className="panel-heading">{selectedClass.get('name')}</div>
        <div className="panel-block is-size-7">
          <form className="column is-half">
            <div className="subtitle">Attributes</div>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th className="is-narrow"></th>
                  <th className="is-narrow"></th>
                </tr>
              </thead>
              <tbody>
                {selectedClass.get('props').entrySeq().map((entry, index) => (
                  <tr key={index}>
                    <td>
                      <div contentEditable={classIndexesToEdit.contains(index)}>{entry[0]}</div>
                    </td>
                    <td>
                      {classIndexesToEdit.contains(index) ? (
                        <div className="select">
                          <select value={entry[1]}>
                            {graphSchemaPrimitiveTypes.map(t => <option key={t}>{t}</option>)}
                          </select>
                        </div>)
                        :
                        entry[1]
                      }
                    </td>
                    <td className="is-narrow">
                      <a className={classIndexesToEdit.contains(index) ? 'fa fa-pencil is-invisible' : 'fa fa-pencil'}
                        onClick={() => editAttribute(index)} />
                    </td>
                    <td className="is-narrow">
                      <a className="fa fa-times" />
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="4">
                    <button className="button is-link is-outlined is-fullwidth">
                      <span className="panel-icon">
                        <i className="fa fa-plus" />
                      </span>
                      Add a new attribute
                    </button>
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
                  <td className="is-narrow"></td>
                  <th className="is-narrow"></th>
                </tr>
              </thead>
              <tbody>
                {relatedClassLinks.toJS().map((link, index) => (
                  <tr key={link.name}>
                    <td>
                      <div contentEditable={classLinkIndexesToEdit.contains(index)}>
                        {link.name}
                      </div>
                    </td>
                    <td>
                      {classLinkIndexesToEdit.contains(index) ? (
                        <div className="select">
                          <select value={link.source}>
                            {classNames.map(t => <option key={t}>{t}</option>)}
                          </select>
                        </div>)
                        :
                        link.source
                      }
                    </td>
                    <td>
                      {classLinkIndexesToEdit.contains(index) ? (
                        <div className="select">
                          <select value={link.target}>
                            {classNames.map(t => <option key={t}>{t}</option>)}
                          </select>
                        </div>)
                        :
                        link.target
                      }
                    </td>
                    <td className="is-narrow">
                      <a className={classLinkIndexesToEdit.contains(index) ? 'fa fa-pencil is-invisible' : 'fa fa-pencil'}
                        onClick={() => editClassLink(index)} />
                    </td>
                    <td className="is-narrow"><a className="fa fa-times" /></td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="5">
                    <button className="button is-link is-outlined is-fullwidth">
                      <span className="panel-icon">
                        <i className="fa fa-plus" />
                      </span>
                      Add a new link
                    </button>
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
