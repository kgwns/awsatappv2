import { AlertModal } from 'src/components/organisms/AlertModal/AlertModal';
import { fireEvent, render, RenderAPI } from '@testing-library/react-native'
import React from 'react'
import { isDarkTheme } from 'src/shared/utils';

jest.mock("src/shared/utils/utilities", () => ({
    ...jest.requireActual('src/shared/utils/utilities'),
        isDarkTheme:jest.fn(),
  }));

describe('<AlertModal>', () => {
    const isDarkThemeMock = jest.fn();
    let instance: RenderAPI;
    const mockFunction = jest.fn();
    beforeEach(() => {
        const component = <AlertModal
            title={'title'}
            message={'message'}
            isVisible={true}
            buttonText={'Button'}
            onClose={() => { }}
            onPressSuccess={mockFunction}
        />
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('should render component', () => {
        (isDarkTheme as jest.Mock).mockImplementation(isDarkThemeMock);
        isDarkThemeMock.mockReturnValue(true);
        expect(instance).toBeDefined()
    })

    it('should render component', () => {
        (isDarkTheme as jest.Mock).mockImplementation(isDarkThemeMock);
        isDarkThemeMock.mockReturnValue(false);
        expect(instance).toBeDefined()
    })

    it('When AlertModalTO1 is pressed', () => {
        const testItemId = instance.getByTestId('AlertModalTO1');
        fireEvent(testItemId, 'onPress');
        expect(mockFunction).toBeTruthy();
    });

    it('When AlertModalTO2 is pressed', () => {
        const testItemId = instance.getByTestId('AlertModalTO2');
        fireEvent(testItemId, 'onPress');
        expect(mockFunction).toBeTruthy();
    });

})