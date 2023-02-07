import { useDispatch, useSelector } from 'react-redux';
import {
    getIsLoading,
    sendSelectedNotificationSuccessInfo,
    sendSelectedNotificationErrorInfo,
    getSelectedNotificationSuccessInfo,
    getAllNotificationSuccessInfo,
    getIsMyNotificationLoading
} from 'src/redux/keepNotified/selectors';
import { GetListOfNotificationSuccessPayload, 
    GetSelectedNotificationSuccessPayload, 
    SendSelectedNotificationBody, 
    SendSelectedNotificationSuccessPayload } from 'src/redux/keepNotified/types';
import { sendSelectedNotification,getSelectedNotification,removeNotificationInfo, removeSelectedNotification, getListOfNotification } from 'src/redux/keepNotified/action';

export interface UseKeepNotifiedReturn {
    isLoading: boolean;
    sendSelectedNotificationInfo: SendSelectedNotificationSuccessPayload;
    sendSelectedError: string;
    sendSelectedInfoRequest(payload: SendSelectedNotificationBody): void;
    getSelectedInfoRequest(): void
    selectedNotificationInfo: GetSelectedNotificationSuccessPayload;
    removeKeepNotificationInfo(): void
    removeSelectedNotificationInfo(): void
    getAllNotificationList(): void
    allNotificationList: GetListOfNotificationSuccessPayload
    isMyNotificationLoading: boolean,
}

export const useKeepNotified = (): UseKeepNotifiedReturn => {
    const dispatch = useDispatch();
    const isLoading = useSelector(getIsLoading);
    const sendSelectedNotificationInfo = useSelector(sendSelectedNotificationSuccessInfo);
    const sendSelectedError = useSelector(sendSelectedNotificationErrorInfo);
    const selectedNotificationInfo = useSelector(getSelectedNotificationSuccessInfo)
    const allNotificationList = useSelector(getAllNotificationSuccessInfo)
    const isMyNotificationLoading = useSelector(getIsMyNotificationLoading)

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

    const getAllNotificationList = () => {
        dispatch(getListOfNotification())
    }

    return {
        isLoading,
        sendSelectedNotificationInfo,
        sendSelectedError,
        sendSelectedInfoRequest,
        isMyNotificationLoading,
        getSelectedInfoRequest,
        selectedNotificationInfo,
        removeKeepNotificationInfo,
        removeSelectedNotificationInfo,
        allNotificationList,
        getAllNotificationList
    };
};
