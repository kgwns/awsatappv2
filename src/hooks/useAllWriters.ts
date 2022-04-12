import { useDispatch, useSelector } from 'react-redux';
import {
  getAllWritersData,
  getIsLoading,
  getAllWritersError,
  getSentAuthorInfoData,
  getSelectedAuthorsDataList,
  getSelectedAllWritersDetailsData,
  getSelectedAuthorLoading
} from 'src/redux/allWriters/selectors';
import { fetchAllWriters, sendSelectedAuthor, getSelectedAuthors, emptySelectedAuthorsInfo, removeAuthor, getSelectedAuthorsSuccess, fetchAllSelectedWritersDetails, emptySendAuthorInfo } from 'src/redux/allWriters/action';
import { AllWritersItemType, AllWritersBodyGet, SendSelectedAuthorBody, ResponseMessage, SelectedAuthorDataType, RemoveAuthorBody,AllSelectedWritersDetailsBodyGet } from 'src/redux/allWriters/types';
import { isNonEmptyArray } from 'src/shared/utils';

export interface UseAllWritersReturn {
  isLoading: boolean;
  allWritersData: AllWritersItemType[];
  sentAuthorInfoData: ResponseMessage
  selectedAuthorsData: SelectedAuthorDataType
  allWritersError: string;
  fetchAllWritersRequest(payload: AllWritersBodyGet): void;
  sendSelectedWriterInfo(payload: SendSelectedAuthorBody): void
  getSelectedAuthorsData(): void;
  emptySelectedAuthorsInfoData(): void;
  removeAuthorRequest(payload: RemoveAuthorBody): void;
  requestAllSelectedWritersDetailsData(payload: AllSelectedWritersDetailsBodyGet) : void;
  allSelectedWritersDetailList : AllWritersItemType[];
  selectedAuthorLoadingState: boolean;
  emptySendAuthorInfoData(): void;
}

export const useAllWriters = (): UseAllWritersReturn => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const allWritersData = useSelector(getAllWritersData);
  const sentAuthorInfoData = useSelector(getSentAuthorInfoData);
  const selectedAuthorsData = useSelector(getSelectedAuthorsDataList);
  const allWritersError = useSelector(getAllWritersError);
  const allSelectedWritersDetailList = useSelector(getSelectedAllWritersDetailsData);
  const selectedAuthorLoadingState = useSelector(getSelectedAuthorLoading)
  const fetchAllWritersRequest = (payload: AllWritersBodyGet) => {
    dispatch(fetchAllWriters(payload));
  };

  const sendSelectedWriterInfo = (payload: SendSelectedAuthorBody) => {
    dispatch(sendSelectedAuthor(payload))
  }

  const getSelectedAuthorsData = () => {
    dispatch(getSelectedAuthors())
  }

  const emptySelectedAuthorsInfoData = () => {
    dispatch(emptySelectedAuthorsInfo())
  };

  const emptySendAuthorInfoData = () => {
    dispatch(emptySendAuthorInfo())
  }

  const removeAuthorRequest = (payload: RemoveAuthorBody) => {
    if (isNonEmptyArray(selectedAuthorsData.data)) {
      const tid = payload.tid
      let selectedAuthorInfo = selectedAuthorsData
      const followingAuthorData = [...selectedAuthorInfo.data]
      const updatedFollowAuthorInfo = followingAuthorData.filter((item) => item.tid != tid)
      selectedAuthorInfo.data = updatedFollowAuthorInfo
      dispatch(getSelectedAuthorsSuccess({ selectedAuthorsData: selectedAuthorInfo }))
    }
    dispatch(removeAuthor(payload))
  }

  const requestAllSelectedWritersDetailsData = (payload: AllSelectedWritersDetailsBodyGet) => {
    dispatch(fetchAllSelectedWritersDetails(payload));
  };

  return {
    isLoading,
    allWritersData,
    sentAuthorInfoData,
    selectedAuthorsData,
    allWritersError,
    fetchAllWritersRequest,
    sendSelectedWriterInfo,
    getSelectedAuthorsData,
    emptySelectedAuthorsInfoData,
    removeAuthorRequest,
    requestAllSelectedWritersDetailsData,
    allSelectedWritersDetailList,
    selectedAuthorLoadingState,
    emptySendAuthorInfoData,
  };
};