import { REQUEST_TICKER_HERO_DATA, REQUEST_TICKER_HERO_DATA_SUCCESS, 
  REQUEST_TICKER_HERO_DATA_FAILED, REQUEST_HERO_AND_TOP_LIST_DATA, 
  REQUEST_HERO_AND_TOP_LIST_SUCCESS, REQUEST_HERO_AND_TOP_LIST_FAILED, 
  REQUEST_SECTION_COMBO_ONE, REQUEST_SECTION_COMBO_ONE_FAILED, 
  REQUEST_SECTION_COMBO_ONE_SUCCESS, REQUEST_SECTION_COMBO_FOUR_FAILED, 
  REQUEST_SECTION_COMBO_FOUR, REQUEST_SECTION_COMBO_THREE_FAILED, 
  REQUEST_SECTION_COMBO_THREE_SUCCESS, REQUEST_SECTION_COMBO_THREE, 
  REQUEST_SECTION_COMBO_TWO_FAILED, REQUEST_SECTION_COMBO_TWO_SUCCESS, 
  REQUEST_SECTION_COMBO_TWO, REQUEST_SECTION_COMBO_FOUR_SUCCESS,
  REQUEST_OPINION_DATA_SUCCESS, REQUEST_OPINION_LIST_DATA, REQUEST_OPINION_DATA_LIST_FAILED,
  REQUEST_PODCAST_HOME_DATA, REQUEST_PODCAST_HOME_DATA_SUCCESS, REQUEST_PODCAST_HOME_DATA_FAILED,
  REQUEST_COVERAGE_BLOCK,
  REQUEST_COVERAGE_BLOCK_SUCCESS,
  REQUEST_COVERAGE_BLOCK_FAILED,
  REQUEST_FEATURED_ARTICLE_BLOCK,
  REQUEST_FEATURED_ARTICLE_BLOCK_SUCCESS,
  REQUEST_FEATURED_ARTICLE_BLOCK_FAILED,
  REQUEST_HORIZONTAL_ARTICLE_BLOCK,
  REQUEST_HORIZONTAL_ARTICLE_SUCCESS,
  REQUEST_HORIZONTAL_ARTICLE_FAILED,
  REQUEST_SECTION_COMBO_FIVE, REQUEST_SECTION_COMBO_FIVE_SUCCESS, REQUEST_SECTION_COMBO_FIVE_FAILED,
  REQUEST_SECTION_COMBO_SIX, REQUEST_SECTION_COMBO_SIX_SUCCESS, REQUEST_SECTION_COMBO_SIX_FAILED,
  REQUEST_SECTION_COMBO_SEVEN, REQUEST_SECTION_COMBO_SEVEN_SUCCESS, REQUEST_SECTION_COMBO_SEVEN_FAILED,
  REQUEST_SECTION_COMBO_EIGHT, REQUEST_SECTION_COMBO_EIGHT_SUCCESS, REQUEST_SECTION_COMBO_EIGHT_FAILED,
  REQUEST_EDITORS_CHOICE_DATA, REQUEST_EDITORS_CHOICE_DATA_SUCCESS, REQUEST_EDITORS_CHOICE_DATA_FAILED, 
  REQUEST_SPOTLIGHT_COMBO, REQUEST_SPOTLIGHT_COMBO_SUCCESS, REQUEST_SPOTLIGHT_COMBO_FAILED,
  REQUEST_SPOTLIGHT_ARTICLE_SECTION_DATA, REQUEST_SPOTLIGHT_ARTICLE_SECTION_DATA_SUCCESS, REQUEST_SPOTLIGHT_ARTICLE_SECTION_DATA_FAILED,
  REQUEST_INFO_GRAPHIC_BLOCK,
  REQUEST_INFO_GRAPHIC_BLOCK_SUCCESS,
  REQUEST_INFO_GRAPHIC_BLOCK_FAILED,
  REQUEST_ARCHIVED_ARTICLE_DATA, REQUEST_ARCHIVED_ARTICLE_DATA_SUCCESS, REQUEST_ARCHIVED_ARTICLE_DATA_FAILED,
  REQUEST_US_ELECTION_DATA_SUCCESS,
  REQUEST_US_ELECTION_DATA_FAILED,
  REQUEST_US_ELECTION_DATA,
  REQUEST_CONTESTANTS_DATA_SUCCESS,
  REQUEST_CONTESTANTS_DATA_FAILED,
  REQUEST_CONTESTANTS_DATA,
} from "./actionType"
import { HeroListTopListFailedPayload, HeroListTopListFailedType, 
  HeroListTopListSuccessPayload, HeroListTopListSuccessType, 
  LatestArticleBodyGet, RequestHeroListTopList, RequestSectionComboBodyGet, 
  RequestSectionComboFour, RequestSectionComboFourFailedPayload, 
  RequestSectionComboFourFailedType, RequestSectionComboFourSuccessPayload, 
  RequestSectionComboFourSuccessType, RequestSectionComboOne, 
  RequestSectionComboOneFailedPayload, RequestSectionComboOneFailedType, 
  RequestSectionComboOneSuccessPayload, RequestSectionComboOneSuccessType, 
  RequestSectionComboThree, RequestSectionComboThreeFailedPayload, 
  RequestSectionComboThreeFailedType, RequestSectionComboThreeSuccessPayload, 
  RequestSectionComboThreeSuccessType, RequestSectionComboTwo, 
  RequestSectionComboTwoFailedPayload, RequestSectionComboTwoFailedType, 
  RequestSectionComboTwoSuccessPayload, RequestSectionComboTwoSuccessType, 
  RequestTickerAndHeroType, TickerHeroFailedPayload, TickerHeroFailedType, 
  TickerHeroSuccessPayload, TickerHeroSuccessType, OpinionSuccessPayload, 
  OpinionSuccessType,
  RequestOpinionListType,
  OpinionFailedType,
  RequestPodcastHomeType,
  PodcastHomeSuccessPayload,
  PodcastHomeSuccessType,
  PodcastHomeFailedPayload,
  PodcastHomeFailedType,
  RequestCoverageBlockSuccessPayloadType,
  RequestCoverageBlockSuccessType,
  RequestCoverageBlockFailedPayload,
  RequestCoverageBlockFailedType,
  RequestFeaturedBlockSuccessPayloadType,
  RequestFeaturedBlockSuccessType,
  RequestFeaturedBlockFailedPayload,
  RequestFeaturedBlockFailedType,
  RequestHorizontalBlockSuccessPayloadType,
  RequestHorizontalBlockSuccessType,
  RequestHorizontalBlockFailedPayload,
  RequestHorizontalBlockFailedType,
  RequestSectionComboFive, RequestSectionComboFiveFailedPayload, RequestSectionComboFiveFailedType, RequestSectionComboFiveSuccessPayload, RequestSectionComboFiveSuccessType,
  RequestSectionComboSix, RequestSectionComboSixFailedPayload, RequestSectionComboSixFailedType, RequestSectionComboSixSuccessPayload, RequestSectionComboSixSuccessType,
  RequestSectionComboSeven, RequestSectionComboSevenFailedPayload, RequestSectionComboSevenFailedType, RequestSectionComboSevenSuccessPayload, RequestSectionComboSevenSuccessType,
  RequestSectionComboEight, RequestSectionComboEightFailedPayload, RequestSectionComboEightFailedType, RequestSectionComboEightSuccessPayload, RequestSectionComboEightSuccessType,
  RequestEditorsChoiceType,
  EditorsChoiceSuccessPayload,
  EditorsChoiceSuccessType,
  EditorsChoiceFailedPayload,
  EditorsChoiceFailedType,
  RequestSpotlightType, SpotlightSuccessPayload, SpotlightSuccessType, SpotlightFailedPayload, SpotlightFailedType,
  RequestSpotlightArticleSectionType, 
  SpotlightArticleSectionBodyGet, 
  SpotlightArticleSectionSuccessPayload, 
  SpotlightArticleSectionSuccessType, 
  SpotlightArticleSectionFailedPayload, 
  SpotlightArticleSectionFailedType,
  RequestInfoGraphicBlockSuccessPayloadType, 
  RequestInfoGraphicBlockSuccessType, 
  RequestInfoGraphicBlockFailedPayload, 
  RequestInfoGraphicBlockFailedType,
  RequestArchivedArticleSectionSuccessPayloadType, 
  RequestArchivedArticleSectionSuccessType, 
  RequestArchivedArticleSectionFailedPayload, 
  RequestArchivedArticleSectionFailedType,
  RequestNodeListSectionSuccessPayloadType,
  RequestNodeListSectionFailedPayload,
  RequestUsElectionsSectionSuccessType,
  RequestUsElectionsSectionFailedType,
  RequestContestantsSectionSuccessType,
  RequestContestantsSectionFailedType,
} from "./types"

