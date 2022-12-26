import { allSiteCategoriesActions } from '../action';
import { DESELECT_ALL_TOPICS_INFO, EMPTY_SELECTED_TOPICS_INFO, EMPTY_SEND_TOPICS_INFO, FETCH_ALL_SITE_CATEGORIES, GET_SELECTED_TOPICS, GET_SELECTED_TOPICS_ERROR, GET_SELECTED_TOPICS_SUCCESS, SEND_SELECTED_TOPIC, SEND_SELECTED_TOPIC_ERROR, SEND_SELECTED_TOPIC_SUCCESS } from '../actionTypes';
import allSiteCategories from '../reducer';
import { AllSiteCategoriesItemType, AllSiteCategoriesState } from '../types';

const sampleAllSiteCategoriesItemTypeData: AllSiteCategoriesItemType[] = [
  {
      name: 'example',
      description__value_export: {},
      field_opinion_writer_path_export: {},
      view_taxonomy_term: 'example',
      tid: '1',
      vid_export: {},
      field_description_export: {},
      field_opinion_writer_path_export_1: {},
      field_opinion_writer_photo_export: 'example',
      parent_target_id_export: {},
      isSelected: true,
  },
  {
      name: 'example',
      description__value_export: {},
      field_opinion_writer_path_export: {},
      view_taxonomy_term: 'example',
      tid: '2',
      vid_export: {},
      field_description_export: {},
      field_opinion_writer_path_export_1: {},
      field_opinion_writer_photo_export: 'example',
      parent_target_id_export: {},
      isSelected: true,
  },
]

describe('allSiteCategories reducer', () => {
  let initialState: AllSiteCategoriesState;

  beforeEach(() => {
    initialState = {
      isLoading: false,
      allSiteCategoriesData: {rows: sampleAllSiteCategoriesItemTypeData},
      error: '',
      selectedTopicsData: {},
      sendTopicInfo: {}
    };
  });

  test('fetchAllSiteCategoriesSuccess', () => {
    const testData = [{}];
    initialState.isLoading = true;
    const nextState = allSiteCategories(
      initialState,
      allSiteCategoriesActions.fetchAllSiteCategoriesSuccess({
        allSiteCategoriesListData: testData,
      }),
    );

    expect(nextState.isLoading).toBeFalsy();
  });

  test('fetchAllSiteCategoriesFailure', () => {
    const testError = 'some-error';
    initialState.isLoading = true;
    const nextState = allSiteCategories(
      initialState,
      allSiteCategoriesActions.fetchAllSiteCategoriesFailed({
        error: testError,
      }),
    );

    expect(nextState.isLoading).toBeFalsy();
    expect(nextState.error).toEqual(testError);
  });

  test('Check loading state when allSiteCategories request API', () => {
    const nextState = allSiteCategories(initialState, {
      type: FETCH_ALL_SITE_CATEGORIES,
      payload: { items_per_page: 10 },
    });
    expect(nextState.isLoading).toBe(true);
  });

  test('Check loading state when send selected topics request API', () => {
    const nextState = allSiteCategories(initialState, {
      type: SEND_SELECTED_TOPIC,
      payload: { tid: '123' },
    });
    expect(nextState.isLoading).toBe(true);
  });

  test('Check loading state when send selected topics success request API', () => {
    const nextState = allSiteCategories(initialState, {
      type: SEND_SELECTED_TOPIC_SUCCESS,
      payload: { saveData: {} },
    });
    expect(nextState.isLoading).toBe(false);
  });

  test('Check loading state when send selected topics failure request API', () => {
    const nextState = allSiteCategories(initialState, {
      type: SEND_SELECTED_TOPIC_ERROR,
      payload: { error: '' },
    });
    expect(nextState.isLoading).toBe(false);
  });

  test('Check loading state when get selected topics request API', () => {
    const nextState = allSiteCategories(initialState, {
      type: GET_SELECTED_TOPICS,
    });
    expect(nextState.isLoading).toBe(true);
  });

  test('Check loading state when get selected topics success request API', () => {
    const nextState = allSiteCategories(initialState, {
      type: GET_SELECTED_TOPICS_SUCCESS,
      payload: { selectedTopicsData: {} }
    });
    expect(nextState.isLoading).toBe(false);
  });

  test('Check loading state when get selected topics failure request API', () => {
    const nextState = allSiteCategories(initialState, {
      type: GET_SELECTED_TOPICS_ERROR,
      payload: { error: '' }
    });
    expect(nextState.isLoading).toBe(false);
  });

  test('Check loading state when empty selected topics failure request API', () => {
    const nextState = allSiteCategories(initialState, {
      type: EMPTY_SELECTED_TOPICS_INFO,
    });
    expect(nextState.isLoading).toBe(false);
  });

  test('Check loading state when empty selected topics failure request API', () => {
    const nextState = allSiteCategories(initialState, {
      type: EMPTY_SEND_TOPICS_INFO,
    });
    expect(nextState.isLoading).toBe(false);
  });

  test('Check loading state when empty selected topics failure request API', () => {
    const nextState = allSiteCategories(initialState, {
      type: DESELECT_ALL_TOPICS_INFO,
      payload: ['abc', 'edc']
    });
    expect(nextState.isLoading).toBe(false);
  });

});

