import {UMS_BASE_URL} from 'src/services/apiUrls';
import {postApiRequest} from 'src/services/api';
import {CHANGE_PASSWORD } from './apiEndPoints';
import {
  SendNewPasswordFailedPayloadtype, SendNewPassword,
} from 'src/redux/changePassword/types';

export const changePasswordApi = async (body: SendNewPassword) => {
    try {
        const response: SendNewPasswordFailedPayloadtype =
            await postApiRequest(
                `${UMS_BASE_URL}${CHANGE_PASSWORD}${body.password}?old_password=${body.old_password}`,
                body
            );
        return response;
    } catch (error) {
        throw error;
    }
}