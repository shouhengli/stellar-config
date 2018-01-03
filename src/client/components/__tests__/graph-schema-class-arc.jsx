const React = require('react');
const renderer = require('react-test-renderer');
const { shallow } = require('enzyme');
const ClassArc = require('../graph-schema-class-arc.jsx');

describe('component graph-schema-class-arc', () => {
  let props;

  beforeEach(() => {
    props = {
      path: 'M0,1',
      globalIndex: 1,
      classPropName: 'name',
      handleMouseOver: jest.fn(),
      handleMouseOut: jest.fn()
    };
  });

  test('can be rendered', () => {
    const tree = renderer.create(<ClassArc {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('can handle mouse-over event', () => {
    const wrapper = shallow(<ClassArc {...props} />);
    wrapper.find('path').simulate('mouseover');

    expect(props.handleMouseOver).toHaveBeenCalledTimes(1);
    expect(props.handleMouseOver).toHaveBeenCalledWith(
      props.globalIndex,
      props.classPropName
    );
  });

  test('can handle mouse-out event', () => {
    const wrapper = shallow(<ClassArc {...props} />);
    wrapper.find('path').simulate('mouseout');

    expect(props.handleMouseOut).toHaveBeenCalledTimes(1);
    expect(props.handleMouseOut).toHaveBeenCalledWith(
      props.globalIndex,
      props.classPropName
    );
  });
});
