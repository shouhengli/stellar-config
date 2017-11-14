const React = require('react');
const renderer = require('react-test-renderer');
const ClassLinkPath = require('../graph-schema-class-link-path.jsx');

describe('component graph-schema-class-link-path', () => {
  test('can be rendered', () => {
    const props = {
      id: 1,
      markerId: 'arrow',
      x0: 123,
      y0: 321,
      x1: 456,
      y1: 654,
      x2: 789,
      y2: 987,
    };

    const tree = renderer.create(<ClassLinkPath {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
