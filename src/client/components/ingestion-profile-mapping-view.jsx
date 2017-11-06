const React = require('react');

const FullView = require('./full-view.jsx');
const SourceColumnLabel = require('./ingestion-profile-mapping-source-column-label.jsx');
const LinkTypeLabel = require('./ingestion-profile-mapping-link-type-label.jsx');

const {
  MAPPING_NODE_TYPE_KEY,
  MAPPING_NODE_ID_KEY,
  MAPPING_LINK_TYPE_KEY,
  MAPPING_LINK_SOURCE_KEY,
  MAPPING_LINK_DESTINATION_KEY,
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
      <h6 className="title is-6">
        {MAPPING_NODE_ID_KEY}
      </h6>
      <p className="source-column-label">
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

const Link = ({link}) =>
  <div className="card">
    <header className="card-header">
      <p className="card-header-title">
        <LinkTypeLabel
          source={link.getIn([MAPPING_LINK_TYPE_KEY, 'source'])}
          name={link.getIn([MAPPING_LINK_TYPE_KEY, 'name'])} />
      </p>
      <a className="card-header-icon">
        <span className="icon">
          <i className="fa fa-pencil-square-o"></i>
        </span>
      </a>
    </header>
    <div className="card-content">
      <h6 className="title is-6">
        {MAPPING_LINK_SOURCE_KEY}
      </h6>
      <p className="source-column-label">
        <SourceColumnLabel
          source={link.getIn([MAPPING_LINK_SOURCE_KEY, 'source'])}
          column={link.getIn([MAPPING_LINK_SOURCE_KEY, 'column'])} />
      </p>
      <h6 className="title is-6">
        {MAPPING_LINK_DESTINATION_KEY}
      </h6>
      <p className="source-column-label">
        <SourceColumnLabel
          source={link.getIn([MAPPING_LINK_DESTINATION_KEY, 'source'])}
          column={link.getIn([MAPPING_LINK_DESTINATION_KEY, 'column'])} />
      </p>
      {
        link
          .delete(MAPPING_LINK_TYPE_KEY)
          .delete(MAPPING_LINK_SOURCE_KEY)
          .delete(MAPPING_LINK_DESTINATION_KEY)
          .map((value, key) => [
            <h6 key="propKey" className="title is-6">{key}</h6>,
            <p key="propvalue" className="source-column-label">
              <SourceColumnLabel source={value.get('source')} column={value.get('column')} />
            </p>,
          ])
          .valueSeq()
      }
    </div>
  </div>;

module.exports =
  ({
    NodeEditor,
    LinkEditor,
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
                  newLinkVisible && (
                    <LinkEditor />
                  )
                }
                {
                  links.map((link, i) =>
                    <Link key={i} link={link} />
                  )
                }
            </div>
          </div>
        </div>
      </div>
    </FullView>;
