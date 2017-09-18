const React = require('react');
const renderer = require('react-test-renderer');
const Close = require('../config-delete-close.jsx');

describe('component config-delete-close', () => {
  test('is clickable', () => {
    const props = {
      handleClick: jest.fn(),
    };

    const component = renderer.create(<Close {...props} />);
    const tree = component.toJSON();
    tree.props.onClick();

    expect(tree).toMatchSnapshot();
    expect(props.handleClick).toHaveBeenCalledTimes(1);
  });
});
