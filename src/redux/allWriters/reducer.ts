import {
  FETCH_ALL_WRITERS,
  FETCH_ALL_WRITERS_SUCCESS,
  FETCH_ALL_WRITERS_ERROR,
  SEND_SELECTED_AUTHOR_SUCCESS,
  SEND_SELECTED_AUTHOR,
  SEND_SELECTED_AUTHOR_ERROR,
  GET_SELECTED_AUTHOR,
  GET_SELECTED_AUTHOR_SUCCESS,
  GET_SELECTED_AUTHOR_ERROR,
  EMPTY_SELECTED_AUTHORS_INFO,
  REMOVE_AUTHOR,
  REMOVE_AUTHOR_ERROR,
  REMOVE_AUTHOR_SUCCESS,
  FETCH_ALL_SELECTED_WRITERS_DETAILS,
  FETCH_ALL_SELECTED_WRITERS_DETAILS_ERROR,
  FETCH_ALL_SELECTED_WRITERS_DETAILS_SUCCESSS,
  EMPTY_SEND_AUTHOR_INFO,
  DESELECT_ALL_WRITERS,
  SELECTED_DATA_FROM_ONBOARD,
  EMPTY_SELECTED_WRITERS_DATA_FROM_ONBOARD,
  EMPTY_SELECTED_AUTHORS,
} from './actionTypes';
import { AllWritersActions, AllWritersState } from './types';
import { isNonEmptyArray } from 'src/shared/utils';

const initialState: AllWritersState = {
  allWritersData: [],
  error: '',
  isLoading: false,
  sendAuthorInfo: {},
  selectedAuthorsData:{},
  allSelectedWritersDetailsList:[],
  selectedAuthorLoading: false,
  selectedDataFromOnboard: [],
};

export default (state = initialState, action: AllWritersActions) => {
  const deselectAllSelectedWritersData = (data: any, selectedData: string[]) => {
    if (isNonEmptyArray(data.rows)) {
      for (let i = 0; i < data.rows.length; i++) {
        data.rows[i].isSelected = selectedData.includes(data.rows[i].tid);
      }
    }
    return data;
  };
  switch (action.type) {
    case FETCH_ALL_WRITERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allWritersData: action.payload.allWritersListData,
        error: '',
      };
    case FETCH_ALL_WRITERS_ERROR:
      return { ...state, error: action.payload.error, isLoading: false };
    case FETCH_ALL_WRITERS:
      return { ...state, isLoading: true, error: '' };
    case SEND_SELECTED_AUTHOR:
      return { ...state, isLoading: true }
    case SEND_SELECTED_AUTHOR_SUCCESS:
      return { ...state, isLoading: false, sendAuthorInfo: action.payload.saveData }
    case SEND_SELECTED_AUTHOR_ERROR:
      return { ...state, isLoading: false, error: action.payload.error }
    case GET_SELECTED_AUTHOR:
      return { ...state, selectedAuthorLoading: true }
    case GET_SELECTED_AUTHOR_SUCCESS:
      return { ...state, selectedAuthorLoading: false, selectedAuthorsData: action.payload.selectedAuthorsData,  error: '' }
    case GET_SELECTED_AUTHOR_ERROR:
      return { ...state, selectedAuthorLoading: false, error: action.payload.error }
    case EMPTY_SELECTED_AUTHORS_INFO:
      return {...state, isLoading: false, sendAuthorInfo:{},error:'', selectedAuthorsData: {},allSelectedWritersDetailsList:[]}
    case REMOVE_AUTHOR:
        return { ...state, isLoading: true }
    case REMOVE_AUTHOR_SUCCESS:
        return { ...state, isLoading: false,}
    case REMOVE_AUTHOR_ERROR:
        return { ...state, isLoading: false, }
    case FETCH_ALL_SELECTED_WRITERS_DETAILS_SUCCESSS:
      return {
        ...state,
        isLoading: false,
        allSelectedWritersDetailsList: action.payload.allSelectedWritersDetails,
        error: '',
      };
    case FETCH_ALL_SELECTED_WRITERS_DETAILS_ERROR:
      return { ...state, error: action.payload.error, isLoading: false };
    case FETCH_ALL_SELECTED_WRITERS_DETAILS:
      return { ...state, isLoading: true, error: '' };
    case EMPTY_SEND_AUTHOR_INFO:
      return { ...state, sendAuthorInfo: {} }
    case DESELECT_ALL_WRITERS:
      return { ...state, allWritersData: deselectAllSelectedWritersData(state.allWritersData, state.selectedDataFromOnboard) }
    case SELECTED_DATA_FROM_ONBOARD:
      return { ...state, selectedDataFromOnboard: action.payload }
    case EMPTY_SELECTED_WRITERS_DATA_FROM_ONBOARD:
      return { ...state, selectedDataFromOnboard: [] }
    case EMPTY_SELECTED_AUTHORS:
      return {...state, isLoading: false,error:'',allSelectedWritersDetailsList:[]}
    default:
      return { ...state };
  }
};
