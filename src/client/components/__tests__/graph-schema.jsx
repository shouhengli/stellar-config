import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { fromJS } from 'immutable';
import GraphSchema from '../graph-schema.jsx';

describe('component graph-schema', () => {
  let props;

  beforeEach(() => {
    const positionedClassLinks = fromJS({
      1: {
        name: 'has-a',
        globalIndex: '1',
        sourceIndex: '3',
        targetIndex: '4',
        source: 'Person',
        target: 'Mac',
        x: 0,
        y: 0,
        length: 2
      },
      2: {
        name: 'is-a',
        globalIndex: '2',
        sourceIndex: '4',
        targetIndex: '5',
        source: 'Person',
        target: 'Engineer',
        x: 1,
        y: 1,
        length: 2
      }
    });

    const positionedClasses = fromJS({
      3: {
        name: 'Person',
        globalIndex: '3',
        props: {},
        x: 0,
        y: 0,
        length: 2,
        outerRadius: 75
      },
      4: {
        name: 'Mac',
        globalIndex: '4',
        props: {},
        x: 0,
        y: 0,
        length: 2,
        outerRadius: 75
      },
      5: {
        name: 'Engineer',
        globalIndex: '5',
        props: {},
        x: 0,
        y: 0,
        length: 2,
        outerRadius: 75
      }
    });

    props = {
      Arrow: 'div',
      ClassLink: 'div',
      ClassLinkPath: 'div',
      ClassLinkLabel: 'div',
      Class: 'div',
      positionedClassLinks,
      positionedClasses,
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
      updateClassLinkLengths: jest.fn(),
      stopLayout: jest.fn()
    };
  });

  it('can be rendered', () => {
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
      fromJS([svg.clientWidth, svg.clientHeight]),
      fromJS([boundingClientRect.left, boundingClientRect.top])
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
