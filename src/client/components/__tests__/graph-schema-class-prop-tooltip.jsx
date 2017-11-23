const React = require('react');
const renderer = require('react-test-renderer');
const Tooltip = require('../graph-schema-class-prop-tooltip.jsx');

describe('component graph-schema-class-prop-tooltip', () => {
  let props;

  beforeEach(() => {
    props = {
      id: 1,
      rotation: 180,
      classPropTooltipArcPath: 'M2,3',
      classPropTooltipRadius: 100,
      visible: true,
      classPropName: 'name'
    };
  });

  test('can be rendered', () => {
    const tree = renderer.create(<Tooltip {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
