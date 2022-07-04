import {OpinionArticleDetailBodyGet} from '../types';
import {
  REQUEST_OPINION_ARTICLE_DETAIL,
  REQUEST_OPINION_ARTICLE_DETAIL_FAILED,
  REQUEST_OPINION_ARTICLE_DETAIL_SUCCESS,
} from '../actionTypes';
import {
  requestOpinionArticleDetail,
  requestOpinionArticleDetailFailed,
  requestOpinionArticleDetailSuccess,
} from '../action';

describe('<OpinionArticleDetailAction', () => {
  const errorMessage = 'This is sample error';
  const page = 123;
  const payload: OpinionArticleDetailBodyGet = {
    nid: 123,
  };
  it('Fetch OpinionArticleDetail', () => {
    const result = requestOpinionArticleDetail(payload);
    expect(result.type).toEqual(REQUEST_OPINION_ARTICLE_DETAIL);
    expect(result.payload.nid).toEqual(page);
  });

  it('Fetch OpinionArticleDetail success', () => {
    const result = requestOpinionArticleDetailSuccess({
      opinionArticleDetailData: [],
    });
    expect(result.type).toEqual(REQUEST_OPINION_ARTICLE_DETAIL_SUCCESS);
    expect(result.payload.opinionArticleDetailData).toEqual([]);
  });

  it('Fetch OpinionArticleDetail failed', () => {
    const result = requestOpinionArticleDetailFailed({error: errorMessage});
    expect(result.type).toEqual(REQUEST_OPINION_ARTICLE_DETAIL_FAILED);
    expect(result.payload.error).toEqual(errorMessage);
  });
});
