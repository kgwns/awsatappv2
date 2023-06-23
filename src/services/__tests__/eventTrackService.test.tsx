import axios, { AxiosError } from "axios";
import MockAdapter from "axios-mock-adapter";
import { sendUserEventTracking, TrackEventBody, TrackingEventType } from "../eventTrackService";
import { store } from "src/redux/store";
describe('Check event track service', () => {
    const mock = new MockAdapter(axios);
    beforeEach(() => {
        jest.useFakeTimers({
            legacyFakeTimers: true
        });
    });
    afterEach(() => {
        mock.reset();
        jest.clearAllMocks();
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

    it('test eventTrackService when response code is 200',async () => {

        jest.spyOn(store,'getState').mockReturnValueOnce({userDetails:{userProfileData:{user:{id:'1423'}}}})
        jest.spyOn(axios,'post').mockReturnValueOnce(Promise.resolve({result:true}))

        await sendUserEventTracking(body);
        expect(axios.post).toHaveBeenCalled();
       
    });
    it('test eventTrackService when response code is 500', () => {

        mock.onPost().reply(500, ({
            error: 'Something Went Wrong',
        }));

        jest.spyOn(store,'getState').mockReturnValueOnce({userDetails:{userProfileData:{user:{id:'1423'}}}});

        return sendUserEventTracking(body).catch((error: unknown) => {
            const errorResponse = error as AxiosError;
            expect(errorResponse.response?.status).toEqual(500);
        })
    });
});
describe('Check event track service if user id is empty', () => {
    const mock = new MockAdapter(axios);
    beforeEach(() => {
        jest.useFakeTimers({
            legacyFakeTimers: true
        });
    });
    afterEach(() => {
        mock.reset();
        jest.clearAllMocks();
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

    it('test eventTrackService when response code is 200',async () => {

        jest.spyOn(store,'getState').mockReturnValueOnce({userDetails:{userProfileData:{user:{}}}})
        jest.spyOn(axios,'post').mockReturnValueOnce(Promise.resolve({result:true}))

        await sendUserEventTracking(body);
        expect(axios.post).toHaveBeenCalled();
       
    });
});