import {contentForYouActions} from '../action';
import {FETCH_FAVOURITE_OPINIONS, FETCH_FAVOURITE_ARTICLES, EMPTY_ALL_DATA, FETCH_FAVOURITE_OPINIONS_SUCCESS, FETCH_FAVOURITE_ARTICLES_SUCCESS} from '../actionTypes';
import contentForYouReducer from '../reducer';
import {FavouriteListState} from '../types';

describe('opinions reducer', () => {
  let initialState: FavouriteListState;

  beforeEach(() => {
    initialState = {
      isLoading: false,
      favouriteOpinionData: {rows: [
        {
          nid: '2',
          tagName: 'example',
          image: 'abc',
          tagStyle: {marginLeft: 20},
          tagLabelType: "p3",
          field_image: 'abc',
          field_new_photo: 'abc',
          flagColor: '#2C8A82',
          barColor: '#2C8A82',
          field_news_categories_export: [
            {
              id: 'example',
              title: 'example',
              url: 'example',
              bundle: 'example',
              name: 'example',
            },
            {
              id: 'example',
              title: 'example',
              url: 'example',
              bundle: 'example',
              name: 'example',
            }
          ],
          field_publication_date_export: '2021-05-20T20:05:45+0000',
          created_export: '2021-05-20T20:05:45+0000',
          author_resource: 'author',
          type: 'type',
        }
      ], pager: {current_page: 0, items_per_page: ''}},
      error: '',
      favouriteArticlesData: {rows: [
        {
          nid: '2',
          tagName: 'example',
          image: 'abc',
          tagStyle: {marginLeft: 20},
          tagLabelType: "p3",
          field_image: 'abc',
          field_new_photo: 'abc',
          flagColor: '#2C8A82',
          barColor: '#2C8A82',
          field_news_categories_export: [
            {
              id: 'example',
              title: 'example',
              url: 'example',
              bundle: 'example',
              name: 'example',
            },
            {
              id: 'example',
              title: 'example',
              url: 'example',
              bundle: 'example',
              name: 'example',
            }
          ],
          field_publication_date_export: '2021-05-20T20:05:45+0000',
          created_export: '2021-05-20T20:05:45+0000',
          author_resource: 'author',
          type: 'type',
        }
      ], pager: {current_page: 0, items_per_page: ''}},
      articleError: '',
      isArticleLoading: false,
    };
  });

  test('fetchOpinionsFailure', () => {
    const testError = 'some-error';
    initialState.isLoading = true;
    const nextState = contentForYouReducer(
      initialState,
      contentForYouActions.fetchFavouriteOpinionsFailed({
        error: testError,
      }),
    );

    expect(nextState.isLoading).toBeFalsy();
    expect(nextState.error).toEqual(testError);
  });

  test('Check loading state when contentForYouReducer request API', () => {
    const nextState = contentForYouReducer(initialState, {
      type: FETCH_FAVOURITE_OPINIONS,
      payload: {page: 1},
    });
    expect(nextState.isLoading).toBe(true);
  });

  test('fetchArticlesFailure', () => {
    const testError = 'some-error';
    initialState.isArticleLoading = true;
    const nextState = contentForYouReducer(
      initialState,
      contentForYouActions.fetchFavouriteArticlesFailed({
        articleError: testError,
      }),
    );

    expect(nextState.isArticleLoading).toBeFalsy();
    expect(nextState.articleError).toEqual(testError);
  });

  test('Check loading state when articlesReducer request API', () => {
    const nextState = contentForYouReducer(initialState, {
      type: FETCH_FAVOURITE_ARTICLES,
      payload: {page: 1},
    });
    expect(nextState.isArticleLoading).toBe(true);
  });

  test("check when FETCH_FAVOURITE_OPINIONS_SUCCESS",() => {
    const nextState = contentForYouReducer(initialState, {
      type: FETCH_FAVOURITE_OPINIONS_SUCCESS,
      payload: {opinionListData:{rows:[{response:{data:'data1'}}],pager:{current_page:'10',items_per_page:'1'}}}
    });
    expect(nextState.isArticleLoading).toBe(false);
    expect(nextState.favouriteOpinionData).toEqual({pager: {current_page: "10", items_per_page: "1"}, rows: [{response: {data: "data1"}}]})
  });

  test("check when FETCH_FAVOURITE_ARTICLES_SUCCESS",() => {
    const nextState = contentForYouReducer(initialState, {
      type: FETCH_FAVOURITE_ARTICLES_SUCCESS,
      payload: {favouriteArticlesData:{rows:[{response:{data:'data1'}}],pager:{current_page:'10',items_per_page:'1'}}}
    })
    expect(nextState.isArticleLoading).toBe(false);
    expect(nextState.favouriteArticlesData).toEqual({pager: {current_page: "10", items_per_page: "1"}, rows: [{response: {data: "data1"}}]})
  });

  test('empty state', () => {
    const nextState = contentForYouReducer(initialState, {
      type: EMPTY_ALL_DATA,
    });
    expect(nextState.isArticleLoading).toBe(false);
  });

});

