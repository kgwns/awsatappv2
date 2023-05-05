import {allWritersActions} from '../action';
import {DESELECT_ALL_WRITERS, EMPTY_SELECTED_AUTHORS, EMPTY_SELECTED_AUTHORS_INFO, EMPTY_SELECTED_WRITERS_DATA_FROM_ONBOARD, EMPTY_SEND_AUTHOR_INFO, FETCH_ALL_SELECTED_WRITERS_DETAILS, FETCH_ALL_SELECTED_WRITERS_DETAILS_ERROR, FETCH_ALL_SELECTED_WRITERS_DETAILS_SUCCESSS, FETCH_ALL_WRITERS, FETCH_ALL_WRITERS_ERROR, FETCH_ALL_WRITERS_SUCCESS, GET_SELECTED_AUTHOR, GET_SELECTED_AUTHOR_ERROR, GET_SELECTED_AUTHOR_SUCCESS, REMOVE_AUTHOR, REMOVE_AUTHOR_ERROR, REMOVE_AUTHOR_SUCCESS, SELECTED_DATA_FROM_ONBOARD, SEND_SELECTED_AUTHOR, SEND_SELECTED_AUTHOR_ERROR, SEND_SELECTED_AUTHOR_SUCCESS} from '../actionTypes';
import allWriters from '../reducer';
import {AllWritersState} from '../types';

