import { useDispatch, useSelector } from 'react-redux';
import {
    getIsLoading,
    sendSelectedNotificationSuccessInfo,
    sendSelectedNotificationErrorInfo,
    getSelectedNotificationSuccessInfo
} from 'src/redux/keepNotified/selectors';
import { GetSelectedNotificationSuccessPayload, SendSelectedNotificationBody, SendSelectedNotificationSuccessPayload } from 'src/redux/keepNotified/types';
import { sendSelectedNotification,getSelectedNotification,removeNotificationInfo, removeSelectedNotification } from 'src/redux/keepNotified/action';

export interface UseKeepNotifiedReturn {
    isLoading: boolean;
    sendSelectedNotificationInfo: SendSelectedNotificationSuccessPayload;
    sendSelectedError: string;
    sendSelectedInfoRequest(payload: SendSelectedNotificationBody): void;
    getSelectedInfoRequest(): void
    selectedNotificationInfo: GetSelectedNotificationSuccessPayload;
    removeKeepNotificationInfo(): void
    removeSelectedNotificationInfo(): void
}

export const useKeepNotified = (): UseKeepNotifiedReturn => {
    const dispatch = useDispatch();
    const isLoading = useSelector(getIsLoading);
    const sendSelectedNotificationInfo = useSelector(sendSelectedNotificationSuccessInfo);
    const sendSelectedError = useSelector(sendSelectedNotificationErrorInfo);
    const selectedNotificationInfo = useSelector(getSelectedNotificationSuccessInfo)

    const sendSelectedInfoRequest = (payload: SendSelectedNotificationBody) => {
        dispatch(sendSelectedNotification(payload));
    };

    const getSelectedInfoRequest = () => {
        dispatch(getSelectedNotification());
    };

    const removeKeepNotificationInfo = () => {
        dispatch(removeNotificationInfo())
    }

    const removeSelectedNotificationInfo = () => {
        dispatch(removeSelectedNotification())
    }

    return {
        isLoading,
        sendSelectedNotificationInfo,
        sendSelectedError,
        sendSelectedInfoRequest,
        getSelectedInfoRequest,
        selectedNotificationInfo,
        removeKeepNotificationInfo,
        removeSelectedNotificationInfo
    };
};