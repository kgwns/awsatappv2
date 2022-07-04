import { render, RenderAPI} from '@testing-library/react-native'
import React from 'react'
import  {SectionArticlesScreen} from 'src/components/screens/sectionArticles/SectionArticlesScreen'
import { useRoute } from '@react-navigation/native'
import { Provider } from 'react-redux';
import { storeSampleData } from 'src/constants/SampleData';

jest.mock('@react-navigation/native', () => ({
    useRoute: jest.fn(),
    useNavigation: () => ({
        navigate: jest.fn(),
        dispatch: jest.fn(),
        goBack: jest.fn(),
        addListener: jest.fn(),
      }),
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
