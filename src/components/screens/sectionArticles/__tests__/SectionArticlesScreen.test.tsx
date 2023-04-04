import { fireEvent, render, RenderAPI} from '@testing-library/react-native'
import React, { useState } from 'react'
import  {SectionArticlesScreen} from 'src/components/screens/sectionArticles/SectionArticlesScreen'
import { useRoute } from '@react-navigation/native'
import { Provider } from 'react-redux';
import { storeSampleData } from 'src/constants/Constants';
import { useSectionArticles } from 'src/hooks';
import { MostReadList } from 'src/components/organisms';

jest.mock('@react-navigation/native', () => ({
    useRoute: jest.fn(),
    useNavigation: () => ({
        navigate: jest.fn(),
        dispatch: jest.fn(),
        goBack: jest.fn(),
        addListener: jest.fn(),
      }),
      useFocusEffect: jest.fn()
  }));

jest.mock("src/hooks/useSectionArticles", () => ({
  useSectionArticles: jest.fn()
}));

jest.mock('react',() => ({
  ...jest.requireActual("react"),
  useState: jest.fn()
}))

describe('<SectionArticlesScreen />', () => {
  let instance: RenderAPI
  const useSectionArticlesMock = jest.fn();
  const setState = jest.fn()
  const params = {"key":"SectionArticlesScreen-91cFeh9o2Kg1fsaaeteVu","name":"SectionArticlesScreen","params":{"sectionId":102811,"title":"رياضة عالمية"}}
  beforeEach(() => {
    (useSectionArticles as jest.Mock).mockImplementation(useSectionArticlesMock);
    useSectionArticlesMock.mockReturnValue({
        sectionArticlesData: {
          rows: [
            {
              nid: '2',
              tagName: 'example',
              image: 'abc',
              tagStyle: {marginLeft: 20},
              tagLabelType: "p3",
              field_image: 'abc',
              field_new_photo: 'abc',
              flagColor: '#2C8A82',
              barColor: '#2C8A82',
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
            }
          ],
          pager: {
            current_page: 1, 
            items_per_page: '10'
          },
        },
        isLoading: false,
        emptySectionArticleData: jest.fn(),
        fetchSectionArticlesRequest: jest.fn()
      });
    (useRoute as jest.Mock).mockReturnValue(params);
    (useState as jest.Mock).mockImplementation(() => [[],setState]);
    const component = 
        <Provider store={storeSampleData}>
            <SectionArticlesScreen />
        </Provider> 
    instance = render(component)
})

  afterEach(() => {
    jest.clearAllMocks()
    instance.unmount()
  })

  it('should render component', () => {
    expect(instance).toBeDefined()
  });

  it("test onScroll MostReadList",() => {
    const element = instance.container.findByType(MostReadList);
    fireEvent(element,'onScroll');
    expect(setState).toHaveBeenCalled();
  })
})

describe('<SectionArticlesScreen />', () => {
  let instance: RenderAPI
  const useSectionArticlesMock = jest.fn();
  const setState = jest.fn()
  const params = {"key":"SectionArticlesScreen-91cFeh9o2Kg1fsaaeteVu","name":"SectionArticlesScreen","params":{"sectionId":102811,"title":"رياضة عالمية"}}
  beforeEach(() => {
    (useSectionArticles as jest.Mock).mockImplementation(useSectionArticlesMock);
    useSectionArticlesMock.mockReturnValue({
        sectionArticlesData: {
          rows: [
            {
              nid: '2',
              tagName: 'example',
              image: 'abc',
              tagStyle: {marginLeft: 20},
              tagLabelType: "p3",
              field_image: 'abc',
              field_new_photo: 'abc',
              flagColor: '#2C8A82',
              barColor: '#2C8A82',
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
            }
          ],
          pager: {
            current_page: 1, 
            items_per_page: '10'
          },
        },
        isLoading: true,
        emptySectionArticleData: jest.fn(),
        fetchSectionArticlesRequest: jest.fn()
      });
    (useRoute as jest.Mock).mockReturnValue(params);
    (useState as jest.Mock).mockImplementation(() => [[],setState]);
    const component = 
        <Provider store={storeSampleData}>
            <SectionArticlesScreen />
        </Provider> 
    instance = render(component)
})

  afterEach(() => {
    jest.clearAllMocks()
    instance.unmount()
  })

  it('should render component', () => {
    expect(instance).toBeDefined()
  });

  it("test onScroll MostReadList",() => {
    const element = instance.container.findByType(MostReadList);
    fireEvent(element,'onScroll');
    expect(setState).toHaveBeenCalled();
  })
})


describe('<SectionArticlesScreen />', () => {
  let instance: RenderAPI
  const useSectionArticlesMock = jest.fn();
  const setState = jest.fn()
  const params = {"key":"SectionArticlesScreen-91cFeh9o2Kg1fsaaeteVu","name":"SectionArticlesScreen","params":{"sectionId":102811,"title":"رياضة عالمية"}}
  beforeEach(() => {
    (useSectionArticles as jest.Mock).mockImplementation(useSectionArticlesMock);
    useSectionArticlesMock.mockReturnValue({
        sectionArticlesData: {
          rows: [],
          pager: {
            current_page: 1, 
            items_per_page: '10'
          },
        },
        isLoading: false,
        emptySectionArticleData: jest.fn(),
        fetchSectionArticlesRequest: jest.fn()
      });
    (useRoute as jest.Mock).mockReturnValue(params);
    (useState as jest.Mock).mockImplementation(() => [[],setState]);
    const component = 
        <Provider store={storeSampleData}>
            <SectionArticlesScreen />
        </Provider> 
    instance = render(component)
})

  afterEach(() => {
    jest.clearAllMocks()
    instance.unmount()
  })

  it('should render component', () => {
    expect(instance).toBeDefined()
  });
})

describe('<SectionArticlesScreen />', () => {
  let instance: RenderAPI
  const useSectionArticlesMock = jest.fn();
  const setState = jest.fn()
  const params = {"key":"SectionArticlesScreen-91cFeh9o2Kg1fsaaeteVu","name":"SectionArticlesScreen","params":{"sectionId":102811,"title":"رياضة عالمية"}}
  beforeEach(() => {
    (useSectionArticles as jest.Mock).mockImplementation(useSectionArticlesMock);
    useSectionArticlesMock.mockReturnValue({
        sectionArticlesData: {
          rows: [],
          pager: {
            current_page: 1, 
            items_per_page: '10'
          },
        },
        isLoading: true,
        emptySectionArticleData: jest.fn(),
        fetchSectionArticlesRequest: jest.fn()
      });
    (useRoute as jest.Mock).mockReturnValue(params);
    (useState as jest.Mock).mockImplementation(() => [[],setState]);
    const component = 
        <Provider store={storeSampleData}>
            <SectionArticlesScreen />
        </Provider> 
    instance = render(component)
})

  afterEach(() => {
    jest.clearAllMocks()
    instance.unmount()
  })

  it('should render component', () => {
    expect(instance).toBeDefined()
  });
})
