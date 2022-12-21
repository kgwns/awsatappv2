
import { fetchSideMenu, fetchSideMenuFailed, fetchSideMenuSuccess } from '../action';
import {
    FETCH_SIDE_MENU,
    FETCH_SIDE_MENU_SUCCESS,
    FETCH_SIDE_MENU_ERROR,
  } from '../actionTypes';

  describe('<WriterDetailAction', () => {

    it('empty Writer Data Action', () => {
        const result = fetchSideMenu()
        expect(result.type).toEqual(FETCH_SIDE_MENU)
    })

    it('empty Writer Data Action', () => {
        const result = fetchSideMenuSuccess({sideMenuData:''})
        expect(result.type).toEqual(FETCH_SIDE_MENU_SUCCESS)
    })

    it('empty Writer Data Action', () => {
        const result = fetchSideMenuFailed({error:''})
        expect(result.type).toEqual(FETCH_SIDE_MENU_ERROR)
    })
  })