export const requestTickerAndHero = (
  payload: LatestArticleBodyGet
): RequestTickerAndHeroType => {
  return {
    type: REQUEST_TICKER_HERO_DATA,
    payload
  }
}

export const requestTickerAndHeroSuccess = (
  payload: TickerHeroSuccessPayload
): TickerHeroSuccessType => {
  return {
    type: REQUEST_TICKER_HERO_DATA_SUCCESS,
    payload
  }
}

export const requestOpinionSuccess = (
  payload: OpinionSuccessPayload
): OpinionSuccessType => {
  return {
    type: REQUEST_OPINION_DATA_SUCCESS,
    payload
  }
}

export const requestTickerAndHeroFailed = (
  payload: TickerHeroFailedPayload
): TickerHeroFailedType => {
  return {
    type: REQUEST_TICKER_HERO_DATA_FAILED,
    payload
  }
}

export const requestOpinionFailed = (
  payload: TickerHeroFailedPayload
): OpinionFailedType => {
  return {
    type: REQUEST_OPINION_DATA_LIST_FAILED,
    payload
  }
}

export const requestHeroListTopList = (
  payload: LatestArticleBodyGet
): RequestHeroListTopList => {
  return {
    type: REQUEST_HERO_AND_TOP_LIST_DATA,
    payload
  }
}

