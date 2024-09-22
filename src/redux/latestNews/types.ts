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
  REQUEST_SECTION_COMBO_FIVE,
  REQUEST_SECTION_COMBO_FIVE_SUCCESS,
  REQUEST_SECTION_COMBO_FIVE_FAILED,
  REQUEST_SECTION_COMBO_SIX,
  REQUEST_SECTION_COMBO_SIX_SUCCESS,
  REQUEST_SECTION_COMBO_SIX_FAILED,
  REQUEST_SECTION_COMBO_SEVEN,
  REQUEST_SECTION_COMBO_SEVEN_SUCCESS,
  REQUEST_SECTION_COMBO_SEVEN_FAILED,
  REQUEST_SECTION_COMBO_EIGHT,
  REQUEST_SECTION_COMBO_EIGHT_SUCCESS,
  REQUEST_SECTION_COMBO_EIGHT_FAILED,
  REQUEST_EDITORS_CHOICE_DATA,
  REQUEST_EDITORS_CHOICE_DATA_SUCCESS,
  REQUEST_EDITORS_CHOICE_DATA_FAILED,
  REQUEST_SPOTLIGHT_COMBO,
  REQUEST_SPOTLIGHT_COMBO_SUCCESS,
  REQUEST_SPOTLIGHT_COMBO_FAILED,
  REQUEST_SPOTLIGHT_ARTICLE_SECTION_DATA,
  REQUEST_SPOTLIGHT_ARTICLE_SECTION_DATA_SUCCESS,
  REQUEST_SPOTLIGHT_ARTICLE_SECTION_DATA_FAILED,
  REQUEST_INFO_GRAPHIC_BLOCK,
  REQUEST_INFO_GRAPHIC_BLOCK_SUCCESS,
  REQUEST_INFO_GRAPHIC_BLOCK_FAILED,
  REQUEST_ARCHIVED_ARTICLE_DATA,
  REQUEST_ARCHIVED_ARTICLE_DATA_SUCCESS,
  REQUEST_ARCHIVED_ARTICLE_DATA_FAILED,
  REQUEST_US_ELECTION_DATA,
  REQUEST_US_ELECTION_DATA_SUCCESS,
  REQUEST_US_ELECTION_DATA_FAILED,
  REQUEST_CONTESTANTS_DATA,
  REQUEST_CONTESTANTS_DATA_SUCCESS,
  REQUEST_CONTESTANTS_DATA_FAILED,
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
  isBookmarked: boolean,
  displayType?: string 
  type: HomePageArticleType;
}

export interface EditorsChoiceDataType extends LatestArticleDataType {
  field_news_categories: NewsCategoriesType,
  created: string,
  publication_date: string,
  blockname: string,
  entityqueue_relationship_position: string,
}

interface PagerType {
  current_page?: number | null | undefined,
  items_per_page?: number
}

