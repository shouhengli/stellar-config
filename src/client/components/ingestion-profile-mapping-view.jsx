const React = require('react');
const R = require('ramda');
const FullView = require('./full-view.jsx');
const DropDownMenu = require('./drop-down-menu.jsx');
const {isNotEmpty} = require('../util');

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

const Link = ({name, linkFrom, linkTo, propMappings}) =>
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
          {linkFrom.column}
        </span>
      </p>
      <p className="source">
        {linkFrom.source}
      </p>
      <hr />
      <p className="link-title">
        <span className="icon">
          <i className="fa fa-lg fa-sign-in"></i>
        </span>
        <span className="link-column">
          {linkFrom.column}
        </span>
      </p>
      <p className="source">
        {linkTo.source}
      </p>
      <hr />
      <h6 className="title is-6">Property Mappings</h6>
      <PropMappings propMappings={propMappings} />
    </div>
  </div>;

const NodeEditor =
  ({
    className,
    dropDownMenuActive,
  }) =>
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">
          New Node
        </p>
        <a className="card-header-icon">
          <span className="icon">
            <i className="fa fa-times"></i>
          </span>
        </a>
      </header>
      <div className="card-content">
        <div className="field">
          <a className="delete-section-button">
            <span className="icon">
              <i className="fa fa-times"></i>
            </span>
          </a>
          <label className="label">Node Type</label>
          <DropDownMenu
            active={dropDownMenuActive}
            itemLists={[
              [
                'Person',
                'Place',
                'A Super Long Class Name Which No One Would Actually Use',
                'And So Many Meaningless Class Name 1',
                'And So Many Meaningless Class Name 2',
                'And So Many Meaningless Class Name 3',
                'And So Many Meaningless Class Name 4',
                'And So Many Meaningless Class Name 5',
                'http://source.me/a-loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong-path/people.csv',
              ],
              ['name', 'age'],
            ]}
            activeItems={['Person', 'age']}
            handleItemClick={() => {}}
            handleButtonClick={() => {}}>
            {
              isNotEmpty(className)
              ? [
                <span key="0" className="icon">
                  <i className="fa fa-file-o"></i>
                </span>,
                <span key="1">
                  http://source.me/a-loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong-path/people.csv
                </span>,
                <span key="2" className="icon">
                  <i className="fa fa-columns"></i>
                </span>,
                <span key="3">
                  name
                </span>,
              ]
              : '(None)'
            }
          </DropDownMenu>
        </div>
        <div className="field">
          <label className="label">
            Property
          </label>
          <DropDownMenu
            buttonText="(None)"
            active={false}
            handleItemClick={() => {}}
            handleButtonClick={() => {}} />
        </div>
        <div className="field">
          <label className="label">
            Column
          </label>
          <DropDownMenu
            buttonText="(None)"
            active={false}
            handleItemClick={() => {}}
            handleButtonClick={() => {}} />
        </div>
      </div>
      <footer className="card-footer">
        <a className="card-footer-item">New Property</a>
        <a className="card-footer-item">Save</a>
      </footer>
    </div>;

module.exports =
  ({
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
                  <NodeEditor className='test' dropDownMenuActive={true} />
                )
              }
              <Node
                name="Person"
                propMappings={{
                  [`http://source.me/a-l${R.repeat('o', 100).join('')}ng-path/people.csv`]: {
                    name: 'full name',
                    age: 'age',
                    gender: 'sex',
                  },
                  'people2.csv': {
                    height: 'height',
                  },
                }} />
              <Node
                name="Person"
                propMappings={{
                  [`http://source.me/a-l${R.repeat('o', 100).join('')}ng-path/people.csv`]: {
                    name: 'full name',
                    age: 'age',
                    gender: 'sex',
                  },
                  'people2.csv': {
                    height: 'height',
                  },
                }} />
            </div>
            <div className="column is-half">
              <Header
                title="Links"
                handleAddButtonClick={() => handleAddLinkButtonClick()} />
              <Link
                name="works-at"
                linkFrom={{
                  source: 'people2.csv',
                  column: 'job',
                }}
                linkTo={{
                  source: `http://source.me/a-l${R.repeat('o', 100).join('')}ng-path/job.csv`,
                  column: 'title',
                }}
                propMappings={{
                  [`http://source.me/a-l${R.repeat('o', 100).join('')}ng-path/job.csv`]: {
                    since: 'start-year',
                    util: 'end-year',
                  },
                }} />
              <Link
                name="works-at"
                linkFrom={{
                  source: 'people2.csv',
                  column: 'job',
                }}
                linkTo={{
                  source: `http://source.me/a-l${R.repeat('o', 100).join('')}ng-path/job.csv`,
                  column: 'title',
                }}
                propMappings={{
                  [`http://source.me/a-l${R.repeat('o', 100).join('')}ng-path/job.csv`]: {
                    since: 'start-year',
                    util: 'end-year',
                  },
                }} />
            </div>
          </div>
        </div>
      </div>
    </FullView>;
