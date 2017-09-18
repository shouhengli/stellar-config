const React = require('react');
const ModalView = require('../modal-view.jsx');
const renderer = require('react-test-renderer');

describe('component modal-view', () => {
  test('wraps its children', () => {
    const component = renderer.create(
      <ModalView>content</ModalView>
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
