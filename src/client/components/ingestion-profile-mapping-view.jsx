const React = require('react');
const R = require('ramda');
const FullView = require('./full-view.jsx');

const Header = ({title, handleAddButtonClick}) =>
  <div className="header">
    <button key="add" className="button is-pulled-right" onClick={() => handleAddButtonClick()}>
      <span className="icon">
        <i className="fa fa-plus"></i>
      </span>
    </button>
    <h3 key="title" className="title">
      {title}
    </h3>
  </div>;

const PropMappings = ({propMappings}) =>
  R.toPairs(propMappings).map(([source, mappings]) => [
    <p key={`source-${source}`} className="source">
      {source}
    </p>,
    <table key={`mappings-${source}`} className="table is-fullwidth">
      <thead>
        <tr>
          <th>Property</th>
          <th>Column</th>
        </tr>
      </thead>
      <tbody>
        {
          R.toPairs(mappings).map(([prop, column]) =>
            <tr key={prop}>
              <td>{prop}</td>
              <td>{column}</td>
            </tr>
          )
        }
      </tbody>
    </table>,
  ]);

const Node = ({name, propMappings}) =>
  <div className="card">
    <header className="card-header">
      <p className="card-header-title">
        {name}
      </p>
      <a className="card-header-icon">
        <span className="icon">
          <i className="fa fa-pencil-square-o"></i>
        </span>
      </a>
    </header>
    <div className="card-content">
      <h6 className="title is-6">Property Mappings</h6>
      <PropMappings propMappings={propMappings} />
    </div>
  </div>;

const Link = ({name, src, dest, propMappings}) =>
  <div className="card">
    <header className="card-header">
      <p className="card-header-title">
        {name}
      </p>
      <a className="card-header-icon">
        <span className="icon">
          <i className="fa fa-pencil-square-o"></i>
        </span>
      </a>
    </header>
    <div className="card-content">
      <p className="link-title">
        <span className="icon">
          <i className="fa fa-lg fa-sign-out"></i>
        </span>
        <span className="link-column">
          {src.column}
        </span>
      </p>
      <p className="source">
        {src.source}
      </p>
      <hr />
      <p className="link-title">
        <span className="icon">
          <i className="fa fa-lg fa-sign-in"></i>
        </span>
        <span className="link-column">
          {dest.column}
        </span>
      </p>
      <p className="source">
        {dest.source}
      </p>
      <hr />
      <h6 className="title is-6">Property Mappings</h6>
      <PropMappings propMappings={propMappings} />
    </div>
  </div>;

module.exports =
  ({
    NodeEditor,
    nodes,
    links,
    newNodeVisible,
    newLinkVisible,
    handleAddNodeButtonClick,
    handleAddLinkButtonClick,
  }) =>
    <FullView>
      <div className="ingestion-profile-mapping-view">
        <div className="container">
          <div className="columns">
            <div className="column is-half">
              <Header
                title="Nodes"
                handleAddButtonClick={() => handleAddNodeButtonClick()} />
              {
                newNodeVisible && (
                  <NodeEditor />
                )
              }
              {
                nodes.map((node, i) =>
                  <Node
                    key={i}
                    name={node.get('type')}
                    propMappings={node.get('props')} />
                )
              }
            </div>
            <div className="column is-half">
              <Header
                title="Links"
                handleAddButtonClick={() => handleAddLinkButtonClick()} />
                {
                  links.map((link, i) =>
                    <Link
                      key={i}
                      name={link.get('type')}
                      src={link.get('src')}
                      dest={link.get('dest')}
                      propMappings={link.get('props')} />
                  )
                }
            </div>
          </div>
        </div>
      </div>
    </FullView>;
