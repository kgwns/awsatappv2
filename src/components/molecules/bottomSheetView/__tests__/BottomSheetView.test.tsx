import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import React from 'react';
import BottomSheetView from '../BottomSheetView';
import { Image } from 'src/components/atoms';
import { getSvgImages } from 'src/shared/styles/svgImages';

describe('BottomSheetView', () => {

  let instance: RenderAPI;
  let mockFunction = jest.fn();
  const mockString = 'mockString';

  beforeEach(() => {
    const component = (
      <BottomSheetView onPressSignUp={mockFunction} title={mockString} subTitle={mockString} description={mockString} signUpLabel={'example'} logInLabel={''} />
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

  it('Should getSvgImages', () => {
    expect(getSvgImages).toBeTruthy();
  });

})