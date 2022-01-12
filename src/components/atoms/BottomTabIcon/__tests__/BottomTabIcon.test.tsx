import {render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import {BottomTabIcon} from 'src/components/atoms/BottomTabIcon/BottomTabIcon';

describe('<BottomTabIcon />', () => {
  let instance: RenderAPI;

  // Test Data
  const labelTitle = 'label';

  beforeEach(() => {
    const component = <BottomTabIcon text={labelTitle} active />;
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('Should render BottomTabIcon', () => {
    expect(instance).toBeDefined();
  });

  describe('when BottomTabBarIcon render with normal icon and active true', () => {
    beforeEach(() => {
      const component = (
        <BottomTabIcon text={labelTitle} iconSize={24} active />
      );
      instance = render(component);
    });

    it('Should render component', () => {
      expect(instance).toBeDefined();
    });
  });

  describe('when BottomTabBarIcon render with normal icon and active false', () => {
    beforeEach(() => {
      const component = (
        <BottomTabIcon text={labelTitle} iconSize={24} active={false} />
      );
      instance = render(component);
    });

    it('Should render component', () => {
      expect(instance).toBeDefined();
    });
  });
});
