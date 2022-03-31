import { useDispatch, useSelector } from 'react-redux';
import {
    getIsLoading,
    getSentNewsLettersInfoData,
    getSelectedNewsLettersDataList,
    getIsMyNewsLoading,
    getMyNewsLettersDataList,
} from 'src/redux/newsLetter/selectors';
import { ResponseMessage } from 'src/redux/allWriters/types';
import { SelectedNewsLettersDataType, SendSelectedNewsLettersBody } from 'src/redux/newsLetter/types';
import { emptySelectedNewsLettersInfo, getSelectedNewsletters, sendSelectedNewsLetters, getMyNewsletters } from 'src/redux/newsLetter/action';

export interface UseNewsLettersReturn {
    isLoading: boolean;
    sentNewsLettersInfoData: ResponseMessage
    selectedNewsLettersData: SelectedNewsLettersDataType
    sendSelectedNewsLettersInfo(payload: SendSelectedNewsLettersBody): void
    getSelectedNewsLettersData(): void;
    isMyNewsLoading: boolean,
    myNewsLetters: SelectedNewsLettersDataType,
    getMyNewsLettersData(): void;
    emptySelectedNewsLettersInfoData(): void;
}

export const useNewsLetters = (): UseNewsLettersReturn => {
    const dispatch = useDispatch();
    const isLoading = useSelector(getIsLoading);
    const sentNewsLettersInfoData = useSelector(getSentNewsLettersInfoData);
    const selectedNewsLettersData = useSelector(getSelectedNewsLettersDataList);
    const isMyNewsLoading = useSelector(getIsMyNewsLoading);
    const myNewsLetters = useSelector(getMyNewsLettersDataList);

    const sendSelectedNewsLettersInfo = (payload: SendSelectedNewsLettersBody) => {
        dispatch(sendSelectedNewsLetters(payload))
    }

    const getSelectedNewsLettersData = () => {
        dispatch(getSelectedNewsletters())
    }

    const getMyNewsLettersData = () => {
        dispatch(getMyNewsletters())
    }

    const emptySelectedNewsLettersInfoData = () => {
        dispatch(emptySelectedNewsLettersInfo())
    };


    return {
        isLoading,
        sentNewsLettersInfoData,
        selectedNewsLettersData,
        sendSelectedNewsLettersInfo,
        getSelectedNewsLettersData,
        isMyNewsLoading,
        myNewsLetters,
        getMyNewsLettersData,
        emptySelectedNewsLettersInfoData,
    };
};