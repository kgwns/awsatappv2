import axios, { AxiosError } from "axios";
import MockAdapter from "axios-mock-adapter"
import { fetchVideoDetail, FetchVideoDetailPayload, getVideoDetail } from "../videoDetailService";
import * as serviceApi from 'src/services/api';
import * as videoDetailService from '../videoDetailService';
describe('Check video Detail Service',()=>{
    const mock = new MockAdapter(axios);
    const videoDetailBody:FetchVideoDetailPayload = {
        nid:'10',
    }
    beforeEach(()=>{
        jest.useFakeTimers('legacy');
    })
    afterEach(()=>{
        jest.clearAllMocks();
    })
    it('test fetchVideoDetail when response code is 200',()=>{
        mock.onGet().reply(200,{
            result:true,
        });

        return fetchVideoDetail(videoDetailBody).then(response => {
            expect(response).toBeInstanceOf(Object);
        });
    });

    it('test fetchVideoDetail when throws error',()=>{
        const getCacheApiRequest = jest.spyOn(serviceApi, 'getCacheApiRequest');
        getCacheApiRequest.mockImplementationOnce(() => { throw new Error('Not able to fetch api') });

        return fetchVideoDetail(videoDetailBody).catch((error) => {
            expect(error.message).toEqual('Not able to fetch api');
        });
    });

    it('test getVideoDetail when response code is 200',()=>{
        mock.onGet().reply(200,{
            result:true,
        });
        return getVideoDetail(videoDetailBody).then(response => {
            expect(response).toBeInstanceOf(Object);
        });
    });

    it('test when getVideoDetail throws error',()=>{
        const getCacheApiRequest = jest.spyOn(serviceApi, 'getCacheApiRequest');
        getCacheApiRequest.mockImplementationOnce(() => { throw new Error('Not able to fetch api') });

        return getVideoDetail(videoDetailBody).catch((error) => {
            expect(error.message).toEqual('Not able to fetch api');
        });
    });

});