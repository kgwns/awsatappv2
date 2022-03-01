
import {
  FETCH_TOP_MENU_SUCCESS,
  FETCH_TOP_MENU_ERROR,
  FETCH_TOP_MENU,
} from '../actionTypes';
import { fetchTopMenuFailed, fetchTopMenuSuccess, fetchTopMenu } from '../action';

describe('<TopMenuAction', () => {

  const errorMessage = 'This is sample error'

  it('Fetch TopMenu Request', () => {
      const result = fetchTopMenu()
      expect(result.type).toEqual(FETCH_TOP_MENU)
  })

  it('Fetch TopMenu Request success', () => {
      const result = fetchTopMenuSuccess({ topMenuData: [] })
      expect(result.type).toEqual(FETCH_TOP_MENU_SUCCESS)
      expect(result.payload.topMenuData).toEqual([])
  })

  it('Fetch TopMEnu Request failed', () => {
      const result = fetchTopMenuFailed({ error: errorMessage })
      expect(result.type).toEqual(FETCH_TOP_MENU_ERROR)
      expect(result.payload.error).toEqual(errorMessage)
  })

})