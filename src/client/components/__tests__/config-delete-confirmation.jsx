const React = require('react');
const renderer = require('react-test-renderer');
const Confirmation = require('../config-delete-confirmation.jsx');

test('component config-delete-confirmation is editable', () => {
  const props = {
    configDeleteName: 'default',
    handleChange: jest.fn(),
  };

  const component = renderer.create(
    <Confirmation {...props} />
  );

  const tree = component.toJSON();

  const event = {target: {value: 'def'}};
  tree.props.onChange(event);

  expect(tree).toMatchSnapshot();
  expect(props.handleChange).toHaveBeenCalledTimes(1);
  expect(props.handleChange).toHaveBeenCalledWith(event);
});
