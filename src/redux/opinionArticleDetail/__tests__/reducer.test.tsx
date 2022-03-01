import {opinionArticleDetailAction} from '../action';
import {REQUEST_OPINION_ARTICLE_DETAIL} from '../actionTypes';
import opinionArticleDetail from '../reducer';
import {OpinionArticleDetailState} from '../types';

describe('opinions reducer', () => {
  let initialState: OpinionArticleDetailState;

  beforeEach(() => {
    initialState = {
      isLoading: false,
      opinionArticleDetailData: [],
      error: '',
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
});
