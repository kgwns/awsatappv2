import { useDispatch, useSelector } from "react-redux";
import { getIsLoading, getSendSuccessInfo, getSendInfoError } from 'src/redux/contactUs/selectors'
import { emptyContactUsDetail, sendContactUsInfoDetail } from "src/redux/contactUs/action";
import { SendContactUsInfoPayload, ContactUsInfoSuccessPayload } from "src/redux/contactUs/types";

export type UseContactUsReturn = {
    isLoading: boolean;
    sendSuccessInfo: ContactUsInfoSuccessPayload;
    sendErrorInfo: string;
    sendContactUsInfo: (payload: SendContactUsInfoPayload) => void;
    emptyContactUsInfo: () => void;
}

export const useContactUs = (): UseContactUsReturn => {
    const dispatch = useDispatch();

    const isLoading = useSelector(getIsLoading);
    const sendSuccessInfo = useSelector(getSendSuccessInfo)
    const sendErrorInfo = useSelector(getSendInfoError)

    const sendContactUsInfo = (payload: SendContactUsInfoPayload) => {
        dispatch(sendContactUsInfoDetail(payload))
    }

    const emptyContactUsInfo = () => {
        dispatch(emptyContactUsDetail())
    }

    return {
        isLoading,
        sendSuccessInfo,
        sendErrorInfo,
        sendContactUsInfo,
        emptyContactUsInfo,
    }
}
