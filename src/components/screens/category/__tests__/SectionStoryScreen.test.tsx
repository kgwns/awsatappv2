import React, { useState } from 'react'
import { fireEvent, render, RenderAPI } from '@testing-library/react-native'
import { SectionStoryScreen } from '../SectionStoryScreen'
import { Provider } from 'react-redux'
import { storeSampleData } from 'src/constants/Constants'
import { NewsFeed, PopUp } from 'src/components/organisms'
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native'
import { FilterComponent } from 'src/components/molecules'
import { fetchSubArticleSectionApi } from 'src/services/newsViewService'
import { NewsViewBodyGet } from 'src/redux/newsView/types'
import { AxiosError } from 'axios'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
    ...jest.requireActual('src/shared/utils/dimensions'),
    isTab: false,
}));

jest.mock('src/services/newsViewService',() => ({
    fetchSubArticleSectionApi: jest.fn(),
    fetchNewsViewApi: jest.fn()
}))

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
}));

jest.mock("src/hooks/useBookmark", () => ({
    useBookmark: () => {
      return {
        bookmarkIdInfo: [
          {
              nid: '1',
              bundle: 'string'
          },
          {
              nid: '2',
              bundle: 'string'
          }
        ],
        sendBookmarkInfo: () => [],
        removeBookmarkedInfo: () => [],
        validateBookmark: () => true,
      }
    },
}));

jest.mock("src/hooks/useLogin", () => ({
    useLogin: () => {
      return {
        isLoggedIn: false,
      }
    },
}));
const payload: NewsViewBodyGet = {
    items_per_page: 1,
    page: 0,
    offset: 0,
    sectionId: 1,
  };
const childInfoData = [
    {
        tabName: 'tabName',
        isSelected: false,
        child:[
            {
                isSelected:true
            }
        ]  
    },
    {
        tabName: 'tabName',
        isSelected: true,
        child:[
            {
                isSelected:false
            }
        ]
    },

]

