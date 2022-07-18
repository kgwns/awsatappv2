import {OpinionArticleDetailBodyGet} from '../types';
import {
  EMPTY_OPINION_ARTICLE_DETAIL,
  EMPTY_RELATED_OPINION_DATA,
  REQUEST_NARRATED_OPINION_ARTICLE,
  REQUEST_NARRATED_OPINION_ARTICLE_FAILED,
  REQUEST_NARRATED_OPINION_ARTICLE_SUCCESS,
  REQUEST_OPINION_ARTICLE_DETAIL,
  REQUEST_OPINION_ARTICLE_DETAIL_FAILED,
  REQUEST_OPINION_ARTICLE_DETAIL_SUCCESS,
  REQUEST_RELATED_OPINION,
} from '../actionTypes';
import {
  emptyOpinionArticleDetailData,
  emptyRelatedOpinionDataList,
  fetchNarratedOpinion,
  fetchNarratedOpinionFailed,
  fetchNarratedOpinionSuccess,
  fetchRelatedOpinion,
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

  it('FetchRelatedOpinion', () => {
    const result = fetchRelatedOpinion({page: 2});
    expect(result.type).toEqual(REQUEST_RELATED_OPINION);
  });

  it('emptyRelatedOpinionDataList', () => {
    const result = emptyRelatedOpinionDataList();
    expect(result.type).toEqual(EMPTY_RELATED_OPINION_DATA);
  });

  it('emptyOpinionArticleDetailData', () => {
    const result = emptyOpinionArticleDetailData();
    expect(result.type).toEqual(EMPTY_OPINION_ARTICLE_DETAIL);
  });

  it('fetchNarratedOpinion', () => {
    const result = fetchNarratedOpinion({jwPlayerID: '12'});
    expect(result.type).toEqual(REQUEST_NARRATED_OPINION_ARTICLE);
  });

  it('fetchNarratedOpinionSuccess', () => {
    const result = fetchNarratedOpinionSuccess({mediaData: {}});
    expect(result.type).toEqual(REQUEST_NARRATED_OPINION_ARTICLE_SUCCESS);
  });

  it('Fetch fetchNarratedOpinionFailed failed', () => {
    const result = fetchNarratedOpinionFailed({error: errorMessage});
    expect(result.type).toEqual(REQUEST_NARRATED_OPINION_ARTICLE_FAILED);
    expect(result.payload.error).toEqual(errorMessage);
  });

});
