import { useDispatch, useSelector } from 'react-redux';
import {
    getAllWritersData,
    getIsLoading,
    getAllWritersError,
    getSentAuthorInfoData,
} from 'src/redux/allWriters/selectors';
import { fetchAllWriters, sendSelectedAuthor } from 'src/redux/allWriters/action';
import { AllWritersItemType, AllWritersBodyGet, SendSelectedAuthorBody, ResponseMessage } from 'src/redux/allWriters/types';

export interface UseAllWritersReturn {
    isLoading: boolean;
    allWritersData: AllWritersItemType[];
    sentAuthorInfoData: ResponseMessage
    allWritersError: string;
    fetchAllWritersRequest(payload: AllWritersBodyGet): void;
    sendSelectedWriterInfo(payload: SendSelectedAuthorBody): void
}

export const useAllWriters = (): UseAllWritersReturn => {
    const dispatch = useDispatch();
    const isLoading = useSelector(getIsLoading);
    const allWritersData = useSelector(getAllWritersData);
    const sentAuthorInfoData = useSelector(getSentAuthorInfoData);
    const allWritersError = useSelector(getAllWritersError);
    const fetchAllWritersRequest = (payload: AllWritersBodyGet) => {
        dispatch(fetchAllWriters(payload));
    };

    const sendSelectedWriterInfo = (payload: SendSelectedAuthorBody) => {
      dispatch(sendSelectedAuthor(payload))
    }

    return {
        isLoading,
        allWritersData,
        sentAuthorInfoData,
        allWritersError,
        fetchAllWritersRequest,
        sendSelectedWriterInfo,
    };
};