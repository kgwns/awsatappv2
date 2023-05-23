import axios, { AxiosError } from 'axios';
import { store } from 'src/redux/store';

export enum TrackingEventType {
  VIEW = 'VIEW',
  BOOKMARK = 'BOOKMARK',
  FOLLOW = 'FOLLOW'
}

export type TrackEventBody = {
  personId?: string;
  events: TrackEventPayloadType[];
}

export type TrackEventPayloadType = {
  contentId: string
  eventType: TrackingEventType
}

export const sendUserEventTracking = async (body: TrackEventBody) => {
  const { userProfileData } = store.getState().userDetails
  const info: TrackEventBody = {
    ...body,
    personId: JSON.stringify(userProfileData.user?.id) ?? ''
  }

  // Token will be static one and it won't have expire
  const url = `https://awsatapi.srpcdigital.com/baker/logger/event/srpcawsatdev`
  axios
    .post(url, JSON.stringify(info), {
      headers: {
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkZXZpY2UiOiJ3ZWIiLCJkb21haW4iOiJzcnBjYXdzYXRkZXYifQ.1mo2J6-2oziwAqPEqVcv0PO53ymrdEw8I5_j6GZvNYY',
        'Content-Type': 'application/json'
      },
    })
    .then(response => {
      return response.data
    })
    .catch((error: unknown) => {
      const errorResponse = error as AxiosError;
      console.log('sendUserEventTracking Error :::', errorResponse);
      throw errorResponse
    });
};
