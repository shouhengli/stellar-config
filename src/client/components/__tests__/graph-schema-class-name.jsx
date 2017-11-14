const React = require('react');
const renderer = require('react-test-renderer');
const {shallow} = require('enzyme');
const ClassName = require('../graph-schema-class-name.jsx');

describe('component graph-schema-class-name', () => {
  let props;

  beforeEach(() => {
    props = {
      name: 'Person',
      radius: 100,
      fontSize: 16,
      zoom: 2,
      handleMouseDown: jest.fn(),
    };
  });

  test('can be rendered', () => {
    const tree = renderer.create(<ClassName {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('can handle mouse-down event', () => {
    const wrapper = shallow(<ClassName {...props} />);
    const event = {pageX: 200, pageY: 300};
    wrapper.simulate('mousedown', event);

    expect(props.handleMouseDown).toHaveBeenCalledTimes(1);
    expect(props.handleMouseDown)
      .toHaveBeenCalledWith(event, props.name, props.zoom);
  });
});
