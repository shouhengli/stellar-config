import React from 'react';
import R from 'ramda';

export default class ClassEditor extends React.Component {
  render() {
    const { selectedClass, relatedClassLinks } = this.props;

    return (
      <div className="panel schema-editor">
        <div className="panel-heading">I am a header</div>
        <div className="panel-block is-size-7">
          <form className="column is-half">
            <div className="subtitle">Attributes</div>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {R.toPairs(selectedClass.props).map(entry => (
                  <tr key={entry[0]}>
                    <th>{entry[0]}</th>
                    <td>{entry[1]}</td>
                    <td><a className="fa fa-times" /></td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="3">
                    <button className="button is-link is-outlined is-fullwidth">
                      <span className="panel-icon">
                        <i className="fa fa-plus" />
                      </span>
                      Add a new class
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
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {relatedClassLinks.toJS().map(link => (
                  <tr key={link.globalIndex}>
                    <th>{link.name}</th>
                    <td>{link.source}</td>
                    <td>{link.target}</td>
                    <td><a className="fa fa-times" /></td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="4">
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
