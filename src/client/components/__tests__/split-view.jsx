const React = require('react');
const SplitView = require('../split-view.jsx');
const renderer = require('react-test-renderer');

describe('component split-view', () => {
  test('wraps two children', () => {
    const component = renderer.create(
      <SplitView>
        <div>Child 1</div>
        <div>Child 2</div>
      </SplitView>
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
