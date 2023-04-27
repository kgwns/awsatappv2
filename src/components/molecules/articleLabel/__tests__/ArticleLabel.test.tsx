import { render, RenderAPI } from '@testing-library/react-native';
import { ArticleLabel } from '../ArticleLabel';
import React from 'react';
import { DisplayTypes } from 'src/constants/Constants';
import { AppState } from 'react-native';
const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isTab: true,
  isIOS: true
}));

  jest.mock('src/components/atoms/label/Label',() => ({Label:() => <div></div>}));

describe("test ArticleLabel",() => {
    let instance: RenderAPI;
    beforeEach(() => {
        const component = (
            <ArticleLabel displayType='' />
        )
        instance = render(component);
    })
    afterEach(() => {
        jest.clearAllMocks();
    })
    it("should render a component",() => {
        expect(instance).toBeDefined();
    })
    it("should not return anything if display type is empty",() => {
        expect(instance.container.innerHTML).toBeUndefined();
    })
})

describe("test ArticleLabel",() => {
    let instance: RenderAPI;
    it("should not return anything, if displayType does not match",() => {
        const component = (
            <ArticleLabel displayType='displayType' enableTopMargin={true} enableBottomMargin = {true}/>
        )
        instance = render(component);
        expect(instance.container.innerHTML).toBeUndefined();
    })
    it("should render LiveBlogTag",() => {
        const component = (
            <ArticleLabel displayType={DisplayTypes.liveCoverage} enableTopMargin={true} enableBottomMargin = {true}/>
        )
        instance = render(component);
        expect(AppState.addEventListener).toHaveBeenCalled();
    })
    it("should render label with displayType as analysis",() => {
        DeviceTypeUtilsMock.isTab = false;
        const component = (
            <ArticleLabel displayType={DisplayTypes.analysis} enableTopMargin={true} enableBottomMargin = {true}/>
        )
        instance = render(component);
        const testID = instance.getByTestId('labelId');
        expect(testID).toBeDefined();
    })
    it("should render label with displayType as special",() => {
        DeviceTypeUtilsMock.isIOS = false;
        const component = (
            <ArticleLabel displayType={DisplayTypes.special} enableTopMargin={true} enableBottomMargin = {true}/>
        )
        instance = render(component);
        const testID = instance.getByTestId('labelId');
        expect(testID).toBeDefined();
    })
    it("should render label with displayType as breakingNews",() => {
        const component = (
            <ArticleLabel displayType={DisplayTypes.breakingNews} enableTopMargin={true} enableBottomMargin = {true}/>
        )
        instance = render(component);
        const testID = instance.getByTestId('labelId');
        expect(testID).toBeDefined();
    })
})
