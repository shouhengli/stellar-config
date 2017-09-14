const React = require('react');
const ModalView = require('../modal-view.jsx');
const renderer = require('react-test-renderer');

test('Modal view can be rendered', () => {
  const component = renderer.create(
    <ModalView>content</ModalView>
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
