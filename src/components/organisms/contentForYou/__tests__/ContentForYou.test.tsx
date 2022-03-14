import { render, RenderAPI } from '@testing-library/react-native';
import React, {useState} from 'react';
import { ContentForYou } from 'src/components/organisms';
import {useNavigation} from '@react-navigation/native';

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
}));

jest.mock("src/hooks/useContentForYou", () => ({
    useContentForYou: (...args: any) => {
      return {
        isLoading: false,
        favouriteOpinionsData: [],
        error: 'error',
        fetchFavouriteOpinionsRequest: () => {
          return []
        },
        isArticleLoading: false,
        favouriteArticlesData: [],
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

jest.mock("src/hooks/useAllSiteCategories", () => ({
    useAllSiteCategories: (...args: any) => {
      return {
        isLoading: false,
        selectedTopicsData: [],
        error: 'error',
        getSelectedTopicsData: () => {
          return []
        },
      }
    },
  }));

jest.mock("src/hooks/useAllWriters", () => ({
    useAllWriters: (...args: any) => {
      return {
        isLoading: false,
        selectedAuthorsData: [],
        error: 'error',
        getSelectedAuthorsData: () => {
          return []
        },
      }
    },
  }));

  jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(),
  }));

describe('<Content for you>', () => {
    let instance: RenderAPI
    const mockFunction = jest.fn()
    const setSelectedAuthors = mockFunction
    const setSelectedTopics = mockFunction
    const setPage = mockFunction
    const setPageAllData = mockFunction
    const navigation = {
        goBack: mockFunction,
        navigate: mockFunction,
      }
    const mockString = 'mockString'
    const mockData = [
        {
        titleColor: mockString,
        body: mockString,
        flag: mockString,
        title: mockString,
        nid: mockString,
        image: mockString,
        news_categories: {},
        author: mockString,
        created: mockString,
        isBookmarked: false,
        loaded: true
        }
    ]
    const mockOpinionData = [
        {
            title: mockString,
            created_export: mockString,
            field_opinion_writer_node_export:  {opinion_writer_photo:mockString},
            nid: mockString,
            field_opinion_sport_blog_export: [],
            field_new_issueno_export: mockString,
            published_at_export: mockString,
            body: mockString,
            field_edit_letter_writer_export: {},
            isBookmarked: false,
        }
    ]
    const initialPageData = {
        opinionsData: {data:[],loaded:false},
        articleSectionData: {data:[],loaded: false},
        shortArticleData: {data:[],loaded: false}
    }

    beforeEach(() => {
        (useState as jest.Mock).mockImplementation(() => [[], setSelectedAuthors]);
        (useState as jest.Mock).mockImplementation(() => [[], setSelectedTopics]);
        (useState as jest.Mock).mockImplementation(() => [0, setPage]);
        (useState as jest.Mock).mockImplementation(() => [[initialPageData], setPageAllData]);
        (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
        const component = <ContentForYou />
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