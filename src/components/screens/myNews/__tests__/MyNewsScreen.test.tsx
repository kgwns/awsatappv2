import React, { useState } from 'react'
import { fireEvent, render, RenderAPI } from '@testing-library/react-native'
import { Provider } from 'react-redux'
import { storeSampleData } from '../../../../constants/SampleData'
import { MyNewsScreen } from '../MyNewsScreen'
import { ScreenContainer } from '../../ScreenContainer/ScreenContainer'
import { SignupAlertCard } from 'src/components/molecules'
import { ArticlesListItemType } from 'src/redux/contentForYou/types'
import { useLogin } from 'src/hooks'
import { useNavigation } from '@react-navigation/native'

jest.mock('src/hooks/useLogin', () => ({useLogin: jest.fn()}));

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

describe('<MyNewsScreen>', () => {
    let instance: RenderAPI
    const mockFunction = jest.fn();

    const index = mockFunction;
    const useLoginMock = mockFunction;

    const navigation = {
      reset: mockFunction,
    }
  
    beforeEach(() => {
        (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
        (useLogin as jest.Mock).mockImplementation(useLoginMock);
        (useState as jest.Mock).mockImplementation(() => [0, index]);
        useLoginMock.mockReturnValue({
          isLoggedIn: false,
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

    const index = mockFunction;
    const useLoginMock = mockFunction;
    
    const navigation = {
      reset: mockFunction,
    }

    beforeEach(() => {
      (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
      (useLogin as jest.Mock).mockImplementation(useLoginMock);
      (useState as jest.Mock).mockImplementation(() => [0, index]);
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
    })
})