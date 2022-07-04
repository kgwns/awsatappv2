import {all, takeLatest} from 'redux-saga/effects';
import {testSaga} from 'redux-saga-test-plan';
import {
  REQUEST_BOTTOM_LIST_DATA,
  REQUEST_HERO_LIST_DATA,
  REQUEST_TOP_LIST_DATA,
  EMPTY_ALL_LIST,
} from '../actionTypes';
import newsViewSaga, {
  fetchTopList,
  fetchHeroList,
  fetchBottomList,
  emptyAllList,
} from '../sagas';
import {
  fetchBottomListSuccess,
  fetchHeroListSuccess,
  fetchTopListSuccess,
} from '../action';
import {fetchNewsViewApi} from 'src/services/newsViewService';

import {
  FetchHeroListType,
  FetchBottomListType,
  FetchTopListType,
  FetchBottomListSuccessPayloadType,
  FetchHeroListSuccessPayloadType,
  FetchTopListSuccessPayloadType,
  NewsViewBodyGet,
} from '../types';
import { LatestOpinionDataType } from 'src/redux/latestNews/types';

const mockString = 'mockString';

const requestObject: NewsViewBodyGet = {
  items_per_page: 4,
  page: 0,
  offset: 0,
  sectionId: 18,
};

const requestHeroListAction: FetchHeroListType = {
  type: REQUEST_HERO_LIST_DATA,
  payload: requestObject,
};
const requestTopistAction: FetchTopListType = {
  type: REQUEST_TOP_LIST_DATA,
  payload: requestObject,
};
const requestBottomListAction: FetchBottomListType = {
  type: REQUEST_BOTTOM_LIST_DATA,
  payload: requestObject,
};

const reponseObject = {
  rows: [
    {
      title: mockString,
      nid: mockString,
    },
  ],
};

const reponseTopListObject : LatestOpinionDataType[]=[]

const errorResponse = {
  response: {data: 'Error', status: 500, statusText: 'Error'},
};

const sucessHeroListResponseObject: FetchHeroListSuccessPayloadType = {
  heroListData: reponseObject,
};
const sucessTopListResponseObject: FetchTopListSuccessPayloadType = {
  topListData: [],
};
const sucessBottomListResponseObject: FetchBottomListSuccessPayloadType = {
  bottomListData: reponseObject,
};

describe('<NewsViewSaga>', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  describe('Check news view saga method', () => {
    const genObject = newsViewSaga();

    it('should wait for REQUEST_HERO_LIST_DATA action and call fetchHeroList', () => {
      const generator = genObject.next();
      expect(generator.value).toEqual(
        all([takeLatest(REQUEST_HERO_LIST_DATA, fetchHeroList)]),
      );
    });
    it('should wait for REQUEST_TOP_LIST_DATA action and call fetchTopList', () => {
      const generator = genObject.next();
      expect(generator.value).toEqual(
        all([takeLatest(REQUEST_TOP_LIST_DATA, fetchTopList)]),
      );
    });
    it('should wait for latest REQUEST_BOTTOM_LIST_DATA action and call fetchBottomList', () => {
      const generator = genObject.next();
      expect(generator.value).toEqual(
        all([takeLatest(REQUEST_BOTTOM_LIST_DATA, fetchBottomList)]),
      );
    });

    it('should wait for empty all list', () => {
      const generator = genObject.next();
      expect(generator.value).toEqual(
        all([takeLatest(EMPTY_ALL_LIST, emptyAllList)]),
      );
    });

    it('should be done on next iteration', () => {
      expect(genObject.next().done).toBeTruthy();
    });
  });
});

describe('Test HeroList success', () => {
  it('fire on REQUEST_HERO_LIST_DATA', () => {
    testSaga(fetchHeroList, requestHeroListAction)
      .next()
      .call(fetchNewsViewApi, requestObject)
      .next(reponseObject)
      .put(fetchHeroListSuccess(sucessHeroListResponseObject))
      .finish()
      .isDone();
  });
});

describe('Test TopList success', () => {
  it('fire on REQUEST_TOP_LIST_DATA', () => {
    testSaga(fetchTopList, requestTopistAction)
      .next()
      .call(fetchNewsViewApi, requestObject)
      .next(reponseTopListObject)
      .put(fetchTopListSuccess(sucessTopListResponseObject))
      .finish()
      .isDone();
  });
});
describe('Test BottomList success', () => {
  it('fire on REQUEST_Bottom_LIST_DATA', () => {
    testSaga(fetchBottomList, requestBottomListAction)
      .next()
      .call(fetchNewsViewApi, requestObject)
      .next(reponseObject)
      .put(fetchBottomListSuccess(sucessBottomListResponseObject))
      .finish()
      .isDone();
  });
});

describe('Test TopList  error', () => {
  it('check fetchTopList failed', () => {
    const genObject = fetchTopList({
      type: REQUEST_TOP_LIST_DATA,
      payload: requestObject,
    });
    genObject.next();
    genObject.throw(errorResponse);
  });
});

describe('Test BottomList  error', () => {
  it('check fetchBottomList failed', () => {
    const genObject = fetchBottomList({
      type: REQUEST_BOTTOM_LIST_DATA,
      payload: requestObject,
    });
    genObject.next();
    genObject.throw(errorResponse);
  });
});

describe('Test HeroList  error', () => {
  it('check fetchHeroList failed', () => {
    const genObject = fetchHeroList({
      type: REQUEST_HERO_LIST_DATA,
      payload: requestObject,
    });
    genObject.next();
    genObject.throw(errorResponse);
  });
});

describe('Empty All List', () => {
  it('check empty all list', () => {
    testSaga(emptyAllList)
    .next()
    .finish()
    .isDone();
  });
});
