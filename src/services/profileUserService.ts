import {UMS_BASE_URL} from 'src/services/apiUrls';
import {postApiRequest} from 'src/services/api';
import {USER_PROFILE_DETAIL, SEND_PROFILE_DETAIL} from './apiEndPoints';
import {
  FetchProfileUserDetailsSuccessPayloadType, SendUserData,
} from 'src/redux/profileUserDetail/types';
import { AxiosRequestHeaders } from 'axios';
import {store} from 'src/redux/store';

export const fetchUserProfileApi = async () => {
    const { token } = store.getState().login.loginData
    let header: AxiosRequestHeaders | undefined = undefined
    if (token) {
        const type = `${token.token_type} ` || 'Bearer '
        const accessToken = token.access_token
        header = {
            Authorization: type + accessToken
        }
    }
    try {
        const response: FetchProfileUserDetailsSuccessPayloadType =
            await postApiRequest(
                `${UMS_BASE_URL}${USER_PROFILE_DETAIL}`,
                undefined, undefined, header
            );
        return response;
    } catch (error) {
        console.log(`error: ${error}`);
        throw error;
    }
};

export const sendUserProfileApi = async (body: SendUserData) => {
    const { token } = store.getState().login.loginData
    let header: AxiosRequestHeaders | undefined = undefined
    if (token) {
        const type = `${token.token_type} ` || 'Bearer '
        const accessToken = token.access_token
        header = {
            Authorization: type + accessToken
        }
    }
    try {
        const response: FetchProfileUserDetailsSuccessPayloadType =
            await postApiRequest(
                `${UMS_BASE_URL}${SEND_PROFILE_DETAIL}${body.email}&first_name=${body.first_name}&occupation=${body.occupation}&birthday=${body.birthday}`,
                body, undefined, header
            );
        return response;
    } catch (error) {
        console.log(`error1: ${error}`);
        throw error;
    }
}