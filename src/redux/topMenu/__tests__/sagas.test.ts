import { takeLatest } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import topMenuSaga, { fetchTopMenu } from '../sagas';
import {
  fetchTopMenuSuccess,
} from '../action';
import { FETCH_TOP_MENU, FETCH_TOP_MENU_SUCCESS } from '../actionTypes';
import { fetchTopMenuApi } from 'src/services/topMenuService';
import {
  FetchTopMenuSuccessPayloadType,
} from '../types';
import { AxiosError } from 'axios';

const mockString = 'mockString';
const mockUUID = '1';
const mockParentId = '1';

const responseObject = {
  rows: [
    {
      title: mockString,
      uuid_export: mockUUID,
      parent_export: mockParentId,
      link__options: mockString,
      title_export: mockString,
      sectionid: 1,
      keyname: mockString
    },
  ],
};

const successResponseObject: FetchTopMenuSuccessPayloadType = {
  topMenuData: [{
    sectionId: 1,
    tabName: mockString,
    keyName: mockString,
    isSelected: false,
    parentId: mockParentId,
    uuid: mockUUID,
  }],
};

describe('test Saga  topMenusaga', () => {
  it('fire on topMenuSaga', () => {
    testSaga(topMenuSaga)
      .next()
      .all([takeLatest(FETCH_TOP_MENU, fetchTopMenu)])
      .finish()
      .isDone();
  });

  it('check SaveToken success', () => {
    const genObject = fetchTopMenu();
    genObject.next(successResponseObject);
    genObject.next(successResponseObject);
  });

  it('check SaveToken success', () => {
    const genObject = fetchTopMenu();
    genObject.next();
    genObject.next();
  });

  it('check SaveToken success', () => {
    const genObject = fetchTopMenu();
    genObject.next(responseObject);
    genObject.next(responseObject);
  });

  it('fire on FETCH_TOP_MENU_REQUEST', () => {
    testSaga(fetchTopMenu)
      .next()
      .call(fetchTopMenuApi)
      .next({})
      .put(fetchTopMenuSuccess({ topMenuData: [] }))
      .finish()
      .isDone();
  });

  it('test fetchSideMenu  error', () => {
    const errorResponse = {
      response: { data: 'Error', status: 500, statusText: 'Error' }
    }
    testSaga(fetchTopMenu)
      .next()
      .call(fetchTopMenuApi)
      .throw(errorResponse as AxiosError)
      .finish()
      .isDone();
  });

  it('test fetchSideMenu  error', () => {
    const errorResponse = {}
    testSaga(fetchTopMenu)
      .next()
      .call(fetchTopMenuApi)
      .throw(errorResponse as AxiosError)
      .finish()
      .isDone();
  });
});