import { useDispatch, useSelector } from 'react-redux';

import {
    getIsLoading,
    getUserError,
    getUserInfo,
} from 'src/redux/updateProfileImage/selectors';

import {
    UpdateUserImageBodyType,
    UpdateUserImageSuccessPayloadType,
} from 'src/redux/updateProfileImage/types';
import { updateUserImage } from 'src/redux/updateProfileImage/action';

export interface UseUserProfileReturn {
    isUserImageLoading: boolean;
    userDetail: UpdateUserImageSuccessPayloadType | null;
    userError: string;
    updateUserImageRequest(payload: UpdateUserImageBodyType): void;
}

export const useUserProfile = (): UseUserProfileReturn => {
    const dispatch = useDispatch();
    const isUserImageLoading = useSelector(getIsLoading);
    const userDetail = useSelector(getUserInfo);
    const userError = useSelector(getUserError);
    const updateUserImageRequest = (payload: UpdateUserImageBodyType) => {
        dispatch(updateUserImage(payload));
    };
    return {
        isUserImageLoading,
        userDetail,
        userError,
        updateUserImageRequest,
    };
};
