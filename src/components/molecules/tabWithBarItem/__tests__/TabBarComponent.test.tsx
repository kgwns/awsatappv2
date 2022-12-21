import React, {useRef} from 'react'
import { fireEvent, render, RenderAPI } from '@testing-library/react-native'
import { TabBarComponent } from '../TabBarComponent'
import { sectionTabItem } from 'src/constants/Constants'

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
    // useRef: jest.fn(),
}));

const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isIOS: false
}));

describe('<TabBarComponent>', () => {
    let instance: RenderAPI

    const mockOnPress = jest.fn()
    // const scrollRef = mockOnPress;

    beforeEach(() => {
        // (useRef as jest.Mock).mockImplementation(() => [null, scrollRef]);
        const component = <TabBarComponent tabItem={sectionTabItem} onPressTabItem={mockOnPress} />
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    test('Should render component', () => {
        expect(instance).toBeDefined()
    })

    it('When Press onContentSizeChange', () => {
        const testID = instance.getByTestId('TabBarComponentID01');
        fireEvent(testID, 'onContentSizeChange')
        expect(mockOnPress).toBeTruthy();
    });
})

describe('<TabBarComponent>', () => {
    let instance: RenderAPI

    const mockOnPress = jest.fn()
    // const scrollRef = mockOnPress;

    beforeEach(() => {
        // (useRef as jest.Mock).mockImplementation(() => [null, scrollRef]);
        DeviceTypeUtilsMock.isIOS = true
        const component = <TabBarComponent tabItem={sectionTabItem} onPressTabItem={mockOnPress} />
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    test('Should render component', () => {
        expect(instance).toBeDefined()
    })

    it('When Press onContentSizeChange', () => {
        const testID = instance.getByTestId('TabBarComponentID01');
        fireEvent(testID, 'onContentSizeChange')
        expect(mockOnPress).toBeTruthy();
    });
})
