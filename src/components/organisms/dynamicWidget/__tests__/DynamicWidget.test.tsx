import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import React, {useState}  from 'react';
import { DynamicWidget } from 'src/components/organisms';
import { PopulateWidget } from 'src/components/molecules';

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
}));

  
describe('<Dynamic Widget>', () => {
    let instance: RenderAPI

    const mockFunction = jest.fn()
    const setSelectedTrack = jest.fn()
    const sampleArticleData: any = {
        image: 'image',
        nid: 'nid',
        author: 'author',
        created: 'created',
        type: 'article'
    }

    describe('Check with empty data', () => {
        beforeEach(() => {
            (useState as jest.Mock).mockImplementation(() => [null, setSelectedTrack]);
            const component = <DynamicWidget data={[]} onPressBookmark={mockFunction}/>
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
            const component = <DynamicWidget data={[sampleArticleData]} onPressBookmark={mockFunction}/>
            instance = render(component)
        })
    
        afterEach(() => {
            jest.clearAllMocks()
            instance.unmount()
        })
        
        it('should render component', () => {
            expect(instance).toBeDefined()
        })

        test('Should call button image onPress', () => {
            const element = instance.container.findByType(PopulateWidget)
            fireEvent(element, 'onPressBookmark');
            expect(mockFunction).toBeTruthy();
        })

        test('Should call button image onPress', () => {
            const element = instance.container.findByType(PopulateWidget)
            fireEvent(element, 'togglePlayback');
            expect(mockFunction).toBeTruthy();
        })
    })

    
})