export const requestOpinionList = (
  payload: LatestArticleBodyGet
): RequestOpinionListType => {
  return {
    type: REQUEST_OPINION_LIST_DATA,
    payload
  }
}

export const requestHeroListTopListSuccess = (
  payload: HeroListTopListSuccessPayload
): HeroListTopListSuccessType => {
  return {
    type: REQUEST_HERO_AND_TOP_LIST_SUCCESS,
    payload
  }
}

export const requestHeroListTopListFailed = (
  payload: HeroListTopListFailedPayload
): HeroListTopListFailedType => {
  return {
    type: REQUEST_HERO_AND_TOP_LIST_FAILED,
    payload
  }
}

export const requestSectionComboOne = (
  payload: RequestSectionComboBodyGet
): RequestSectionComboOne => {
  return {
    type: REQUEST_SECTION_COMBO_ONE,
    payload
  }
}

export const requestSectionComboOneSuccess = (
  payload: RequestSectionComboOneSuccessPayload
): RequestSectionComboOneSuccessType => {
  return {
    type: REQUEST_SECTION_COMBO_ONE_SUCCESS,
    payload
  }
}

export const requestSectionComboOneFailed = (
  payload: RequestSectionComboOneFailedPayload
): RequestSectionComboOneFailedType => {
  return {
    type: REQUEST_SECTION_COMBO_ONE_FAILED,
    payload
  }
}




export const requestSectionComboTwo = (
  payload: RequestSectionComboBodyGet
): RequestSectionComboTwo => {
  return {
    type: REQUEST_SECTION_COMBO_TWO,
    payload
  }
}

export const requestSectionComboTwoSuccess = (
  payload: RequestSectionComboTwoSuccessPayload
): RequestSectionComboTwoSuccessType => {
  return {
    type: REQUEST_SECTION_COMBO_TWO_SUCCESS,
    payload
  }
}

export const requestSectionComboTwoFailed = (
  payload: RequestSectionComboTwoFailedPayload
): RequestSectionComboTwoFailedType => {
  return {
    type: REQUEST_SECTION_COMBO_TWO_FAILED,
    payload
  }
}




export const requestSectionComboThree = (
  payload: RequestSectionComboBodyGet
): RequestSectionComboThree => {
  return {
    type: REQUEST_SECTION_COMBO_THREE,
    payload
  }
}

export const requestSectionComboThreeSuccess = (
  payload: RequestSectionComboThreeSuccessPayload
): RequestSectionComboThreeSuccessType => {
  return {
    type: REQUEST_SECTION_COMBO_THREE_SUCCESS,
    payload
  }
}

export const requestSectionComboThreeFailed = (
  payload: RequestSectionComboThreeFailedPayload
): RequestSectionComboThreeFailedType => {
  return {
    type: REQUEST_SECTION_COMBO_THREE_FAILED,
    payload
  }
}




export const requestSectionComboFour = (
  payload: RequestSectionComboBodyGet
): RequestSectionComboFour => {
  return {
    type: REQUEST_SECTION_COMBO_FOUR,
    payload
  }
}

