import { useDispatch, useSelector } from "react-redux"
import { fetchEntityQueue } from "src/redux/entityQueue/action";
import { getEntityQueueError, getEntityQueueList, getIsLoading } from "src/redux/entityQueue/selectors";
import { EntityListPayloadType } from "src/redux/entityQueue/types";

export const useEntityQueue = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(getIsLoading);
    const entityQueueList = useSelector(getEntityQueueList);
    const entityQueueError = useSelector(getEntityQueueError);

    const entityQueueRequest = (payload: EntityListPayloadType) => {
        dispatch(fetchEntityQueue(payload));
    }

    return {
        isLoading,
        entityQueueError,
        entityQueueList,
        entityQueueRequest
    }
}