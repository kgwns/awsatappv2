import { 
  REQUEST_TICKER_HERO_DATA,
  REQUEST_TICKER_HERO_DATA_SUCCESS,
  REQUEST_TICKER_HERO_DATA_FAILED,
  REQUEST_HERO_AND_TOP_LIST_DATA,
  REQUEST_HERO_AND_TOP_LIST_SUCCESS,
  REQUEST_HERO_AND_TOP_LIST_FAILED,
  REQUEST_SECTION_COMBO_ONE,
  REQUEST_SECTION_COMBO_ONE_SUCCESS,
  REQUEST_SECTION_COMBO_ONE_FAILED,
  REQUEST_SECTION_COMBO_TWO_SUCCESS,
  REQUEST_SECTION_COMBO_TWO_FAILED,
  REQUEST_SECTION_COMBO_THREE_SUCCESS,
  REQUEST_SECTION_COMBO_THREE_FAILED,
  REQUEST_SECTION_COMBO_FOUR_SUCCESS,
  REQUEST_SECTION_COMBO_FOUR_FAILED,
  REQUEST_SECTION_COMBO_TWO,
  REQUEST_SECTION_COMBO_THREE,
  REQUEST_SECTION_COMBO_FOUR,
  REQUEST_OPINION_DATA_SUCCESS,
  REQUEST_OPINION_DATA_LIST_FAILED,
  REQUEST_OPINION_LIST_DATA,
  REQUEST_PODCAST_HOME_DATA,
  REQUEST_PODCAST_HOME_DATA_SUCCESS,
  REQUEST_PODCAST_HOME_DATA_FAILED,
  REQUEST_COVERAGE_BLOCK,
  REQUEST_COVERAGE_BLOCK_SUCCESS,
  REQUEST_COVERAGE_BLOCK_FAILED,
  REQUEST_FEATURED_ARTICLE_BLOCK,
  REQUEST_FEATURED_ARTICLE_BLOCK_SUCCESS,
  REQUEST_FEATURED_ARTICLE_BLOCK_FAILED,
  REQUEST_HORIZONTAL_ARTICLE_BLOCK,
  REQUEST_HORIZONTAL_ARTICLE_SUCCESS,
  REQUEST_HORIZONTAL_ARTICLE_FAILED,
  REQUEST_EDITORS_CHOICE_DATA,
  REQUEST_EDITORS_CHOICE_DATA_SUCCESS,
  REQUEST_EDITORS_CHOICE_DATA_FAILED,
} from "./actionType"
import { PodcastListItemType } from '../podcast/types'
export type payloadType = { rows: any[], pager: object }

export interface NewsCategoriesType {
  id?: string
  title?: string
  url?: string
  bundle?: string
  name?: string
}

export interface LatestArticleDataType {
  title: string,
  body: string,
  nid: string,
  image: string,
  news_categories: NewsCategoriesType,
  author: string,
  created: string,
  isBookmarked: boolean
}

export interface EditorsChoiceDataType extends LatestArticleDataType {
  field_news_categories: NewsCategoriesType,
  created: string,
  publication_date: string,
  type: string,
  blockname: string,
  entityqueue_relationship_position: string,
}

export interface OpinionWriterType {
  id: string
  title: string
  langcode: string
  url: string
  bundle: string
  name: string
  opinion_writer_photo: string
}
export interface LatestOpinionDataType {
  title: string,
  body: string,
  nid: string,
  field_opinion_writer_node_export: OpinionWriterType[] | OpinionWriterType;
}

export interface LatestArticleBodyGet {
  items_per_page: number,
  page: number,
  offset: number
}

export interface RequestTickerAndHeroType {
  type: typeof REQUEST_TICKER_HERO_DATA,
  payload: LatestArticleBodyGet
}

export interface LatestPodcastDataType extends PodcastListItemType {
  field_total_duration_export: number | null,
}

export type LatestNewsTabState = {
  error: string,
  isLoading: boolean,
  ticker: LatestArticleDataType[],
  hero: LatestArticleDataType[],
  heroList: LatestArticleDataType[],
  topList: LatestArticleDataType[],
  opinionList: LatestOpinionDataType[]
  sectionComboOne: LatestArticleDataType[],
  sectionComboTwo: LatestArticleDataType[],
  sectionComboThree: LatestArticleDataType[],
  sectionComboFour: LatestArticleDataType[],
  podcastHome: LatestPodcastDataType[],
  coverageInfo: MainSectionBlockType[],
  featuredArticle: MainSectionBlockType[];
  horizontalArticle: MainSectionBlockType[];
  editorsChoice: EditorsChoiceDataType[],
}

export type TickerHeroSuccessPayload = {
  ticker: LatestArticleDataType[],
  hero: LatestArticleDataType[]
}

export interface TickerHeroSuccessType {
  type: typeof REQUEST_TICKER_HERO_DATA_SUCCESS,
  payload: TickerHeroSuccessPayload
}

export interface TickerHeroFailedPayload {
  error: string
}

