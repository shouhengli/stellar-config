const React = require('react');
const Nav = require('../nav.jsx');
const renderer = require('react-test-renderer');

describe('component nav', () => {
  test('wraps its children', () => {
    const component = renderer.create(<Nav>content</Nav>);

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
