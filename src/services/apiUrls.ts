import { store } from "src/redux/store"
import { ServerEnvironment } from "src/redux/appCommon/types";


//PRODUCTION ENVIRONMENT
export const PROD_BASE_URL = 'https://awsatapp.srpcdigital.com/';

//DEV ENVIRONMENT
export const DEBUG_BASE_URL = 'https://devaawsatar.srpcdigital.com/';

export const getBaseUrl = (): string => {
    const serverEnvironment  = store.getState().appCommon?.serverEnvironment
    if (serverEnvironment == 'Debug') {
      return DEBUG_BASE_URL
    }

  return PROD_BASE_URL
}

export const BASE_URL = getBaseUrl();


export const UMS_BASE_URL = 'http://awsatapi.srpcdigital.com/';
export const PROFILE_IMAGE_URL = 'http://awsatapi.srpcdigital.com/storage/'
export const PODCAST_SPREAKER_URL = 'https://api.spreaker.com/v2/episodes/';
export const GET_JW_MEDIA_PLAYER_URL = 'https://cdn.jwplayer.com/v2/media/';
export const TODOS = 'todos';
export const HOME_OPINIONS_GET = '/api/v2/opinions/all'
export const DUMMY_IMAGE_URL = 'https://picsum.photos/200/300'

//Games
export const SUDOKU_URL = 'https://cdn-eu1.amuselabs.com/pmm/date-picker?set=srmg-awsat-sudoku-medium&embed=1&style=1&src=https%3A%2F%2Fdevaawsatar.srpcdigital.com%2Fnode%2F53'
export const CROSS_WORD_URL = 'https://cdn-eu1.amuselabs.com/pmm/date-picker?set=srmg-awsat-crossword&embed=1&style=1&src=https%3A%2F%2Fdevaawsatar.srpcdigital.com%2Fnode%2F54'

export const SUDOKU_GAME_BASE_ID_URL = 'https://cdn-eu1.amuselabs.com/pmm/sudoku?id='
export const CROSS_WORD_GAME_BASE_ID_URL = 'https://cdn-eu1.amuselabs.com/pmm/crossword?id='