export const requestSectionComboFourSuccess = (
  payload: RequestSectionComboFourSuccessPayload
): RequestSectionComboFourSuccessType => {
  return {
    type: REQUEST_SECTION_COMBO_FOUR_SUCCESS,
    payload
  }
}

export const requestSectionComboFourFailed = (
  payload: RequestSectionComboFourFailedPayload
): RequestSectionComboFourFailedType => {
  return {
    type: REQUEST_SECTION_COMBO_FOUR_FAILED,
    payload
  }
}

export const requestPodcastHomeData = (
): RequestPodcastHomeType => {
  return {
    type: REQUEST_PODCAST_HOME_DATA,
  }
}

export const requestPodcastHomeSuccess = (
  payload: PodcastHomeSuccessPayload
): PodcastHomeSuccessType => {
  return {
    type: REQUEST_PODCAST_HOME_DATA_SUCCESS,
    payload
  }
}

export const requestPodcastHomeFailed = (
  payload: PodcastHomeFailedPayload
): PodcastHomeFailedType => {
  return {
    type: REQUEST_PODCAST_HOME_DATA_FAILED,
    payload
  }
}

export const requestCoverageBlock = () => {
  return {
    type: REQUEST_COVERAGE_BLOCK
  }
}

export const requestCoverageBlockSuccess = (
  payload: RequestCoverageBlockSuccessPayloadType
): RequestCoverageBlockSuccessType => {
  return {
    type: REQUEST_COVERAGE_BLOCK_SUCCESS,
    payload
  }
}

export const requestSectionComboFive = (
  payload: RequestSectionComboBodyGet
): RequestSectionComboFive => {
  return {
    type: REQUEST_SECTION_COMBO_FIVE,
    payload
  }
}

export const requestSectionComboFiveSuccess = (
  payload: RequestSectionComboFiveSuccessPayload
): RequestSectionComboFiveSuccessType => {
  return {
    type: REQUEST_SECTION_COMBO_FIVE_SUCCESS,
    payload
  }
}

export const requestEditorsChoiceData = (
): RequestEditorsChoiceType => {
  return {
    type: REQUEST_EDITORS_CHOICE_DATA,
  }
}

export const requestEditorsChoiceSuccess = (
  payload: EditorsChoiceSuccessPayload
): EditorsChoiceSuccessType => {
  return {
    type: REQUEST_EDITORS_CHOICE_DATA_SUCCESS,
    payload
  }
}

export const requestSpotlightData = (
): RequestSpotlightType => {
  return {
    type: REQUEST_SPOTLIGHT_COMBO,
  }
}

export const requestSpotlightSuccess = (
  payload: SpotlightSuccessPayload
): SpotlightSuccessType => {
  return {
    type: REQUEST_SPOTLIGHT_COMBO_SUCCESS,
    payload
  }
}

export const requestSpotlightFailed = (
  payload: SpotlightFailedPayload
): SpotlightFailedType => {
  return {
    type: REQUEST_SPOTLIGHT_COMBO_FAILED,
    payload
  }
}

export const requestSpotlightArticleSection = (
  payload: SpotlightArticleSectionBodyGet
): RequestSpotlightArticleSectionType => {
  return {
    type: REQUEST_SPOTLIGHT_ARTICLE_SECTION_DATA,
    payload
  }
}

export const requestSpotlightArticleSectionSuccess = (
  payload: SpotlightArticleSectionSuccessPayload,
): SpotlightArticleSectionSuccessType => {
  return {
    type: REQUEST_SPOTLIGHT_ARTICLE_SECTION_DATA_SUCCESS,
    payload,
  };
};

export const requestSpotlightArticleSectionFailed = (
  payload: SpotlightArticleSectionFailedPayload,
): SpotlightArticleSectionFailedType => {
  return {
    type: REQUEST_SPOTLIGHT_ARTICLE_SECTION_DATA_FAILED,
    payload,
  };
};

export const requestInfoGraphicBlock = () => {
  return {
    type: REQUEST_INFO_GRAPHIC_BLOCK
  }
}

export const requestInfoGraphicBlockSuccess = (
  payload: RequestInfoGraphicBlockSuccessPayloadType
): RequestInfoGraphicBlockSuccessType => {
  return {
    type: REQUEST_INFO_GRAPHIC_BLOCK_SUCCESS,
    payload
  }
}

export const requestArchivedArticleSection = () => {
  return {
    type: REQUEST_ARCHIVED_ARTICLE_DATA
  }
}

