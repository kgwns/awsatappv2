import {opinionArticleDetailAction} from '../action';
import {REQUEST_OPINION_ARTICLE_DETAIL,REQUEST_RELATED_OPINION} from '../actionTypes';
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
});
