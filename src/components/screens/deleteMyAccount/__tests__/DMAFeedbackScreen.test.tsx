import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ScreensConstants } from "src/constants/Constants";
import { DMAFeedbackScreen } from "../DMAFeedbackScreen";
import { TouchableOpacity } from "react-native";
import { ScreenTestId } from "src/constants/TestConstant";

const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
    ...jest.requireActual('src/shared/utils/dimensions'),
    isTab: true,
    isIOS: true,
}));

jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(),
    useRoute: jest.fn(),
}));

const navigation = {
    navigate: jest.fn(),
}

const screenRoute = { params: { optionId: '1' } };
const commentScreenParams = { optionId: '1', comment: '' }

describe("<<< DMAFeedbackScreen Mobile version >>>", () => {
    let instance: any;
    beforeEach(() => {
        DeviceTypeUtilsMock.isTab = false;
        (useNavigation as jest.Mock).mockReturnValue(navigation);
        (useRoute as jest.Mock).mockReturnValue(screenRoute);
        instance = render(<DMAFeedbackScreen />);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("Should navigate to DMA_DELETE_ACCOUNT_SCREEN", () => {
        const element = instance.container.findAllByType(TouchableOpacity)[0];
        fireEvent.press(element);
        expect(navigation.navigate).toHaveBeenCalled();
        expect(navigation.navigate).toHaveBeenCalledWith(ScreensConstants.DMA_DELETE_ACCOUNT_SCREEN, commentScreenParams)
    });

    it("should display comment label with size 12 in mobile", () => {
        const labelElement = instance.getByTestId(ScreenTestId.dmaFeedback.commentLabel);
        expect(labelElement.props.style.fontSize).toBe(12);
    });

    it('Should call onChange method when type', () => {
        const changeText = 'test';
        const element = instance.getByTestId(ScreenTestId.dmaFeedback.commentLabel);
        fireEvent(element, 'onChangeText', changeText);
        expect(element.props.value).toBe(changeText);
    });
});

describe("<<< DMAFeedbackScreen Tab version >>>", () => {
    let instance: any;
    beforeEach(() => {
        DeviceTypeUtilsMock.isTab = true;
        (useNavigation as jest.Mock).mockReturnValue(navigation);
        (useRoute as jest.Mock).mockReturnValue(screenRoute);
        instance = render(<DMAFeedbackScreen />);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should display comment label with size 18 in tab", () => {
        const labelElement = instance.getByTestId(ScreenTestId.dmaFeedback.commentLabel);
        expect(labelElement.props.style.fontSize).toBe(18);
    });
});

describe("<<< DMAFeedbackScreen Android version >>>", () => {
    let instance: any;
    beforeEach(() => {
        DeviceTypeUtilsMock.isIOS = false;
        (useNavigation as jest.Mock).mockReturnValue(navigation);
        (useRoute as jest.Mock).mockReturnValue(screenRoute);
        instance = render(<DMAFeedbackScreen />);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should display comment label with size 18 in tab", () => {
        const labelElement = instance.getByTestId(ScreenTestId.dmaFeedback.commentLabel);
        expect(labelElement.props.style.fontSize).toBe(18);
    });
});
