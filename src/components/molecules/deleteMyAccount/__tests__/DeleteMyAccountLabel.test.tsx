import { render } from "@testing-library/react-native"
import { DeleteMyAccountLabel } from "../DeleteMyAccountLabel"
import { Label } from "src/components/atoms";
import React from "react";

const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isTab: false,
}));
describe("DeleteMyAccountLabel",() => {
    const deleteMyAccountIntroTitle = "يؤسفنا أن تتركنا!";
    it("should display title in Mobile",() => {
        DeviceTypeUtilsMock.isTab = false;
        const { container } = render( <DeleteMyAccountLabel title = {deleteMyAccountIntroTitle}/> );
        const labelElement = container.findByType(Label);
        expect(labelElement.props.children).toEqual(deleteMyAccountIntroTitle);
        expect(labelElement).not.toBeNull();
        expect(labelElement.props.style[0].fontSize).toBe(22);
    })

    it("should display title in Tab",() => {
        DeviceTypeUtilsMock.isTab = true;
        const { container } = render( <DeleteMyAccountLabel title = {deleteMyAccountIntroTitle}/> );
        const labelElement = container.findByType(Label);
        expect(labelElement.props.children).toEqual(deleteMyAccountIntroTitle);
        expect(labelElement).not.toBeNull();
        expect(labelElement.props.style[0].fontSize).toBe(26);
    })
})