const React = require('react');
const NavItem = require('../nav-item.jsx');
const renderer = require('react-test-renderer');

describe('component nav-item', () => {
  test('wraps its children', () => {
    const component = renderer.create(<NavItem>content</NavItem>);

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
