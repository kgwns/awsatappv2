import React, { useState } from 'react'
import { fireEvent, render, RenderAPI } from '@testing-library/react-native'
import { Provider } from 'react-redux'
import { storeSampleData } from '../../../../constants/Constants'
import { MyNewsScreen, MyNewsTabType } from '../MyNewsScreen'
import { ScreenContainer } from '../../ScreenContainer/ScreenContainer'
import { SignupAlertCard } from 'src/components/molecules'
import { ArticlesListItemType } from 'src/redux/contentForYou/types'
import { useLogin } from 'src/hooks'
import { useNavigation } from '@react-navigation/native'
const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isIOS: false
}));

jest.mock('src/hooks/useLogin', () => ({ useLogin: jest.fn() }));

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

const sampleData: ArticlesListItemType[] = [
  {
    nid: '1',
    title: 'example',
    body: 'abc',
    field_image: 'abc',
    view_node: 'abc',
    field_news_categories_export: [
      {
        id: 'example',
        title: 'example',
        url: 'example',
        bundle: 'example',
        name: 'example',
      },
      {
        id: 'example',
        title: 'example',
        url: 'example',
        bundle: 'example',
        name: 'example',
      }
    ],
    field_publication_date_export: '2021-05-20T20:05:45+0000',
    created_export: '2021-05-20T20:05:45+0000',
    author_resource: 'author',
    type: 'type',
    field_new_photo: 'abc'
  },
  {
    nid: '2',
    title: 'example',
    body: 'abc',
    field_image: 'abc',
    view_node: 'abc',
    field_news_categories_export: [
      {
        id: 'example',
        title: 'example',
        url: 'example',
        bundle: 'example',
        name: 'example',
      },
      {
        id: 'example',
        title: 'example',
        url: 'example',
        bundle: 'example',
        name: 'example',
      }
    ],
    field_publication_date_export: '2021-05-20T20:05:45+0000',
    created_export: '2021-05-20T20:05:45+0000',
    author_resource: 'author',
    type: 'type',
    field_new_photo: 'abc'
  }
];

jest.mock("src/hooks/useContentForYou", () => ({
  useContentForYou: () => {
    return {
      isLoading: false,
      favouriteOpinionsData: [],
      error: 'error',
      fetchFavouriteOpinionsRequest: () => {
        return []
      },
      isArticleLoading: false,
      favouriteArticlesData: sampleData,
      articleError: 'error',
      fetchFavouriteArticlesRequest: () => {
        return []
      },
      emptyAllData: () => {
        return
      },
    }
  },
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

const data = [
  {
    keyName: MyNewsTabType.media,
  },
  {
    keyName: MyNewsTabType.writers,
  },
  {
    keyName: MyNewsTabType.topics,
  },
];

describe('<MyNewsScreen>', () => {
  let instance: RenderAPI
  const mockFunction = jest.fn();

  const index = mockFunction;
  const routes = mockFunction;
  const useLoginMock = mockFunction;

  const navigation = {
    reset: mockFunction,
  }

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    (useLogin as jest.Mock).mockImplementation(useLoginMock);
    useLoginMock.mockReturnValue({
      isLoggedIn: false,
    });
    (useState as jest.Mock).mockImplementation(() => [0, index]);
    (useState as jest.Mock).mockImplementation(() => [data, routes]);
    const component =
      <Provider store={storeSampleData}>
        <MyNewsScreen />
      </Provider>
    instance = render(component)
  })

  afterEach(() => {
    jest.clearAllMocks()
    instance.unmount()
  })

  test('Should render component in IOS', () => {
    DeviceTypeUtilsMock.isIOS = true; 
    expect(instance).toBeDefined()
  })

  test('Should call ScreenContainer onCloseSignUpAlert', () => {
    const element = instance.container.findByType(ScreenContainer)
    fireEvent(element, 'onCloseSignUpAlert');
    expect(mockFunction).toBeTruthy()
  });

  test('Should call SignupAlertCard onCloseSignUpAlert', () => {
    const element = instance.container.findByType(SignupAlertCard)
    fireEvent(element, 'onCloseSignUpAlert');
    expect(navigation.reset).toBeTruthy()
  });


  test('Should call SignupAlertCard onPress', () => {
    const element = instance.container.findByType(SignupAlertCard)
    fireEvent(element, 'onPress');
    expect(mockFunction).toBeTruthy()
  });
})

describe('<MyNewsScreen>', () => {
  let instance: RenderAPI
  const mockFunction = jest.fn();
  const routes = jest.fn();
  const index = mockFunction;
  const useLoginMock = mockFunction;

  const navigation = {
    reset: mockFunction,
  }

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    (useState as jest.Mock).mockImplementation(() => [data, routes]);
    (useState as jest.Mock).mockImplementation(() => [1, index]);
    (useLogin as jest.Mock).mockImplementation(useLoginMock);
    useLoginMock.mockReturnValue({
      isLoggedIn: true,
    });
    const component =
      <Provider store={storeSampleData}>
        <MyNewsScreen />
      </Provider>
    instance = render(component)
  })

  afterEach(() => {
    jest.clearAllMocks()
    instance.unmount()
  })

  test('Should render component', () => {
    expect(instance).toBeDefined()
  });

})
