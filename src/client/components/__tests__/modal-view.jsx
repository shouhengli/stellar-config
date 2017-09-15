const React = require('react');
const ModalView = require('../modal-view.jsx');
const renderer = require('react-test-renderer');

test('component modal view wraps its children', () => {
  const component = renderer.create(
    <ModalView>content</ModalView>
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
