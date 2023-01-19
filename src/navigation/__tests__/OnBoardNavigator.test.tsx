import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import OnBoardNavigator from 'src/navigation/OnBoardNavigator';
import {Provider} from 'react-redux';
import {storeSampleData} from '../../constants/Constants';
import { TouchableOpacity } from 'react-native';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isTab: false,
  isIOS: false
}));

describe('<OnBoardNavigator>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();

  const navigation = {
    reset: jest.fn(),
    navigate: jest.fn(),
    goBack: jest.fn(),
  }

  describe('when OnBoardNavigator only', () => {
    beforeEach(() => {
      (useNavigation as jest.Mock).mockReturnValue(navigation);
      const component = (
        <NavigationContainer independent={true}>
          <Provider store={storeSampleData}>
            <OnBoardNavigator />
          </Provider>
      </NavigationContainer>
      );
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    it('Should render OnBoardNavigator', () => {
      expect(instance).toBeDefined();
    });
    it('Should render OnBoardNavigator in Tab and iOS', () => {
      DeviceTypeUtilsMock.isTab = true;
      DeviceTypeUtilsMock.isIOS = true;
      expect(instance).toBeDefined();
    });
    it('When MenuButton Press', () => {
      const listButton = instance.container.findAllByType(TouchableOpacity)[1];
      fireEvent(listButton, 'onPress');
      expect(navigation.goBack).toHaveBeenCalled;
    });
    it("when skip button is clicked",() => {
      const element = instance.getByTestId('skipId');
      fireEvent(element,'onPress','FOLLOW_FAVORITE_AUTHOR_SCREEN');
      expect(navigation.navigate).toHaveBeenCalled();
    });
  });
});
