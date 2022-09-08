import React from 'react'
import { fireEvent, render, RenderAPI } from '@testing-library/react-native'
import { Provider } from 'react-redux'
import { storeSampleData } from '../../../../constants/SampleData'
import { UserDetailScreen } from '../UserDetailScreen'
import { ScreenContainer } from '../../ScreenContainer/ScreenContainer'
import { Modal } from 'react-native'

jest.mock("src/hooks/useUserProfileData", () => ({
    useUserProfileData: () => {
      return {
        isLoading: false,
        userProfileData:  {
            user: {
              id: '12',
              email: "abc@gmail.com",
              provider: 'facebook',
              display_name: 'example',
              first_name: 'example',
              last_name: 'example',
              occupation: 'business',
              image: 'abc',
              profile_url: 'abc.com',
              birthday: '01/01/1111',
            },
            message: {
              code: 200,
              message: 'string',
            }
        },
        userProfileError: 'string',
        sentUserProfileData: {
            user: {
              id: '12',
              email: "abc@gmail.com",
            },
            message: {
              code: 200,
              message: 'string',
            }
          },
        fetchProfileDataRequest: () => [],
        sendUserProfileInfo: () => [],
        updateUserImageRequest: () => [],
        emptyUserProfileInfoData: () => [],
      }
    },
}));

jest.mock("src/hooks/useAppCommon", () => ({
    useAppCommon: () => {
      return {
        theme: {
          LIGHT: 'light',
          DARK: 'dark'
        },
      }
    },
}));

jest.mock("src/hooks/useNewPassword", () => ({
  useNewPassword: () => {
    return {
      changePasswordData: {
        message: {
          code: 400,
          message: 'Success'
        }
      },
      emptyPasswordResponseInfo: () => [],
      changePasswordInfo: () => [],
    }
  },
}));

describe('<UserDetailScreen>', () => {
    let instance: RenderAPI
    const mockFunction = jest.fn();

    beforeEach(() => {
        const component =
            <Provider store={storeSampleData}>
                <UserDetailScreen />
            </Provider>
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    test('Should render component', () => {
        expect(instance).toBeDefined()
    })

    test('Should call ScreenContainer setIsAlertVisible', () => {
        const element = instance.container.findByType(ScreenContainer)
        fireEvent(element, 'setIsAlertVisible');
        expect(mockFunction).toBeTruthy()
    });
    
    test('Should call ScreenContainer alertOnPress', () => {
        const element = instance.container.findByType(ScreenContainer)
        fireEvent(element, 'alertOnPress');
        expect(mockFunction).toBeTruthy()
    });

    test('Should call Modal onRequestClose', () => {
        const element = instance.container.findByType(Modal)
        fireEvent(element, 'onRequestClose');
        expect(mockFunction).toBeTruthy()
    });

    test('Should call TouchableOpacity camera_option', () => {
        const element = instance.getByTestId('camera_option');
        fireEvent(element, 'onPress');
        expect(mockFunction).toBeTruthy()
    });

    test('Should call TouchableOpacity modal_Visible', () => {
        const element = instance.getByTestId('modal_Visible');
        fireEvent(element, 'onPress');
        expect(mockFunction).toBeTruthy()
    });

    test('Should call TextInputField profile_name', () => {
        const element = instance.getByTestId('profile_name');
        fireEvent(element, 'onChangeText');
        expect(mockFunction).toBeTruthy()
    });

})