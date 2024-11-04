import MockAdapter from 'axios-mock-adapter';
import { fetchDocumentaryVideo } from 'src/services/videoDocumentaryService';
import { RequestDocumentaryVideoPayload } from 'src/redux/documentaryVideo/types'
import * as serviceApi from 'src/services/api'
describe('Test Video Documentary Services', () => {
    const cachedAxiosMock = new MockAdapter(serviceApi.apiWithCache);

    const requestObject: RequestDocumentaryVideoPayload = {
        page: 1,
        items_per_page: 1
    };
    beforeEach(() => {
        jest.useFakeTimers({
            legacyFakeTimers: true
        });
    })
    afterEach(() => {
        cachedAxiosMock.reset();
    });
    it('test when response code is 200', () => {
        cachedAxiosMock.onGet().reply(200, {
            result: true,
        });

        return fetchDocumentaryVideo(requestObject).then(response => {
            expect(response).toBeInstanceOf(Object);
        });
    });
    it('test fetchDocumentaryVideo throws error', () => {
        const getCacheApiRequest = jest.spyOn(serviceApi,'getCacheApiRequest');
        getCacheApiRequest.mockImplementationOnce(()=>{throw new Error('Not able to fetch api')})

        return fetchDocumentaryVideo(requestObject).catch((error) => {
            expect(error.message).toEqual('Not able to fetch api');
        });
    });
});