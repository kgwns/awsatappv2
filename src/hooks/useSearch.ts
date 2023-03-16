import { useDispatch, useSelector } from 'react-redux';
import {
  getSearchData,
  getIsLoading,
  getSearchError,
  getSearchHistory,
} from 'src/redux/search/selectors';
import { searchActions, updateSearchHistory, clearSearchHistory } from 'src/redux/search/action';
import { SearchItemType, FetchSearchRequestPayloadType } from 'src/redux/search/types';

export interface UseSearchReturn {
  isLoading: boolean;
  searchData: SearchItemType[];
  searchError: string;
  searchHistory: string[]
  fetchSearchRequest(payload: FetchSearchRequestPayloadType): void;
  setSearchHistory(payload: string[]): void;
  emptySearchHistory: () => void;
}

export const useSearch = (): UseSearchReturn => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const searchData = useSelector(getSearchData);
  const searchError = useSelector(getSearchError);
  const searchHistory = useSelector(getSearchHistory);
  const fetchSearchRequest = (
    payload: FetchSearchRequestPayloadType,
  ) => {
    dispatch(searchActions.fetchSearchRequest(payload));
  };

  const setSearchHistory = (payload: string[]) => {
    dispatch(updateSearchHistory(payload))
  }

  const emptySearchHistory = () => {
    dispatch(clearSearchHistory())
  }

  return {
    isLoading,
    searchData,
    searchError,
    searchHistory,
    fetchSearchRequest,
    setSearchHistory,
    emptySearchHistory
  };
};
