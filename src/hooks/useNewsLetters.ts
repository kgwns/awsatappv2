import { useDispatch, useSelector } from 'react-redux';
import {
    getIsLoading,
    getSentNewsLettersInfoData,
    getSelectedNewsLettersDataList,
    getIsMyNewsLoading,
    getMyNewsLettersDataList,
    getSelectedNewsLettersDataFromOnBoard
} from 'src/redux/newsLetter/selectors';
import { ResponseMessage } from 'src/redux/allWriters/types';
import { SelectedNewsLettersDataType, SendSelectedNewsLettersBody } from 'src/redux/newsLetter/types';
import { emptySelectedNewsLettersInfo, 
    getSelectedNewsletters, 
    sendSelectedNewsLetters, 
    getMyNewsletters, 
    setSelectedDataFromNewsLetterOnboard, 
    emptySelectedNewsletterDataFromOnboard } from 'src/redux/newsLetter/action';

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
    sendSelectedFromNewsletterOnboard(payload: string[]): void
    emptySelectedNewsletterDataOnboard(): void;
    selectedNewsLetterDataOnboard: any
}

export const useNewsLetters = (): UseNewsLettersReturn => {
    const dispatch = useDispatch();
    const isLoading = useSelector(getIsLoading);
    const sentNewsLettersInfoData = useSelector(getSentNewsLettersInfoData);
    const selectedNewsLettersData = useSelector(getSelectedNewsLettersDataList);
    const selectedNewsLetterDataOnboard = useSelector(getSelectedNewsLettersDataFromOnBoard);
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

    const sendSelectedFromNewsletterOnboard = (payload: any) => {
        dispatch(setSelectedDataFromNewsLetterOnboard(payload));
    }

    const emptySelectedNewsletterDataOnboard = () => {
        dispatch(emptySelectedNewsletterDataFromOnboard());
    }


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
        sendSelectedFromNewsletterOnboard,
        emptySelectedNewsletterDataOnboard,
        selectedNewsLetterDataOnboard,
    };
};
