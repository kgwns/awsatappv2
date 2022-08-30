import React from 'react';
import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { storeSampleData } from 'src/constants/SampleData';
import { ProfileSettings, SettingDataType } from '../ProfileSettings';
import { ScreenContainer } from '../../ScreenContainer/ScreenContainer';
import {useNavigation} from '@react-navigation/native';
import { FlatList, TouchableOpacity } from 'react-native';
import { ImagesName } from 'src/shared/styles';
import { ToggleWithLabel } from 'src/components/molecules';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

jest.mock('react-native-fbsdk-next', () => ({
    ...jest.requireActual('react-native-fbsdk-next'),
    LoginManager: jest.fn(),
}));

jest.mock("src/hooks/useUserProfileData", () => ({
    useUserProfileData: () => {
      return {
        userProfileData: {
            user: {
              id: '12',
              email: "abc@gmail.com",
              provider: 'facebook',
              display_name: 'example',
              first_name: 'example',
              last_name: 'example',
            },
            message: {
              code: 200,
              message: 'string',
            }
        },
        emptyUserProfileInfoData: () => [],
      }
    },
}));

jest.mock("src/hooks/useNotificationSaveToken", () => ({
    useNotificationSaveToken: () => {
      return {
        saveTokenData: {
          id: 2,
          message: "string",
        },
        saveTokenAfterRegistrationRequest: () => [],
      }
    },
}));

jest.mock("src/hooks/useLogin", () => ({
    useLogin: () => {
      return {
        isLoggedIn: true,
        fetchLogoutRequest: () => {}
      }
    },
}));

const SettingData: SettingDataType ={
    iconName: ImagesName.arrowLeftBlack,
    title: 'arrowLeftBlack',
    screenName: 'arrowLeftBlack'
}

describe('<ProfileSettings>', () => {
    let instance: RenderAPI;
    const navigation = {
        reset: jest.fn(),
        navigate: jest.fn(),
    }
    const mockFunction = jest.fn();

    beforeEach(() => {
        (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
        const component = (
            <Provider store={storeSampleData}>
                <ProfileSettings />
            </Provider>
        );
        instance = render(component);
    });

    afterEach(() => {
        jest.clearAllMocks();
        instance.unmount();
    });

    test('Should render ProfileSettings', () => {
        expect(instance).toBeDefined();
    });
    test('Should call ScreenContainer alertOnPress', () => {
        const element = instance.container.findAllByType(ScreenContainer)[0];
        fireEvent(element, 'alertOnPress');
        expect(navigation.reset).toBeTruthy()
    });

    test('Should call FlatList ListFooterComponent', () => {
        const element = instance.container.findByType(FlatList)
        fireEvent(element, 'ListFooterComponent');
        expect(mockFunction).toBeTruthy()
    });

    test('Should call TouchableOpacity onPress', () => {
        const element = instance.container.findAllByType(TouchableOpacity)[0];
        fireEvent(element, 'onPress', {item: SettingData});
        expect(navigation.reset).toBeTruthy();
    })

    test('Should call ToggleWithLabel onPress', () => {
        const element = instance.container.findAllByType(ToggleWithLabel)[0];
        fireEvent(element, 'onPress', {isOn: true});
        expect(navigation.reset).toBeTruthy();
    })

    test('Should call ToggleWithLabel onPress', () => {
        const element = instance.container.findAllByType(ToggleWithLabel)[1];
        fireEvent(element, 'onPress');
        expect(navigation.reset).toBeTruthy();
    })
    
});
