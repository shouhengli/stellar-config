const React = require('react');
const FullView = require('../full-view.jsx');
const renderer = require('react-test-renderer');

describe('component full-view', () => {
  test('wraps its children', () => {
    const component = renderer.create(<FullView>content</FullView>);

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
