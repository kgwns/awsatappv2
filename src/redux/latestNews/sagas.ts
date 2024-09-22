import { all, call, put, takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import {
  HeroListTopListSuccessPayload, LatestArticleDataType, payloadType, RequestHeroListTopList,
  RequestSectionComboFourSuccessPayload,
  RequestSectionComboOneSuccessPayload,
  RequestSectionComboThreeSuccessPayload,
  RequestSectionComboTwoSuccessPayload,
  RequestSectionComboFiveSuccessPayload,
  RequestSectionComboSixSuccessPayload,
  RequestSectionComboSevenSuccessPayload,
  RequestSectionComboEightSuccessPayload,
  RequestSectionComboType,
  RequestTickerAndHeroType, TickerHeroSuccessPayload,
  OpinionSuccessPayload, LatestOpinionDataType,
  LatestPodcastDataType, PodcastHomeSuccessPayload,
  MainSectionBlockType, MainSectionBlockName,
  RequestCoverageBlockSuccessPayloadType,
  RequestFeaturedBlockSuccessPayloadType, RequestHorizontalBlockSuccessPayloadType,
  EditorsChoiceDataType, EditorsChoiceSuccessPayload,
  SpotlightDataType, SpotlightSuccessPayload, RequestSpotlightArticleSectionType, SpotlightArticleSectionSuccessPayload,
  RequestInfoGraphicBlockSuccessPayloadType,
  InfoGraphicBlockType,
  RequestArchivedArticleSectionSuccessPayloadType,
  ArchivedArticleDataType,
  RequestOpinionListType,
  RequestNodeListSectionSuccessPayloadType,
} from './types';
import {
  REQUEST_HERO_AND_TOP_LIST_DATA,
  REQUEST_SECTION_COMBO_FOUR,
  REQUEST_SECTION_COMBO_ONE,
  REQUEST_SECTION_COMBO_THREE,
  REQUEST_SECTION_COMBO_TWO,
  REQUEST_SECTION_COMBO_FIVE,
  REQUEST_SECTION_COMBO_SIX,
  REQUEST_SECTION_COMBO_SEVEN,
  REQUEST_SECTION_COMBO_EIGHT,
  REQUEST_TICKER_HERO_DATA,
  REQUEST_OPINION_LIST_DATA,
  REQUEST_PODCAST_HOME_DATA,
  REQUEST_COVERAGE_BLOCK,
  REQUEST_FEATURED_ARTICLE_BLOCK,
  REQUEST_HORIZONTAL_ARTICLE_BLOCK,
  REQUEST_EDITORS_CHOICE_DATA,
  REQUEST_SPOTLIGHT_COMBO,
  REQUEST_SPOTLIGHT_ARTICLE_SECTION_DATA,
  REQUEST_INFO_GRAPHIC_BLOCK,
  REQUEST_ARCHIVED_ARTICLE_DATA,
  REQUEST_US_ELECTION_DATA,
  REQUEST_CONTESTANTS_DATA,
} from './actionType';
import {
  requestHeroListTopListFailed, requestHeroListTopListSuccess,
  requestSectionComboFourFailed, requestSectionComboFourSuccess,
  requestSectionComboOneFailed, requestSectionComboOneSuccess,
  requestSectionComboThreeFailed, requestSectionComboThreeSuccess,
  requestSectionComboTwoFailed, requestSectionComboTwoSuccess,
  requestSectionComboFiveFailed, requestSectionComboFiveSuccess,
  requestSectionComboSixFailed, requestSectionComboSixSuccess,
  requestSectionComboSevenFailed, requestSectionComboSevenSuccess,
  requestSectionComboEightFailed, requestSectionComboEightSuccess,
  requestTickerAndHeroFailed, requestTickerAndHeroSuccess,
  requestOpinionSuccess,
  requestPodcastHomeSuccess, requestPodcastHomeFailed,
  requestCoverageBlockSuccess, requestCoverBlockFailed,
  requestFeatureArticleBlockSuccess, requestFeatureArticleBlockFailed,
  requestHorizontalArticleBlockSuccess, requestHorizontalArticleBlockFailed,
  requestEditorsChoiceSuccess, requestEditorsChoiceFailed,
  requestSpotlightSuccess, requestSpotlightFailed, requestSpotlightArticleSectionSuccess, requestSpotlightArticleSectionFailed,
  requestInfoGraphicBlockSuccess, requestInfoGraphicBlockFailed, requestArchivedArticleSectionSuccess, requestArchivedArticleSectionFailed,
  requestUsElectionsSectionSuccess,
  requestUsElectionsSectionFailed,
  requestContestantsSectionSuccess,
  requestContestantsSectionFailed,
} from './action';
import { isNonEmptyArray, isTab } from 'src/shared/utils';
import { decodeHTMLTags, getImageUrl, isNotEmpty, isObjectNonEmpty, isTypeAlbum } from 'src/shared/utils/utilities';
import {
  requestLatestArticle,
  requestSectionCombo,
  podcastHomeApi,
  mainCoverageBlockApi,
  mainHorizontalArticleApi,
  mainFeaturedArticleApi,
  editorsChoiceApi,
  spotlightApi,
  requestSpotlightArticleSection,
  infoGraphicBlockApi,
  archivedArticleApi,
  writerOpinionApi,
  nodeListApi,
} from 'src/services/latestTabService';
import { decode } from 'html-entities';

const getDisplayName = (text: string) => {
  return isNotEmpty(text) ? text.toLowerCase() : undefined;
};

const getArticleImage = (fieldImage: any, newPhoto: any) : string => {
  let image = fieldImage ?? ''

  if(!isNotEmpty(fieldImage) && isNotEmpty(newPhoto)) {
    image = newPhoto
  }

  return getImageUrl(image)
}

const formatMainSectionBlockData = (response: any) => {
  let formattedData: MainSectionBlockType[] = []
    if (response && isNonEmptyArray(response.rows)) {
      const rows = response.rows
      formattedData = rows.map(
        ({ title, body, nid, field_image, field_news_categories,field_new_resource,
        type, blockname, entityqueue_relationship_position, field_new_photo,field_display_export, changed, field_album_image, field_shorthand_link_export }: any) => ({
          body,
          title: isNotEmpty(title) ? decodeHTMLTags(decode(title)) : '',
          nid,
          image: isTypeAlbum(type) ? field_album_image : getArticleImage(field_image, field_new_photo),
          news_categories: isNonEmptyArray(field_news_categories) ? field_news_categories[0] : field_news_categories,
          author: field_new_resource,
          created: changed,
          isBookmarked: false,
          type,
          blockName: blockname,
          position: entityqueue_relationship_position,
          displayType: getDisplayName(field_display_export),
          link: field_shorthand_link_export
        })
      );
    }
  return formattedData
}

const parseCoverageDataSuccess = (response: any) => {
  const formattedData = formatMainSectionBlockData(response)
  const responseData: RequestCoverageBlockSuccessPayloadType = {
    coverageInfo: []
  }
  const allCoverageInfo = formattedData.filter((item) => item.blockName === MainSectionBlockName.COVERAGE)
  allCoverageInfo.sort((a, b) => parseInt(a.position) - parseInt(b.position))
  const coverageInfo = allCoverageInfo.splice(0, 4)

  responseData.coverageInfo = coverageInfo

  return responseData
}

const parseInfoGraphicBlockDataSuccess = (response: any) => {
  const formattedData = formatInfoGraphicBlockData(response)
  const responseData: RequestInfoGraphicBlockSuccessPayloadType = {
    infoGraphicBlockInfo: []
  }
  responseData.infoGraphicBlockInfo = formattedData

  return responseData
}

const parseArchivedArticleSectionDataSuccess = (response: any) => {
  const formattedData = formatArchivedArticleSectionData(response)
  const responseData: RequestArchivedArticleSectionSuccessPayloadType = {
    archivedArticleSection: []
  }
  responseData.archivedArticleSection = formattedData

  return responseData
}

const parseNodeListDataSuccess = (response: any) => {
  const formattedData = formatNodeListSectionData(response)
  const responseData: RequestNodeListSectionSuccessPayloadType = {
    nodeListData: []
  }
  responseData.nodeListData = formattedData

  return responseData
}

const parseFeaturedArticleSuccess = (response: any) => {
  const formattedData = formatMainSectionBlockData(response)
  const responseData: RequestFeaturedBlockSuccessPayloadType = {
    featureArticle: [],
  }
   
  const allFeaturedArticleData = formattedData.filter((item) => item.blockName === MainSectionBlockName.FEATURED_ARTICLE)
  allFeaturedArticleData.sort((a, b) => parseInt(a.position) - parseInt(b.position))
  const featuredArticleDataInfo = allFeaturedArticleData.splice(0, 15)

  responseData.featureArticle = featuredArticleDataInfo

  return responseData
}

const parseHorizontalArticleSuccess = (response: any) => {
  const formattedData = formatMainSectionBlockData(response)
  const responseData: RequestHorizontalBlockSuccessPayloadType = {
    horizontalArticle: []
  }
   
  const allHorizontalArticleData = formattedData.filter((item) => item.blockName === MainSectionBlockName.HORIZONTAL_ARTICLE)
  allHorizontalArticleData.sort((a, b) => parseInt(a.position) - parseInt(b.position))
  const horizontalArticleData = allHorizontalArticleData.splice(0, 5)

  responseData.horizontalArticle = horizontalArticleData

  return responseData
}


const formatLatestArticle = (response: any): LatestArticleDataType[] => {
  let formattedData: LatestArticleDataType[] = []
    if (response && isNonEmptyArray(response.rows)) {
      const rows = response.rows
      formattedData = rows.map(
        ({ title, body, nid, field_image, field_news_categories_export,
          field_new_photo, field_display_export, changed,
          type }: any) => ({
          body,
          title: isNotEmpty(title) ? decode(title) : '',
          nid,
          image: getArticleImage(field_image, field_new_photo),
          news_categories: isNonEmptyArray(field_news_categories_export) ? field_news_categories_export[0] : field_news_categories_export,
          author: '', //Need to hide author name in UI
          created: changed,
          isBookmarked: false,
          displayType: getDisplayName(field_display_export),
          type,
        })
      );
    }
  return formattedData
}

const formatOpinion = (response: any): LatestOpinionDataType[] => {
  let formattedOpinionData: LatestOpinionDataType[] = []
    if (response && isNonEmptyArray(response.rows)) {
      const rows = response.rows
      formattedOpinionData = rows.map(
        ({ title, body, nid, field_opinion_writer_node_export, jwplayer, jwplayer_info }: any) => ({
          body,
          title: isNotEmpty(title) ? decode(title) : '',
          nid,
          field_opinion_writer_node_export,
          field_jwplayer_id_opinion_export:jwplayer,
          jwplayer_info: jwplayer_info
        })
      );
  }
  return formattedOpinionData
}

const formatPodcastHome = (response: any): LatestPodcastDataType[] => {
  let formattedPodcastHomeData: LatestPodcastDataType[] = []
    if (response && isNonEmptyArray(response.rows)) {
      const rows = response.rows
      formattedPodcastHomeData = rows.map(
        ({ nid, field_podcast_sect_export, 
          title, body_export, field_total_duration_export, 
          created_export, field_spreaker_episode_export, 
          field_announcer_name_export, field_podcast_image_export }: any) => ({
          nid,
          field_podcast_sect_export,
          title: isNotEmpty(title) ? decode(title) : '',
          body_export,
          field_total_duration_export,
          created_export,
          field_spreaker_episode_export,
          field_announcer_name_export,
          field_podcast_image_export
        })
      );
  }
  return formattedPodcastHomeData;
}

const formatEditorsChoice = (response: any): EditorsChoiceDataType[] => {
  let formattedEditorsChoiceData: EditorsChoiceDataType[] = []
    if (response && isNonEmptyArray(response.rows)) {
      const rows = response.rows
      formattedEditorsChoiceData = rows.map(
        ({ title, body, nid, field_image, field_news_categories_export, field_news_categories, field_publication_date,type, blockname, entityqueue_relationship_position,
          field_new_photo, field_display_export, changed,
        }: any) => ({
          body,
          title: isNotEmpty(title) ? decodeHTMLTags(decode(title)) : '',
          nid,
          image: getArticleImage(field_image, field_new_photo),
          news_categories: isNonEmptyArray(field_news_categories_export) ? field_news_categories_export[0] : field_news_categories_export,
          author: '', //Need to hide author name in UI
          created: changed,
          isBookmarked: false,
          field_news_categories: field_news_categories,
          publication_date: field_publication_date,
          type: type,
          blockname: blockname,
          entityqueue_relationship_position: entityqueue_relationship_position,
          displayType: getDisplayName(field_display_export),
        })
      );
  }
  return formattedEditorsChoiceData;
}

const formatSpotlight = (response: any): SpotlightDataType[] => {
  let formattedSpotlightData: SpotlightDataType[] = []
    if (response && isNonEmptyArray(response.rows)) {
      const rows = response.rows
      formattedSpotlightData = rows.map(
        ({ title, field_tag_spotlight_export, field_image }: any) => ({
          title: isNotEmpty(title) ? decodeHTMLTags(decode(title)) : '',
          field_tag_spotlight_export: field_tag_spotlight_export,
          field_image: getImageUrl(field_image),
        })
      );
  }
  return formattedSpotlightData;
}

const formatInfoGraphicBlockData = (response: any): InfoGraphicBlockType[] => {
  let formattedInfoGraphicBlockData: InfoGraphicBlockType[] = []
  if (response && response.rows && isNonEmptyArray(response.rows)) {
    formattedInfoGraphicBlockData = response.rows.map(
      ({ title, body_export }: any) => ({
        info: isNotEmpty(title) ? decodeHTMLTags(decode(title)) : '',
        body: body_export,
      })
    );
  }
  return formattedInfoGraphicBlockData;
}

const formatArchivedArticleSectionData = (response: any): ArchivedArticleDataType[] => {
  let formattedArchivedArticleSectionData: ArchivedArticleDataType[] = []
  if (response && isNonEmptyArray(response)) {
    formattedArchivedArticleSectionData = response.map(
      ({ title, type, nid, body_export, 
        field_image_export, field_new_photo, field_new_resource_export, 
        field_publication_date_export, field_news_categories_export, 
        field_display_export, changed
      }: any) => ({
        title: isNotEmpty(title) ? decodeHTMLTags(decode(title)) : '',
        type,
        nid,
        body: body_export,
        image: getArticleImage(field_image_export, field_new_photo),
        created: changed,
        author: field_new_resource_export,
        publication_date: field_publication_date_export,
        news_categories: isNonEmptyArray(field_news_categories_export) ? field_news_categories_export[0] : field_news_categories_export,
        displayType: getDisplayName(field_display_export),
      })
    );
  }
  return formattedArchivedArticleSectionData;
}

const formatNodeListSectionData = (response: any): MainSectionBlockType[] => {
  let formattedSectionData: MainSectionBlockType[] = []
  if (response && isNonEmptyArray(response)) {
    formattedSectionData = response.map(
      ({ title, type, nid, body_export, 
        field_image_export, field_new_photo, field_new_resource_export, 
        field_publication_date_export, field_news_categories_export, 
        field_display_export, changed
      }: any) => ({
        title: isNotEmpty(title) ? decodeHTMLTags(decode(title)) : '',
        type,
        nid,
        body: body_export,
        image: getArticleImage(field_image_export, field_new_photo),
        created: changed,
        author: field_new_resource_export,
        publication_date: field_publication_date_export,
        news_categories: isNonEmptyArray(field_news_categories_export) ? field_news_categories_export[0] : field_news_categories_export,
        displayType: getDisplayName(field_display_export),
        isBookmarked: false
      })
    );
  }
  return formattedSectionData;
}

const parseHeroListTopListSuccess = (response: any): HeroListTopListSuccessPayload => {
  const formattedData = formatLatestArticle(response)
  const responseData: HeroListTopListSuccessPayload = {
    heroList: [],
    topList: []
  }
  const topListCount = isTab ? 5 : 4
  responseData.heroList =  isNonEmptyArray(formattedData) ? [...formattedData].splice(0, 5) : []
  responseData.topList =  isNonEmptyArray(formattedData) ? [...formattedData].splice(2, topListCount) : []
  return responseData
}

const parseTickerHeroDataSuccess = (response: any): TickerHeroSuccessPayload => {
  const formattedData = formatLatestArticle(response)
  const responseData: TickerHeroSuccessPayload = {
    ticker: [],
    hero: []
  }
  responseData.ticker = isNonEmptyArray(formattedData) ? [...formattedData].splice(0, 5) : []
  responseData.hero = isNonEmptyArray(formattedData) ? [...formattedData].splice(5, 1) : []
  return responseData
}

const parseBodyAsEmpty = (data: LatestArticleDataType[]): LatestArticleDataType[] => {
  return data.map((item) => {
    return {
      ...item,
      body: ''
    }
  })
};

const parseSectionComboOne = (response: payloadType) => {
  const formattedData = formatLatestArticle(response)
  const responseData: RequestSectionComboOneSuccessPayload = {
    sectionComboOne: []
  }
  responseData.sectionComboOne = formattedData.splice(0, 6)
  return responseData
}

const parseSectionComboTwo = (response: payloadType) => {
  const formattedData = formatLatestArticle(response)
  const responseData: RequestSectionComboTwoSuccessPayload = {
    sectionComboTwo: []
  }

  const data = parseBodyAsEmpty(formattedData);
  responseData.sectionComboTwo = data.splice(0, 6)
  return responseData
}

const parseSectionComboThree = (response: payloadType) => {
  const formattedData = formatLatestArticle(response)
  const responseData: RequestSectionComboThreeSuccessPayload = {
    sectionComboThree: []
  }

  const data = parseBodyAsEmpty(formattedData);
  responseData.sectionComboThree = data.splice(0, 6)
  return responseData
}

const parseSectionComboFour = (response: payloadType) => {
  const formattedData = formatLatestArticle(response)
  const responseData: RequestSectionComboFourSuccessPayload = {
    sectionComboFour: []
  }

  const data = parseBodyAsEmpty(formattedData);
  responseData.sectionComboFour = data.splice(0, 6)
  return responseData
}

const parseSectionComboFive= (response: payloadType) => {
  const formattedData = formatLatestArticle(response)
  const responseData: RequestSectionComboFiveSuccessPayload = {
    sectionComboFive: []
  }
  responseData.sectionComboFive = formattedData.splice(0, 6)
  return responseData
}

const parseSectionComboSix= (response: payloadType) => {
  const formattedData = formatLatestArticle(response)
  const responseData: RequestSectionComboSixSuccessPayload = {
    sectionComboSix: []
  }
  responseData.sectionComboSix = formattedData.splice(0, 6)
  return responseData
}

const parseSectionComboSeven= (response: payloadType) => {
  const formattedData = formatLatestArticle(response)
  const responseData: RequestSectionComboSevenSuccessPayload = {
    sectionComboSeven: []
  }
  responseData.sectionComboSeven = formattedData.splice(0, 6)
  return responseData
}

const parseSectionComboEight = (response: payloadType) => {
  const formattedData = formatLatestArticle(response)
  const responseData: RequestSectionComboEightSuccessPayload = {
    sectionComboEight: []
  }
  responseData.sectionComboEight = formattedData.splice(0, 6)
  return responseData
}

const parseOpinionDataSuccess = (response: any): OpinionSuccessPayload => {
  const formattedData = formatOpinion(response)
  const responseData: OpinionSuccessPayload = {
    opinionList: []
  }
  responseData.opinionList = formattedData.splice(0, 16)
  return responseData
}

const parsePodcastHomeSuccess = (response: any): PodcastHomeSuccessPayload => {
  const formattedData = formatPodcastHome(response)
  const responseData: PodcastHomeSuccessPayload = {
    podcastHome: []
  }
  responseData.podcastHome = formattedData;
  return responseData;
}

const parseEditorsChoiceSuccess = (response: any): EditorsChoiceSuccessPayload => {
  const formattedData = formatEditorsChoice(response)
  const responseData: EditorsChoiceSuccessPayload = {
    editorsChoice: []
  }
  const allEditorsChoiceInfo = formattedData.filter((item) => item.blockname === MainSectionBlockName.EDITORS_CHOICE)
  allEditorsChoiceInfo.sort((a, b) => parseInt(a.entityqueue_relationship_position) - parseInt(b.entityqueue_relationship_position))
  const editorsChoiceInfo = allEditorsChoiceInfo.splice(0, 6)

  responseData.editorsChoice = editorsChoiceInfo;
  return responseData;
}
const parseSpotlightSuccess = (response: any): SpotlightSuccessPayload => {
  const formattedData = formatSpotlight(response)
  const responseData: SpotlightSuccessPayload = {
    spotlight: []
  }
  responseData.spotlight = formattedData;
  return responseData;
}

const parseSpotlightArticleSectionSuccess = (response: any): SpotlightArticleSectionSuccessPayload => {
  const responseData: SpotlightArticleSectionSuccessPayload = {
    spotlightArticleSectionData: [],
    pager: {}
  }
  if (response) {
    if (isNonEmptyArray(response.rows)) {
      const rows = response.rows
      responseData.spotlightArticleSectionData = rows.map(
        ({ nid, title, body, field_image, view_node,
          field_news_categories_export, author_resource, field_new_photo, field_display_export, changed }: any) => ({
            nid,
            title: isNotEmpty(title) ? decode(title) : '',
            body: body,
            image: getArticleImage(field_image, field_new_photo),
            view_node,
            news_categories: isNonEmptyArray(field_news_categories_export) ? field_news_categories_export[0] : field_news_categories_export,
            created: changed,
            author: author_resource,
            displayType: getDisplayName(field_display_export),
          })
      );
      responseData.spotlightArticleSectionData = responseData.spotlightArticleSectionData.splice(0, 5)
    }

    if (response.pager) {
      responseData.pager = response.pager
    }
  }
  return responseData
}

export function* fetchTickerAndHeroWidgetData(action: RequestTickerAndHeroType) {
  try {
    const payload: payloadType = yield call(
      requestLatestArticle,
      action.payload
    );
    const response = parseTickerHeroDataSuccess(payload)
    yield put(requestTickerAndHeroSuccess(response));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: { message: string } = errorResponse.response.data;
      yield put(requestTickerAndHeroFailed({ error: errorMessage.message }));
    }
  }
}
export function* fetchOpinionWidgetData(action: RequestOpinionListType) {
  try {
    const payload: payloadType = yield call(
      writerOpinionApi,
      action.payload
    );
    const response = parseOpinionDataSuccess(payload)
    yield put(requestOpinionSuccess(response));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: { message: string } = errorResponse.response.data;
      yield put(requestTickerAndHeroFailed({ error: errorMessage.message }));
    }
  }
}

