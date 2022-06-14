import {
  REQUEST_ARTICLE_DETAIL, REQUEST_ARTICLE_DETAIL_FAILED, REQUEST_ARTICLE_DETAIL_SUCCESS,
  REQUEST_RELATED_ARTICLE, REQUEST_RELATED_ARTICLE_FAILED, REQUEST_RELATED_ARTICLE_SUCCESS, EMPTY_DATA, REQUEST_ARTICLE_SECTION, REQUEST_ARTICLE_SECTION_SUCCESS, REQUEST_ARTICLE_SECTION_FAILED
} from "./actionType"

export interface ArticleDetailBodyGet {
  nid: number
}
export interface ArticleSectionBodyGet {
  id: number,
  page: number,
  items_per_page:number,
  current_nid: number,
}

export interface RequestArticleDetailType {
  type: typeof REQUEST_ARTICLE_DETAIL,
  payload: ArticleDetailBodyGet
}

type fieldExportType = {
  id: string
  title: string
  url: string
  bundle: string
  name: string
}

interface GeneralArticleFields {
  title: string,
  body: string,
  nid: string,
  image: string,
  view_node: string,
  news_categories: fieldExportType,
  author: string,
  created: string
}

export interface ArticleDetailDataType extends GeneralArticleFields {
  title: string,
  body: string,
  nid: string,
  image: string,
  view_node: string,
  news_categories: fieldExportType,
  tag_topics: fieldExportType,
  author: string,
  isBookmarked: boolean,
  caption: string,
  subtitle: string,
  jwplayerId: string,
  richHTML?: HTMLElementParseStore[],
}

export interface RelatedArticleDataType extends GeneralArticleFields { 
  isBookmarked: boolean
}

interface PagerType {
  current_page?: number | null | undefined,
  items_per_page?: number
}

export type ArticleDetailSuccessPayload = {
  articleDetailData: ArticleDetailDataType[]
  pager: PagerType
}

export type ArticleDetailState = {
  error: string,
  isLoading: boolean,
  articleDetailData: ArticleDetailDataType[],
  pager: PagerType,
  relatedArticleData: RelatedArticleDataType[]
  articleSectionData: ArticleDetailDataType[],
  articleSectionLoaded: boolean;
}

export interface ArticleDetailSuccessType {
  type: typeof REQUEST_ARTICLE_DETAIL_SUCCESS,
  payload: ArticleDetailSuccessPayload
}

export interface ArticleDetailFailedPayload {
  error: string
}

export interface ArticleDetailFailedType {
  type: typeof REQUEST_ARTICLE_DETAIL_FAILED,
  payload: ArticleDetailFailedPayload
}


export interface RelatedArticleBodyGet {
  tid?: number;
  nid?: number;
}

export interface RequestRelatedArticleType {
  type: typeof REQUEST_RELATED_ARTICLE,
  payload: RelatedArticleBodyGet
}

export type RelatedArticleSuccessPayload = {
  relatedArticleData: RelatedArticleDataType[]
}

export interface RelatedArticleSuccessType {
  type: typeof REQUEST_RELATED_ARTICLE_SUCCESS,
  payload: RelatedArticleSuccessPayload
}

export interface RelatedArticleFailedPayload {
  error: string
}

export interface RelatedArticleFailedType {
  type: typeof REQUEST_RELATED_ARTICLE_FAILED,
  payload: RelatedArticleFailedPayload
}

export type emptyData = {
  type: typeof EMPTY_DATA;
};
export interface RequestArticleSectionType {
  type: typeof REQUEST_ARTICLE_SECTION,
  payload: ArticleSectionBodyGet
}

export type ArticleSectionSuccessPayload = {
  articleSectionData: ArticleDetailDataType[]
  pager: PagerType
}
export interface ArticleSectionSuccessType {
  type: typeof REQUEST_ARTICLE_SECTION_SUCCESS,
  payload: ArticleSectionSuccessPayload
}

export interface ArticleSectionFailedType {
  type: typeof REQUEST_ARTICLE_SECTION_FAILED,
  payload: ArticleSectionFailedPayload
}
export interface ArticleSectionFailedPayload {
  error: string
}


export type ArticleDetailAction =
  RequestArticleDetailType
  | ArticleDetailSuccessType
  | ArticleDetailFailedType
  | RequestRelatedArticleType
  | RelatedArticleSuccessType
  | RelatedArticleFailedType
  | emptyData
  | RequestArticleSectionType
  | ArticleSectionFailedType
  | ArticleSectionSuccessType

export enum RichHTMLType {
  QUOTE = 'quote',
  CONTENT = 'content',
  DESCRIPTION = 'description',
  OPINION = 'opinion',
  READ_ALSO = 'read_also',
  NUMBERS = 'numbers',
}

export type ArticleQuoteDataType = {
  id: string
  type: string
  bundle: string
  description: string
  title: string
}

export type ArticleContentDataType = {
  id: string
  type: string
  bundle: string
  content: string
  title: string
}

export type ArticleDescriptionDataType = {
  id: string
  type: string
  bundle: string
  description: string
}

export type ArticleOpinionDataType = {
  id: string
  type: string
  bundle: string
  opinion: string
}

export type ArticleReadAlsoDataType = {
  id: string
  type: string
  bundle: string
  related_content: [string],
  title: string
}

export type ArticleNumberDataType = {
  id: string
  bundle: string
  description: string
  title: string
}

export type ArticleQuoteType = {
  type: RichHTMLType.QUOTE
  data: ArticleQuoteDataType
}

export type ArticleContentType = {
  type: RichHTMLType.CONTENT
  data: ArticleContentDataType
}

export type ArticleDescriptionType = {
  type: RichHTMLType.DESCRIPTION
  data: ArticleDescriptionDataType
}

export type ArticleOpinionType = {
  type: RichHTMLType.OPINION
  data: ArticleOpinionDataType
}

export type ArticleReadAlsoType = {
  type: RichHTMLType.READ_ALSO
  data: ArticleReadAlsoDataType
}

export type ArticleNumberType = {
  type: RichHTMLType.NUMBERS
  data: ArticleNumberDataType
}

export type HTMLElementParseStore = ArticleQuoteType
| ArticleContentType
| ArticleDescriptionType
| ArticleOpinionType
| ArticleReadAlsoType
| ArticleNumberType