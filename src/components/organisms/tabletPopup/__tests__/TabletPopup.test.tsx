import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { TabletPopup } from "../TabletPopup";

describe("TabletPopup",() => {
    const onCloseMock = jest.fn();
    const onButtonPressMock = jest.fn();

    it("Should Display Popup when the user is in guest mode, and click the close icon",() => {
        const { getByTestId } = render(<TabletPopup onClose={onCloseMock} isVisible = {true} />)
        const testId = getByTestId('AlertModalTO1');
        fireEvent.press(testId);
        expect(onCloseMock).toHaveBeenCalled();
    });

    it("Should Display Popup when the user is in guest mode and click the button",() => {
        const { getByTestId } = render(<TabletPopup onClose={onCloseMock} onButtonPress={onButtonPressMock} isVisible = {true} />)
        const testId = getByTestId('AlertModalTO2');
        fireEvent.press(testId);
        expect(onButtonPressMock).toHaveBeenCalled();
    });

    it("Should Not display popup while the user signIn the app",() => {
        const { queryByTestId } = render(<TabletPopup onClose={onCloseMock} isVisible = {false} />)
        expect(queryByTestId('modalId')).toBeNull();
    })

    it("By Default, Popup is not displayed",() => {
        const { queryByTestId } = render(<TabletPopup onClose={onCloseMock} />)
        expect(queryByTestId('modalId')).toBeNull();
    })
})