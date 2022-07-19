import { UMS_BASE_URL } from 'src/services/apiUrls';
import { postApiRequest } from 'src/services/api';
import { CONTACT_US_END_POINT } from './apiEndPoints';
import { SendContactUsInfoPayload } from 'src/redux/contactUs/types';

export const sendContactUsService = async (body: SendContactUsInfoPayload) => {
    try {
        const response: { message: any } = await postApiRequest(
            `${UMS_BASE_URL}${CONTACT_US_END_POINT}`, body
        );
        return response;
    } catch (error) {
        console.log(`error: ${error}`);
        throw error;
    }
};