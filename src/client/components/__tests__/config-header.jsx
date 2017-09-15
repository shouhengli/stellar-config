const React = require('react');
const renderer = require('react-test-renderer');
const Header = require('../config-header.jsx');

test('component config-header can be rendered', () => {
  const props = {
    configType: 'source',
    configName: 'vehicles',
  };

  const component = renderer.create(<Header {...props} />);
  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
