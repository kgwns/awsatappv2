import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import {CheckBox} from 'src/components/atoms/CheckBox/checkBox';

describe('<CheckBox />', () => {
  let instance: RenderAPI;
  const icon = 'blackBdrBookMark';
  const selectedIcon = 'bookmarkActive';
  beforeEach(() => {
    const component = (
      <CheckBox
        selected={false}
        icon={icon}
        selectedIcon={selectedIcon}
        label="checkbox"
        onChange={isSelected => {
          console.log('beforeEach isSelected', isSelected);
        }}
      />
    );
    instance = render(component);
  });

  afterEach(() => {
    instance.unmount();
  });

  it('should render component', () => {
    expect(instance).toBeDefined();
  });

  it('should render component', () => {
    expect(render( <CheckBox
      selected={true}
      icon={icon}
      selectedIcon={selectedIcon}
      label="checkbox"
      onChange={isSelected => {
        console.log('beforeEach isSelected', isSelected);
      }}
    />)).toBeDefined();
  });

  it('should label name is checkbox', () => {
    expect(instance.container.props.label).toBe('checkbox');
  });

  it('should icon is Inactive', () => {
    expect(instance.container.props.icon).toBe(icon);
  });

  it('should selectedIcon is active', () => {
    expect(instance.container.props.selectedIcon).toBe(selectedIcon);
  });

  it('should selected is falsy initially', () => {
    expect(instance.container.props.selected).toBeFalsy();
  });

  describe('should performs select in checkbox', () => {
    const onPressMock = jest.fn();
    const icon = 'blackBdrBookMark';
    const selectedIcon = 'bookmarkActive';
    const {getByTestId} = render(
      <CheckBox
        selected={false}
        icon={icon}
        selectedIcon={selectedIcon}
        label="checkbox"
        onChange={onPressMock}
      />,
    );
    fireEvent.press(getByTestId('checkBoxBtn'));
    expect(onPressMock).toBeCalledTimes(1);
  });
});

describe('<CheckBox />', () => {
  let instance: RenderAPI;
  beforeEach(() => {
    const component = (
      <CheckBox
        label="checkbox"
        onChange={isSelected => {
          console.log('beforeEach isSelected', isSelected);
        }}
      />
    );
    instance = render(component);
  });

  afterEach(() => {
    instance.unmount();
  });

  it('should render component', () => {
    expect(instance).toBeDefined();
  });
});
