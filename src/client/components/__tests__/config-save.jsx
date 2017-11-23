const React = require('react');
const renderer = require('react-test-renderer');
const Save = require('../config-save.jsx');

const {
  CONFIG_STATUS_CHANGED,
  CONFIG_STATUS_SAVING
} = require('../../config-status');

describe('component config-save', () => {
  test('is clickable when config has been changed', () => {
    const props = {
      configType: 'source',
      configName: 'vehicles',
      configContent: 'vehicles: {id: integer, model: string}',
      configStatus: CONFIG_STATUS_CHANGED,
      handleClick: jest.fn()
    };

    const component = renderer.create(<Save {...props} />);
    const tree = component.toJSON();
    tree.props.onClick();

    expect(tree).toMatchSnapshot();
    expect(props.handleClick).toHaveBeenCalledTimes(1);
    expect(props.handleClick).toHaveBeenCalledWith(
      props.configType,
      props.configName,
      props.configContent
    );
  });

  test('shows loading icon when config is being saved', () => {
    const props = { configStatus: CONFIG_STATUS_SAVING };

    const component = renderer.create(<Save {...props} />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
