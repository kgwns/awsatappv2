import {opinionArticleDetailAction} from '../action';
import {EMPTY_OPINION_ARTICLE_DETAIL, EMPTY_RELATED_OPINION_DATA, REQUEST_NARRATED_OPINION_ARTICLE, REQUEST_NARRATED_OPINION_ARTICLE_FAILED, REQUEST_NARRATED_OPINION_ARTICLE_SUCCESS, REQUEST_OPINION_ARTICLE_DETAIL,REQUEST_RELATED_OPINION, REQUEST_RELATED_OPINION_FAILED, REQUEST_RELATED_OPINION_SUCCESS} from '../actionTypes';
import opinionArticleDetail from '../reducer';
import {OpinionArticleDetailState} from '../types';

describe('opinions reducer', () => {
  let initialState: OpinionArticleDetailState;

  beforeEach(() => {
    initialState = {
      isLoading: true,
      error: '',
      opinionArticleDetailData: [],
      isLoadingRelatedOpinion:true,
      relatedOpinionError: '',
      relatedOpinionListData: {rows: [], pager: {current_page: 0, items_per_page: ''}},
      mediaData:{}
    };
  });

  test('requestOpinionArticleDetailSuccess', () => {
    const testData = [{}];
    initialState.isLoading = true;
    const nextState = opinionArticleDetail(
      initialState,
      opinionArticleDetailAction.requestOpinionArticleDetailSuccess({
        opinionArticleDetailData: testData,
      }),
    );

    expect(nextState.isLoading).toBeFalsy();
  });

  test('requestOpinionArticleDetailFailed', () => {
    const testError = 'some-error';
    initialState.isLoading = true;
    const nextState = opinionArticleDetail(
      initialState,
      opinionArticleDetailAction.requestOpinionArticleDetailFailed({
        error: testError,
      }),
    );

    expect(nextState.isLoading).toBeFalsy();
    expect(nextState.error).toEqual(testError);
  });

  test('Check loading state when opinionArticleDetail request API', () => {
    const nextState = opinionArticleDetail(initialState, {
      type: REQUEST_OPINION_ARTICLE_DETAIL,
      payload: {nid: 123},
    });
    expect(nextState.isLoading).toBe(true);
  });
  
  test('fetchRelatedOpinionFailed', () => {
    const testError = '';
    initialState.isLoading = true;
    const nextState = opinionArticleDetail(
      initialState,
      opinionArticleDetailAction.fetchRelatedOpinionFailed({
        error: testError,
      }),
    );

    expect(nextState.isLoading).toBeTruthy;
    expect(nextState.error).toEqual(testError);
  });

  test('Check loading state when fetchRelatedopinion request API', () => {
    const nextState = opinionArticleDetail(initialState, {
      type: REQUEST_RELATED_OPINION,
      payload: {page: 0},
    });
    expect(nextState.isLoading).toBe(true);
  });

  test('Check loading state when get selected news letters REQUEST_RELATED_OPINION_FAILED request API', () => {
    const nextState = opinionArticleDetail(initialState, {
      type: REQUEST_RELATED_OPINION_FAILED,
      payload: {error: 'sample error'},
    });
    expect(nextState.isLoading).toBe(true);
  });

  test('Check loading state when REQUEST_NARRATED_OPINION_ARTICLE request API', () => {
    const nextState = opinionArticleDetail(initialState, {
      type: REQUEST_NARRATED_OPINION_ARTICLE,
      payload: {jwPlayerID: '123'},
    });
    expect(nextState.isLoading).toBe(false);
  });

  test('Check loading state when get selected news letters REQUEST_NARRATED_OPINION_ARTICLE_SUCCESS request API', () => {
    const nextState = opinionArticleDetail(initialState, {
      type: REQUEST_NARRATED_OPINION_ARTICLE_SUCCESS,
      payload: {mediaData: {}},
    });
    expect(nextState.isLoading).toBe(false);
  });

  test('Check loading state when get selected news letters REQUEST_NARRATED_OPINION_ARTICLE_FAILED request API', () => {
    const nextState = opinionArticleDetail(initialState, {
      type: REQUEST_NARRATED_OPINION_ARTICLE_FAILED,
      payload: {error: 'sample error'},
    });
    expect(nextState.isLoading).toBe(false);
  });

  test('Check loading state when EMPTY_RELATED_OPINION_DATA request API', () => {
    const nextState = opinionArticleDetail(initialState, {
      type: EMPTY_RELATED_OPINION_DATA,
    });
    expect(nextState.isLoading).toBe(true);
  });

  test('Check loading state when EMPTY_OPINION_ARTICLE_DETAIL request API', () => {
    const nextState = opinionArticleDetail(initialState, {
      type: EMPTY_OPINION_ARTICLE_DETAIL,
    });
    expect(nextState.isLoading).toBe(true);
  });

  test('Check loading state when REQUEST_RELATED_OPINION_SUCCESS request API', () => {
    const nextState = opinionArticleDetail(initialState, {
      type: REQUEST_RELATED_OPINION_SUCCESS,
      payload: { relatedOpinionListData: {rows: [], pager: {current_page: 0, items_per_page: ''}} }
    });
    expect(nextState.isLoading).toBe(true);
  });
});
