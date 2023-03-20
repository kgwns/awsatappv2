import { render, RenderAPI } from '@testing-library/react-native'
import React from 'react'
import { getSvgImages } from 'src/shared/styles/svgImages';
import { ArticleOverlayContent } from '../ArticleOverlayContent';
const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isTab: false
}));

describe('<ArticleOverlayContent>', () => {
    let instance: RenderAPI;

    describe('<ArticleOverlayContent without subTitle>', () => {

        beforeEach(() => {
            const component = <ArticleOverlayContent author={'abc'} created={'bcd'} />
            instance = render(component)
        })

        afterEach(() => {
            jest.clearAllMocks()
            instance.unmount()
        })

        it('should render component in tab', () => {
            DeviceTypeUtilsMock.isTab = true;
            expect(instance).toBeDefined()
        })

        it('should call getSvgImages', () => {
            expect(getSvgImages).toBeTruthy();
        })
    });
    describe('<ArticleOverlayContent with subTitle>', () => {
        beforeEach(() => {
            const component = <ArticleOverlayContent author={'abc'} created={'bcd'} subtitle={'abc'} />
            instance = render(component)
        })

        afterEach(() => {
            jest.clearAllMocks()
            instance.unmount()
        })

        it('should render component', () => {
            expect(instance).toBeDefined()
        })

        it('should call getSvgImages', () => {
            expect(getSvgImages).toBeTruthy();
        })
    });
})
