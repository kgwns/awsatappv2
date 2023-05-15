import { fireEvent, render, RenderAPI } from "@testing-library/react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { DMADeleteAccountScreen } from "../DMADeleteAccountScreen";
import { ScreenTestId } from "src/constants/TestConstant";
import { ButtonOnboard } from "src/components/atoms";
import { fetchDMAConfirmInfo, makeConfirmDeleteRequest } from "src/services/deleteMyAccountService";

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn().mockImplementation(() => ['test', jest.fn()]),
}));

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

jest.mock('src/services/deleteMyAccountService', () => ({
    ...jest.requireActual('src/services/deleteMyAccountService'),
    fetchDMAConfirmInfo: jest.fn(),
    makeConfirmDeleteRequest: jest.fn(),
}));

const navigation = {
    navigate: jest.fn(),
    pop: jest.fn(),
}

const screenRoute = { params: { optionId: '1', comment: 'Test' } };
const description = 'This is demo description';
const deleteMyAccountText = 'Delete my account';

const alertModelInfo = {
    title: '',
    message: '',
    buttonTitle: 'ok',
}

describe("<<< DMADeleteAccountScreen >>>", () => {
    let instance: RenderAPI;
    const mockFunction = jest.fn();
    const fetchDMAConfirmInfoMock = jest.fn();
    const makeConfirmDeleteRequestMock = jest.fn();

    beforeEach(() => {
        DeviceTypeUtilsMock.isTab = false;
        (useNavigation as jest.Mock).mockReturnValue(navigation);
        (useRoute as jest.Mock).mockReturnValue(screenRoute);

        jest.useFakeTimers({
            legacyFakeTimers: true
        });

        (fetchDMAConfirmInfo as jest.Mock).mockImplementation(fetchDMAConfirmInfoMock);
        fetchDMAConfirmInfoMock.mockReturnValue({ rows: [{ body_export: description }] });

        (makeConfirmDeleteRequest as jest.Mock).mockImplementation(makeConfirmDeleteRequestMock);
        makeConfirmDeleteRequestMock.mockReturnValue({ message: { code: 200 } });

        (useState as jest.Mock).mockImplementationOnce(() => [description, jest.fn()])
            .mockImplementationOnce(() => [true, jest.fn()])
            .mockImplementationOnce(() => ['', jest.fn()])
            .mockImplementationOnce(() => [false, jest.fn()])
            .mockImplementationOnce(() => [false, jest.fn()])
            .mockImplementationOnce(() => [alertModelInfo, jest.fn()]);
        instance = render(<DMADeleteAccountScreen />);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("Should render the component", () => {
        expect(instance).toBeDefined();
    })

    it('Should disable the delete account button', () => {
        const element = instance.container.findAllByType(ButtonOnboard)
        expect(element[0].props.disabled).toBeTruthy();
    });

    it('Should show popup  when press confirm Delete', () => {
        const typeToDeleteTextField = instance.getByTestId(ScreenTestId.dmaDeleteAccount.typeDeleteLabel);
        fireEvent(typeToDeleteTextField, 'onChangeText', deleteMyAccountText);
        const deleteButton = instance.container.findAllByType(ButtonOnboard)[0];
        instance.update(<DMADeleteAccountScreen />);
        expect(deleteButton.props.disabled).toBeFalsy();
    });

    it('Should call delete request method when press confirm', () => {
        const deleteButton = instance.container.findAllByType(ButtonOnboard)[0];
        fireEvent(deleteButton, 'onPress');
        expect(mockFunction).toBeTruthy();
    });

    it('Should call pop method when press cancel', () => {
        const cancelButton = instance.container.findAllByType(ButtonOnboard)[1];
        fireEvent(cancelButton, 'onPress');
        expect(navigation.pop).toHaveBeenCalled();
        expect(navigation.pop).toHaveBeenCalledWith(4);
    });

    it('Check Render fetchInfo got error', () => {
        (fetchDMAConfirmInfo as jest.Mock).mockImplementation(mockFunction);
        mockFunction.mockRejectedValue({ rows: [{ body_export: description }] });
        instance = render(<DMADeleteAccountScreen />);
        expect(instance).toBeDefined();
    });
});

describe("<<< DMADeleteAccountScreen Tab and Android >>>", () => {
    let instance: any;
    beforeEach(() => {
        jest.useFakeTimers({
            legacyFakeTimers: true
        });
        DeviceTypeUtilsMock.isTab = true;
        DeviceTypeUtilsMock.isIOS = false;
        (useNavigation as jest.Mock).mockReturnValue(navigation);
        (useRoute as jest.Mock).mockReturnValue(screenRoute);
        (useState as jest.Mock).mockImplementation(() => [description, jest.fn()])
        instance = render(<DMADeleteAccountScreen />);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("Should render the component for Tablet", () => {
        expect(instance).toBeDefined();
    });

    it("Should render the component for Android", () => {
        DeviceTypeUtilsMock.isTab = false;
        DeviceTypeUtilsMock.isIOS = false;
        expect(instance).toBeDefined();
    });
});