export const requestArchivedArticleSectionSuccess = (
  payload: RequestArchivedArticleSectionSuccessPayloadType
): RequestArchivedArticleSectionSuccessType => {
  return {
    type: REQUEST_ARCHIVED_ARTICLE_DATA_SUCCESS,
    payload
  }
}

export const requestUsElectionsSection = () => {
  return {
    type: REQUEST_US_ELECTION_DATA
  }
}

export const requestUsElectionsSectionSuccess = (
  payload: RequestNodeListSectionSuccessPayloadType
): RequestUsElectionsSectionSuccessType => {
  return {
    type: REQUEST_US_ELECTION_DATA_SUCCESS,
    payload
  }
}

export const requestUsElectionsSectionFailed = (
  payload: RequestNodeListSectionFailedPayload
): RequestUsElectionsSectionFailedType => {
  return {
    type: REQUEST_US_ELECTION_DATA_FAILED,
    payload
  }
}

export const requestContestantsSection = () => {
  return {
    type: REQUEST_CONTESTANTS_DATA
  }
}

export const requestContestantsSectionSuccess = (
  payload: RequestNodeListSectionSuccessPayloadType
): RequestContestantsSectionSuccessType => {
  return {
    type: REQUEST_CONTESTANTS_DATA_SUCCESS,
    payload
  }
}

export const requestContestantsSectionFailed = (
  payload: RequestNodeListSectionFailedPayload
): RequestContestantsSectionFailedType => {
  return {
    type: REQUEST_CONTESTANTS_DATA_FAILED,
    payload
  }
}

export const requestCoverBlockFailed = (
  payload: RequestCoverageBlockFailedPayload
): RequestCoverageBlockFailedType => {
  return {
    type: REQUEST_COVERAGE_BLOCK_FAILED,
    payload
  }
}

export const requestSectionComboFiveFailed = (
  payload: RequestSectionComboFiveFailedPayload
): RequestSectionComboFiveFailedType => {
  return {
    type: REQUEST_SECTION_COMBO_FIVE_FAILED,
    payload
  }
}


export const requestFeatureArticleBlock = () => {
  return {
    type: REQUEST_FEATURED_ARTICLE_BLOCK
  }
}

export const requestFeatureArticleBlockSuccess = (
  payload: RequestFeaturedBlockSuccessPayloadType
): RequestFeaturedBlockSuccessType => {
  return {
    type: REQUEST_FEATURED_ARTICLE_BLOCK_SUCCESS,
    payload
  }
}

export const requestSectionComboSix = (
  payload: RequestSectionComboBodyGet
): RequestSectionComboSix => {
  return {
    type: REQUEST_SECTION_COMBO_SIX,
    payload
  }
}

export const requestSectionComboSixSuccess = (
  payload: RequestSectionComboSixSuccessPayload
): RequestSectionComboSixSuccessType => {
  return {
    type: REQUEST_SECTION_COMBO_SIX_SUCCESS,
    payload
  }
}

export const requestFeatureArticleBlockFailed = (
  payload: RequestFeaturedBlockFailedPayload
): RequestFeaturedBlockFailedType => {
  return {
    type: REQUEST_FEATURED_ARTICLE_BLOCK_FAILED,
    payload
  }
}

export const requestSectionComboSixFailed = (
  payload: RequestSectionComboSixFailedPayload
): RequestSectionComboSixFailedType => {
  return {
    type: REQUEST_SECTION_COMBO_SIX_FAILED,
    payload
  }
}


export const requestHorizontalArticleBlock = () => {
  return {
    type: REQUEST_HORIZONTAL_ARTICLE_BLOCK
  }
}

export const requestHorizontalArticleBlockSuccess = (
  payload: RequestHorizontalBlockSuccessPayloadType
): RequestHorizontalBlockSuccessType => {
  return {
    type: REQUEST_HORIZONTAL_ARTICLE_SUCCESS,
    payload
  }
}

export const requestSectionComboSeven = (
  payload: RequestSectionComboBodyGet
): RequestSectionComboSeven => {
  return {
    type: REQUEST_SECTION_COMBO_SEVEN,
    payload
  }
}

export const requestSectionComboSevenSuccess = (
  payload: RequestSectionComboSevenSuccessPayload
): RequestSectionComboSevenSuccessType => {
  return {
    type: REQUEST_SECTION_COMBO_SEVEN_SUCCESS,
    payload
  }
}

export const requestSectionComboEight = (
  payload: RequestSectionComboBodyGet
): RequestSectionComboEight => {
  return {
    type: REQUEST_SECTION_COMBO_EIGHT,
    payload
  }
}

