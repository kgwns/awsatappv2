import React, { useState } from 'react';
import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { storeSampleData } from 'src/constants/Constants';
import CustomDrawerContent, { SocialMediaType }  from '../CustomDrawerContent';
import {ButtonImage, ButtonList, ButtonOutline} from 'src/components/atoms';
import { ScreensConstants } from 'src/constants/Constants';
import { Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as permission from 'react-native-permissions';
import DeviceInfo from 'react-native-device-info';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const mockString = 'example';
const mockNumber = 1234;

const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isIOS: false,
  isTab: false,
  isAndroid: false
}));


jest.mock('@react-navigation/native',() => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn()
}))

jest.mock('react',() => ({
    ...jest.requireActual('react'),
    useState: jest.fn()
}))

jest.mock("src/hooks/useSideMenu",() => ({
    useSideMenu: () => {
        return {
            sideMenuData:[
                {
                    field_sectionid_export: mockString ,
                    title: mockString 
                }
            ],
            fetchSideMenuRequest: jest.fn()
        }
    }
}))

jest.mock("src/hooks/useWeatherDetails", () => ({
  useWeatherDetails: () => {
    return {
      isLoading: false,
      fetchWeatherDetailsSuccessInfo: {
          city: {
              id: mockNumber,
              name: mockString,
              country: mockString,
          },
          cod: mockString,
          cnt: 7,
          list: [
              {
                  dt: mockNumber,
                  sunrise: mockNumber,
                  sunset: mockNumber,
                  temp: {
                      day: mockNumber,
                      min: mockNumber,
                      max: mockNumber,
                      night: mockNumber,
                      eve: mockNumber,
                      morn: mockNumber
                  },
                  feels_like: {
                      day: mockNumber,
                      night: mockNumber,
                      eve: mockNumber,
                      morn: mockNumber
                  },
                  pressure: mockNumber,
                  humidity: mockNumber,
                  weather: [
                      {
                          id: mockNumber,
                          main: mockString,
                          description: mockString,
                          icon: mockString
                      }
                  ],
                  speed: mockNumber,
                  deg: mockNumber,
                  gust: mockNumber,
                  clouds: mockNumber,
                  pop: mockNumber
              }
          ]
      },
      fetchWeatherDetailsVisibilitySuccessInfo: {
        visibility: mockNumber,
      },
      fetchWeatherDetailsErrorInfo: '',
      fetchWeatherDetailsInfo: () => [],
      fetchWeatherDetailsVisibilityInfo: () => [],
    }
  },
}));