describe('<SectionStoryScreen>', () => {
    let instance: RenderAPI

    const mockFunction = jest.fn()
    const setHeroListDataInfo = mockFunction;
    const setBottomListDataInfo = mockFunction;
    const setTopListDataInfo = mockFunction;
    const setVideoListData = mockFunction;
    const setShowPopUp = mockFunction;
    const setIsBottomListLoading = mockFunction;
    const setCurrentSectionId = mockFunction;
    const setChildSection = mockFunction;
    const initialLoading = mockFunction;

    const navigation = {
        reset: jest.fn(),
        navigate: jest.fn(),
    }
    
    beforeEach(() => {
        jest.useFakeTimers({
            legacyFakeTimers: true
        });
        (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
        (useState as jest.Mock).mockImplementation(() => [[], setHeroListDataInfo]);
        (useState as jest.Mock).mockImplementation(() => [[], setBottomListDataInfo]);
        (useState as jest.Mock).mockImplementation(() => [[], setTopListDataInfo]);
        (useState as jest.Mock).mockImplementation(() => [[], setVideoListData]);
        (useState as jest.Mock).mockImplementation(() => [false, setShowPopUp]);
        (useState as jest.Mock).mockImplementation(() => [false, initialLoading]);
        (useState as jest.Mock).mockImplementation(() => [false, setIsBottomListLoading]);
        (useState as jest.Mock).mockImplementation(() => ['12', setCurrentSectionId]);
        (useState as jest.Mock).mockImplementation(() => [[], setChildSection]);
        
        const component = <Provider store={storeSampleData}>
            <GestureHandlerRootView>
                <SectionStoryScreen sectionId={'1'} childInfo={[]} onUpdateChildSection={mockFunction} />
            </GestureHandlerRootView>
        </Provider>
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('Should render SectionStoryScreen', () => {
        expect(instance).toBeDefined()
    })

    it('Should render SectionStoryScreen in Tab', () => {
        DeviceTypeUtilsMock.isTab = true;
        expect(instance).toBeDefined()
    })


    test('Should call onPressButton', () => {
        const element = instance.container.findByType(PopUp)
        fireEvent(element, 'onPressButton');
        expect(navigation.reset).toBeTruthy()
    });

    test('Should call onClosePopUp', () => {
        const element = instance.container.findByType(PopUp)
        fireEvent(element, 'onClosePopUp');
        expect(mockFunction).toBeTruthy()
    });

    test('Should call FlatList onPress', () => {
        const element = instance.container.findByType(FlatList)
        fireEvent(element, 'renderItem', {item: [{}], index: 0});
        expect(mockFunction).toBeTruthy()
    });

    test('Should call FlatList keyExtractor', () => {
        const element = instance.container.findByType(FlatList)
        fireEvent(element, 'keyExtractor', '', 2);
        expect(mockFunction).toBeTruthy()
    });

    test('Should call FlatList onPress', () => {
        const element = instance.container.findByType(FlatList)
        fireEvent(element, 'onScrollBeginDrag');
        expect(global.refFlatList).toBeTruthy()
    });

})



describe('<SectionStoryScreen> with childInfo data props', () => {
    let instance: RenderAPI

    const mockFunction = jest.fn()
    const setHeroListDataInfo = mockFunction;
    const setBottomListDataInfo = mockFunction;
    const setTopListDataInfo = mockFunction;
    const setVideoListData = mockFunction;
    const setShowPopUp = mockFunction;
    const setIsBottomListLoading = mockFunction;
    const setCurrentSectionId = mockFunction;
    const setChildSection = mockFunction;
    const initialLoading = mockFunction;
    const navigation = {
        reset: jest.fn(),
        navigate: jest.fn(),
    }
    
    beforeEach(() => {
        (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
        (useState as jest.Mock).mockImplementation(() => [[], setHeroListDataInfo]);
        (useState as jest.Mock).mockImplementation(() => [[], setBottomListDataInfo]);
        (useState as jest.Mock).mockImplementation(() => [[], setTopListDataInfo]);
        (useState as jest.Mock).mockImplementation(() => [[], setVideoListData]);
        (useState as jest.Mock).mockImplementation(() => [false, setShowPopUp]);
        (useState as jest.Mock).mockImplementation(() => [true, initialLoading]);
        (useState as jest.Mock).mockImplementation(() => [false, setIsBottomListLoading]);
        (useState as jest.Mock).mockImplementation(() => ['1', setCurrentSectionId]);
        (useState as jest.Mock).mockImplementation(() => [childInfoData, setChildSection]);
        
        const component = <Provider store={storeSampleData}>
            <GestureHandlerRootView>
                <SectionStoryScreen sectionId={'1'} childInfo={childInfoData} onUpdateChildSection={mockFunction} />
            </GestureHandlerRootView>
        </Provider>
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('Should render SectionStoryScreen', () => {
        expect(instance).toBeDefined()
    })

})

describe('should render FilterComponent', () => {
    let instance: RenderAPI

    const mockFunction = jest.fn()
    const setHeroListDataInfo = mockFunction;
    const setBottomListDataInfo = mockFunction;
    const setTopListDataInfo = mockFunction;
    const setVideoListData = mockFunction;
    const setShowPopUp = mockFunction;
    const setIsBottomListLoading = mockFunction;
    const setCurrentSectionId = mockFunction;
    const setChildSection = mockFunction;
    const initialLoading = mockFunction;
    
    const navigation = {
        reset: jest.fn(),
        navigate: jest.fn(),
    }
    
    beforeEach(() => {
        jest.useFakeTimers({
            legacyFakeTimers: true
        });
        (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
        (useState as jest.Mock).mockImplementation(() => [[], setHeroListDataInfo]);
        (useState as jest.Mock).mockImplementation(() => [[], setBottomListDataInfo]);
        (useState as jest.Mock).mockImplementation(() => [[], setTopListDataInfo]);
        (useState as jest.Mock).mockImplementation(() => [[], setVideoListData]);
        (useState as jest.Mock).mockImplementation(() => [false, setShowPopUp]);
        (useState as jest.Mock).mockImplementation(() => [false, initialLoading]);
        (useState as jest.Mock).mockImplementation(() => [false, setIsBottomListLoading]);
        (useState as jest.Mock).mockImplementation(() => ['1', setCurrentSectionId]);
        (useState as jest.Mock).mockImplementation(() => [childInfoData, setChildSection]);
        
        const component = <Provider store={storeSampleData}>
            <GestureHandlerRootView>
                <SectionStoryScreen sectionId={'1'} childInfo={childInfoData} onUpdateChildSection={mockFunction} />
            </GestureHandlerRootView>
        </Provider>
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('Should render SectionStoryScreen', () => {
        expect(instance).toBeDefined()
    })

    it('should call FilterComponent onPress',() => {
        const element = instance.container.findByType(FilterComponent);
        fireEvent(element,'onPress',1);
        expect(mockFunction).toBeTruthy();
    })

    it('should call FilterComponent onPressSubChild',() => {
        const element = instance.container.findByType(FilterComponent);
        fireEvent(element,'onPressSubChild',1,0);
        expect(mockFunction).toBeTruthy();
    })

    it('should call FilterComponent onPressSubChild',() => {
        const element = instance.container.findByType(FilterComponent);
        fireEvent(element,'onPressSubChild',0,0);
        expect(mockFunction).toBeTruthy();
    })

})



describe('<SectionStoryScreen> should call fetchSubArticleSectionApi', () => {
    let instance: RenderAPI

    const mockFunction = jest.fn()
    const setHeroListDataInfo = mockFunction;
    const setBottomListDataInfo = mockFunction;
    const setTopListDataInfo = mockFunction;
    const setVideoListData = mockFunction;
    const setShowPopUp = mockFunction;
    const setIsBottomListLoading = mockFunction;
    const setCurrentSectionId = mockFunction;
    const setChildSection = mockFunction;
    const initialLoading = mockFunction;
    const fetchSubArticleSectionApiMock = mockFunction;

    const navigation = {
        reset: jest.fn(),
        navigate: jest.fn(),
    }
    
    beforeEach(() => {
        jest.useFakeTimers({
            legacyFakeTimers: true
        });
        (fetchSubArticleSectionApi as jest.Mock).mockImplementation(fetchSubArticleSectionApiMock);

        (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
        (useState as jest.Mock).mockImplementation(() => [[], setHeroListDataInfo]);
        (useState as jest.Mock).mockImplementation(() => [[], setBottomListDataInfo]);
        (useState as jest.Mock).mockImplementation(() => [[], setTopListDataInfo]);
        (useState as jest.Mock).mockImplementation(() => [[], setVideoListData]);
        (useState as jest.Mock).mockImplementation(() => [false, setShowPopUp]);
        (useState as jest.Mock).mockImplementation(() => [false, initialLoading]);
        (useState as jest.Mock).mockImplementation(() => [false, setIsBottomListLoading]);
        (useState as jest.Mock).mockImplementation(() => ['12', setCurrentSectionId]);
        (useState as jest.Mock).mockImplementation(() => [[], setChildSection]);
        
        const component = <Provider store={storeSampleData}>
            <GestureHandlerRootView>
                <SectionStoryScreen sectionId={'1'} childInfo={[]} onUpdateChildSection={mockFunction} />
            </GestureHandlerRootView>
        </Provider>
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it("should fetchSubArticleSectionApi return response", async() => {
        fetchSubArticleSectionApiMock.mockReturnValue({rows:[{result:true}]});
        const response = await fetchSubArticleSectionApi(payload);
        expect(response).toEqual({rows:[{result:true}]});
    })

});

describe('<SectionStoryScreen> should call fetchSubArticleSectionApi', () => {
    let instance: RenderAPI

    const mockFunction = jest.fn()
    const setHeroListDataInfo = mockFunction;
    const setBottomListDataInfo = mockFunction;
    const setTopListDataInfo = mockFunction;
    const setVideoListData = mockFunction;
    const setShowPopUp = mockFunction;
    const setIsBottomListLoading = mockFunction;
    const setCurrentSectionId = mockFunction;
    const setChildSection = mockFunction;
    const initialLoading = mockFunction;
    const fetchSubArticleSectionApiMock = mockFunction;

    const navigation = {
        reset: jest.fn(),
        navigate: jest.fn(),
    }
    
    beforeEach(() => {
        jest.useFakeTimers({
            legacyFakeTimers: true
        });
        (fetchSubArticleSectionApi as jest.Mock).mockImplementation(fetchSubArticleSectionApiMock);
        fetchSubArticleSectionApiMock.mockImplementation(() => Promise.reject({response:{data:"error"}}));
        (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
        (useState as jest.Mock).mockImplementation(() => [[], setHeroListDataInfo]);
        (useState as jest.Mock).mockImplementation(() => [[], setBottomListDataInfo]);
        (useState as jest.Mock).mockImplementation(() => [[], setTopListDataInfo]);
        (useState as jest.Mock).mockImplementation(() => [[], setVideoListData]);
        (useState as jest.Mock).mockImplementation(() => [false, setShowPopUp]);
        (useState as jest.Mock).mockImplementation(() => [false, initialLoading]);
        (useState as jest.Mock).mockImplementation(() => [false, setIsBottomListLoading]);
        (useState as jest.Mock).mockImplementation(() => ['12', setCurrentSectionId]);
        (useState as jest.Mock).mockImplementation(() => [[], setChildSection]);
        
        const component = <Provider store={storeSampleData}>
            <GestureHandlerRootView>
                <SectionStoryScreen sectionId={'12'} childInfo={[]} onUpdateChildSection={mockFunction} />
            </GestureHandlerRootView>
        </Provider>
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it("should throw error",async() => {
        try{
            await fetchSubArticleSectionApi(payload);
        }
        catch(error) {
            const errorResponse = error as AxiosError;
            expect(errorResponse?.response?.data).toBeDefined();
        }
    });
});

describe("SectionStoryScreen", () => {
    let instance: RenderAPI

    const mockFunction = jest.fn();
    const setState = jest.fn();
    beforeEach(() => {
        (useState as jest.Mock).mockImplementationOnce(() => [[{res:true}],setState]).mockImplementationOnce(() => [false,setState]).mockImplementationOnce(() => [[{child:[]}],setState])
        const component = <Provider store={storeSampleData}>
            <GestureHandlerRootView>
                <SectionStoryScreen sectionId={'1'} childInfo={[]} onUpdateChildSection={mockFunction} />
            </GestureHandlerRootView>
        </Provider>
        instance = render(component)
    });

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it("should render NewsFeed onScroll",() => {
        const element = instance.container.findByType(NewsFeed);
        fireEvent(element,'onScroll');
        expect(setState).toHaveBeenCalled();
    })
    
    it("should render NewsFeed onUpdateNewsFeedBookmark",() => {
        const element = instance.container.findByType(NewsFeed);
        fireEvent(element,'onUpdateNewsFeedBookmark',0);
        expect(setState).toHaveBeenCalled();
    })

})