import { UMS_BASE_URL } from 'src/services/apiUrls';
import { postApiRequest } from 'src/services/api';
import { CONTACT_US_END_POINT } from './apiEndPoints';
import { payloadType } from 'src/redux/latestNews/types';
import { SendContactUsInfoPayload } from '~/redux/contactUs/types';

export const sendContactUsService = async (body: SendContactUsInfoPayload) => {
    try {
        const response: payloadType = await postApiRequest(
            `${UMS_BASE_URL}${CONTACT_US_END_POINT}`, body
        );
        return response;
    } catch (error) {
        console.log(`error: ${error}`);
        throw error;
    }
};