const React = require('react');
const renderer = require('react-test-renderer');
const Link = require('../graph-schema-class-link.jsx');

describe('component graph-schema-class-link', () => {
  test('wraps its children', () => {
    const tree = renderer.create(<Link>content</Link>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