export function* fetchHeroListTopListWidgetData(action: RequestHeroListTopList) {
  try {
    const payload: payloadType = yield call(
      requestLatestArticle,
      action.payload
    );
    const response = parseHeroListTopListSuccess(payload)
    yield put(requestHeroListTopListSuccess(response));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: { message: string } = errorResponse.response.data;
      yield put(requestHeroListTopListFailed({ error: errorMessage.message }));
    }
  }
}

export function* fetchSectionCombo(action: RequestSectionComboType) {
  try {
    const payload: payloadType = yield call(
      requestSectionCombo,
      action.payload
    );
    if (action.type === REQUEST_SECTION_COMBO_ONE) {
      const response = parseSectionComboOne(payload)
      yield put(requestSectionComboOneSuccess(response));
    } else if (action.type === REQUEST_SECTION_COMBO_TWO) {
      const response = parseSectionComboTwo(payload)
      yield put(requestSectionComboTwoSuccess(response));
    } else if (action.type === REQUEST_SECTION_COMBO_THREE) {
      const response = parseSectionComboThree(payload)
      yield put(requestSectionComboThreeSuccess(response));
    } else if (action.type === REQUEST_SECTION_COMBO_FOUR) {
      const response = parseSectionComboFour(payload)
      yield put(requestSectionComboFourSuccess(response));
    } else if (action.type === REQUEST_SECTION_COMBO_FIVE) {
      const response = parseSectionComboFive(payload)
      yield put(requestSectionComboFiveSuccess(response));
    } else if (action.type === REQUEST_SECTION_COMBO_SIX) {
      const response = parseSectionComboSix(payload)
      yield put(requestSectionComboSixSuccess(response));
    } else if (action.type === REQUEST_SECTION_COMBO_SEVEN) {
      const response = parseSectionComboSeven(payload)
      yield put(requestSectionComboSevenSuccess(response));
    } else if (action.type === REQUEST_SECTION_COMBO_EIGHT) {
      const response = parseSectionComboEight(payload)
      yield put(requestSectionComboEightSuccess(response));
    }
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: { message: string } = errorResponse.response.data;
      if (action.type === REQUEST_SECTION_COMBO_ONE) {
        yield put(requestSectionComboOneFailed({ error: errorMessage.message }));
      } else if (action.type === REQUEST_SECTION_COMBO_TWO) {
        yield put(requestSectionComboTwoFailed({ error: errorMessage.message }));
      } else if (action.type === REQUEST_SECTION_COMBO_THREE) {
        yield put(requestSectionComboThreeFailed({ error: errorMessage.message }));
      } else if (action.type === REQUEST_SECTION_COMBO_FOUR) {
        yield put(requestSectionComboFourFailed({ error: errorMessage.message }));
      } else if (action.type === REQUEST_SECTION_COMBO_FIVE) {
        yield put(requestSectionComboFiveFailed({ error: errorMessage.message }));
      } else if (action.type === REQUEST_SECTION_COMBO_SIX) {
        yield put(requestSectionComboSixFailed({ error: errorMessage.message }));
      } else if (action.type === REQUEST_SECTION_COMBO_SEVEN) {
        yield put(requestSectionComboSevenFailed({ error: errorMessage.message }));
      } else if (action.type === REQUEST_SECTION_COMBO_EIGHT) {
        yield put(requestSectionComboEightFailed({ error: errorMessage.message }));
      }
    }
  }
}

