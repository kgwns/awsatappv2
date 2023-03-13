import { store } from "src/redux/store"
import { BaseUrlConfigType } from "src/redux/appCommon/types";


//BaseURL Config
export const BASE_URL_CONFIG = 'https://awsatapi.srpcdigital.com/api/ums/v1/cfg';

//PRODUCTION ENVIRONMENT
export const PROD_BASE_URL = 'https://awsatapp.srpcdigital.com/';

//DEV ENVIRONMENT
export const DEBUG_BASE_URL = 'https://devaawsatar.srpcdigital.com/';

export const AAA_UMS_BASE_URL = 'https://awsatapi.srpcdigital.com/';
export const AAA_PROFILE_IMAGE_URL = 'https://awsatapi.srpcdigital.com/storage/'

export const getBaseUrl = (): string => {
  const serverEnvironment = store.getState().appCommon?.serverEnvironment
  console.log(serverEnvironment, typeof serverEnvironment, 'serverEnvironment')
  if (serverEnvironment === 'Debug') {
    return DEBUG_BASE_URL
  }

  return PROD_BASE_URL
}

export const getBaseUrlConfig = (): BaseUrlConfigType => {
  return store.getState().appCommon?.baseUrlConfig;
}

export const BASE_URL = getBaseUrlConfig().baseUrl;


export const UMS_BASE_URL = getBaseUrlConfig().umsUrl;
export const PROFILE_IMAGE_URL = getBaseUrlConfig().profileImageUrl;
export const PODCAST_SPREAKER_URL = 'https://api.spreaker.com/v2/episodes/';
export const GET_JW_MEDIA_PLAYER_URL = 'https://cdn.jwplayer.com/v2/media/';
export const TODOS = 'todos';
export const HOME_OPINIONS_GET = '/api/v2/homeview/opinion';
export const DUMMY_IMAGE_URL = 'https://picsum.photos/200/300';

//Games
export const SUDOKU_URL = 'https://cdn-eu1.amuselabs.com/pmm/date-picker?set=srmg-awsat-sudoku-medium&embed=1&style=1&src=https%3A%2F%2Fdevaawsatar.srpcdigital.com%2Fnode%2F53'
export const CROSS_WORD_URL = 'https://cdn-eu1.amuselabs.com/pmm/date-picker?set=srmg-awsat-crossword&embed=1&style=1&src=https%3A%2F%2Fdevaawsatar.srpcdigital.com%2Fnode%2F54'

export const SUDOKU_GAME_BASE_ID_URL = 'https://cdn-eu1.amuselabs.com/pmm/sudoku?id='
export const CROSS_WORD_GAME_BASE_ID_URL = 'https://cdn-eu1.amuselabs.com/pmm/crossword?id='

//Weather
export const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/forecast/daily'
export const WEATHER_URL_VISIBILITY = 'https://api.openweathermap.org/data/2.5/weather'

//LiveNews
export const AAA_LIVE_BLOG_URL = 'https://aawsat.srpcdigital.com/livenews/';
export const LIVE_BLOG_URL = getBaseUrlConfig().liveBlogUrl;
export const SCRIBBLE_LIVE_EVENT_URL = 'https://client.scribblelive.com/api/rest/event/'
export const SCRIBBLE_LIVE_TOKEN_PARAM = '/?Token='
export const SCRIBBLE_LIVE_JSON_PARAM = '&format=Json'
//Scribble auth_token
export const SCRIBBLE_TOKEN = '0ROZff5O' // Shared by the SRMG team. Need to replace if required.

export const IMAGE_URL = getBaseUrlConfig().imageUrl;