import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import React, {useState}  from 'react';
import { DynamicWidget } from 'src/components/organisms';
import { PopulateWidget } from 'src/components/molecules';
import { ActivityIndicator, FlatList } from 'react-native';

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
}));
const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isTab: false,
}));

jest.mock('react-native-safe-area-context', () => ({
    ...jest.requireActual('react-native-safe-area-context'),
    useSafeAreaInsets: () => ({
      top: 10,
      bottom: 10
    })
  }));

const sourceData = {
    file: 'www.file.com'
}

const mediaData = {
    playlist: [
      {
        name: 'abc',
        id: '12',
        sources: [sourceData],
      },
      {
        name: 'abc',
        id: '13',
        sources: [sourceData],
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
      type: 'multimedia',
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
    const sampleArticleData: any = {
        image: 'image',
        nid: 'nid',
        author: 'author',
        created: 'created',
        type: 'multimedia'
    }

    describe('Check with empty data', () => {
        beforeEach(() => {
            (useState as jest.Mock).mockImplementation(() => [null, setSelectedTrack]);
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
            DeviceTypeUtilsMock.isTab = true;
            (useState as jest.Mock).mockImplementation(() => ['2', setSelectedTrack]);
            const component = <DynamicWidget data={[sampleArticleData]} onPressBookmark={mockFunction} onEndReached={mockFunction} isLoading={true}/>
            instance = render(component)
        })
    
        afterEach(() => {
            jest.clearAllMocks()
            instance.unmount()
        })

        test('Should call button image onPress', () => {
            const element = instance.container.findByType(PopulateWidget)
            fireEvent(element, 'onPressBookmark');
            expect(mockFunction).toHaveBeenCalled();
        })

        test('Should call FlatList ListFooterComponent', () => {
            const element = instance.container.findByType(FlatList)
            fireEvent(element, 'ListFooterComponent');
            const loadingElement = instance.container.findByType(ActivityIndicator);
            expect(loadingElement).not.toBeNull();
        });

        test('Should call FlatList onPress', () => {
            const element = instance.container.findByType(FlatList)
            fireEvent(element, 'renderItem', {item: sampleData[0], index: 0});
            const testId = instance.getByTestId('video_screen_id');
            expect(testId).not.toBeNull();
        });

        test('should have 2 columns in Tab',() => {
            const element = instance.container.findByType(FlatList);
            expect(element.props.numColumns).toEqual(2);
        })

    })
    describe('Check with article data', () => {
        beforeEach(() => {
            DeviceTypeUtilsMock.isTab = false;
            (useState as jest.Mock).mockImplementation(() => ['2', setSelectedTrack]);
            const component = <DynamicWidget data={[sampleArticleData]} onPressBookmark={mockFunction} onEndReached={mockFunction} isLoading={true}/>
            instance = render(component)
        })
    
        afterEach(() => {
            jest.clearAllMocks()
            instance.unmount()
        })

        test('should have 1 columns in mobile',() => {
            DeviceTypeUtilsMock.isTab = false;
            const element = instance.container.findByType(FlatList);
            expect(element.props.numColumns).toEqual(1);
        })

    })

    describe('Test With Guest user Mode', () => {
        beforeEach(() => {
            (useState as jest.Mock).mockImplementation(() => ['2', setSelectedTrack]);
            const component = <DynamicWidget 
            data={[sampleArticleData]} onPressBookmark={mockFunction} 
            onEndReached={mockFunction} 
            isLoading={false}/>
            instance = render(component)
        })
    
        afterEach(() => {
            jest.clearAllMocks()
            instance.unmount()
        })
        
        it('should not display loading indicator', () => {
            expect(instance.queryByTestId('loadingId')).toBeNull()
        })
    })

    
})