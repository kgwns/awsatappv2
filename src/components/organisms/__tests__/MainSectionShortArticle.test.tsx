import { fireEvent, render, RenderAPI, waitFor } from '@testing-library/react-native';
import React from 'react';
import { shortArticleData } from 'src/constants/Constants';
import { ArticleFooter } from 'src/components/molecules';
import FixedTouchable from 'src/shared/utils/FixedTouchable';
import { useLogin } from 'src/hooks';
import { FlatList } from 'react-native';
import MainSectionShortArticle from '../MainSectionShortArticle';
import '@testing-library/jest-dom';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isTab: false,
}));
jest.mock("src/hooks/useLogin", () => ({
  useLogin: jest.fn()
}));

describe('<ShortArticle>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const useLoginMock = jest.fn();

  beforeEach(() => {
    DeviceTypeUtilsMock.isTab = false;
    (useLogin as jest.Mock).mockImplementation(useLoginMock);
    useLoginMock.mockReturnValue({ isLoggedIn: true })
    const component = (
      <GestureHandlerRootView>
        <MainSectionShortArticle data={shortArticleData} onPress={mockFunction} onUpdateBookmark={mockFunction} showSignUpPopUp={mockFunction} isFooterOutside={true} hideImage={true} showBody={true} />
      </GestureHandlerRootView>
    )
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('should render ShortArticle component', () => {
    expect(instance).toBeDefined();
  });

  it('should render ArticleFooter component', () => {
    const element = instance.container.findAllByType(ArticleFooter)[0];
    fireEvent(element, 'onPress');
    expect(mockFunction).toHaveBeenCalled()
  })

  it('should render flatlist renderItem', () => {
    const element = instance.container.findByType(FlatList);
    fireEvent(element, 'renderItem', {
      item: {
        image: 'string',
        nid: 'string',
        author: 'string',
        created: 'string',
        isBookmarked: true,
        body: 'string',
        type: 'HomePageArticleType'
      },
      index: 2
    });
    expect(element).toBeTruthy();
  })

});

describe('<MainSectionShortArticle> renders when the user is in guest mode', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();

  beforeEach(() => {
    DeviceTypeUtilsMock.isTab = true;
    (useLogin as jest.Mock).mockReturnValueOnce({ isLoggedIn: false })
    const component = (
      <GestureHandlerRootView>
        <MainSectionShortArticle data={shortArticleData} onPress={mockFunction} onUpdateBookmark={mockFunction} showSignUpPopUp={mockFunction} isFooterOutside={false} hideImage={false} showBody={true} />
      </GestureHandlerRootView>
    )
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('should render MainSectionShortArticle component', () => {
    expect(instance).toBeDefined();
  });

  it('should render ArticleFooter component', () => {
    const element = instance.container.findAllByType(ArticleFooter)[0];
    fireEvent(element, 'onPress');
    expect(mockFunction).toHaveBeenCalled()
  })

  it('should render FixedTouchable method', () => {
    const element = instance.container.findAllByType(FixedTouchable)[0];
    fireEvent(element, 'onPress');
    expect(mockFunction).toHaveBeenCalled()
  })

});

describe("MainSectionShortArticle, user Logged in",() => {
    const mockFunction = jest.fn();
    beforeEach(() => {
        (useLogin as jest.Mock).mockReturnValueOnce({isLoggedIn: true});
    })
    afterEach(() => {
        jest.clearAllMocks();
    })
    it("should render WidgetHeaderElement and display title in screen",() => {
        const instance = render(
          <GestureHandlerRootView>
             <MainSectionShortArticle headerLeft={{ title: 'title' }} data={[]} 
                onPress={mockFunction} onUpdateBookmark={mockFunction} 
                showSignUpPopUp={mockFunction} 
            />
          </GestureHandlerRootView>
        );
        waitFor(() => expect(instance.container.props.headerLeft.title).toBeInTheDocument());
    });

    it("should not render WidgetHeaderElement in screen",() => {
        const instance = render(
          <GestureHandlerRootView>
            <MainSectionShortArticle data={[]}
              onPress={mockFunction} onUpdateBookmark={mockFunction}
              showSignUpPopUp={mockFunction}
            />
          </GestureHandlerRootView>

        );
        expect(instance.queryByTestId('widgetHeaderButton')).toBe(null)
    });

    it("should call renderItem and display title in the screen",() => {
        const instance = render(
          <GestureHandlerRootView>
            <MainSectionShortArticle data = {shortArticleData} onPress={mockFunction} 
                onUpdateBookmark={mockFunction} showSignUpPopUp={mockFunction} 
            />
          </GestureHandlerRootView>
        );
        const element = instance.container.findByType(FlatList);
        fireEvent(element,'renderItem',{item: shortArticleData[0],index: 0});
        waitFor(() => expect(shortArticleData[0].title).toBeInTheDocument());
    });

    it("should call renderItem and display body in the screen",() => {
        DeviceTypeUtilsMock.isTab = true;
        const instance = render(
          <GestureHandlerRootView>
            <MainSectionShortArticle data = {shortArticleData} onPress={mockFunction} 
                onUpdateBookmark={mockFunction} showSignUpPopUp={mockFunction} 
            />
          </GestureHandlerRootView>
        );
        const element = instance.container.findByType(FlatList);
        fireEvent(element,'renderItem',{item: shortArticleData[0],index: 0});
        waitFor(() => expect(shortArticleData[0].body).toBeInTheDocument());
    });

    it("should call renderItem and check image is rendered ",() => {
        const instance = render(
          <GestureHandlerRootView>
            <MainSectionShortArticle data = {shortArticleData} onPress={mockFunction} 
                onUpdateBookmark={mockFunction} showSignUpPopUp={mockFunction} hideImage = {true}
            />
          </GestureHandlerRootView>
        );
        const element = instance.container.findByType(FlatList);
        fireEvent(element,'renderItem',{item: shortArticleData[0],index: 0});
        waitFor(() => expect(instance.getByTestId('imageId')).toBeInTheDocument());
    });

    it("should call renderItem and check image is not rendered ",() => {
        const instance = render(
          <GestureHandlerRootView>
            <MainSectionShortArticle data = {shortArticleData} onPress={mockFunction} 
                onUpdateBookmark={mockFunction} showSignUpPopUp={mockFunction} hideImage = {false}
            />
          </GestureHandlerRootView>
        );
        const element = instance.container.findByType(FlatList);
        fireEvent(element,'renderItem',{item: shortArticleData[0],index: 0});
        waitFor(() => expect(instance.getByTestId('imageId')).toBeInTheDocument());
    });

})