export interface TickerHeroFailedType {
  type: typeof REQUEST_TICKER_HERO_DATA_FAILED,
  payload: TickerHeroFailedPayload
}

export interface RequestHeroListTopList {
  type: typeof REQUEST_HERO_AND_TOP_LIST_DATA,
  payload: LatestArticleBodyGet
}

export interface RequestOpinionListType {
  type: typeof REQUEST_OPINION_LIST_DATA,
  payload: LatestArticleBodyGet
}

export type HeroListTopListSuccessPayload = {
  heroList: LatestArticleDataType[],
  topList: LatestArticleDataType[]
}

export type OpinionSuccessPayload = {
  opinionList: LatestOpinionDataType[]
}

export interface OpinionSuccessType {
  type: typeof REQUEST_OPINION_DATA_SUCCESS,
  payload: OpinionSuccessPayload
}

export interface HeroListTopListSuccessType {
  type: typeof REQUEST_HERO_AND_TOP_LIST_SUCCESS,
  payload: HeroListTopListSuccessPayload
}

export interface HeroListTopListFailedPayload {
  error: string
}

export interface HeroListTopListFailedType {
  type: typeof REQUEST_HERO_AND_TOP_LIST_FAILED,
  payload: HeroListTopListFailedPayload
}

export interface OpinionFailedPayload {
  error: string
}

export interface OpinionFailedType {
  type: typeof REQUEST_OPINION_DATA_LIST_FAILED,
  payload: OpinionFailedPayload
}

export interface RequestSectionComboBodyGet {
  id: number,
  items_per_page?: number,
  page?: number
}

export interface RequestSectionComboOne {
  type: typeof REQUEST_SECTION_COMBO_ONE,
  payload: RequestSectionComboBodyGet
}

export interface RequestSectionComboOneSuccessPayload {
  sectionComboOne: LatestArticleDataType[]
}

export interface RequestSectionComboOneSuccessType {
  type: typeof REQUEST_SECTION_COMBO_ONE_SUCCESS,
  payload: RequestSectionComboOneSuccessPayload
}

export interface RequestSectionComboOneFailedPayload {
  error: string
}

export interface RequestSectionComboOneFailedType {
  type: typeof REQUEST_SECTION_COMBO_ONE_FAILED,
  payload: RequestSectionComboOneFailedPayload
}


export interface RequestSectionComboTwo {
  type: typeof REQUEST_SECTION_COMBO_TWO,
  payload: RequestSectionComboBodyGet
}

export interface RequestSectionComboTwoSuccessPayload {
  sectionComboTwo: LatestArticleDataType[]
}

export interface RequestSectionComboTwoSuccessType {
  type: typeof REQUEST_SECTION_COMBO_TWO_SUCCESS,
  payload: RequestSectionComboTwoSuccessPayload
}

export interface RequestSectionComboTwoFailedPayload {
  error: string
}

export interface RequestSectionComboTwoFailedType {
  type: typeof REQUEST_SECTION_COMBO_TWO_FAILED,
  payload: RequestSectionComboTwoFailedPayload
}


export interface RequestSectionComboThree {
  type: typeof REQUEST_SECTION_COMBO_THREE,
  payload: RequestSectionComboBodyGet
}

export interface RequestSectionComboThreeSuccessPayload {
  sectionComboThree: LatestArticleDataType[]
}

export interface RequestSectionComboThreeSuccessType {
  type: typeof REQUEST_SECTION_COMBO_THREE_SUCCESS,
  payload: RequestSectionComboThreeSuccessPayload
}

export interface RequestSectionComboThreeFailedPayload {
  error: string
}

export interface RequestSectionComboThreeFailedType {
  type: typeof REQUEST_SECTION_COMBO_THREE_FAILED,
  payload: RequestSectionComboThreeFailedPayload
}


export interface RequestSectionComboFour {
  type: typeof REQUEST_SECTION_COMBO_FOUR,
  payload: RequestSectionComboBodyGet
}

export interface RequestSectionComboFourSuccessPayload {
  sectionComboFour: LatestArticleDataType[]
}

export interface RequestSectionComboFourSuccessType {
  type: typeof REQUEST_SECTION_COMBO_FOUR_SUCCESS,
  payload: RequestSectionComboFourSuccessPayload
}

export interface RequestSectionComboFourFailedPayload {
  error: string
}

export interface RequestSectionComboFourFailedType {
  type: typeof REQUEST_SECTION_COMBO_FOUR_FAILED,
  payload: RequestSectionComboFourFailedPayload
}

export interface RequestPodcastHomeType {
  type: typeof REQUEST_PODCAST_HOME_DATA,
}

export type PodcastHomeSuccessPayload = {
  podcastHome: LatestPodcastDataType[]
}

export interface PodcastHomeSuccessType {
  type: typeof REQUEST_PODCAST_HOME_DATA_SUCCESS,
  payload: PodcastHomeSuccessPayload
}
export interface PodcastHomeFailedPayload {
  error: string
}

