import { fireEvent, render, RenderAPI } from '@testing-library/react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { getSvgImages } from 'src/shared/styles/svgImages'
import { moleculesTestID } from '../../../../constants/Constants'
import { articleFooterSample } from '../../../../constants/Constants'
import ArticleFooter, { BookMarkColorType } from '../ArticleFooter'

describe('<ArticleFooter>', () => {
    let instance: RenderAPI
    const mockFunction = jest.fn();

    describe('<ArticleFooter With isDeatial false>', () => {

        beforeEach(() => {
            const component = <ArticleFooter {...articleFooterSample} isBookmarked={true} bookMarkColorType={BookMarkColorType.WHITE} />
            instance = render(component)
        })

        afterEach(() => {
            jest.clearAllMocks()
            instance.unmount()
        })

        it('should render component', () => {
            expect(instance).toBeDefined()
        })

        it('should render component', () => {
            expect(render(<ArticleFooter {...articleFooterSample} isBookmarked={false} bookMarkColorType={BookMarkColorType.WHITE} />)).toBeDefined()
        })

        it('should call getSvgImages', () => {
            expect(getSvgImages).toBeTruthy();
        })

        it('Check onPress method', () => {
            const element = instance.getByTestId(moleculesTestID.storySaveBtn)
            fireEvent.press(element)
        })
        it('Check onPress method', () => {
            const element = instance.container.findAllByType(TouchableOpacity)[0];
            fireEvent(element, 'onPress');
            expect(mockFunction).toHaveBeenCalled;
        });
    });
    describe('<ArticleFooter With isDeatial true>', () => {

        beforeEach(() => {
            const component = <ArticleFooter {...articleFooterSample} isBookmarked={true} isDetail hideBookmark />
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
