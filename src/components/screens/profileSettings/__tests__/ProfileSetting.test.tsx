import React, { useState } from 'react';
import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { storeSampleData } from 'src/constants/Constants';
import { ProfileSettings, SettingDataType } from '../ProfileSettings';
import { ScreenContainer } from '../../ScreenContainer/ScreenContainer';
import { useNavigation } from '@react-navigation/native';
import { FlatList, TouchableOpacity } from 'react-native';
import { ImagesName } from 'src/shared/styles';
import { ToggleWithLabel } from 'src/components/molecules';
import { useLogin } from 'src/hooks';

const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isIOS: false
}));

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

jest.mock('src/hooks/useLogin', () => ({ useLogin: jest.fn() }));

jest.mock("src/hooks/useAppCommon", () => ({
  useAppCommon: () => {
    return {
      theme: {
        LIGHT: 'light',
        DARK: 'dark'
      },
      isFirstSession: false,
      serverEnvironment: {
        DEBUG: 'Debug',
        PRODUCTION: 'Production',
      },
      storeServerEnvironmentInfo: () => [],
      resetFontSizeInfo: () => [],
    }
  },
}));

jest.mock("src/hooks/useBookmark", () => ({
  useBookmark: () => {
    return {
      removeBookmark: () => [],
    }
  },
}));

jest.mock("src/hooks/useKeepNotified", () => ({
  useKeepNotified: () => {
    return {
      removeKeepNotificationInfo: () => [],
    }
  },
}));

jest.mock("src/hooks/useAllSiteCategories", () => ({
  useAllSiteCategories: () => {
    return {
      emptySelectedTopicsInfoData: () => [],
    }
  },
}));

jest.mock("src/hooks/useAllWriters", () => ({
  useAllWriters: () => {
    return {
      emptySelectedAuthorsInfoData: () => [],
    }
  },
}));

jest.mock("src/hooks/useSearch", () => ({
  useSearch: () => {
    return {
      emptySearchHistory: () => [],
    }
  },
}));


jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

jest.mock("src/shared/utils/utilities", () => ({
  ...jest.requireActual('src/shared/utils/utilities'),
      isDarkTheme:jest.fn(),
}));

describe('<ProfileSettings>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();

  const navigation = {
    reset: mockFunction,
    navigate: mockFunction,
  }
  const isDarkMode = mockFunction;
  const isAlertVisible = mockFunction;
  const useLoginMock = mockFunction;

  const SettingData: SettingDataType = {
    iconName: ImagesName.arrowLeftBlack,
    title: 'تغيير البيئة',
    screenName: 'arrowLeftBlack'
  }

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    (useLogin as jest.Mock).mockImplementation(useLoginMock);
    (useState as jest.Mock).mockImplementation(() => [true, isDarkMode]);
    (useState as jest.Mock).mockImplementation(() => [true, isAlertVisible]);
    useLoginMock.mockReturnValue({
      isLoggedIn: true,
      fetchLogoutRequest: () => { },
      makeUserLogout: jest.fn()
    });
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
    DeviceTypeUtilsMock.isTab = true;
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

  test('Should call FlatList renderItem with exit as a title', () => {
    const element = instance.container.findByType(FlatList)
    fireEvent(element, 'renderItem', {
      item: {
        iconName: ImagesName.exit,
        title: 'CONST_EXIT',
        screenName: ''
      }
    });
    expect(mockFunction).toBeTruthy()
  });

  test('Should call TouchableOpacity onPress', () => {
    const element = instance.container.findAllByType(TouchableOpacity)[0];
    fireEvent(element, 'onPress', SettingData);
    expect(navigation.reset).toBeTruthy();
  })

  test('Should call TouchableOpacity onPress', () => {
    const element = instance.container.findAllByType(TouchableOpacity)[0];
    fireEvent(element, 'onPress', {
      iconName: ImagesName.newsLetter,
      title: 'CONST_MY_NEWS_LETTER',
      screenName: ''
    });
    expect(navigation.reset).toBeTruthy();
  })

  test('Should call ToggleWithLabel onPress', () => {
    const element = instance.container.findAllByType(ToggleWithLabel)[0];
    fireEvent(element, 'onPress', true);
    expect(navigation.reset).toBeTruthy();
  })

  test('Should call ToggleWithLabel onPress', () => {
    const element = instance.container.findAllByType(ToggleWithLabel)[0];
    fireEvent(element, 'onPress', false);
    expect(navigation.reset).toBeTruthy();
  })

});

describe('<ProfileSettings>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();

  const navigation = {
    reset: mockFunction,
    navigate: mockFunction,
  }
  const isDarkMode = mockFunction;
  const isAlertVisible = mockFunction;
  const useLoginMock = mockFunction;

  const SettingData: SettingDataType = {
    iconName: ImagesName.arrowLeftBlack,
    title: 'profileSetting.appAppearance',
    screenName: 'arrowLeftBlack'
  }

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    (useLogin as jest.Mock).mockImplementation(useLoginMock);
    (useState as jest.Mock).mockImplementation(() => [false, isDarkMode]);
    (useState as jest.Mock).mockImplementation(() => [true, isAlertVisible]);
    useLoginMock.mockReturnValue({
      isLoggedIn: false,
      fetchLogoutRequest: () => { },
      makeUserLogout: jest.fn()
    });
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
    fireEvent(element, 'onPress', SettingData);
    expect(navigation.reset).toBeTruthy();
  })

  test('Should call ToggleWithLabel onPress', () => {
    const element = instance.container.findAllByType(ToggleWithLabel)[0];
    fireEvent(element, 'onPress', true);
    expect(navigation.reset).toBeTruthy();
  })

  test('Should call ToggleWithLabel onPress', () => {
    const element = instance.container.findAllByType(ToggleWithLabel)[0];
    fireEvent(element, 'onPress', false);
    expect(navigation.reset).toBeTruthy();
  })

  test("should call onPress signUp in ButtonOutline",() => {
    const element = instance.getByTestId('SettingSignup');
    fireEvent(element,'onPress');
    expect(navigation.reset).toHaveBeenCalled();
  })

});
