const React = require('react');
const renderer = require('react-test-renderer');
const Toggle = require('../config-search-toggle.jsx');

describe('component config-search-toggle', () => {
  test('is clickable', () => {
    const props = {
      handleClick: jest.fn(),
    };

    const tree = renderer.create(<Toggle {...props} />).toJSON();
    tree.props.onClick();

    expect(tree).toMatchSnapshot();
    expect(props.handleClick).toHaveBeenCalledTimes(1);
  });
});
