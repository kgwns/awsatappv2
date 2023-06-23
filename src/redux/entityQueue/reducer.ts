import { FETCH_ENTITY_QUEUE_DATA, FETCH_ENTITY_QUEUE_FAILED, FETCH_ENTITY_QUEUE_SUCCESS } from "./actionType";
import { EntityQueueActionType } from "./types";

const initialState = {
    entityQueueList: [],
    entityQueueListError: '',
    isEntityQueueLoading: false
}

export default (state = initialState, action: EntityQueueActionType) => {
    switch(action.type) {
        case FETCH_ENTITY_QUEUE_SUCCESS:
            return {
                ...state,
                isEntityQueueLoading: false,
                entityQueueList: action.payload.entityQueueList,
                entityQueueListError: ''
            };
        case FETCH_ENTITY_QUEUE_DATA: 
            return {
                ...state,
                isEntityQueueLoading: true,
                entityQueueListError: ''
            };
        case FETCH_ENTITY_QUEUE_FAILED:
            return {
                ...state,
                isEntityQueueLoading: false,
                entityQueueListError: action.payload.entityQueueListError
            };
        default: 
            return { ...state }
    }
}