describe('allWriters reducer', () => {
  let initialState: AllWritersState;

  beforeEach(() => {
    initialState = {
      allWritersData: [],
      error: '',
      isLoading: false,
      sendAuthorInfo: {},
      selectedAuthorsData:{},
      allSelectedWritersDetailsList:[],
      selectedAuthorLoading: false,
      selectedDataFromOnboard: [],
    };
  });

  test('fetchAllWritersSuccess', () => {
    const testData = [{}];
    initialState.isLoading = true;
    const nextState = allWriters(
      initialState,
      allWritersActions.fetchAllWritersSuccess({
        allWritersListData: testData,
      }),
    );

    expect(nextState.isLoading).toBeFalsy();
  });

  test('fetchAllWritersFailure', () => {
    const testError = 'some-error';
    initialState.isLoading = true;
    const nextState = allWriters(
      initialState,
      allWritersActions.fetchAllWritersFailed({
        error: testError,
      }),
    );

    expect(nextState.isLoading).toBeFalsy();
    expect(nextState.error).toEqual(testError);
  });

  test('Check loading state when allWriters FETCH_ALL_WRITERS request API', () => {
    const nextState = allWriters(initialState, {
      type: FETCH_ALL_WRITERS,
      payload: {items_per_page: 10},
    });
    expect(nextState.isLoading).toBe(true);
  });

  test('Check loading state when selected author SEND_SELECTED_AUTHOR_SUCCESS request API', () => {
    const nextState = allWriters(initialState, {
      type: FETCH_ALL_WRITERS_SUCCESS,
      payload: {allWritersListData: {}},
    });
    expect(nextState.isLoading).toBe(false);
  });

  test('Check loading state when selected author SEND_SELECTED_AUTHOR_ERROR request API', () => {
    const nextState = allWriters(initialState, {
      type: FETCH_ALL_WRITERS_ERROR,
      payload: {error: 'sample error'},
    });
    expect(nextState.isLoading).toBe(false);
  });

  test('Check loading state when selected author SEND_SELECTED_AUTHOR request API', () => {
    const nextState = allWriters(initialState, {
      type: SEND_SELECTED_AUTHOR,
      payload: {tid: '123',
      isList: true},
    });
    expect(nextState.isLoading).toBe(true);
  });

  test('Check loading state when selected author SEND_SELECTED_AUTHOR_SUCCESS request API', () => {
    const nextState = allWriters(initialState, {
      type: SEND_SELECTED_AUTHOR_SUCCESS,
      payload: {saveData: {}},
    });
    expect(nextState.isLoading).toBe(false);
  });

  test('Check loading state when selected author SEND_SELECTED_AUTHOR_ERROR request API', () => {
    const nextState = allWriters(initialState, {
      type: SEND_SELECTED_AUTHOR_ERROR,
      payload: {error: 'sample error'},
    });
    expect(nextState.isLoading).toBe(false);
  });

  test('Check loading state when selected author SEND_SELECTED_AUTHOR request API', () => {
    const nextState = allWriters(initialState, {
      type: GET_SELECTED_AUTHOR,
    });
    expect(nextState.isLoading).toBe(false);
  });

  test('Check loading state when selected author SEND_SELECTED_AUTHOR_SUCCESS request API', () => {
    const nextState = allWriters(initialState, {
      type: GET_SELECTED_AUTHOR_SUCCESS,
      payload: {selectedAuthorsData: {}},
    });
    expect(nextState.isLoading).toBe(false);
  });

  test('Check loading state when selected author SEND_SELECTED_AUTHOR_ERROR request API', () => {
    const nextState = allWriters(initialState, {
      type: GET_SELECTED_AUTHOR_ERROR,
      payload: {error: 'sample error'},
    });
    expect(nextState.isLoading).toBe(false);
  });

  test('Check loading state when selected author SEND_SELECTED_AUTHOR request API', () => {
    const nextState = allWriters(initialState, {
      type: REMOVE_AUTHOR,
      payload:{
        tid: '12'
      }
    });
    expect(nextState.isLoading).toBe(true);
  });

  test('Check loading state when selected author SEND_SELECTED_AUTHOR_SUCCESS request API', () => {
    const nextState = allWriters(initialState, {
      type: REMOVE_AUTHOR_SUCCESS,
      payload: {removeData: {}},
    });
    expect(nextState.isLoading).toBe(false);
  });

  test('Check loading state when selected author SEND_SELECTED_AUTHOR_ERROR request API', () => {
    const nextState = allWriters(initialState, {
      type: REMOVE_AUTHOR_ERROR,
      payload: {error: 'sample error'},
    });
    expect(nextState.isLoading).toBe(false);
  });

  test('Check loading state when selected author SEND_SELECTED_AUTHOR request API', () => {
    const nextState = allWriters(initialState, {
      type: FETCH_ALL_SELECTED_WRITERS_DETAILS,
      payload:{
        tid: '12',
        items_per_page: 10,
      }
    });
    expect(nextState.isLoading).toBe(true);
  });

  test('Check loading state when selected author SEND_SELECTED_AUTHOR_SUCCESS request API', () => {
    const nextState = allWriters(initialState, {
      type: FETCH_ALL_SELECTED_WRITERS_DETAILS_SUCCESSS,
      payload: {allSelectedWritersDetails: {}},
    });
    expect(nextState.isLoading).toBe(false);
  });

  test('Check loading state when selected author SEND_SELECTED_AUTHOR_ERROR request API', () => {
    const nextState = allWriters(initialState, {
      type: FETCH_ALL_SELECTED_WRITERS_DETAILS_ERROR,
      payload: {error: 'sample error'},
    });
    expect(nextState.isLoading).toBe(false);
  });

  test('Check loading state when selected author EMPTY_SEND_AUTHOR_INFO request API', () => {
    const nextState = allWriters(initialState, {
      type: EMPTY_SEND_AUTHOR_INFO,
    });
    expect(nextState.isLoading).toBe(false);
  });

  test('Check loading state when selected author SELECTED_DATA_FROM_ONBOARD request API', () => {
    const nextState = allWriters(initialState, {
      type: SELECTED_DATA_FROM_ONBOARD,
      payload: {data:[]},
    });
    expect(nextState.isLoading).toBe(false);
  });

  test('Check loading state when selected author DESELECT_ALL_WRITERS request API', () => {
    const nextState = allWriters(initialState, {
      type: DESELECT_ALL_WRITERS,
    });
    expect(nextState.isLoading).toBe(false);
  });

  test('Check if deselectAllSelectedWritersData change the isSelected status to false', () => {
    initialState.allWritersData = {rows:[{isSelected:true}]} as any;
    const nextState = allWriters(initialState, {
      type: DESELECT_ALL_WRITERS,
    });
    expect(nextState.isLoading).toBe(false);
    expect(nextState.allWritersData.rows[0].isSelected).toBeFalsy();
  });

  test('Check loading state when selected author EMPTY_SELECTED_WRITERS_DATA_FROM_ONBOARD request API', () => {
    const nextState = allWriters(initialState, {
      type: EMPTY_SELECTED_WRITERS_DATA_FROM_ONBOARD,
    });
    expect(nextState.isLoading).toBe(false);
  });

  test('Check loading state when selected author EMPTY_SELECTED_AUTHORS_INFO request API', () => {
    const nextState = allWriters(initialState, {
      type: EMPTY_SELECTED_AUTHORS_INFO,
    });
    expect(nextState.isLoading).toBe(false);
  });

  test('Check loading state when selected author EMPTY_SELECTED_AUTHORS request API', () => {
    const nextState = allWriters(initialState, {
      type: EMPTY_SELECTED_AUTHORS,
    });
    expect(nextState.isLoading).toBe(false);
  });

  test('Default State', () => {
    const nextState = allWriters(
      initialState, { type:'' }
    )
    expect(nextState.isLoading).toBe(false)
  })
});
