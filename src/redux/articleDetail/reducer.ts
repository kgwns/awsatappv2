import { isNonEmptyArray } from 'src/shared/utils';
import { REQUEST_ARTICLE_DETAIL, 
  REQUEST_ARTICLE_DETAIL_FAILED, 
  REQUEST_ARTICLE_DETAIL_SUCCESS, 
  REQUEST_RELATED_ARTICLE, 
  REQUEST_RELATED_ARTICLE_FAILED, 
  REQUEST_RELATED_ARTICLE_SUCCESS,
  EMPTY_DATA, 
  REQUEST_ARTICLE_SECTION, 
  REQUEST_ARTICLE_SECTION_SUCCESS, 
  REQUEST_ARTICLE_SECTION_FAILED, 
  REQUEST_RICH_ARTICLE_READ_ALSO_SUCCESS, 
  REQUEST_RICH_ARTICLE_CONTENT_SUCCESS, 
  REQUEST_RICH_ARTICLE_OPINION_SUCCESS } from './actionType';
import { ArticleDetailAction, ArticleDetailState, HTMLElementParseStore, RichHTMLOpinionDataType, RichHTMLType } from './types';

const initialData: ArticleDetailState = {
  isLoading: true,
  error: '',
  articleDetailData: [],
  pager: {},
  relatedArticleData: [],
  articleSectionData: [],
  articleSectionLoaded: false,
};

export default (state = initialData, action: ArticleDetailAction) => {
  const combineData = (data: any) => {
    state.articleDetailData = state.articleDetailData.concat(data)
    return data
  }

  const updatedReadAlsoContent = (readAlsoInfo: any) => {
    const articleInfo = [...state.articleDetailData]
    if (isNonEmptyArray(articleInfo) && isNonEmptyArray(readAlsoInfo)) {
      const richHTML: any[] = articleInfo[0].richHTML ?? []
      const readAlsoIndex: number = richHTML.findIndex((item: HTMLElementParseStore) => item.type === RichHTMLType.READ_ALSO)
      if (readAlsoIndex > -1) {
        richHTML[readAlsoIndex].data.readAlsoData = readAlsoInfo
        articleInfo[0].richHTML = richHTML
      }
    }

    return articleInfo
  }

  const updatedContentContent = (contentInfo: any) => {
    const articleInfo = [...state.articleDetailData]
    if (isNonEmptyArray(articleInfo) && isNonEmptyArray(contentInfo.contentBundleData)) {
      const richHTML: any[] = articleInfo[0].richHTML ?? []
      const contentIndex: number = richHTML.findIndex((item: HTMLElementParseStore) => item.type === RichHTMLType.CONTENT)
      if (contentIndex > -1) {
        richHTML[contentIndex].data.contentData = contentInfo.contentBundleData[0]
        articleInfo[0].richHTML = richHTML
      }
    }

    return articleInfo
  }

  const updatedOpinionBundle = (opinionInfo: RichHTMLOpinionDataType[]) => {
    const articleInfo = [...state.articleDetailData]
    if (isNonEmptyArray(articleInfo) && isNonEmptyArray(opinionInfo)) {
      const richHTML: any[] = articleInfo[0].richHTML ?? []
      const opinionIndex: number = richHTML.findIndex((item: HTMLElementParseStore) => item.type === RichHTMLType.OPINION && item.data.opinion == opinionInfo[0].nid)
      if (opinionIndex > -1) {
        richHTML[opinionIndex].data.opinionData = opinionInfo[0]
        articleInfo[0].richHTML = richHTML
      }
    }

    return articleInfo
  }

  switch (action.type) {
    case REQUEST_ARTICLE_DETAIL:
      return {
        ...state,
        isLoading: true,
        articleDetailData: []
      }
    case REQUEST_ARTICLE_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        articleDetailData: action.payload.articleDetailData,
        pager: action.payload.pager
      }
    case REQUEST_ARTICLE_DETAIL_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      }
    case REQUEST_RELATED_ARTICLE:
      return {
        ...state,
        isLoading: true
      }
    case REQUEST_RELATED_ARTICLE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        relatedArticleData: action.payload.relatedArticleData,
      }
    case REQUEST_RELATED_ARTICLE_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      }
    case EMPTY_DATA:
      return {
        ...state,
        isLoading: false,
        error: '',
        articleDetailData: [],
        pager: {},
        relatedArticleData: [],
        articleSectionLoaded: false,
      };
    case REQUEST_ARTICLE_SECTION:
      return {
        ...state,
        isLoading: true,
        articleSectionData: []
      }
    case REQUEST_ARTICLE_SECTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        articleSectionData: combineData(action.payload.articleSectionData),
        articleSectionLoaded: true,
      }
    case REQUEST_ARTICLE_SECTION_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
        articleSectionLoaded: true,
      }
    case REQUEST_RICH_ARTICLE_READ_ALSO_SUCCESS:
      return {
        ...state,
        articleDetailData: updatedReadAlsoContent(action.payload)
      }
    case REQUEST_RICH_ARTICLE_CONTENT_SUCCESS:
      return {
        ...state,
        articleDetailData: updatedContentContent(action.payload)
      }
    case REQUEST_RICH_ARTICLE_OPINION_SUCCESS:
      return {
        ...state,
        articleDetailData: updatedOpinionBundle(action.payload.opinionData)
      }
    default:
      return { ...state }
  }
}
