import axios, { AxiosError, AxiosResponse } from "axios";
import MockAdapter from "axios-mock-adapter";
import { sendUserEventTracking, TrackEventBody, TrackingEventType } from "../eventTrackService";
import { store } from '../../redux/store'
describe('Check event track service', () => {
    const mock = new MockAdapter(axios);
    beforeEach(() => {
        jest.useFakeTimers('legacy');
    });
    afterEach(() => {
        mock.reset();
    });

    const body: TrackEventBody = {
        personId: '',
        events: [
            {
                contentId: '3662571',
                eventType: TrackingEventType.VIEW
            }
        ]
    }

    it('test eventTrackService when response code is 200', () => {
        store.getState().userDetails = {
            userProfileData: {
                user: {
                    id: '1431'
                }
            }
        }
        mock.onPost().reply(200,{
            result: true,
        });

        return sendUserEventTracking(body).then((response) => {
            expect(response).toBeInstanceOf(Object);
        })
    });

    it('test eventTrackService when response code is 500', () => {
        store.getState().userDetails = {
            userProfileData: {
                user: {
                    id: '1431'
                }
            }
        }
        mock.onPost().reply(500, ({
            error: 'Something Went Wrong',
        }))

        return sendUserEventTracking(body).catch((error: unknown) => {
            const errorResponse = error as AxiosError;
            expect(errorResponse.response?.status).toEqual(500);
        })
    });
});