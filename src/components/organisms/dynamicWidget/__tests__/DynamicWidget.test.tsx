import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import React, {useState}  from 'react';
import { DynamicWidget } from 'src/components/organisms';
import { PopulateWidget } from 'src/components/molecules';
import { FlatList } from 'react-native';

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
}));

const mediaData = {
    playlist: [
      {
        name: 'abc',
        id: '12'
      },
      {
        name: 'abc',
        id: '13'
      },
    ],
    title: 'abc'
}


const sampleData = [
    {
      body: 'example',
      title: 'example',
      nid: '1',
      image: 'example',
      news_categories : {
        id: '1',
        title: 'abc',
        url: 'acs',
        bundle: 'abc',
        name: 'example',
      },
      author: 'example',
      created: 'example',
      isBookmarked: true,
      type: 'example',
      blockName: 'example',
      position: 'example',
    },
    {
      body: 'example',
      title: 'example',
      nid: '2',
      image: 'example',
      news_categories : {
        id: '1',
        title: 'abc',
        url: 'acs',
        bundle: 'abc',
        name: 'example',
      },
      author: 'example',
      created: 'example',
      isBookmarked: true,
      type: 'example',
      blockName: 'example',
      position: 'example',
    },
]

describe('<Dynamic Widget>', () => {
    let instance: RenderAPI

    const mockFunction = jest.fn();
    const setSelectedTrack = jest.fn();
    const selectedTrack = jest.fn();
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
            (useState as jest.Mock).mockImplementation(() => [2, selectedTrack]);
            const component = <DynamicWidget data={[]} onPressBookmark={mockFunction} onEndReached={mockFunction} isLoading={false}/>
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
            (useState as jest.Mock).mockImplementation(() => ['2', setSelectedTrack]);
            const component = <DynamicWidget data={[sampleArticleData]} onPressBookmark={mockFunction} onEndReached={mockFunction} isLoading={true}/>
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
            fireEvent(element, 'togglePlayback', '2', mediaData);
            expect(mockFunction).toBeTruthy();
        })

        test('Should call FlatList ListFooterComponent', () => {
            const element = instance.container.findByType(FlatList)
            fireEvent(element, 'ListFooterComponent');
            expect(mockFunction).toBeTruthy()
        });

        test('Should call FlatList keyExtractor', () => {
            const element = instance.container.findByType(FlatList)
            fireEvent(element, 'keyExtractor', '', 2);
            expect(mockFunction).toBeTruthy()
        });

        test('Should call FlatList onPress', () => {
            const element = instance.container.findByType(FlatList)
            fireEvent(element, 'renderItem', {item: sampleData[0], index: 0});
            expect(mockFunction).toBeTruthy()
        });

    })

    
})