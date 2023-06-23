import React, { useState } from 'react'
import { fireEvent, render, RenderAPI } from '@testing-library/react-native'
import { Provider } from 'react-redux'
import { storeSampleData } from '../../../../constants/Constants'
import { UserDetailScreen } from '../UserDetailScreen'
import { ScreenContainer } from '../../ScreenContainer/ScreenContainer'
import { ActionSheetIOS, Modal } from 'react-native'
import { useUserProfileData } from 'src/hooks';
import { TabBarDataProps } from 'src/components/molecules/tabWithBarItem/TabWithBarItem'
import { AlertModal } from 'src/components/organisms'
import { ButtonOutline } from 'src/components/atoms'
import DatePicker from 'react-native-date-picker'

jest.mock('react',() => ({
  ...jest.requireActual('react'),
  useState:jest.fn()
}));

jest.mock('react-native-image-crop-picker',() => {
  return {
    openPicker: jest.fn(() => Promise.resolve()),
    openCamera: jest.fn(() => Promise.resolve())
  }
})

const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isIOS: false,
  isTab: false
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

jest.mock('src/shared/utils/utilities',() => ({
  ...jest.requireActual('src/shared/utils/utilities'),
  getFullDate: () => {}
}))

jest.mock("src/hooks/useNewPassword", () => ({
  useNewPassword: () => {
    return {
      changePasswordData: {
        message: {
          code: 200,
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
      jest.useFakeTimers({
        legacyFakeTimers: true
      });
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

    test('Should render component in Tab', () => {
      DeviceTypeUtilsMock.isTab = true;
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
        const element = instance.container.findAllByType(Modal)[1]
        fireEvent(element, 'onRequestClose');
        expect(mockFunction).toHaveBeenCalled()
    });

    test('Should call TouchableOpacity camera_option',async () => {
        DeviceTypeUtilsMock.isIOS = false;
        const element = instance.getByTestId('camera_option');
        fireEvent(element, 'onPress');
        expect(mockFunction).toHaveBeenCalled()
    });

    test('Should call TouchableOpacity camera_option in iOS', () => {
      DeviceTypeUtilsMock.isIOS = true;
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
    jest.useFakeTimers({
      legacyFakeTimers: true
    });
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

  test('Should call TouchableOpacity gallery_option', () => {
    const element = instance.getByTestId('gallery_option');
    fireEvent(element, 'onPress');
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
    jest.useFakeTimers({
      legacyFakeTimers: true
    });
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
      DeviceTypeUtilsMock.isIOS = true;
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

describe('should render alert modal', () => {
  let instance: RenderAPI
  const mockFunction = jest.fn();
  const useUserProfileDataMock = mockFunction;
  const setName = mockFunction;
  const setTabItem = mockFunction;
  const showupUp = mockFunction;
  beforeEach(() => {
    jest.useFakeTimers({
      legacyFakeTimers: true
    });
    (useState as jest.Mock).mockImplementation(() => [true,showupUp]);
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

  test('should call onPressSuccess AlertModal',() =>{
    const element = instance.container.findAllByType(AlertModal)[0];
    fireEvent(element,'onPressSuccess');
    expect(mockFunction).toHaveBeenCalled();
  })

})

describe('should renderUserDetails', () => {
  let instance: RenderAPI
  const mockFunction = jest.fn();
  const useUserProfileDataMock = mockFunction;
  const setName = mockFunction;
  const setTabItem = mockFunction;
  const showupUp = mockFunction;
  beforeEach(() => {
    jest.useFakeTimers({
      legacyFakeTimers: true
    });
    (useState as jest.Mock).mockImplementation(() => ['name',setName]);
    (useState as jest.Mock).mockImplementation(() => [false,showupUp]);
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

  test('test render_Option_Modal onPress',() =>{
    DeviceTypeUtilsMock.isIOS = false;
    const element = instance.getByTestId('render_Option_Modal');
    fireEvent(element,'onPress');
    expect(mockFunction).toHaveBeenCalled();
  })

  test('test render_Option_Modal onPress in iOS',() =>{
    DeviceTypeUtilsMock.isIOS = true;
    ActionSheetIOS.showActionSheetWithOptions =  jest.fn();
    const element = instance.getByTestId('render_Option_Modal');
    fireEvent(element,'onPress');
    expect(mockFunction).toHaveBeenCalled();
  })

  test('test ButtonOutline onPress',() =>{
    DeviceTypeUtilsMock.isIOS = false;
    const element = instance.container.findByType(ButtonOutline);
    fireEvent(element,'onPress');
    expect(mockFunction).toHaveBeenCalled();
  })

  test("test set_Open onPress",() => {
    const testId = instance.getByTestId('set_Open');
    fireEvent(testId,'onPress');
    expect(mockFunction).toHaveBeenCalled();
  })

  test("test datePicker onConfirm",() => {
    const element = instance.container.findByType(DatePicker);
    fireEvent(element,'onConfirm');
    expect(mockFunction).toHaveBeenCalled();
  })

  test("test datePicker onCancel",() => {
    const element = instance.container.findByType(DatePicker);
    fireEvent(element,'onCancel');
    expect(mockFunction).toHaveBeenCalled();
  })

})

describe('should render useEffect', () => {
  let instance: RenderAPI
  const mockFunction = jest.fn();
  const name = mockFunction;
  const setTabItem = mockFunction;
  const showupUp = mockFunction;
  beforeEach(() => {
    jest.useFakeTimers({
      legacyFakeTimers: true
    });
    (useState as jest.Mock).mockImplementation(() => [true,showupUp]);
    (useState as jest.Mock).mockImplementation(() => ['name',name]);
    (useState as jest.Mock).mockImplementation(() => [[],setTabItem]);
    
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

  test('test render_Option_Modal onPress',() =>{
    DeviceTypeUtilsMock.isIOS = false;
    const element = instance.getByTestId('render_Option_Modal');
    fireEvent(element,'onPress');
    expect(mockFunction).toHaveBeenCalled();
  })

  test('test ButtonOutline onPress',() =>{
    DeviceTypeUtilsMock.isIOS = false;
    const element = instance.container.findByType(ButtonOutline);
    fireEvent(element,'onPress');
    expect(mockFunction).toHaveBeenCalled();
  })

})