export const requestSectionComboEightSuccess = (
  payload: RequestSectionComboEightSuccessPayload
): RequestSectionComboEightSuccessType => {
  return {
    type: REQUEST_SECTION_COMBO_EIGHT_SUCCESS,
    payload
  }
}

export const requestHorizontalArticleBlockFailed = (
  payload: RequestHorizontalBlockFailedPayload
): RequestHorizontalBlockFailedType => {
  return {
    type: REQUEST_HORIZONTAL_ARTICLE_FAILED,
    payload
  }
}

export const requestSectionComboSevenFailed = (
  payload: RequestSectionComboSevenFailedPayload
): RequestSectionComboSevenFailedType => {
  return {
    type: REQUEST_SECTION_COMBO_SEVEN_FAILED,
    payload
  }
}

export const requestSectionComboEightFailed = (
  payload: RequestSectionComboEightFailedPayload
): RequestSectionComboEightFailedType => {
  return {
    type: REQUEST_SECTION_COMBO_EIGHT_FAILED,
    payload
  }
}

export const requestEditorsChoiceFailed = (
  payload: EditorsChoiceFailedPayload
): EditorsChoiceFailedType => {
  return {
    type: REQUEST_EDITORS_CHOICE_DATA_FAILED,
    payload
  }
}

export const requestInfoGraphicBlockFailed = (
  payload: RequestInfoGraphicBlockFailedPayload
): RequestInfoGraphicBlockFailedType => {
  return {
    type: REQUEST_INFO_GRAPHIC_BLOCK_FAILED,
    payload
  }
}

export const requestArchivedArticleSectionFailed = (
  payload: RequestArchivedArticleSectionFailedPayload
): RequestArchivedArticleSectionFailedType => {
  return {
    type: REQUEST_ARCHIVED_ARTICLE_DATA_FAILED,
    payload
  }
}

export const latestTabActions = {
  requestTickerAndHero,
  requestTickerAndHeroSuccess,
  requestTickerAndHeroFailed,
  requestHeroListTopList,
  requestHeroListTopListSuccess,
  requestHeroListTopListFailed,
  requestOpinionFailed,
  requestOpinionList,
  requestOpinionSuccess,
  requestSectionComboOne,
  requestSectionComboOneSuccess,
  requestSectionComboOneFailed,
  requestSectionComboTwo,
  requestSectionComboTwoSuccess,
  requestSectionComboTwoFailed,
  requestSectionComboThree,
  requestSectionComboThreeSuccess,
  requestSectionComboThreeFailed,
  requestSectionComboFour,
  requestSectionComboFourSuccess,
  requestSectionComboFourFailed,
  requestPodcastHomeData,
  requestPodcastHomeSuccess,
  requestPodcastHomeFailed,
  requestCoverageBlock,
  requestCoverageBlockSuccess,
  requestCoverBlockFailed,
  requestFeatureArticleBlock,
  requestFeatureArticleBlockSuccess,
  requestFeatureArticleBlockFailed,
  requestHorizontalArticleBlock,
  requestHorizontalArticleBlockSuccess,
  requestHorizontalArticleBlockFailed,
  requestSectionComboFive,
  requestSectionComboFiveSuccess,
  requestSectionComboFiveFailed,
  requestSectionComboSix,
  requestSectionComboSixSuccess,
  requestSectionComboSixFailed,
  requestSectionComboSeven,
  requestSectionComboSevenSuccess,
  requestSectionComboSevenFailed,
  requestSectionComboEight,
  requestSectionComboEightSuccess,
  requestSectionComboEightFailed,
  requestEditorsChoiceData,
  requestEditorsChoiceSuccess,
  requestEditorsChoiceFailed,
  requestSpotlightData,
  requestSpotlightSuccess,
  requestSpotlightFailed,
  requestSpotlightArticleSection,
  requestSpotlightArticleSectionSuccess,
  requestSpotlightArticleSectionFailed,
  requestInfoGraphicBlock,
  requestInfoGraphicBlockSuccess,
  requestInfoGraphicBlockFailed,
  requestArchivedArticleSection,
  requestArchivedArticleSectionSuccess,
  requestArchivedArticleSectionFailed,
  requestUsElectionsSection,
  requestUsElectionsSectionSuccess,
  requestUsElectionsSectionFailed,
  requestContestantsSection,
  requestContestantsSectionSuccess,
  requestContestantsSectionFailed
};
