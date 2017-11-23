const React = require('react');
const renderer = require('react-test-renderer');
const ConfigDelete = require('../config-delete.jsx');

describe('component config-delete', () => {
  test('enables yes button when confirmed', () => {
    const props = {
      confirmed: true,
      configType: 'graphSchema',
      configName: 'default',
      configDeleteName: 'default',
      handleNameChange: () => {},
      handleCloseButtonClick: () => {},
      handleDeleteButtonClick: () => {}
    };

    const component = renderer.create(<ConfigDelete {...props} />);

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('disables yes button when not confirmed', () => {
    const props = {
      confirmed: false,
      configType: 'graphSchema',
      configName: 'default',
      configDeleteName: 'def',
      handleNameChange: () => {},
      handleCloseButtonClick: () => {},
      handleDeleteButtonClick: () => {}
    };

    const component = renderer.create(<ConfigDelete {...props} />);

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
