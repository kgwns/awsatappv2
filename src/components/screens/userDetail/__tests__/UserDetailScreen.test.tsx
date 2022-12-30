import React, { useState } from 'react'
import { fireEvent, render, RenderAPI } from '@testing-library/react-native'
import { Provider } from 'react-redux'
import { storeSampleData } from '../../../../constants/Constants'
import { UserDetailScreen } from '../UserDetailScreen'
import { ScreenContainer } from '../../ScreenContainer/ScreenContainer'
import { Modal } from 'react-native'
import { useUserProfileData } from 'src/hooks';
import { TabBarDataProps } from 'src/components/molecules/tabWithBarItem/TabWithBarItem'

jest.mock('react',() => ({
  ...jest.requireActual('react'),
  useState:jest.fn()
}));

jest.mock('src/hooks/useUserProfileData', () => ({useUserProfileData: jest.fn()}));

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

jest.mock('react-native-date-picker', () => {
  const mockComponent = require('react-native/jest/mockComponent')
  return mockComponent('react-native-date-picker')
})

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
const tabItemData: TabBarDataProps[]=  [];
describe('<UserDetailScreen>', () => {
    let instance: RenderAPI
    const mockFunction = jest.fn();
    const useUserProfileDataMock = mockFunction;
    const setSelectedDate = mockFunction;
    const setTabItemData = mockFunction;

    beforeEach(() => {
      (useState as jest.Mock).mockImplementation(() => (['selectBirthdayDate',setSelectedDate]));
      (useState as jest.Mock).mockImplementation(() => [[tabItemData],setTabItemData]);
      (useUserProfileData as jest.Mock).mockImplementation(useUserProfileDataMock);
        useUserProfileDataMock.mockReturnValue({
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
                birthday: '2000-05-20T21:05:00+0000',
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
        });
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
        expect(mockFunction).toHaveBeenCalled()
    });
    
    test('Should call ScreenContainer alertOnPress', () => {
        const element = instance.container.findByType(ScreenContainer)
        fireEvent(element, 'alertOnPress');
        expect(mockFunction).toHaveBeenCalled()
    });

    test('Should call Modal onRequestClose1', () => {
        const element = instance.container.findAllByType(Modal)
        fireEvent(element[0], 'onRequestClose');
        expect(mockFunction).toHaveBeenCalled()
    });

    test('Should call TouchableOpacity camera_option', () => {
        const element = instance.getByTestId('camera_option');
        fireEvent(element, 'onPress');
        expect(mockFunction).toHaveBeenCalled()
    });

    test('Should call TouchableOpacity modal_Visible', () => {
        const element = instance.getByTestId('modal_Visible');
        fireEvent(element, 'onPress');
        expect(mockFunction).toHaveBeenCalled()
    });

    test('Should call TextInputField profile_name', () => {
        const element = instance.getByTestId('profile_name');
        fireEvent(element, 'onChangeText');
        expect(mockFunction).toHaveBeenCalled()
    });

})

describe('<UserDetailScreen>', () => {
  let instance: RenderAPI
  const mockFunction = jest.fn();
  const useUserProfileDataMock = mockFunction;
  const setSelectedDate = mockFunction;
  const setTabItemData = mockFunction;

  beforeEach(() => {
    (useState as jest.Mock).mockImplementation(() => (['selectBirthdayDate',setSelectedDate]));
    (useState as jest.Mock).mockImplementation(() => [[],setTabItemData]);
    (useUserProfileData as jest.Mock).mockImplementation(useUserProfileDataMock);
      useUserProfileDataMock.mockReturnValue({
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
              birthday: 'example',
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
      });
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

  test('Should call Modal onRequestClose2', () => {
      const element = instance.container.findAllByType(Modal)
      fireEvent(element[0], 'onRequestClose');
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

describe('<UserDetailScreen>', () => {
  let instance: RenderAPI
  const mockFunction = jest.fn();
  const useUserProfileDataMock = mockFunction;
  const setName = mockFunction;
  const setTabItem = mockFunction;

  beforeEach(() => {
    (useState as jest.Mock).mockImplementation(() => ['name',setName]);
    (useState as jest.Mock).mockImplementation(() => [[],setTabItem]);
    (useUserProfileData as jest.Mock).mockImplementation(useUserProfileDataMock);
      useUserProfileDataMock.mockReturnValue({
        isLoading: false,
        userProfileData:  {
            user: {
              id: '12',
              email: "abc@gmail.com",
              provider: 'facebook',
              display_name: ' ',
              first_name: 'example',
              last_name: 'example',
              image: null,
              profile_url: 'abc.com',
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
              code: 400,
              message: 'string',
            }
          },
        fetchProfileDataRequest: () => [],
        sendUserProfileInfo: () => [],
        updateUserImageRequest: () => [],
        emptyUserProfileInfoData: () => [],
      });
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

  test('Should call Modal onRequestClose3', () => {
      const element = instance.container.findAllByType(Modal)
      fireEvent(element[0], 'onRequestClose');
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