import { FETCH_ENTITY_QUEUE_DATA, FETCH_ENTITY_QUEUE_FAILED, FETCH_ENTITY_QUEUE_SUCCESS } from "./actionType";
import { EntityListPayloadType, FetchEntityQueueType } from "./types";

export const fetchEntityQueue = (payload: EntityListPayloadType): FetchEntityQueueType => ({
    type: FETCH_ENTITY_QUEUE_DATA,
    payload
})

export const fetchEntityQueueSuccess = (payload: any) => ({
    type: FETCH_ENTITY_QUEUE_SUCCESS,
    payload
})

export const fetchEntityQueueFailed = (payload: any) => ({
    type: FETCH_ENTITY_QUEUE_FAILED,
    payload
})