const React = require('react');
const renderer = require('react-test-renderer');
const Tab = require('../config-search-tab.jsx');

describe('component config-search-tab', () => {
  test('is clickable', () => {
    const props = {
      title: 'mapping',
      handleClick: jest.fn()
    };

    const tree = renderer.create(<Tab {...props} />).toJSON();
    tree.props.onClick();

    expect(tree).toMatchSnapshot();
    expect(props.handleClick).toHaveBeenCalledTimes(1);
    expect(props.handleClick).toHaveBeenCalledWith(props.title);
  });
});
