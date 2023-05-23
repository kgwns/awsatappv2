import { EntityListPayloadType } from "src/redux/entityQueue/types";
import { getApiRequest } from "./api"
import { ENTITY_QUEUE_LIST_END_POINT } from "./apiEndPoints"
import { ENTITY_QUEUE_BASE_URL } from "./apiUrls"

export const fetchEntityQueueAPI = async (payload:EntityListPayloadType) => {
    try {
        return await getApiRequest(
            `${ENTITY_QUEUE_BASE_URL}${ENTITY_QUEUE_LIST_END_POINT}/${payload.id}`
        );
    } catch(error) {
        console.log('entityQueueService-fetchEntityQueueAPI - error', error);
        throw error;
    }
}