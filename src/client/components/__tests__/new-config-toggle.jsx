const React = require('react');
const renderer = require('react-test-renderer');
const Toggle = require('../new-config-toggle.jsx');

describe('component new-config-toggle', () => {
  test('is clickable', () => {
    const props = {
      handleClick: jest.fn(),
    };

    const component = renderer.create(
      <Toggle {...props} />
    );

    const tree = component.toJSON();
    tree.props.onClick();

    expect(tree).toMatchSnapshot();
    expect(props.handleClick).toHaveBeenCalledTimes(1);
  });
});
