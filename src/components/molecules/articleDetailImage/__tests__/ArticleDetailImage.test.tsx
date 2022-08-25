import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import React from 'react';
import { ArticleDetailImage } from 'src/components/molecules';
import { BannerImageWithOverlay } from 'src/components/atoms';

describe('<ArticleDetailImage>', () => {
    let instance: RenderAPI
    const mockString = 'mockString'
    const mockFunction = jest.fn();

    beforeEach(() => {
        const component = <ArticleDetailImage
            title={mockString} author={mockString}
            isFirstItem created={''} isRelatedArticle={false} paused={false}        />
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('should render component', () => {
        expect(instance).toBeDefined()
    })

    it('When BannerImageWithOverlay onImageLoadEnd', () => {
        const listButton = instance.container.findAllByType(BannerImageWithOverlay)[0];
        fireEvent(listButton, 'onImageLoadEnd');
        expect(mockFunction).toHaveBeenCalled;
    });

})