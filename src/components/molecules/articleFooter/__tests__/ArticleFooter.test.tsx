import { fireEvent, render, RenderAPI } from '@testing-library/react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { moleculesTestID } from '../../../../constants'
import { articleFooterSample } from '../../../../constants/SampleData'
import ArticleFooter, { BookMarkColorType } from '../ArticleFooter'

describe('<ArticleFooter>', () => {
    let instance: RenderAPI
    const mockFunction =jest.fn();
    
    beforeEach(() => {
        const component = <ArticleFooter {...articleFooterSample} isBookmarked={true} bookMarkColorType={BookMarkColorType.WHITE}/>
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
        expect(render( <ArticleFooter {...articleFooterSample} isBookmarked={false} bookMarkColorType={BookMarkColorType.WHITE}/>)).toBeDefined()
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
})
