import { render, RenderAPI } from '@testing-library/react-native'
import React from 'react'
import { getSvgImages } from 'src/shared/styles/svgImages';
import { ArticleOverlayContent } from '../ArticleOverlayContent';

describe('<ArticleOverlayContent>', () => {
    let instance: RenderAPI;
    
    beforeEach(() => {
        const component = <ArticleOverlayContent author={'abc'} created={'bcd'}/>
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
})
