import React from 'react';
import SplitView from '../split-view.jsx';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

describe('component split-view', () => {
  it('renders correctly when no selectedClass', () => {
    const component = shallow(
      <SplitView selectedClass={null} loadGraphSchemaContent={jest.fn()} />
    );
    expect(toJSON(component)).toMatchSnapshot();
  });

  it('renders correctly when selectedClass is given', () => {
    const component = shallow(
      <SplitView selectedClass={jest.fn()} loadGraphSchemaContent={jest.fn()} />
    );
    expect(toJSON(component)).toMatchSnapshot();
  });

  it('loadGraphSchemaContent is called on mount', () => {
    const mockLoadGraphSchemaContent = jest.fn();
    shallow(
      <SplitView
        selectedClass={null}
        loadGraphSchemaContent={mockLoadGraphSchemaContent}
      />
    );
    expect(mockLoadGraphSchemaContent).toHaveBeenCalled();
  });
});
