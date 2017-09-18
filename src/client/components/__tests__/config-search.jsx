const React = require('react');
const renderer = require('react-test-renderer');
const Search = require('../config-search.jsx');

describe('component config-search', () => {
  test('can be rendered', () => {
    const props = {
      Tab: 'div',
      ActiveTab: 'div',
      Item: 'div',
      searchText: 'default',
      configTypes: [
        'source',
        'mapping',
        'graphSchema',
      ],
      activeConfigType: 'mapping',
      configNames: [
        'default',
        'finance',
        'hr',
      ],
      handleSearchTextChange: jest.fn(),
      handleHideButtonClick: jest.fn(),
    };

    const tree = renderer.create(<Search {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
