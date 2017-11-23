const React = require('react');
const renderer = require('react-test-renderer');
const ActiveTab = require('../config-search-active-tab.jsx');

describe('component config-search-active-tab', () => {
  test('load config names before being mounted', () => {
    const props = {
      title: 'mapping',
      loadConfigNames: jest.fn()
    };

    const tree = renderer.create(<ActiveTab {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
    expect(props.loadConfigNames).toHaveBeenCalledTimes(1);
    expect(props.loadConfigNames).toHaveBeenCalledWith(props.title);
  });
});