export function* fetchPodcastHomeData() {
  try {
    const payload: payloadType = yield call(
      podcastHomeApi,
    );
    const response = parsePodcastHomeSuccess(payload)
    yield put(requestPodcastHomeSuccess(response));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: { message: string } = errorResponse.response.data;
      yield put(requestPodcastHomeFailed({ error: errorMessage.message }));
    }
  }
}

export function* fetchCoverageBlockData() {
  try {
    const payload: payloadType = yield call(
      mainCoverageBlockApi,
    );
    const response = parseCoverageDataSuccess(payload)
    yield put(requestCoverageBlockSuccess(response));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: { message: string } = errorResponse.response.data;
      yield put(requestCoverBlockFailed({ error: errorMessage.message }));
    }
  }
}

export function* fetchEditorsChoiceData() {
  try {
    const payload: payloadType = yield call(
      editorsChoiceApi,
    );
    const response = parseEditorsChoiceSuccess(payload)
    yield put(requestEditorsChoiceSuccess(response));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: { message: string } = errorResponse.response.data;
      yield put(requestEditorsChoiceFailed({ error: errorMessage.message }));
    }
  }
}

export function* fetchFeaturedArticleBlockData() {
  try {
    const payload: payloadType = yield call(
      mainFeaturedArticleApi,
    );
    const response = parseFeaturedArticleSuccess(payload)
    yield put(requestFeatureArticleBlockSuccess(response));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: { message: string } = errorResponse.response.data;
      yield put(requestFeatureArticleBlockFailed({ error: errorMessage.message }));
    }
  }
}

