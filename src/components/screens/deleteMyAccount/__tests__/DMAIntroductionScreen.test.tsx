import { fireEvent, render } from "@testing-library/react-native";
import { DMAIntroductionScreen } from "../DMAIntroductionScreen";
import { useDeleteMyAccount } from "src/hooks";
import React from "react";
import { ButtonOutline } from "src/components/atoms";
import { useNavigation } from "@react-navigation/native";
import { ScreensConstants } from "src/constants/Constants";

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
        (useDeleteMyAccount as jest.Mock).mockImplementation(useDeleteMyAccountMock);
        (useNavigation as jest.Mock).mockReturnValue(navigation);
    })
    afterEach(() => {
        jest.clearAllMocks();
    })
    it("Should not display Introduction Screen",() => {
        (useDeleteMyAccountMock).mockReturnValueOnce({
            isLoading: true,
            fetchDMAIntroductionRequest: jest.fn()
        });
        const {queryByTestId} = render(<DMAIntroductionScreen/>);
        expect(queryByTestId('containerId')).toBeNull();
    });

    it("Should display Introduction Screen",() => {
        (useDeleteMyAccountMock).mockReturnValueOnce({
            isLoading: false,
            fetchDMAIntroductionRequest: jest.fn()
        });
        const {queryByTestId} = render(<DMAIntroductionScreen/>);
        expect(queryByTestId('containerId')).not.toBeNull();
    });

    it("Should navigate to DMA_OPTIONS_LIST_SCREEN",() => {
        (useDeleteMyAccountMock).mockReturnValueOnce({
            isLoading: false,
            fetchDMAIntroductionRequest: jest.fn()
        });
        const { container } = render(<DMAIntroductionScreen/>);
        const buttonElement = container.findByType(ButtonOutline);
        fireEvent.press(buttonElement);
        expect(navigation.navigate).toHaveBeenCalled();
        expect(navigation.navigate).toHaveBeenCalledWith(ScreensConstants.DMA_OPTIONS_LIST_SCREEN);
    });

    it("Should not display description",() => {
        (useDeleteMyAccountMock).mockReturnValueOnce({
            isLoading: false,
            fetchDMAIntroductionRequest: jest.fn(),
            dmaIntroductionData: []
        });
        const {getByTestId} = render(<DMAIntroductionScreen/>);
        const descriptionLabel = getByTestId('descriptionId');
        expect(descriptionLabel.props.children).toEqual('');
    });

    it("Should display description with 20 fontSize in tab",() => {
        DeviceTypeUtilsMock.isTab = true;
        (useDeleteMyAccountMock).mockReturnValueOnce({
            isLoading: false,
            fetchDMAIntroductionRequest: jest.fn(),
            dmaIntroductionData: [{
                body_export: 'sample body description'
            }]
        });
        const {getByTestId} = render(<DMAIntroductionScreen/>);
        const descriptionLabel = getByTestId('descriptionId');
        expect(descriptionLabel.props.children).toEqual('sample body description');
        expect(descriptionLabel.props.style[1].fontSize).toEqual(20)
    });

    it("Should display description with 16 fontSize in mobile",() => {
        DeviceTypeUtilsMock.isTab = false;
        (useDeleteMyAccountMock).mockReturnValueOnce({
            isLoading: false,
            fetchDMAIntroductionRequest: jest.fn(),
            dmaIntroductionData: [{
                body_export: 'sample body description'
            }]
        });
        const {getByTestId} = render(<DMAIntroductionScreen/>);
        const descriptionLabel = getByTestId('descriptionId');
        expect(descriptionLabel.props.children).toEqual('sample body description');
        expect(descriptionLabel.props.style[1].fontSize).toEqual(16)
    });

})