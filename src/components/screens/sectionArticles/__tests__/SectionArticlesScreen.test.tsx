import { render, RenderAPI} from '@testing-library/react-native'
import React from 'react'
import  {SectionArticlesScreen} from 'src/components/screens/sectionArticles/SectionArticlesScreen'
import { useRoute } from '@react-navigation/native'
import { Provider } from 'react-redux';
import { storeSampleData } from 'src/constants/Constants';

jest.mock('@react-navigation/native', () => ({
    useRoute: jest.fn(),
    useNavigation: () => ({
        navigate: jest.fn(),
        dispatch: jest.fn(),
        goBack: jest.fn(),
        addListener: jest.fn(),
      }),
  }));

  jest.mock("src/hooks/useAppCommon", () => ({
    useAppCommon: () => {
      return {
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
        emptySectionArticleData: {} = [],
        fetchSectionArticlesRequest: {} = [],
      }
    },
}));

describe('<SectionArticlesScreen />', () => {
  let instance: RenderAPI
  const params = {"key":"SectionArticlesScreen-91cFeh9o2Kg1fsaaeteVu","name":"SectionArticlesScreen","params":{"sectionId":102811,"title":"رياضة عالمية"}}
  beforeEach(() => {
    (useRoute as jest.Mock).mockReturnValue(params);
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
