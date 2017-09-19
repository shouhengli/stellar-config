const React = require('react');
const renderer = require('react-test-renderer');
const {shallow} = require('enzyme');
const Search = require('../config-search.jsx');

describe('component config-search', () => {
  let props;

  beforeEach(() => {
    props = {
      Tab: 'div',
      ActiveTab: 'div',
      Item: 'div',
      searchText: 'default',
      configTypes: [
        'source',
        'mapping',
        'graphSchema',
      ],
      activeConfigType: 'mapping',
      configNames: [
        'default',
        'finance',
        'hr',
      ],
      handleSearchTextChange: jest.fn(),
      handleHideButtonClick: jest.fn(),
    };
  });

  test('can be rendered', () => {
    const tree = renderer.create(<Search {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('has changeable search field', () => {
    const wrapper = shallow(<Search {...props} />);
    const event = {target: {value: 'def'}};
    wrapper.find('input').simulate('change', event);

    expect(props.handleSearchTextChange).toHaveBeenCalledTimes(1);
    expect(props.handleSearchTextChange).toHaveBeenCalledWith(event);
  });

  test('can be hidden', () => {
    const wrapper = shallow(<Search {...props} />);
    wrapper.find('button').simulate('click');

    expect(props.handleHideButtonClick).toHaveBeenCalledTimes(1);
  });
});
