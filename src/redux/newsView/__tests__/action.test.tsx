import {
    fetchHeroListFailed,
    fetchHeroListSuccess,
    fetchHeroList,
    fetchTopListSuccess,
    fetchTopListFailed,
    fetchTopList,
    fetchBottomListSuccess,
    fetchBottomListFailed,
    fetchBottomList,
    emptyAllList
} from '../action';
import {
    REQUEST_HERO_LIST_DATA,
    REQUEST_HERO_LIST_SUCCESS,
    REQUEST_HERO_LIST_FAILED,
    REQUEST_TOP_LIST_DATA,
    REQUEST_TOP_LIST_SUCCESS,
    REQUEST_TOP_LIST_FAILED,
    REQUEST_BOTTOM_LIST_DATA,
    REQUEST_BOTTOM_LIST_SUCCESS,
    REQUEST_BOTTOM_LIST_FAILED,
    EMPTY_ALL_LIST,
} from '../actionTypes';
import { NewsViewBodyGet } from 'src/redux/newsView/types';

describe('<NewsViewAction', () => {
    const payload: NewsViewBodyGet = {
        items_per_page: 10,
        page: 0,
        offset: 0,
      }
    const errorMessage = 'This is sample error'

    it('Fetch bottom List', () => {
        const result = fetchBottomList(payload)
        expect(result.type).toEqual(REQUEST_BOTTOM_LIST_DATA)
    })

    it('Fetch bottom List success', () => {
        const result = fetchBottomListSuccess({ bottomListData: [] })
        expect(result.type).toEqual(REQUEST_BOTTOM_LIST_SUCCESS)
        expect(result.payload.bottomListData).toEqual([])
    })

    it('Fetch bottom List failed', () => {
        const result = fetchBottomListFailed({ error: errorMessage })
        expect(result.type).toEqual(REQUEST_BOTTOM_LIST_FAILED)
        expect(result.payload.error).toEqual(errorMessage)
    })

    it('Fetch Top List', () => {
        const result = fetchTopList(payload)
        expect(result.type).toEqual(REQUEST_TOP_LIST_DATA)
    })

    it('Fetch Top List success', () => {
        const result = fetchTopListSuccess({ topListData: [] })
        expect(result.type).toEqual(REQUEST_TOP_LIST_SUCCESS)
        expect(result.payload.topListData).toEqual([])
    })

    it('Fetch Top List failed', () => {
        const result = fetchTopListFailed({ error: errorMessage })
        expect(result.type).toEqual(REQUEST_TOP_LIST_FAILED)
        expect(result.payload.error).toEqual(errorMessage)
    })

    it('Fetch HeroList', () => {
        const result = fetchHeroList(payload)
        expect(result.type).toEqual(REQUEST_HERO_LIST_DATA)
    })

    it('Fetch HeroList success', () => {
        const result = fetchHeroListSuccess({ heroListData: [] })
        expect(result.type).toEqual(REQUEST_HERO_LIST_SUCCESS)
        expect(result.payload.heroListData).toEqual([])
    })

    it('Fetch HeroList failed', () => {
        const result = fetchHeroListFailed({ error: errorMessage })
        expect(result.type).toEqual(REQUEST_HERO_LIST_FAILED)
        expect(result.payload.error).toEqual(errorMessage)
    })

    it('empty all list', () => {
        const result = emptyAllList()
        expect(result.type).toEqual(EMPTY_ALL_LIST)
    })
})