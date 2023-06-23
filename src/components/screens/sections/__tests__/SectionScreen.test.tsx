import React, { useState } from 'react'
import {fireEvent, render, RenderAPI } from '@testing-library/react-native'
import { Provider } from 'react-redux'
import { storeSampleData } from '../../../../constants/Constants'
import { SectionsScreen as SectionScreen } from '../SectionsScreen'
import { useTopMenu } from 'src/hooks';
import { TabWithBarItem } from 'src/components/molecules/tabWithBarItem/TabWithBarItem';
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const SectionsScreen = () => (
  <GestureHandlerRootView>
    <SectionScreen />
  </GestureHandlerRootView>
)

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
}));

const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isIOS: false
}));
jest.mock('react-native-safe-area-context', () => ({
    ...jest.requireActual('react-native-safe-area-context'),
    useSafeAreaInsets: () => ({
      top: 10,
      bottom: 10
    })
}));

jest.mock("react-native-tab-view", () => {
    const real = jest.requireActual("react-native-tab-view");
    return {
      ...real,
      TabView: ({ navigationState, renderTabBar,renderScene }:any) => (
        <>
          {renderTabBar({
            navigationState,
          })}

          {renderScene({
            route:{key:{match:jest.fn()},keyName:'video',child:{isSelected:false,findIndex:jest.fn()}},
          })}

          {renderScene({
            route:{key:{match:jest.fn()},keyName:'games',child:{isSelected:false,findIndex:jest.fn()}},
          })}

          {renderScene({
            route:{key:{match:jest.fn()},keyName:'photos',child:{isSelected:false,findIndex:jest.fn()}},
          })}

          {renderScene({
            route:{key:{match:jest.fn()},child:{isSelected:false,findIndex:jest.fn()}},
          })}
           
        </>
        
      ),

      TabBar: ({ renderTabBarItem,renderIndicator }:any) => (
        <>
          {renderTabBarItem({
            key:'key',route:{title:'title'},navigationState:{index:0}
          })}

          {renderIndicator()}
           
        </>
        
      ),
    };
  });

jest.mock('src/hooks/useTopMenu', () => ({useTopMenu: jest.fn()}));

const mockString = 'mockString';

describe('<SectionsScreen>', () => {
    let instance: RenderAPI

    const index = jest.fn();
    const routes = jest.fn();
    const hidePlayerVisibility = jest.fn()

    const useTopMenuMock = jest.fn();
    const fetchTopMenuRequestMock = jest.fn();
    const scrollY = jest.fn();

    beforeEach(() => {
        (useState as jest.Mock).mockImplementation(() => [0, index]);
        (useState as jest.Mock).mockImplementation(() => [false, hidePlayerVisibility]);
        (useState as jest.Mock).mockImplementation(() => [[],scrollY]);
        
        (useTopMenu as jest.Mock).mockImplementation(useTopMenuMock);
        
        useTopMenuMock.mockReturnValue({
            isLoading: false,
            topMenuData: [{ tabName: mockString, keyName: 'home', isSelected: true, sectionId: 1 }],
            topMenuError: 'error',
            fetchTopMenuRequest: fetchTopMenuRequestMock,
        });
        
        const component =
          <Provider store={storeSampleData}>
            <SectionsScreen />
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

    test('Should render component in iOS', () => {
        DeviceTypeUtilsMock.isIOS = true;
        expect(instance).toBeDefined()
    })  
})

describe('<SectionsScreen>', () => {
    let instance: RenderAPI

    const scrollY = jest.fn();
    
    beforeEach(() => {
        (useState as jest.Mock).mockImplementation(() => [[{result:true},{result:false}],scrollY]);

        const component =
          <Provider store={storeSampleData}>
            <SectionsScreen />
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
})

describe('<SectionsScreen>', () => {
    let instance: RenderAPI
    
    const index = jest.fn();
    const routes = jest.fn();
    const useTopMenuMock = jest.fn();
    const fetchTopMenuRequestMock = jest.fn();
    const scrollY = jest.fn();
    
    beforeEach(() => {
        (useState as jest.Mock).mockImplementation(() => [[{child:[{tabName: 'example', isSelected: true},{tabName: 'example2', isSelected: false}]},{child:[{tabName: 'example1', isSelected: false},{tabName: 'example3', isSelected: true}]}],routes]);
        (useState as jest.Mock).mockImplementation(() => [1, index]);
        (useState as jest.Mock).mockImplementation(() => [[{result:true},{result:false}],scrollY]);


        (useTopMenu as jest.Mock).mockImplementation(useTopMenuMock);

        useTopMenuMock.mockReturnValue({
            isLoading: false,
            topMenuData: [],
            topMenuError: 'error',
            fetchTopMenuRequest: fetchTopMenuRequestMock,
        });

        const component =
          <Provider store={storeSampleData}>
            <SectionsScreen />
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

    test("test TabWithbarItem",() => {
        const element = instance.container.findByType(TabWithBarItem);
        fireEvent(element,'onPress',0);
        expect(element).toBeTruthy();
    })

})