export function* fetchHorizontalBlockData() {
  try {
    const payload: payloadType = yield call(
      mainHorizontalArticleApi,
    );
    const response = parseHorizontalArticleSuccess(payload)
    yield put(requestHorizontalArticleBlockSuccess(response));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: { message: string } = errorResponse.response.data;
      yield put(requestHorizontalArticleBlockFailed({ error: errorMessage.message }));
    }
  }
}

export function* fetchSpotlightData() {

  try {
    const payload: payloadType = yield call(
      spotlightApi,
    );
    const response = parseSpotlightSuccess(payload)
    yield put(requestSpotlightSuccess(response));
    if (isNonEmptyArray(response.spotlight)
      && isObjectNonEmpty(response.spotlight[0].field_tag_spotlight_export)
      && isNotEmpty(response.spotlight[0].field_tag_spotlight_export.id)) {
      yield call(
        fetchSpotlightArticleSection, {
        type: REQUEST_SPOTLIGHT_ARTICLE_SECTION_DATA,
        payload: { id: parseInt(response.spotlight[0].field_tag_spotlight_export.id), page: 0, items_per_page: 10 }
      }
      )
    }
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: { message: string } = errorResponse.response.data;
      yield put(requestSpotlightFailed({ error: errorMessage.message }));
    }
  }
}

