import { FavouriteOpinionsBodyGet } from '../types';
import {
    FETCH_FAVOURITE_OPINIONS,
    FETCH_FAVOURITE_OPINIONS_ERROR,
    FETCH_FAVOURITE_OPINIONS_SUCCESS,
    FETCH_FAVOURITE_ARTICLES,
    FETCH_FAVOURITE_ARTICLES_SUCCESS,
    FETCH_FAVOURITE_ARTICLES_ERROR,
    EMPTY_ALL_DATA,
  } from '../actionTypes';
  import {
      fetchFavouriteOpinionsFailed,
      fetchFavouriteOpinionsSuccess,
      fetchFavouriteOpinions,
      fetchFavouriteArticles,
      fetchFavouriteArticlesSuccess,
      fetchFavouriteArticlesFailed,
      emptyData
    } from '../action';
describe('<OpinionsAction', () => {

    const errorMessage = 'This is sample error'
    const page = 0
    const payload: FavouriteOpinionsBodyGet = {
        page: 0
      }
    it('Fetch Opinions', () => {
        const result = fetchFavouriteOpinions(payload)
        expect(result.type).toEqual(FETCH_FAVOURITE_OPINIONS)
        expect(result.payload.page).toEqual(page)
    })

    it('Fetch Opinions success', () => {
        const result = fetchFavouriteOpinionsSuccess({opinionListData: []})
        expect(result.type).toEqual(FETCH_FAVOURITE_OPINIONS_SUCCESS)
        expect(result.payload.opinionListData).toEqual([])
    })

    it('Fetch Opinions failed', () => {
        const result = fetchFavouriteOpinionsFailed({error: errorMessage})
        expect(result.type).toEqual(FETCH_FAVOURITE_OPINIONS_ERROR)
        expect(result.payload.error).toEqual(errorMessage)
    })

    it('Fetch Articles', () => {
        const result = fetchFavouriteArticles(payload)
        expect(result.type).toEqual(FETCH_FAVOURITE_ARTICLES)
        expect(result.payload.page).toEqual(page)
    })

    it('Fetch Articles success', () => {
        const result = fetchFavouriteArticlesSuccess({favouriteArticlesData: []})
        expect(result.type).toEqual(FETCH_FAVOURITE_ARTICLES_SUCCESS)
        expect(result.payload.favouriteArticlesData).toEqual([])
    })

    it('Fetch Articles failed', () => {
        const result = fetchFavouriteArticlesFailed({error: errorMessage})
        expect(result.type).toEqual(FETCH_FAVOURITE_ARTICLES_ERROR)
        expect(result.payload.error).toEqual(errorMessage)
    })

    it('Empty All Data', () => {
        const result = emptyData()
        expect(result.type).toEqual(EMPTY_ALL_DATA)
        expect([]).toEqual([])
    })

})