import { AxiosError } from "axios";
import { fetchVideoDetail, FetchVideoDetailPayload, getVideoDetail } from "../videoDetailService";
import * as serviceApi from 'src/services/api';
describe('Check video Detail Service', () => {
    const videoDetailBody: FetchVideoDetailPayload = {
        nid: '10',
    }
    beforeEach(() => {
        jest.useFakeTimers({
            legacyFakeTimers: true
        });
    })
    afterEach(() => {
        jest.clearAllMocks();
    })
    
    it('test fetchVideoDetail when response code is 200', () => {
        jest.spyOn(serviceApi,'getCacheApiRequest').mockReturnValueOnce(Promise.resolve({rows:[{result:true}]}))
        
        return fetchVideoDetail(videoDetailBody).then(response => {
            expect(response).toBeInstanceOf(Object);
        });
    });
    
    it('test fetchVideoDetail when throws error', () => {
        const getCacheApiRequest = jest.spyOn(serviceApi, 'getCacheApiRequest');
        getCacheApiRequest.mockImplementationOnce(() => { throw new Error('Not able to fetch api') });
        
        return fetchVideoDetail(videoDetailBody).catch((error) => {
            expect(error.message).toEqual('Not able to fetch api');
        });
    });
    
    it('test getVideoDetail when response code is 200', () => {
        jest.spyOn(serviceApi,'getCacheApiRequest').mockReturnValueOnce(Promise.resolve({rows:[{result:true}]}))
        return getVideoDetail(videoDetailBody).then(response => {
            expect(response).toBeInstanceOf(Object);
        });
    });
    
    it('test when getVideoDetail throws error', () => {
        const getCacheApiRequest = jest.spyOn(serviceApi, 'getCacheApiRequest');
        getCacheApiRequest.mockImplementationOnce(() => { throw new Error('Not able to fetch api') });
        return getVideoDetail(videoDetailBody).catch((error) => {
            expect(error.message).toEqual('Not able to fetch api');
        });
    });

     it('test axios error is defined', () => {
        const getCacheApiRequest = jest.spyOn(serviceApi, 'getCacheApiRequest');
        getCacheApiRequest.mockRejectedValue(({response:{data:"error"}}));
        
        return getVideoDetail(videoDetailBody).catch((error:unknown) => {
            const errorResponse = error as AxiosError;
            expect(errorResponse.response?.data).toBeDefined();
        });
    });
    
});