export function* fetchSpotlightArticleSection(action: RequestSpotlightArticleSectionType) {
  try {
    const payload: payloadType = yield call(
      requestSpotlightArticleSection,
      action.payload
    );
    const response = parseSpotlightArticleSectionSuccess(payload)
    yield put(requestSpotlightArticleSectionSuccess(response));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: { message: string } = errorResponse.response.data;
      yield put(requestSpotlightArticleSectionFailed({ error: errorMessage.message }));
    }
  }
}

export function* fetchInfoGraphicBlockData() {
  try {
    const payload: payloadType = yield call(
      infoGraphicBlockApi,
    );
    const response = parseInfoGraphicBlockDataSuccess(payload)
    yield put(requestInfoGraphicBlockSuccess(response));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: { message: string } = errorResponse.response.data;
      yield put(requestInfoGraphicBlockFailed({ error: errorMessage.message }));
    }
  }
}

export function* fetchArchivedArticleSectionData() {
  try {
    const payload: payloadType = yield call(
      archivedArticleApi,
    );
    const response = parseArchivedArticleSectionDataSuccess(payload)
    yield put(requestArchivedArticleSectionSuccess(response));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: { message: string } = errorResponse.response.data;
      yield put(requestArchivedArticleSectionFailed({ error: errorMessage.message }));
    }
  }
}

