import React from 'react';
import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {
  opinionWritersData,
  storeSampleData,
} from '../../../constants/Constants';
import {OpinionWritersSection} from '..';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isTab: false,
}));

describe('<OpinionWritersSection>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn()
  beforeEach(() => {
    DeviceTypeUtilsMock.isTab = true
    const component = (
      <Provider store={storeSampleData}>
        <GestureHandlerRootView>
          <OpinionWritersSection data={opinionWritersData} onPressWriter={ mockFunction } />
        </GestureHandlerRootView>
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  test('Should render OpinionWritersSection component', () => {
    expect(instance).toBeDefined();
  });

  it("should press opinion writer",() => {
    const testId = instance.getAllByTestId('opinionWriterId')[0];
    fireEvent(testId,'onPress');
    expect(mockFunction).toHaveBeenCalled()
  })
});

describe('<OpinionWritersSection> with isTab as false', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn()
  beforeEach(() => {
    DeviceTypeUtilsMock.isTab = false
    const component = (
      <Provider store={storeSampleData}>
        <GestureHandlerRootView>
          <OpinionWritersSection data={opinionWritersData} onPressWriter={ mockFunction } />
        </GestureHandlerRootView>
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  test('Should render OpinionWritersSection component', () => {
    expect(instance).toBeDefined();
  });

  it("should press opinion writer with index 1",() => {
    const testId = instance.getAllByTestId('opinionWriterId')[1];
    fireEvent(testId,'onPress');
    expect(mockFunction).toHaveBeenCalled()
  })

});
