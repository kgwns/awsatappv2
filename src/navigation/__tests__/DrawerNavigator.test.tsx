import DrawerNavigator from "../DrawerNavigator";
import React from "react";
import {render, RenderAPI} from '@testing-library/react-native'
import { NavigationContainer } from "@react-navigation/native";
import { storeSampleData } from "src/constants/Constants";
import { Provider } from "react-redux";

jest.mock('@react-navigation/native',() => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(),
    useNavigationState: () => ([]),
}))

const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isTab: true
}));

describe("test DrawerNavigator",() => {
    let instance: RenderAPI;
    beforeEach(() => {
        const component = (
            <NavigationContainer>
              <Provider store={storeSampleData}>
                <DrawerNavigator />
              </Provider>
            </NavigationContainer>
        )
        instance = render(component);
    })
    it("should render component",() => {
        DeviceTypeUtilsMock.isTab = false;
        expect(instance).toBeDefined();
    })
    it("should render component in Tab",() => {
        DeviceTypeUtilsMock.isTab = true;
        expect(instance).toBeDefined();
    })
})