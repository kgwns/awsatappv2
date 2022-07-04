import { render, RenderAPI } from '@testing-library/react-native';
import React from 'react';
import BottomSheetView from '../BottomSheetView';


describe('BottomSheetView', () => {

  let instance: RenderAPI;
  let mockFunction = jest.fn();
  const mockString = 'mockString';

  beforeEach(() => {
    const component = (
      <BottomSheetView onPressSignUp={mockFunction} title={mockString} subTitle={mockString} description={mockString} buttonLabel={mockString} />
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('should render BottomSheetView component', () => {
    expect(instance).toBeDefined();
  });

})