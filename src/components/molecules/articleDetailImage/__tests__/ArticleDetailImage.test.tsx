import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import React from 'react';
import { ArticleDetailImage } from 'src/components/molecules';

describe('<ArticleDetailImage>', () => {
    let instance: RenderAPI
    const mockString = 'mockString'

    beforeEach(() => {
        const component = <ArticleDetailImage
            title={mockString} author={mockString}
            isFirstItem
        />
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('should render component', () => {
        expect(instance).toBeDefined()
    })

})