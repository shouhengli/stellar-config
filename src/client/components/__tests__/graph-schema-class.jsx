const React = require('react');
const renderer = require('react-test-renderer');
const { mount, shallow } = require('enzyme');
const { fromJS } = require('immutable');
const Class = require('../graph-schema-class.jsx');

const { createClass } = require('../../ingestion-profile');

describe('component graph-schema-class', () => {
  let props;

  beforeEach(() => {
    props = {
      ClassName: 'div',
      ClassArc: 'div',
      ClassPropName: 'div',
      ClassPropTooltip: 'div',
      cls: fromJS(createClass('Person', { name: 'string' })),
      handleMouseEnter: jest.fn(),
      handleMouseLeave: jest.fn(),
      handleComponentWillUnmount: jest.fn()
    };
  });

  test('can be rendered', () => {
    const tree = renderer.create(<Class {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('can handle componentWillUnmount event', () => {
    const wrapper = mount(<Class {...props} />);
    wrapper.unmount();

    expect(props.handleComponentWillUnmount).toHaveBeenCalledTimes(1);
    expect(props.handleComponentWillUnmount).toHaveBeenCalledWith(props.cls);
  });

  test('can handle mouse-enter event', () => {
    const wrapper = shallow(<Class {...props} />);
    wrapper.simulate('mouseenter');

    expect(props.handleMouseEnter).toHaveBeenCalledTimes(1);
    expect(props.handleMouseEnter).toHaveBeenCalledWith(props.cls);
  });

  test('can handle mouse-leave event', () => {
    const wrapper = shallow(<Class {...props} />);
    wrapper.simulate('mouseleave');

    expect(props.handleMouseLeave).toHaveBeenCalledTimes(1);
    expect(props.handleMouseLeave).toHaveBeenCalledWith(props.cls);
  });
});