export interface SpotlightDataType {
  title: string,
  field_tag_spotlight_export: {
    id: string,
    title: string,
    bundle: string,
    name: string
  },
  field_image: string,
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

export interface InfoGraphicBlockType {
  info: string,
  body: string 
}

export interface ArchivedArticleDataType {
  title: string,
  type: HomePageArticleType,
  nid: string,
  body: string,
  image: string,
  created: string,
  author: string,
  publication_date: string,
  news_categories: NewsCategoriesType,
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
  sectionComboFive: LatestArticleDataType[],
  sectionComboSix: LatestArticleDataType[],
  sectionComboSeven: LatestArticleDataType[],
  sectionComboEight: LatestArticleDataType[],
  podcastHome: LatestPodcastDataType[],
  coverageInfo: MainSectionBlockType[],
  featuredArticle: MainSectionBlockType[];
  horizontalArticle: MainSectionBlockType[];
  editorsChoice: EditorsChoiceDataType[],
  spotlight: SpotlightDataType[],
  spotlightArticleSection: LatestArticleDataType[],
  infoGraphicBlockInfo: InfoGraphicBlockType[]
  archivedArticleSection: ArchivedArticleDataType[]
  contestantsSection: MainSectionBlockType[]
  usElectionsSection: MainSectionBlockType[]
  usElectionsSectionLoaded: boolean,
  coverageInfoLoaded: boolean,
  featuredArticleLoaded: boolean,
  horizontalArticleLoaded: boolean,
  opinionLoaded: boolean,
  podcastHomeLoaded: boolean,
  editorChoiceLoaded: boolean,
  sectionComboOneLoaded: boolean,
  sectionComboTwoLoaded: boolean,
  sectionComboThreeLoaded: boolean,
  infoGraphicBlockInfoLoaded: boolean,
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
  id: number[] | number | string,
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
export interface RequestSectionComboFive {
  type: typeof REQUEST_SECTION_COMBO_FIVE,
  payload: RequestSectionComboBodyGet
}
export interface RequestSectionComboFiveSuccessPayload {
  sectionComboFive: LatestArticleDataType[]
}
export interface RequestSectionComboFiveSuccessType {
  type: typeof REQUEST_SECTION_COMBO_FIVE_SUCCESS,
  payload: RequestSectionComboFiveSuccessPayload
}
export interface RequestSectionComboFiveFailedPayload {
  error: string
}
export interface RequestSectionComboFiveFailedType {
  type: typeof REQUEST_SECTION_COMBO_FIVE_FAILED,
  payload: RequestSectionComboFiveFailedPayload
}
export interface RequestSectionComboSix {
  type: typeof REQUEST_SECTION_COMBO_SIX,
  payload: RequestSectionComboBodyGet
}
export interface RequestSectionComboSixSuccessPayload {
  sectionComboSix: LatestArticleDataType[]
}
export interface RequestSectionComboSixSuccessType {
  type: typeof REQUEST_SECTION_COMBO_SIX_SUCCESS,
  payload: RequestSectionComboSixSuccessPayload
}
export interface RequestSectionComboSixFailedPayload {
  error: string
}
export interface RequestSectionComboSixFailedType {
  type: typeof REQUEST_SECTION_COMBO_SIX_FAILED,
  payload: RequestSectionComboSixFailedPayload
}
export interface RequestSectionComboSeven {
  type: typeof REQUEST_SECTION_COMBO_SEVEN,
  payload: RequestSectionComboBodyGet
}
export interface RequestSectionComboSevenSuccessPayload {
  sectionComboSeven: LatestArticleDataType[]
}
export interface RequestSectionComboSevenSuccessType {
  type: typeof REQUEST_SECTION_COMBO_SEVEN_SUCCESS,
  payload: RequestSectionComboSevenSuccessPayload
}
export interface RequestSectionComboSevenFailedPayload {
  error: string
}
export interface RequestSectionComboSevenFailedType {
  type: typeof REQUEST_SECTION_COMBO_SEVEN_FAILED,
  payload: RequestSectionComboSevenFailedPayload
}

export interface RequestSectionComboEight {
  type: typeof REQUEST_SECTION_COMBO_EIGHT,
  payload: RequestSectionComboBodyGet
}
export interface RequestSectionComboEightSuccessPayload {
  sectionComboEight: LatestArticleDataType[]
}
export interface RequestSectionComboEightSuccessType {
  type: typeof REQUEST_SECTION_COMBO_EIGHT_SUCCESS,
  payload: RequestSectionComboEightSuccessPayload
}
export interface RequestSectionComboEightFailedPayload {
  error: string
}
export interface RequestSectionComboEightFailedType {
  type: typeof REQUEST_SECTION_COMBO_EIGHT_FAILED,
  payload: RequestSectionComboEightFailedPayload
}

export enum MainSectionBlockName {
  COVERAGE = 'coverage',
  FEATURED_ARTICLE = 'almqalat_alryysyt_',
  HORIZONTAL_ARTICLE = 'tghtyt_khast',
  EDITORS_CHOICE = 'akhtyarat_almhrr',
}

export enum HomePageArticleType {
  ARTICLE = 'article',
  ALBUM = 'album',
  SHORTHAND = 'shorthand_type'
}

export type MainSectionBlockType = {
  body: string;
  title: string;
  nid: string;
  image: string;
  news_categories : NewsCategoriesType;
  author: string;
  created: string;
  isBookmarked: boolean,
  type: HomePageArticleType;
  blockName: string;
  position: string;
  displayType: string;
  link: string;
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

export interface RequestSpotlightType {
  type: typeof REQUEST_SPOTLIGHT_COMBO,
}

export type SpotlightSuccessPayload = {
  spotlight: SpotlightDataType[],
}

export interface SpotlightSuccessType {
  type: typeof REQUEST_SPOTLIGHT_COMBO_SUCCESS,
  payload: SpotlightSuccessPayload
}
export interface SpotlightFailedPayload {
  error: string
}

export interface SpotlightFailedType {
  type: typeof REQUEST_SPOTLIGHT_COMBO_FAILED,
  payload: EditorsChoiceFailedPayload
}

export interface SpotlightArticleSectionBodyGet {
  id: number,
  page: number,
  items_per_page:number,
}

export interface SpotlightArticleSectionSuccessPayloadType {
  spotlightArticleSection: any;
}

export interface RequestSpotlightArticleSectionType {
  type: typeof REQUEST_SPOTLIGHT_ARTICLE_SECTION_DATA,
  payload: SpotlightArticleSectionBodyGet
}

export type SpotlightArticleSectionSuccessPayload = {
  spotlightArticleSectionData: LatestArticleDataType[]
  pager: PagerType
}
export interface SpotlightArticleSectionSuccessType {
  type: typeof REQUEST_SPOTLIGHT_ARTICLE_SECTION_DATA_SUCCESS,
  payload: SpotlightArticleSectionSuccessPayload
}

export interface SpotlightArticleSectionFailedType {
  type: typeof REQUEST_SPOTLIGHT_ARTICLE_SECTION_DATA_FAILED,
  payload: SpotlightArticleSectionFailedPayload
}
export interface SpotlightArticleSectionFailedPayload {
  error: string
}

export type RequestInfoGraphicBlockType = {
  type: typeof REQUEST_INFO_GRAPHIC_BLOCK
}

export type RequestInfoGraphicBlockSuccessPayloadType = {
  infoGraphicBlockInfo: InfoGraphicBlockType[]
}

export type RequestInfoGraphicBlockSuccessType = {
  type: typeof REQUEST_INFO_GRAPHIC_BLOCK_SUCCESS;
  payload: RequestInfoGraphicBlockSuccessPayloadType
}

export type RequestInfoGraphicBlockFailedPayload = {
  error: string
}

export type RequestInfoGraphicBlockFailedType = {
  type: typeof REQUEST_INFO_GRAPHIC_BLOCK_FAILED;
  payload: RequestInfoGraphicBlockFailedPayload
}

export type RequestArchivedArticleSectionType = {
  type: typeof REQUEST_ARCHIVED_ARTICLE_DATA
}

export type RequestArchivedArticleSectionSuccessPayloadType = {
  archivedArticleSection: ArchivedArticleDataType[]
}

export type RequestArchivedArticleSectionSuccessType = {
  type: typeof REQUEST_ARCHIVED_ARTICLE_DATA_SUCCESS;
  payload: RequestArchivedArticleSectionSuccessPayloadType
}

export type RequestArchivedArticleSectionFailedPayload = {
  error: string
}

export type RequestArchivedArticleSectionFailedType = {
  type: typeof REQUEST_ARCHIVED_ARTICLE_DATA_FAILED;
  payload: RequestArchivedArticleSectionFailedPayload
}

export type RequestNodeListSectionSuccessPayloadType = {
  nodeListData: MainSectionBlockType[]
}

export type RequestNodeListSectionFailedPayload = {
  error: string
}

export type RequestUsElectionsSectionType = {
  type: typeof REQUEST_US_ELECTION_DATA
}

export type RequestUsElectionsSectionSuccessType = {
  type: typeof REQUEST_US_ELECTION_DATA_SUCCESS;
  payload: RequestNodeListSectionSuccessPayloadType
}

export type RequestUsElectionsSectionFailedType = {
  type: typeof REQUEST_US_ELECTION_DATA_FAILED;
  payload: RequestNodeListSectionFailedPayload
}

export type RequestContestantsSectionType = {
  type: typeof REQUEST_CONTESTANTS_DATA
}

export type RequestContestantsSectionSuccessType = {
  type: typeof REQUEST_CONTESTANTS_DATA_SUCCESS;
  payload: RequestNodeListSectionSuccessPayloadType
}

export type RequestContestantsSectionFailedType = {
  type: typeof REQUEST_CONTESTANTS_DATA_FAILED;
  payload: RequestNodeListSectionFailedPayload
}

export type RequestSectionComboType =
  RequestSectionComboOne
  | RequestSectionComboTwo
  | RequestSectionComboThree
  | RequestSectionComboFour
  | RequestSectionComboFive
  | RequestSectionComboSix
  | RequestSectionComboSeven
  | RequestSectionComboEight

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
  | RequestSectionComboFive
  | RequestSectionComboFiveSuccessType
  | RequestSectionComboFiveFailedType
  | RequestSectionComboSix
  | RequestSectionComboSixSuccessType
  | RequestSectionComboSixFailedType
  | RequestSectionComboSeven
  | RequestSectionComboSevenSuccessType
  | RequestSectionComboSevenFailedType
  | RequestSectionComboEight
  | RequestSectionComboEightSuccessType
  | RequestSectionComboEightFailedType
  | EditorsChoiceSuccessType
  | EditorsChoiceFailedType
  | RequestEditorsChoiceType
  | SpotlightSuccessType
  | SpotlightFailedType
  | RequestSpotlightType
  | SpotlightArticleSectionSuccessType
  | SpotlightArticleSectionFailedType
  | RequestSpotlightArticleSectionType
  | RequestInfoGraphicBlockType
  | RequestInfoGraphicBlockSuccessType
  | RequestInfoGraphicBlockFailedType
  | RequestArchivedArticleSectionType
  | RequestArchivedArticleSectionSuccessType
  | RequestArchivedArticleSectionFailedType
  | RequestUsElectionsSectionType
  | RequestUsElectionsSectionSuccessType
  | RequestUsElectionsSectionFailedType
  | RequestContestantsSectionType
  | RequestContestantsSectionSuccessType
  | RequestContestantsSectionFailedType;

