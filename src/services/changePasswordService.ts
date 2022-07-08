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
            // console.log('changePasswordApi', `${UMS_BASE_URL}${CHANGE_PASSWORD}?password=${body.password}?old_password=${body.old_password}`)
        return response;
    } catch (error) {
        console.log(`error1: ${error}`);
        throw error;
    }
}