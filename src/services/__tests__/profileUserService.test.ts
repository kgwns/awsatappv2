import axios, { AxiosError } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { SendUserData, UpdateUserImageBodyType } from 'src/redux/profileUserDetail/types';
import { fetchUserProfileApi, sendUserProfileApi, updateProfileUserImage } from '../profileUserService';
global.FormData = require('react-native/Libraries/Network/FormData');
describe('Test Profile User Services', () => {
    const mock = new MockAdapter(axios);

    const bodyUserData: SendUserData = {
        email: 'email'
    }

    const bodyUpdateUserProfile: UpdateUserImageBodyType = {
        image: 'image',
    };

    beforeEach(() => {
        jest.useFakeTimers({
            legacyFakeTimers: true
        });
    });

    afterEach(() => {
        mock.reset();
    });

    it('test when fetchUserProfileApi response code is 200', () => {
        mock.onPost().reply(200, {
            result: true,
        });

        return fetchUserProfileApi().then(response => {
            expect(response).toBeInstanceOf(Object);
        });
    });
    it('test when fetchUserProfileApi response code is 500', () => {
        mock.onPost().reply(500, {
            error: 'Something Went Wrong',
        });

        return fetchUserProfileApi().catch((error: unknown) => {
            const errorResponse = error as AxiosError;
            expect(errorResponse.response?.status).toEqual(500);
        });
    });
    it('test when sendUserProfileApi response code is 200', () => {
        mock.onPost().reply(200, {
            result: true,
        });

        return sendUserProfileApi(bodyUserData).then(response => {
            expect(response).toBeInstanceOf(Object);
        });
    });
    it('test when sendUserProfileApi response code is 500', () => {
        mock.onPost().reply(500, {
            error: 'Something Went Wrong',
        });

        return sendUserProfileApi(bodyUserData).catch((error: unknown) => {
            const errorResponse = error as AxiosError;
            expect(errorResponse.response?.status).toEqual(500);
        });
    });
    it('test when updateProfileUserImage response code is 200',()=>{
        mock.onPost().reply(200,{
            result:true,
        })

        return updateProfileUserImage(bodyUpdateUserProfile).then(response => {
            expect(response).toBeInstanceOf(Object);
        })
    })
    it('test when updateProfileUserImage response code is 500',()=>{
        mock.onPost().reply(500,{
            error: 'Something Went Wrong',
        })
        
        return updateProfileUserImage(bodyUpdateUserProfile).catch((error: unknown)=>{
            const errorResponse = error as AxiosError;
            expect(errorResponse.response?.status).toEqual(500);
        })
    })
});