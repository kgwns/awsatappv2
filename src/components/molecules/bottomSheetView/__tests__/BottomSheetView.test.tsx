import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import React from 'react';
import BottomSheetView from '../BottomSheetView';
import { getSvgImages } from 'src/shared/styles/svgImages';
import { Dimensions, TouchableOpacity } from 'react-native';
const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isTab: false,
  isIOS: false
}));
describe('BottomSheetView', () => {

  let instance: RenderAPI;
  let mockFunction = jest.fn();
  const mockString = 'mockString';

  beforeEach(() => {
    DeviceTypeUtilsMock.isTab = true;
    const component = (
      <BottomSheetView onPressSignUp={mockFunction} title={mockString} subTitle={mockString} description={mockString} signUpLabel={'example'} logInLabel={''} />
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('should click signUp button in Tab Portrait',() => {
    const element = instance.container.findAllByType(TouchableOpacity)[0];
    fireEvent.press(element);
    expect(mockFunction).toHaveBeenCalled();
  })

  it('should click signUp button in Tab Landscape',() => {
    jest.spyOn(Dimensions,'get').mockReturnValue({height: 400, width: 600, fontScale:2, scale:3});
    const element = instance.container.findAllByType(TouchableOpacity)[0];
    fireEvent.press(element);
    expect(mockFunction).toHaveBeenCalled();
  })

})
describe('BottomSheetView', () => {

  let instance: RenderAPI;
  let mockFunction = jest.fn();
  const mockString = 'mockString';

  beforeEach(() => {
    DeviceTypeUtilsMock.isTab = false;
    DeviceTypeUtilsMock.isIOS = true;
    const component = (
      <BottomSheetView onPressSignUp={mockFunction} title={mockString} subTitle={mockString} description={mockString} signUpLabel={'example'} logInLabel={''} />
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('should click signUp button in mobile',() => {
    jest.spyOn(Dimensions,'get').mockReturnValue({height: 400, width: 600, fontScale:2, scale:3});
    const element = instance.container.findAllByType(TouchableOpacity)[0];
    fireEvent.press(element);
    expect(mockFunction).toHaveBeenCalled();
  })

})