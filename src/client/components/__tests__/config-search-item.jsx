const React = require('react');
const renderer = require('react-test-renderer');
const Item = require('../config-search-item.jsx');

describe('component config-search-item', () => {
  test('is clickable', () => {
    const props = {
      type: 'mapping',
      name: 'transportation',
      handleClick: jest.fn()
    };

    const tree = renderer.create(<Item {...props} />).toJSON();
    tree.props.onClick();

    expect(tree).toMatchSnapshot();
    expect(props.handleClick).toHaveBeenCalledTimes(1);
    expect(props.handleClick).toHaveBeenCalledWith(props.name);
  });
});
