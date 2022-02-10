import { useDispatch, useSelector } from 'react-redux';
import {
  getSearchData,
  getIsLoading,
  getSearchError,
} from 'src/redux/search/selectors';
import { searchActions } from 'src/redux/search/action';
import { SearchItemType, FetchSearchRequestPayloadType } from 'src/redux/search/types';

export interface UseSearchReturn {
  isLoading: boolean;
  searchData: SearchItemType[];
  searchError: string;
  fetchSearchRequest(payload: FetchSearchRequestPayloadType): void;
}

export const useSearch = (): UseSearchReturn => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const searchData = useSelector(getSearchData);
  const searchError = useSelector(getSearchError);
  const fetchSearchRequest = (
    payload: FetchSearchRequestPayloadType,
  ) => {
    dispatch(searchActions.fetchSearchRequest(payload));
  };

  return {
    isLoading,
    searchData,
    searchError,
    fetchSearchRequest,
  };
};