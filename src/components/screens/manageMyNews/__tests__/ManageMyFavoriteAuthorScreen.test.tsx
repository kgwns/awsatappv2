import React from 'react';
import { render, RenderAPI } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { storeSampleData } from '../../../../constants/SampleData';
import { ManageMyFavoriteAuthorScreen } from '../ManageMyFavoriteAuthorScreen';

jest.mock("src/hooks/useUserProfileData", () => ({
    useUserProfileData: () => {
      return {
        isLoading: false,
        userProfileData: {},
        userProfileError: 'string',
        sentUserProfileData: {},
        fetchProfileDataRequest: () => [],
        sendUserProfileInfo: () => [],
        updateUserImageRequest: () => [],
        emptyUserProfileInfoData: () => [],
      }
    },
}));

describe('<ManageMyFavoriteAuthorScreen>', () => {
    let instance: RenderAPI;

    beforeEach(() => {
        const component = (
            <Provider store={storeSampleData}>
                <ManageMyFavoriteAuthorScreen />
            </Provider>
        );
        instance = render(component);
    });

    afterEach(() => {
        jest.clearAllMocks();
        instance.unmount();
    });

    it('Should render ManageMyFavoriteAuthorScreen component', () => {
        expect(instance).toBeDefined();
    });
});
