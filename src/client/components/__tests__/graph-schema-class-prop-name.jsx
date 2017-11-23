const React = require('react');
const renderer = require('react-test-renderer');
const { shallow } = require('enzyme');
const ClassPropName = require('../graph-schema-class-prop-name.jsx');

describe('component graph-schema-class-prop-name', () => {
  let props;

  beforeEach(() => {
    props = {
      id: 1,
      rotation: 180,
      clipPath: 'M0,1',
      classPropNameArcPath: 'M2,3',
      classPropNameVisibility: true,
      classPropNameRadius: 100,
      className: 'Person',
      classPropName: 'name',
      fontSize: 16,
      handleMouseOver: jest.fn(),
      handleMouseOut: jest.fn()
    };
  });

  test('can be rendered', () => {
    const tree = renderer.create(<ClassPropName {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('can handle mouse-over event', () => {
    const wrapper = shallow(<ClassPropName {...props} />);
    wrapper.find('text').simulate('mouseover');

    expect(props.handleMouseOver).toHaveBeenCalledTimes(1);
    expect(props.handleMouseOver).toHaveBeenCalledWith(
      props.className,
      props.classPropName
    );
  });

  test('can handle mouse-out event', () => {
    const wrapper = shallow(<ClassPropName {...props} />);
    wrapper.find('text').simulate('mouseout');

    expect(props.handleMouseOut).toHaveBeenCalledTimes(1);
    expect(props.handleMouseOut).toHaveBeenCalledWith(
      props.className,
      props.classPropName
    );
  });
});
