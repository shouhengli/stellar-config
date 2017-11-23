const React = require('react');
const renderer = require('react-test-renderer');
const Header = require('../config-header.jsx');

describe('component config-header', () => {
  test('can be rendered', () => {
    const props = {
      configType: 'source',
      configName: 'vehicles'
    };

    const component = renderer.create(<Header {...props} />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
