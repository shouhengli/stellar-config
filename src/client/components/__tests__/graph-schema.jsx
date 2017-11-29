const React = require('react');
const renderer = require('react-test-renderer');
const { mount } = require('enzyme');
const { Map, fromJS } = require('immutable');
const GraphSchema = require('../graph-schema.jsx');

const {
  getClassLinkKey,
  createClassLink,
  createClass
} = require('../../ingestion-profile');

describe('component graph-schema', () => {
  let props;

  beforeEach(() => {
    const classLinks = [
      createClassLink('has-a', 'Person', 'Mac'),
      createClassLink('is-a', 'Person', 'Engineer')
    ];

    const classes = [
      createClass('Person'),
      createClass('Mac'),
      createClass('Engineer')
    ];

    props = {
      Arrow: 'div',
      ClassLink: 'div',
      ClassLinkPath: 'div',
      ClassLinkLabel: 'div',
      Class: 'div',
      classLinks: Map(classLinks.map(l => [getClassLinkKey(l), fromJS(l)])),
      classes: Map(classes.map(c => [c.name, fromJS(c)])),
      drag: fromJS({
        class: {
          name: 'Person',
          fromX: 20,
          fromY: 100
        }
      }),
      zoom: 1.5,
      pan: fromJS({
        x: 150,
        y: -30
      }),
      coordinates: fromJS([500, 600]),
      dimensions: fromJS([1200, 1800]),
      editorContent: 'Person: {name: string}',
      shouldUpdateClassLinkLengths: false,
      handleMouseMove: jest.fn(),
      handleMouseUp: jest.fn(),
      handleMouseDown: jest.fn(),
      handleWheel: jest.fn(),
      init: jest.fn(),
      handleEditorContentChange: jest.fn(),
      updateClassLinkLengths: jest.fn(),
      stopLayout: jest.fn()
    };
  });

  test('can be rendered', () => {
    const boundingClientRect = {
      left: 15,
      top: 25
    };

    const svg = {
      getBoundingClientRect: () => boundingClientRect,
      clientWidth: 96,
      clientHeight: 69
    };

    const createNodeMock = element => {
      if (element.type === 'svg') {
        return svg;
      }

      return null;
    };

    const tree = renderer
      .create(<GraphSchema {...props} />, { createNodeMock })
      .toJSON();

    expect(tree).toMatchSnapshot();
    expect(props.init).toHaveBeenCalledTimes(1);
    expect(props.init).toHaveBeenCalledWith(
      [svg.clientWidth, svg.clientHeight],
      [boundingClientRect.left, boundingClientRect.top],
      props.editorContent
    );
  });

  test('can handle editor content change', () => {
    const wrapper = mount(<GraphSchema {...props} />);
    props.editorContent = props.editorContent + '\nDog: {name: string}';
    wrapper.setProps(props);

    expect(props.handleEditorContentChange).toHaveBeenCalledTimes(1);
    expect(props.handleEditorContentChange).toHaveBeenCalledWith(
      props.editorContent,
      props.dimensions.toJS(),
      props.classes,
      props.classLinks
    );
  });

  test('can update class link lengths', () => {
    const wrapper = mount(<GraphSchema {...props} />);
    props.shouldUpdateClassLinkLengths = true;
    wrapper.setProps(props);

    expect(props.updateClassLinkLengths).toHaveBeenCalledTimes(1);
    expect(props.updateClassLinkLengths).toHaveBeenCalledWith(
      wrapper.instance().classLinkPaths
    );
  });

  test('will stop layout when unmounted', () => {
    const wrapper = mount(<GraphSchema {...props} />);
    wrapper.unmount();

    expect(props.stopLayout).toHaveBeenCalledTimes(1);
  });

  test('can track mouse move', () => {
    const wrapper = mount(<GraphSchema {...props} />);
    const event = { pageX: 1000, pageY: 650 };
    wrapper.find('svg').simulate('mousemove', event);

    expect(props.handleMouseMove).toHaveBeenCalledTimes(1);
    expect(props.handleMouseMove).toHaveBeenCalledWith(
      expect.objectContaining(event),
      props.drag,
      props.zoom
    );
  });

  test('can handle mouse-up event', () => {
    const wrapper = mount(<GraphSchema {...props} />);
    wrapper.find('svg').simulate('mouseup');

    expect(props.handleMouseUp).toHaveBeenCalledTimes(1);
  });

  test('can handle mouse-down event', () => {
    const wrapper = mount(<GraphSchema {...props} />);
    const event = { pageX: 1000, pageY: 650 };
    wrapper.find('svg').simulate('mousedown', event);

    expect(props.handleMouseDown).toHaveBeenCalledTimes(1);
    expect(props.handleMouseDown).toHaveBeenCalledWith(
      expect.objectContaining(event),
      props.zoom
    );
  });

  test('can handle wheel event', () => {
    const wrapper = mount(<GraphSchema {...props} />);
    const event = { pageX: 1000, pageY: 650 };
    wrapper.find('svg').simulate('wheel', event);

    expect(props.handleWheel).toHaveBeenCalledTimes(1);
    expect(props.handleWheel).toHaveBeenCalledWith(
      expect.objectContaining(event),
      props.coordinates,
      props.drag
    );
  });
});
