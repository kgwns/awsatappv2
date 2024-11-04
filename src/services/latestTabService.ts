import { BASE_URL, HOME_OPINIONS_GET } from 'src/services/apiUrls';
import { getApiRequest, getCacheApiRequest } from 'src/services/api';
import { LATEST_ARTICLE_GET, SECTION_COMBO, PODCAST_HOME,
  COVERAGE_ARTICLE_END_POINT,
  FEATURED_ARTICLE_ENDPOINT,
  HORIZONTAL_ARTICLE_END_POINT,
  EDITORS_CHOICE,
  SPOTLIGHT_COMBO,
  ARTICLE_SECTION_GET,
  INFO_GRAPHIC_BLOCK,
  ARCHIVED_ARTICLE_ENDPOINT,
  NODE_LIST_ENDPOINT,
} from './apiEndPoints';
import { LatestArticleBodyGet, RequestSectionComboBodyGet, SpotlightArticleSectionBodyGet, payloadType } from 'src/redux/latestNews/types';
import { isArray, isIOS, joinArray } from 'src/shared/utils';
import { NativeModules } from 'react-native';

const getSectionComboUrl = (body: RequestSectionComboBodyGet) => {
  let url = `${BASE_URL}${SECTION_COMBO}`
  if (typeof(body.id) == 'string') {
    url = `${BASE_URL}${body.id}`
  } else {
    if (isArray(body.id)) {
      url += '/' + joinArray(body.id, '+');
    } else {
      url += `/${body.id}`;
    }
  }
  return url
}

export const requestLatestArticle = async (body: LatestArticleBodyGet) => {
  try {
    return await getApiRequest(
      `${BASE_URL}${LATEST_ARTICLE_GET}?items_per_page=${body.items_per_page}&page=${body.page}&offset=${body.offset}`,
    );
  } catch (error) {
    console.log('latestTabService - requestLatestArticle - error', error)
    throw error;
  }
};

export const requestSectionCombo = async(body: RequestSectionComboBodyGet) => {
  const query = body.items_per_page ? `/?item per page=${body.items_per_page}&page=${body.page}` : '/'
  try {
    return await getApiRequest(
      `${getSectionComboUrl(body)}${query}`
    );
  } catch (error) {
    console.log('latestTabService - requestSectionCombo - error', error)
    throw error;
  }
}

export const writerOpinionApi = async (body: LatestArticleBodyGet) => {
  try {
    return await getApiRequest(
      `${BASE_URL}${HOME_OPINIONS_GET}?items_per_page=${body.items_per_page}&page=${body.page}&offset=${body.offset}`
    );
  } catch (error) {
    console.log('latestTabService - writerOpinionSortApi - error', error)
    throw error;
  }
};


export const podcastHomeApi = async () => {
  try {
    return await getApiRequest(
      `${BASE_URL}${PODCAST_HOME}`,
    );
  } catch (error) {
    console.log('latestTabService - podcastHomeApi - error', error)
    throw error;
  }
};

export const mainCoverageBlockApi = async () => {
  try {
    const response: payloadType = await getApiRequest(
      `${BASE_URL}${COVERAGE_ARTICLE_END_POINT}`,
    );

    if (isIOS) {
      //Need to sync topStories response with Native modules so that it can be used in Apple Watch.
      NativeModules.RNTopNewsContentBridge.syncTopStories(response)
    }

    return response;
  } catch (error) {
    console.log('latestTabService - mainCoverageBlockApi - error', error)
    throw error;
  }
};

export const mainFeaturedArticleApi = async () => {
  try {
    return await getApiRequest(
      `${BASE_URL}${FEATURED_ARTICLE_ENDPOINT}`,
    );
  } catch (error) {
    console.log('latestTabService - mainFeaturedArticleApi - error', error)
    throw error;
  }
};

export const mainHorizontalArticleApi = async () => {
  try {
    return await getApiRequest(
      `${BASE_URL}${HORIZONTAL_ARTICLE_END_POINT}`,
    );
  } catch (error) {
    console.log('latestTabService - mainHorizontalArticleApi - error', error)
    throw error;
  }
};

export const editorsChoiceApi = async () => {
  try {
    return await getApiRequest(
      `${BASE_URL}${EDITORS_CHOICE}`
    );
  } catch (error) {
    console.log('latestTabService - editorsChoiceApi - error', error)
    throw error;
  }
}

export const spotlightApi = async () => {
  try {
    return await getApiRequest(
      `${BASE_URL}${SPOTLIGHT_COMBO}`
    );
  } catch (error) {
    console.log('latestTabService - spotlightApi - error', error)
    throw error;
  }
}

export const requestSpotlightArticleSection = async (body: SpotlightArticleSectionBodyGet) => {
  try {
    return await getCacheApiRequest(
      `${BASE_URL}${ARTICLE_SECTION_GET}${body.id}?page=${body.page}&items_per_page=${body.items_per_page}`,
    );
  } catch (error) {
    console.log('latestTabService - requestSpotlightArticleSection - error', error)
    throw error;
  }
};

export const infoGraphicBlockApi = async () => {
  try {
    return await getCacheApiRequest(
      `${BASE_URL}${INFO_GRAPHIC_BLOCK}`,
    );
  } catch (error) {
    console.log('latestTabService - infoGraphicBlockApi - error', error)
    throw error;
  }
};

export const archivedArticleApi = async () => {
  try {
    return await getCacheApiRequest(
      `${BASE_URL}${ARCHIVED_ARTICLE_ENDPOINT}`,
    );
  } catch (error) {
    console.log('latestTabService - archivedArticleApi - error', error)
    throw error;
  }
};

export const nodeListApi = async (id: string) => {
  try {
    return await getCacheApiRequest(
      `${BASE_URL}${NODE_LIST_ENDPOINT}${id}`,
    );
  } catch (error) {
    console.log('latestTabService - nodeListApi - error', error)
    throw error;
  }
};