export interface PodcastHomeFailedType {
  type: typeof REQUEST_PODCAST_HOME_DATA_FAILED,
  payload: PodcastHomeFailedPayload
}

export enum MainSectionBlockName {
  COVERAGE = 'coverage',
  FEATURED_ARTICLE = 'almqalat_alryysyt_',
  HORIZONTAL_ARTICLE = 'tghtyt_khast',
  EDITORS_CHOICE = 'akhtyarat_almhrr',
}

export type MainSectionBlockType = {
  body: string;
  title: string;
  nid: string;
  image: string;
  news_categories : string;
  author: string;
  created: string;
  isBookmarked: boolean,
  type: string;
  blockName: string;
  position: string
}

export type RequestCoverageBlockType = {
  type: typeof REQUEST_COVERAGE_BLOCK
}

export type RequestCoverageBlockSuccessPayloadType = {
  coverageInfo: MainSectionBlockType[]
}

export type RequestCoverageBlockSuccessType = {
  type: typeof REQUEST_COVERAGE_BLOCK_SUCCESS;
  payload: RequestCoverageBlockSuccessPayloadType
}

export type RequestCoverageBlockFailedPayload = {
  error: string
}

export type RequestCoverageBlockFailedType = {
  type: typeof REQUEST_COVERAGE_BLOCK_FAILED;
  payload: RequestCoverageBlockFailedPayload
}



export type RequestFeaturedBlockType = {
  type: typeof REQUEST_FEATURED_ARTICLE_BLOCK
}

export type RequestFeaturedBlockSuccessPayloadType = {
  featureArticle: MainSectionBlockType[]
}

export type RequestFeaturedBlockSuccessType = {
  type: typeof REQUEST_FEATURED_ARTICLE_BLOCK_SUCCESS;
  payload: RequestFeaturedBlockSuccessPayloadType
}

export type RequestFeaturedBlockFailedPayload = {
  error: string
}

export type RequestFeaturedBlockFailedType = {
  type: typeof REQUEST_FEATURED_ARTICLE_BLOCK_FAILED;
  payload: RequestCoverageBlockFailedPayload
}



export type RequestHorizontalBlockType = {
  type: typeof REQUEST_HORIZONTAL_ARTICLE_BLOCK
}

export type RequestHorizontalBlockSuccessPayloadType = {
  horizontalArticle: MainSectionBlockType[]
}

export type RequestHorizontalBlockSuccessType = {
  type: typeof REQUEST_HORIZONTAL_ARTICLE_SUCCESS;
  payload: RequestHorizontalBlockSuccessPayloadType
}

export type RequestHorizontalBlockFailedPayload = {
  error: string
}

export type RequestHorizontalBlockFailedType = {
  type: typeof REQUEST_HORIZONTAL_ARTICLE_FAILED;
  payload: RequestCoverageBlockFailedPayload
}
export interface RequestEditorsChoiceType {
  type: typeof REQUEST_EDITORS_CHOICE_DATA,
}

export type EditorsChoiceSuccessPayload = {
  editorsChoice: EditorsChoiceDataType[]
}

export interface EditorsChoiceSuccessType {
  type: typeof REQUEST_EDITORS_CHOICE_DATA_SUCCESS,
  payload: EditorsChoiceSuccessPayload
}
export interface EditorsChoiceFailedPayload {
  error: string
}

export interface EditorsChoiceFailedType {
  type: typeof REQUEST_EDITORS_CHOICE_DATA_FAILED,
  payload: EditorsChoiceFailedPayload
}

export type RequestSectionComboType =
  RequestSectionComboOne
  | RequestSectionComboTwo
  | RequestSectionComboThree
  | RequestSectionComboFour

export type LatestTabAction =
  RequestTickerAndHeroType
  | TickerHeroSuccessType
  | TickerHeroFailedType
  | RequestHeroListTopList
  | HeroListTopListSuccessType
  | HeroListTopListFailedType
  | OpinionSuccessType
  | OpinionFailedType
  | RequestOpinionListType
  | RequestSectionComboOne
  | RequestSectionComboOneSuccessType
  | RequestSectionComboOneFailedType
  | RequestSectionComboTwo
  | RequestSectionComboTwoSuccessType
  | RequestSectionComboTwoFailedType
  | RequestSectionComboThree
  | RequestSectionComboThreeSuccessType
  | RequestSectionComboThreeFailedType
  | RequestSectionComboFour
  | RequestSectionComboFourSuccessType
  | RequestSectionComboFourFailedType
  | PodcastHomeSuccessType
  | PodcastHomeFailedType
  | RequestPodcastHomeType
  | RequestCoverageBlockType
  | RequestCoverageBlockSuccessType
  | RequestCoverageBlockFailedType
  | RequestFeaturedBlockType
  | RequestFeaturedBlockSuccessType
  | RequestFeaturedBlockFailedType
  | RequestHorizontalBlockType
  | RequestHorizontalBlockSuccessType
  | RequestHorizontalBlockFailedType
  | EditorsChoiceSuccessType
  | EditorsChoiceFailedType
  | RequestEditorsChoiceType

