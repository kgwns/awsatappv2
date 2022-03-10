import { render, RenderAPI } from '@testing-library/react-native';
import React from 'react';
import { DynamicWidget } from 'src/components/organisms'

describe('<Dynamic Widget>', () => {
    let instance: RenderAPI

    const mockOnPressBookmark = jest.fn()

    const sampleArticleData: any = {
        image: 'image',
        nid: 'nid',
        author: 'author',
        created: 'created',
        type: 'article'
    }

    describe('Check with empty data', () => {
        beforeEach(() => {
            const component = <DynamicWidget data={[]} onPressBookmark={mockOnPressBookmark}/>
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

    describe('Check with article data', () => {
        beforeEach(() => {
            const component = <DynamicWidget data={[sampleArticleData]} onPressBookmark={mockOnPressBookmark}/>
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

    
})