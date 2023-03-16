import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import React from 'react';
import { ShortArticle } from 'src/components/organisms';
import { shortArticleData } from 'src/constants/Constants';
import { ArticleFooter } from 'src/components/molecules';
import FixedTouchable from 'src/shared/utils/FixedTouchable';
import { useLogin } from 'src/hooks';
import { FlatList } from 'react-native';
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
    const component = <ShortArticle data={shortArticleData} onPress={mockFunction} onUpdateBookmark={mockFunction} showSignUpPopUp={mockFunction} isFooterOutside={true} hideImage={true} showBody={true} />;
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

describe('<ShortArticle> renders when the user is in guest mode', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();

  beforeEach(() => {
    DeviceTypeUtilsMock.isTab = true;
    (useLogin as jest.Mock).mockReturnValueOnce({ isLoggedIn: false })
    const component = <ShortArticle data={shortArticleData} onPress={mockFunction} onUpdateBookmark={mockFunction} showSignUpPopUp={mockFunction} isFooterOutside={false} hideImage={false} showBody={true} />;
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

  it('should render FixedTouchable method', () => {
    const element = instance.container.findAllByType(FixedTouchable)[0];
    fireEvent(element, 'onPress');
    expect(mockFunction).toHaveBeenCalled()
  })

});

