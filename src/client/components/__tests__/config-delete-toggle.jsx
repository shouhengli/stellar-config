const React = require('react');
const renderer = require('react-test-renderer');
const ConfigDeleteToggle = require('../config-delete-toggle.jsx');

describe('component config-delete-toggle', () => {
  test('is clickable', () => {
    const props = {
      handleClick: jest.fn()
    };

    const component = renderer.create(<ConfigDeleteToggle {...props} />);

    const tree = component.toJSON();
    tree.props.onClick();

    expect(tree).toMatchSnapshot();
    expect(props.handleClick).toHaveBeenCalledTimes(1);
  });
});
