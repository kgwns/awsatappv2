import { takeLatest } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import {  REQUEST_NARRATED_OPINION_ARTICLE, REQUEST_OPINION_ARTICLE_DETAIL, REQUEST_RELATED_OPINION } from '../actionTypes';
import opinionArticleDetailSaga, { fetchNarratedOpinion, fetchOpinionArticleDetail, fetchRelatedOpinion } from '../sagas';
import { requestOpinionArticleDetailSuccess } from '../action';
import { requestOpinionArticleDetailAPI } from 'src/services/opinionArticleDetailService';

import {
  OpinionArticleDetailSuccessPayload,
  OpinionArticleDetailBodyGet,
  RequestOpinionArticleDetailType,
} from '../types';

const mocknid = 123;
const mockString = 'mockString';

const requestObject: OpinionArticleDetailBodyGet = {
  nid: mocknid,
};

const requestAction: RequestOpinionArticleDetailType = {
  type: REQUEST_OPINION_ARTICLE_DETAIL,
  payload: requestObject,
};

const reposnseObject = {
  rows: [
    {
      title: mockString,
      nid: mockString,
    },
  ],
};
const errorResponse = {
  response: { data: 'Error', status: 500, statusText: 'Error' },
};

const sucessResponseObject: OpinionArticleDetailSuccessPayload = {
  opinionArticleDetailData: reposnseObject,
};

describe('Test opinionArticleDetail  saga', () => {
  it('fire on opinionArticleDetailSaga', () => {
    testSaga(opinionArticleDetailSaga)
      .next()
      .all([
        takeLatest(REQUEST_OPINION_ARTICLE_DETAIL, fetchOpinionArticleDetail),
      ])
      .finish()
      .isDone();
  });
});

describe('Test fetchOpinionArticleDetail success', () => {
  it('fire on REQUEST_OPINION_ARTICLE_DETAIL', () => {
    testSaga(fetchOpinionArticleDetail, requestAction)
      .next()
      .call(requestOpinionArticleDetailAPI, requestObject)
      .next(reposnseObject)
      .put(requestOpinionArticleDetailSuccess(sucessResponseObject))
      .finish()
      .isDone();
  });
});

describe('Test OpinionArticleDetail  error', () => {
  it('check fetchOpinionArticleDetail failed', () => {
    const genObject = fetchOpinionArticleDetail({
      type: REQUEST_OPINION_ARTICLE_DETAIL,
      payload: { nid: mocknid },
    });
    genObject.next();
    genObject.throw(errorResponse);
  });

  it('check fetchOpinionArticleDetail failed', () => {
    const genObject = fetchOpinionArticleDetail({
      type: REQUEST_OPINION_ARTICLE_DETAIL,
      payload: { nid: mocknid },
    });
    genObject.next();
    genObject.throw({});
  });

  describe('Test OpinionArticleDetail', () => {
    it('check fetchRelatedOpinion success', () => {
      const genObject = fetchRelatedOpinion({
        type: REQUEST_RELATED_OPINION,
        payload: { page: 0 },
      });
      genObject.next();
      genObject.next();
    });

    it('check fetchRelatedOpinion failed', () => {
      const genObject = fetchRelatedOpinion({
        type: REQUEST_RELATED_OPINION,
        payload: { page: 0 },
      });
      genObject.next();
      genObject.throw(errorResponse);
    });

    it('check fetchRelatedOpinion failed', () => {
      const genObject = fetchRelatedOpinion({
        type: REQUEST_RELATED_OPINION,
        payload: { page: 0 },
      });
      genObject.next();
      genObject.throw({});
    });
  })

  describe('Test fetchNarratedOpinion', () => {
    it('check fetchNarratedOpinion success', () => {
      const genObject = fetchNarratedOpinion({
        type: REQUEST_NARRATED_OPINION_ARTICLE,
        payload: { jwPlayerID: '12' },
      });
      genObject.next();
      genObject.next();
    });

    it('check fetchNarratedOpinion failed', () => {
      const genObject = fetchNarratedOpinion({
        type: REQUEST_NARRATED_OPINION_ARTICLE,
        payload: { jwPlayerID: '12' },
      });
      genObject.next();
      genObject.throw(errorResponse);
    });

    it('check fetchNarratedOpinion failed', () => {
      const genObject = fetchNarratedOpinion({
        type: REQUEST_NARRATED_OPINION_ARTICLE,
        payload: { jwPlayerID: '12' },
      });
      genObject.next();
      genObject.throw({});
    });
  })

  describe('Test opinionArticleDetailSaga  saga', () => {
    it('fire on opinionArticleDetailSaga', () => {
      testSaga(opinionArticleDetailSaga)
        .next()
        .all([takeLatest(REQUEST_OPINION_ARTICLE_DETAIL, fetchOpinionArticleDetail)])
        .next()
        .all([takeLatest(REQUEST_RELATED_OPINION, fetchRelatedOpinion)])
        .next()
        .all([takeLatest(REQUEST_NARRATED_OPINION_ARTICLE, fetchNarratedOpinion)])
        .finish()
        .isDone();
    });
  });
  
});