describe('allSiteCategories reducer', () => {
  let initialState: AllSiteCategoriesState;

  beforeEach(() => {
    initialState = {
      isLoading: false,
      allSiteCategoriesData: {rows: []},
      error: '',
      selectedTopicsData: {},
      sendTopicInfo: {}
    };
  });

  test('fetchAllSiteCategoriesSuccess', () => {
    const testData = [{}];
    initialState.isLoading = true;
    const nextState = allSiteCategories(
      initialState,
      allSiteCategoriesActions.fetchAllSiteCategoriesSuccess({
        allSiteCategoriesListData: testData,
      }),
    );

    expect(nextState.isLoading).toBeFalsy();
  });

  test('fetchAllSiteCategoriesFailure', () => {
    const testError = 'some-error';
    initialState.isLoading = true;
    const nextState = allSiteCategories(
      initialState,
      allSiteCategoriesActions.fetchAllSiteCategoriesFailed({
        error: testError,
      }),
    );

    expect(nextState.isLoading).toBeFalsy();
    expect(nextState.error).toEqual(testError);
  });

  test('Check loading state when allSiteCategories request API', () => {
    const nextState = allSiteCategories(initialState, {
      type: FETCH_ALL_SITE_CATEGORIES,
      payload: { items_per_page: 10 },
    });
    expect(nextState.isLoading).toBe(true);
  });

  test('Check loading state when send selected topics request API', () => {
    const nextState = allSiteCategories(initialState, {
      type: SEND_SELECTED_TOPIC,
      payload: { tid: '123' },
    });
    expect(nextState.isLoading).toBe(true);
  });

  test('Check loading state when send selected topics success request API', () => {
    const nextState = allSiteCategories(initialState, {
      type: SEND_SELECTED_TOPIC_SUCCESS,
      payload: { saveData: {} },
    });
    expect(nextState.isLoading).toBe(false);
  });

  test('Check loading state when send selected topics failure request API', () => {
    const nextState = allSiteCategories(initialState, {
      type: SEND_SELECTED_TOPIC_ERROR,
      payload: { error: '' },
    });
    expect(nextState.isLoading).toBe(false);
  });

  test('Check loading state when get selected topics request API', () => {
    const nextState = allSiteCategories(initialState, {
      type: GET_SELECTED_TOPICS,
    });
    expect(nextState.isLoading).toBe(true);
  });

  test('Check loading state when get selected topics success request API', () => {
    const nextState = allSiteCategories(initialState, {
      type: GET_SELECTED_TOPICS_SUCCESS,
      payload: { selectedTopicsData: {} }
    });
    expect(nextState.isLoading).toBe(false);
  });

  test('Check loading state when get selected topics failure request API', () => {
    const nextState = allSiteCategories(initialState, {
      type: GET_SELECTED_TOPICS_ERROR,
      payload: { error: '' }
    });
    expect(nextState.isLoading).toBe(false);
  });

  test('Check loading state when empty selected topics failure request API', () => {
    const nextState = allSiteCategories(initialState, {
      type: EMPTY_SELECTED_TOPICS_INFO,
    });
    expect(nextState.isLoading).toBe(false);
  });

  test('Check loading state when empty selected topics failure request API', () => {
    const nextState = allSiteCategories(initialState, {
      type: EMPTY_SEND_TOPICS_INFO,
    });
    expect(nextState.isLoading).toBe(false);
  });

  test('Check loading state when empty selected topics failure request API', () => {
    const nextState = allSiteCategories(initialState, {
      type: DESELECT_ALL_TOPICS_INFO,
      payload: ['abc', 'edc']
    });
    expect(nextState.isLoading).toBe(false);
  });

  test('Default State', () => {
    const nextState = allSiteCategories(
      initialState, { type:'' }
    )
    expect(nextState.isLoading).toBe(false)
  })
});
