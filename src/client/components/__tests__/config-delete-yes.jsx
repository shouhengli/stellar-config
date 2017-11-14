const React = require('react');
const renderer = require('react-test-renderer');
const Yes = require('../config-delete-yes.jsx');

describe('component config-delete-yes', () => {
  test('is clickable', () => {
    const props = {
      configType: 'mapping',
      configName: 'people',
      handleClick: jest.fn(),
    };

    const component = renderer.create(<Yes {...props} />);
    const tree = component.toJSON();
    tree.props.onClick();

    expect(tree).toMatchSnapshot();
    expect(props.handleClick).toHaveBeenCalledTimes(1);
    expect(props.handleClick).toHaveBeenCalledWith(
      props.configType,
      props.configName
    );
  });
});