describe('opinions reducer', () => {
  let initialState: FavouriteListState;

  beforeEach(() => {
    initialState = {
      isLoading: false,
      favouriteOpinionData: {rows: [], pager: {current_page: 0, items_per_page: ''}},
      error: '',
      favouriteArticlesData: {rows: [], pager: {current_page: 0, items_per_page: ''}},
      articleError: '',
      isArticleLoading: false,
    };
  });

  test('fetchOpinionsSuccess', () => {
    const testData = [{}];
    initialState.isLoading = true;
    const nextState = contentForYouReducer(
      initialState,
      contentForYouActions.fetchFavouriteOpinionsSuccess({
        opinionListData: testData,
      }),
    );

    expect(nextState.isLoading).toBeFalsy();
  });

  test('fetchOpinionsFailure', () => {
    const testError = 'some-error';
    initialState.isLoading = true;
    const nextState = contentForYouReducer(
      initialState,
      contentForYouActions.fetchFavouriteOpinionsFailed({
        error: testError,
      }),
    );

    expect(nextState.isLoading).toBeFalsy();
    expect(nextState.error).toEqual(testError);
  });

  test('Check loading state when contentForYouReducer request API', () => {
    const nextState = contentForYouReducer(initialState, {
      type: FETCH_FAVOURITE_OPINIONS,
      payload: {page: 1},
    });
    expect(nextState.isLoading).toBe(true);
  });

  test('fetchArticlesSuccess', () => {
    const testData = [{}];
    initialState.isArticleLoading = true;
    const nextState = contentForYouReducer(
      initialState,
      contentForYouActions.fetchFavouriteArticlesSuccess({
        favouriteArticlesData: testData,
      }),
    );

    expect(nextState.isArticleLoading).toBeFalsy();
  });

  test('fetchArticlesFailure', () => {
    const testError = 'some-error';
    initialState.isArticleLoading = true;
    const nextState = contentForYouReducer(
      initialState,
      contentForYouActions.fetchFavouriteArticlesFailed({
        articleError: testError,
      }),
    );

    expect(nextState.isArticleLoading).toBeFalsy();
    expect(nextState.articleError).toEqual(testError);
  });

  test('Check loading state when articlesReducer request API', () => {
    const nextState = contentForYouReducer(initialState, {
      type: FETCH_FAVOURITE_ARTICLES,
      payload: {page: 1},
    });
    expect(nextState.isArticleLoading).toBe(true);
  });

  test('empty state', () => {
    const nextState = contentForYouReducer(initialState, {
      type: EMPTY_ALL_DATA,
    });
    expect(nextState.isArticleLoading).toBe(false);
  });

  test('render default state', () => {
    const nextState = contentForYouReducer(initialState, {
      type: 'state' as any,
    });
    expect(nextState.isArticleLoading).toBe(false);
  });

});