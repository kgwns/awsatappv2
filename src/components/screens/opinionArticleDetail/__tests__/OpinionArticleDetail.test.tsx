import React from 'react';
import {render, RenderAPI} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {storeSampleData} from '../../../../constants/SampleData';
import {OpinionArticleDetail} from '../OpinionArticleDetail';

jest.mock("src/hooks/useOpinionArticleDetail", () => ({
  useOpinionArticleDetail: (...args: any) => {
      return {
        isLoading: false,
        opinionArticleDetailData: [],
        opinionArticleError: '',
        fetchOpinionArticleDetail: () => {
          return []
        },
        isLoadingRelatedOpinion:false,
        relatedOpinionError: '',
        relatedOpinionListData: [],
        fetchRelatedOpinionData: () => {
          return []
        },
        emptyRelatedOpinionData: () => {
          return []
        },
        emptyOpinionArticleData: () => {
          return []
        }
      }
  },
}));

jest.mock("src/hooks/useAppCommon", () => ({
  useAppCommon: (...args: any) => {
      return {
          theme: 'light',
          isFirstSession: true,
          articleFontSize: 16,
          storeArticleFontSizeInfo: () => {}
      }
  },
}));

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
  useNavigationState: () => ([]),
  useIsFocused: () => jest.fn().mockImplementation(() => Boolean),
}));

describe('<OpinionArticleDetail>', () => {
  let instance: RenderAPI;

  beforeEach(() => {
    const component = (
      <Provider store={storeSampleData}>
        <OpinionArticleDetail route={{ params: { nid: 123 } } }/>
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  test('Should render OpinionArticleDetail component', () => {
    expect(instance).toBeDefined();
  });
});
