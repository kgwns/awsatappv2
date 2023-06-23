import { AppState, Selector } from "../rootReducer";

export const getIsLoading: Selector<boolean> = (state: AppState) => state.entityQueue.isEntityQueueLoading;

export const getEntityQueueList: Selector<any> = (state: AppState) => state.entityQueue.entityQueueList;

export const getEntityQueueError: Selector<any> = (state: AppState) => state.entityQueue.entityQueueListError;
