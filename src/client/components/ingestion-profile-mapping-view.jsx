const React = require('react');

const FullView = require('./full-view.jsx');
const SourceColumnLabel = require('./ingestion-profile-mapping-source-column-label.jsx');

const {
  MAPPING_NODE_TYPE_KEY,
  MAPPING_NODE_ID_KEY,
} = require('../ingestion-profile');

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

const Node = ({node}) =>
  <div className="card">
    <header className="card-header">
      <p className="card-header-title">
        {node.get(MAPPING_NODE_TYPE_KEY)}
      </p>
      <a className="card-header-icon">
        <span className="icon">
          <i className="fa fa-pencil-square-o"></i>
        </span>
      </a>
    </header>
    <div className="card-content">
      <h6 key="propKey" className="title is-6">
        {MAPPING_NODE_ID_KEY}
      </h6>
      <p key="propValue" className="source-column-label">
        <SourceColumnLabel
          source={node.getIn([MAPPING_NODE_ID_KEY, 'source'])}
          column={node.getIn([MAPPING_NODE_ID_KEY, 'column'])} />
      </p>
      {
        node.delete(MAPPING_NODE_TYPE_KEY).delete(MAPPING_NODE_ID_KEY).map((value, key) => [
          <h6 key="propKey" className="title is-6">{key}</h6>,
          <p key="propvalue" className="source-column-label">
            <SourceColumnLabel source={value.get('source')} column={value.get('column')} />
          </p>,
        ])
        .valueSeq()
      }
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
                  <Node key={i} node={node} />
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
