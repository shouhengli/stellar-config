const React = require('react');
const renderer = require('react-test-renderer');
const {shallow} = require('enzyme');
const {fromJS} = require('immutable');
const NewConfig = require('../new-config.jsx');

describe('component new-config', () => {
  let props;

  beforeEach(() => {
    props = {
      configTypes: fromJS(['source', 'mapping', 'graphSchema']),
      selectedConfigType: 'mapping',
      configName: 'people',
      handleConfigTypeChange: jest.fn(),
      handleConfigNameChange: jest.fn(),
      handleCancelButtonClick: jest.fn(),
      handleAddButtonClick: jest.fn(),
    };
  });

  test('can be rendered', () => {
    const tree = renderer.create(<NewConfig {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('has changeable config type drop down list', () => {
    const wrapper = shallow(<NewConfig {...props} />);
    const event = {target: {value: 'def'}};
    wrapper.find('select').simulate('change', event);

    expect(props.handleConfigTypeChange).toHaveBeenCalledTimes(1);
    expect(props.handleConfigTypeChange).toHaveBeenCalledWith(event);
  });

  test('has changeable config name input field', () => {
    const wrapper = shallow(<NewConfig {...props} />);
    const event = {target: {value: 'def'}};
    wrapper.find('input').simulate('change', event);

    expect(props.handleConfigNameChange).toHaveBeenCalledTimes(1);
    expect(props.handleConfigNameChange).toHaveBeenCalledWith(event);
  });

  test('has clickable add button', () => {
    const wrapper = shallow(<NewConfig {...props} />);
    wrapper.find('button')
           .filterWhere((w) => w.contains('Add'))
           .simulate('click');

    expect(props.handleAddButtonClick).toHaveBeenCalledTimes(1);
    expect(props.handleAddButtonClick).toHaveBeenCalledWith(
      props.selectedConfigType,
      props.configName
    );
  });

  test('has clickable cancel button', () => {
    const wrapper = shallow(<NewConfig {...props} />);
    wrapper.find('button')
           .filterWhere((w) => w.contains('Cancel'))
           .simulate('click');

    expect(props.handleCancelButtonClick).toHaveBeenCalledTimes(1);
  });
});
