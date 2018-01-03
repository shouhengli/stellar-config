const React = require('react');
const renderer = require('react-test-renderer');
const { shallow } = require('enzyme');
const { fromJS } = require('immutable');
const Label = require('../graph-schema-class-link-label.jsx');

describe('component graph-schema-class-link-label', () => {
  let props;

  beforeEach(() => {
    props = {
      id: 1,
      classLink: fromJS({
        name: 'is-a',
        source: 'Person',
        target: 'Engineer',
        x: 0,
        y: 0,
        length: 0
      }),
      zoom: 2,
      handleMouseDown: jest.fn()
    };
  });

  test('can be rendered', () => {
    const tree = renderer.create(<Label {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('can handle mouse-down event', () => {
    const wrapper = shallow(<Label {...props} />);
    const event = { pageX: 1000, pageY: 650 };
    wrapper.simulate('mousedown', event);

    expect(props.handleMouseDown).toHaveBeenCalledTimes(1);
    expect(props.handleMouseDown).toHaveBeenCalledWith(
      event,
      props.classLink,
      props.zoom
    );
  });
});