describe('<CustomDrawerContent>', () => {
    let instance: RenderAPI;
    const sideMenuDataInfo = jest.fn();
    const deviceLocationEnabled = jest.fn();
    const navigation = {
        navigate: jest.fn(),
        dispatch: jest.fn()
    }

    beforeEach(() => {
        (useState as jest.Mock).mockImplementation(() => [false,deviceLocationEnabled]);
        (useState as jest.Mock).mockImplementation(() => [[{title:'title',showDropDown:true,child:[{isSelected:false}]}],sideMenuDataInfo]);
        (useNavigation as jest.Mock).mockReturnValue(navigation);
        const component = 
            <Provider store={storeSampleData}>
                <GestureHandlerRootView>
                    <CustomDrawerContent />
                </GestureHandlerRootView>
            </Provider> 
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('Should render component', () => {
        expect(instance).toBeDefined()
    })

    it('Should render component in Tab', () => {
        DeviceTypeUtilsMock.isTab = true;
        expect(instance).toBeDefined()
    })

    it('Should render component in iOS', () => {
        DeviceTypeUtilsMock.isIOS = true;
        expect(instance).toBeDefined()
    })

    it('Should render component in Android', () => {
        DeviceTypeUtilsMock.isAndroid = true;
        expect(instance).toBeDefined()
    })

    test('Should call ButtonList onPress', () => {
        const element = instance.container.findAllByType(ButtonList)[0]
        fireEvent(element, 'onPress', {screen: ScreensConstants.TERMS_AND_ABOUT_US, params: { title: 'advertiseWithUs', id: 49 }});
        expect(navigation.navigate).toHaveBeenCalled();
    })

    test('Should call ButtonList onPress', () => {
        const element = instance.container.findAllByType(ButtonList)[1]
        fireEvent(element, 'onPress', {screen: ScreensConstants.TERMS_AND_ABOUT_US, params: { title: 'aboutTheEast', id: 153 }});
        expect(navigation.navigate).toHaveBeenCalled();
    })

    test('Should call ButtonList onPress', () => {
        const element = instance.container.findAllByType(ButtonList)[2]
        fireEvent(element, 'onPress', {screen: ScreensConstants.TERMS_AND_ABOUT_US, params: { title: 'about_the_news_paper', id: 56 }});
        expect(navigation.navigate).toHaveBeenCalled();
    })

    test('Should call ButtonList onPress', () => {
        const element = instance.container.findAllByType(ButtonList)[4]
        fireEvent(element, 'onPress', {screen: ScreensConstants.CONTACT_US_SCREEN, params: { title: 'termsOfUse', id: 57 }});
        expect(navigation.navigate).toHaveBeenCalled();
    })

    test('Should call ButtonList onPress', () => {
        const element = instance.container.findAllByType(ButtonList)[5]
        fireEvent(element, 'onPress', {screen: ScreensConstants.TERMS_AND_ABOUT_US, params: { title: 'termsOfUse', id: 57 }});
        expect(navigation.navigate).toHaveBeenCalled();
    })

    test('Should call ButtonList onPress', () => {
        const element = instance.container.findAllByType(ButtonList)[3]
        fireEvent(element, 'onPress', {screen: ScreensConstants.TERMS_AND_ABOUT_US, params: { title: 'termsOfUse', id: 57 }});
        expect(navigation.navigate).toHaveBeenCalled();
    })

    test('should call ButtonImage onPress linkedIn',() => {
        jest.spyOn(Linking,'openURL').mockResolvedValue('error');
        const element = instance.container.findAllByType(ButtonImage)[0];
        fireEvent(element,'onPress','linkedIn');
        expect(Linking.openURL).toHaveBeenCalled();
    })

    test('should call ButtonImage onPress twitter',() => {
        jest.spyOn(Linking,'openURL').mockResolvedValue('error');
        const element = instance.container.findAllByType(ButtonImage)[1];
        fireEvent(element,'onPress','twitter');
        expect(Linking.openURL).toHaveBeenCalled();
    })

    test('should call ButtonImage onPress facebook',() => {
        jest.spyOn(Linking,'openURL').mockResolvedValue('error');
        const element = instance.container.findAllByType(ButtonImage)[2];
        fireEvent(element,'onPress','facebook');
        expect(Linking.openURL).toHaveBeenCalled();
    })

    test('should call ButtonImage onPress instagram',() => {
        jest.spyOn(Linking,'openURL').mockResolvedValue('error');
        const element = instance.container.findAllByType(ButtonImage)[3];
        fireEvent(element,'onPress','instagram');
        expect(Linking.openURL).toHaveBeenCalled();
    })

    test('should call ButtonImage onPress returns nothing',() => {
        jest.spyOn(Linking,'openURL').mockResolvedValue('error');
        const element = instance.container.findAllByType(ButtonImage)[3];
        fireEvent(element,'onPress','default');
        expect(Linking.openURL).toHaveBeenCalled();
    })

    test("should press profileId",() => {
        const testId = instance.getByTestId('profileId');
        fireEvent(testId,'onPress');
        expect(navigation.navigate).toHaveBeenCalled();
    })

    test("should press drawerToggleId",() => {
        const testId = instance.getByTestId('drawerToggleId');
        fireEvent(testId,'onPress');
        expect(navigation.dispatch).toHaveBeenCalled();
    })

    test("should press buttonList dropDown",() => {
        const element = instance.container.findAllByType(ButtonList)[0]
        fireEvent(element, 'onPressIcon',0,1,true);
        expect(sideMenuDataInfo).toHaveBeenCalled();
    })

    test("should call weather detail onPress",() => {
        const element = instance.getByTestId('weatherId');
        fireEvent(element, 'onPress');
        expect(navigation.navigate).toHaveBeenCalled();
    })

    test("test locationEnabled",() => {
        jest.spyOn(DeviceInfo,'isLocationEnabled').mockResolvedValue(true);
        expect(deviceLocationEnabled).toBeTruthy();
    })
})


describe('<CustomDrawerContent> when the location is not enabled', () => {
    let instance: RenderAPI;
    const locationEnabled = jest.fn();
    const mockFunction = jest.fn();
    const navigation = {
        navigate: jest.fn(),
        dispatch: jest.fn()
    };

    beforeEach(() => {
        (useState as jest.Mock).mockImplementation(() => [false,locationEnabled]);
        (useNavigation as jest.Mock).mockReturnValue(navigation);
        const component = 
            <Provider store={storeSampleData}>
                <GestureHandlerRootView>
                    <CustomDrawerContent />
                </GestureHandlerRootView>
            </Provider> 
        instance = render(component)
    });

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    });

    test("should press buttonOutline onPress",() => {
        DeviceTypeUtilsMock.isIOS = false;
        const element = instance.container.findByType(ButtonOutline);
        fireEvent(element,'onPress');
        expect(mockFunction).toBeTruthy();
    })

    test("should press buttonOutline onPress in iOS",() => {
        DeviceTypeUtilsMock.isIOS = true;
        jest.spyOn(permission,'openSettings').mockResolvedValue(true);
        const element = instance.container.findByType(ButtonOutline);
        fireEvent(element,'onPress');
        expect(mockFunction).toBeTruthy();
    })

})
