import { fireEvent, render } from "@testing-library/react-native";
import { useDeleteMyAccount } from "src/hooks";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { ScreensConstants } from "src/constants/Constants";
import { DMAOptionsListScreen } from "../DMAOptionsListScreen";
import { TouchableOpacity } from "react-native";

jest.mock('src/hooks/useDeleteMyAccount',() => ({
    ...jest.requireActual('src/hooks/useDeleteMyAccount'),
    useDeleteMyAccount: jest.fn()
}));

const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isTab: true
}));

jest.mock('@react-navigation/native',() => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn()
}));

const navigation = {
    navigate: jest.fn()
} 
const useDeleteMyAccountMock = jest.fn();
describe("<DMAIntroductionScreen>",() => {
    beforeEach(() => {
        DeviceTypeUtilsMock.isTab = false;
        (useDeleteMyAccount as jest.Mock).mockImplementation(useDeleteMyAccountMock);
        (useNavigation as jest.Mock).mockReturnValue(navigation);
    })
    afterEach(() => {
        jest.clearAllMocks();
    })
    it("Should navigate to DMA_FEED_BACK_SCREEN",() => {
        (useDeleteMyAccountMock).mockReturnValueOnce({
            isLoading: false,
            fetchDMAOptionsListRequest: jest.fn(),
            dmaOptionsListData: [{
                ar_option: 'arabicOption',
                id: '1'
            }]
        });
        const { container } = render(<DMAOptionsListScreen/>);
        const element = container.findAllByType(TouchableOpacity)[0];
        fireEvent.press(element);
        expect(navigation.navigate).toHaveBeenCalled();
        expect(navigation.navigate).toHaveBeenCalledWith(ScreensConstants.DMA_FEED_BACK_SCREEN,{ optionId: '1'})
    });

    it("should display optionLabel with size 18 in mobile",() => {
        (useDeleteMyAccountMock).mockReturnValueOnce({
            isLoading: false,
            fetchDMAOptionsListRequest: jest.fn(),
            dmaOptionsListData: [{
                ar_option: 'arabicOption',
                id: '1'
            }]
        });
        const { getByTestId } = render(<DMAOptionsListScreen/>);
        const labelElement = getByTestId('optionLabelId');
        expect(labelElement.props.style[1].fontSize).toBe(18);
    })

})
describe("<DMAIntroductionScreen>",() => {
    beforeEach(() => {
        DeviceTypeUtilsMock.isTab = true;
        (useDeleteMyAccount as jest.Mock).mockImplementation(useDeleteMyAccountMock);
        (useNavigation as jest.Mock).mockReturnValue(navigation);
    })
    afterEach(() => {
        jest.clearAllMocks();
    })
    
    it("should display optionLabel with size 18 in mobile",() => {
        (useDeleteMyAccountMock).mockReturnValueOnce({
            isLoading: false,
            fetchDMAOptionsListRequest: jest.fn(),
            dmaOptionsListData: [{
                ar_option: 'arabicOption',
                id: '1'
            }]
        });
        const { getByTestId } = render(<DMAOptionsListScreen/>);
        const labelElement = getByTestId('optionLabelId');
        expect(labelElement.props.style[1].fontSize).toBe(28);
    })

})