export function* fetchUsElectionSectionData() {
  try {
    const payload: payloadType = yield call(
      nodeListApi,
      'us_election'
    );
    const response = parseNodeListDataSuccess(payload)
    yield put(requestUsElectionsSectionSuccess(response));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: { message: string } = errorResponse.response.data;
      yield put(requestUsElectionsSectionFailed({ error: errorMessage.message }));
    }
  }
}

export function* fetchContestantsSectionData() {
  try {
    const payload: payloadType = yield call(
      nodeListApi,
      'almrshhwn'
    );
    const response = parseNodeListDataSuccess(payload)
    yield put(requestContestantsSectionSuccess(response));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: { message: string } = errorResponse.response.data;
      yield put(requestContestantsSectionFailed({ error: errorMessage.message }));
    }
  }
}

function* articleDetailSaga() {
  yield all([takeLatest(REQUEST_TICKER_HERO_DATA, fetchTickerAndHeroWidgetData)]);
  yield all([takeLatest(REQUEST_HERO_AND_TOP_LIST_DATA, fetchHeroListTopListWidgetData)]);
  yield all([takeLatest(REQUEST_OPINION_LIST_DATA, fetchOpinionWidgetData)]);
  yield all([takeLatest(REQUEST_SECTION_COMBO_ONE, fetchSectionCombo)]);
  yield all([takeLatest(REQUEST_SECTION_COMBO_TWO, fetchSectionCombo)]);
  yield all([takeLatest(REQUEST_SECTION_COMBO_THREE, fetchSectionCombo)]);
  yield all([takeLatest(REQUEST_SECTION_COMBO_FOUR, fetchSectionCombo)]);
  yield all([takeLatest(REQUEST_PODCAST_HOME_DATA, fetchPodcastHomeData)]);
  yield all([takeLatest(REQUEST_COVERAGE_BLOCK, fetchCoverageBlockData)]);
  yield all([takeLatest(REQUEST_FEATURED_ARTICLE_BLOCK, fetchFeaturedArticleBlockData)]);
  yield all([takeLatest(REQUEST_HORIZONTAL_ARTICLE_BLOCK, fetchHorizontalBlockData)]);
  yield all([takeLatest(REQUEST_SECTION_COMBO_FIVE, fetchSectionCombo)]);
  yield all([takeLatest(REQUEST_SECTION_COMBO_SIX, fetchSectionCombo)]);
  yield all([takeLatest(REQUEST_SECTION_COMBO_SEVEN, fetchSectionCombo)]);
  yield all([takeLatest(REQUEST_SECTION_COMBO_EIGHT, fetchSectionCombo)]);
  yield all([takeLatest(REQUEST_EDITORS_CHOICE_DATA, fetchEditorsChoiceData)]);
  yield all([takeLatest(REQUEST_SPOTLIGHT_COMBO,fetchSpotlightData)]);
  yield all ([takeLatest(REQUEST_SPOTLIGHT_ARTICLE_SECTION_DATA,fetchSpotlightArticleSection)]);
  yield all([takeLatest(REQUEST_INFO_GRAPHIC_BLOCK, fetchInfoGraphicBlockData)]);
  yield all([takeLatest(REQUEST_ARCHIVED_ARTICLE_DATA, fetchArchivedArticleSectionData)]);
  yield all([takeLatest(REQUEST_US_ELECTION_DATA, fetchUsElectionSectionData)]);
  yield all([takeLatest(REQUEST_CONTESTANTS_DATA, fetchContestantsSectionData)]);
}

export default articleDetailSaga;
