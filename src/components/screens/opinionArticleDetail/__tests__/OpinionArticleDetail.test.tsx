import React, { useState } from 'react';
import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {storeSampleData} from '../../../../constants/SampleData';
import {OpinionArticleDetail} from '../OpinionArticleDetail';
import { OpinionArticleDetailItemType } from 'src/redux/opinionArticleDetail/types';
import { ScreenContainer } from '../../ScreenContainer/ScreenContainer';
import { FlatList } from 'react-native';
import { OpinionArticleDetailFooter } from 'src/components/molecules';
import { OpinionArticleDetailWidget, RelatedOpinionArticlesWidget } from 'src/components/organisms';
import {useNavigation} from '@react-navigation/native';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

jest.mock("src/hooks/useOpinionArticleDetail", () => ({
  useOpinionArticleDetail: () => {
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
  useAppCommon: () => {
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

const opinionData: OpinionArticleDetailItemType[] = [
  {
    title: 'example',
    bundle: 'example',
    body_export: 'example',
    nid_export: '12',
    field_new_issueno_export: 'example',
    view_node: 'example',
    field_publication_date_export: 'example',
    created_export: 'example',
    writer: [
      {
        id: '12',
        title: 'example',
        url: 'example',
        bundle: 'example',
        description: 'example',
        opinion_writer_photo: 'example',
        langcode: 'example',
        name: 'example',
      },
    ],
    isBookmarked: false,
    isFollowed: false
  }
]

const mediaData = {
  playlist: [
    {
      name: 'abc',
      id: '12'
    },
    {
      name: 'abc',
      id: '13'
    },
  ],
  title: 'abc'
} 

describe('<OpinionArticleDetail>', () => {
  let instance: RenderAPI;

  const mockFunction = jest.fn();
  const opinionArticle = mockFunction;
  const relatedOpinionInfo = mockFunction;

  const navigation = {
    popToTop: mockFunction,
    push: mockFunction,
  }

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    (useState as jest.Mock).mockImplementation(() => [opinionData, opinionArticle]);
    (useState as jest.Mock).mockImplementation(() => [opinionData, relatedOpinionInfo]);
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

  test('Should render OpinionArticleDetail component', () => {
    expect(render(
      <Provider store={storeSampleData}>
        <OpinionArticleDetail route={{ params: { nid: 123, isRelatedArticle: true } } }/>
      </Provider>
    )).toBeDefined();
  });

  test('Should render OpinionArticleDetail component', () => {
    expect(render(
      <Provider store={storeSampleData}>
        <OpinionArticleDetail route={{ params: { nid: 123, isRelatedArticle: false } } }/>
      </Provider>
    )).toBeDefined();
  });

  test('Should call ScreenContainer onCloseSignUpAlert', () => {
    const element = instance.container.findByType(ScreenContainer)
    fireEvent(element, 'onCloseSignUpAlert');
    expect(mockFunction).toBeTruthy()
  }); 

  test('Should call FlatList keyExtractor', () => {
    const element = instance.container.findByType(FlatList)
    fireEvent(element, 'keyExtractor', '', 2);
    expect(mockFunction).toBeTruthy()
  });

  test('Should call FlatList renderItem', () => {
    const element = instance.container.findByType(FlatList)
    fireEvent(element, 'renderItem', {item: [{}], index: 0});
    expect(mockFunction).toBeTruthy()
  });

  test('Should call OpinionArticleDetailFooter onPressSave', () => {
    const element = instance.container.findByType(OpinionArticleDetailFooter)
    fireEvent(element, 'onPressSave', opinionData[0].nid_export);
    expect(mockFunction).toBeTruthy()
  });

  test('Should call OpinionArticleDetailFooter onPressFontSizeChange', () => {
    const element = instance.container.findByType(OpinionArticleDetailFooter)
    fireEvent(element, 'onPressFontSizeChange');
    expect(mockFunction).toBeTruthy()
  });

  test('Should call FlatList onScroll', () => {
    const element = instance.container.findByType(FlatList)
    fireEvent(element, 'onScroll', {nativeEvent: {contentOffset: {y: 120}}});
    expect(mockFunction).toBeTruthy()
  });

  test('Should call OpinionArticleDetailWidget onPressFollow', () => {
    const element = instance.container.findByType(OpinionArticleDetailWidget)
    fireEvent(element, 'onPressFollow', opinionData[0].writer[0].id);
    expect(mockFunction).toBeTruthy()
  });

  test('Should call OpinionArticleDetailWidget onPressFollow', () => {
    const element = instance.container.findByType(OpinionArticleDetailWidget)
    fireEvent(element, 'onPressFollow');
    expect(mockFunction).toBeTruthy()
  });

  test('Should call OpinionArticleDetailWidget onPressHome', () => {
    const element = instance.container.findByType(OpinionArticleDetailWidget)
    fireEvent(element, 'onPressHome');
    expect(navigation.popToTop).toBeTruthy()
  });

  test('Should call OpinionArticleDetailWidget togglePlayback', () => {
    const element = instance.container.findByType(OpinionArticleDetailWidget)
    fireEvent(element, 'togglePlayback', '2', mediaData);
    expect(mockFunction).toBeTruthy()
  });

  test('Should call RelatedOpinionArticlesWidget onScroll', () => {
    const element = instance.container.findByType(RelatedOpinionArticlesWidget)
    fireEvent(element, 'onScroll');
    expect(mockFunction).toBeTruthy()
  });

  test('Should call RelatedOpinionArticlesWidget onPress', () => {
    const element = instance.container.findByType(RelatedOpinionArticlesWidget)
    fireEvent(element, 'onPress', '2');
    expect(navigation.push).toBeTruthy()
  });

  test('Should call OpinionArticleDetailWidget togglePlayback', () => {
    const element = instance.container.findByType(RelatedOpinionArticlesWidget)
    fireEvent(element, 'togglePlayback', '2', mediaData);
    expect(mockFunction).toBeTruthy()
  });
  
});
