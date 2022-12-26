import {GetFCMToken} from '../notification'
import { useNotificationSaveToken } from 'src/hooks';
import DeviceInfo from 'react-native-device-info';
import React from 'react';
import { render } from '@testing-library/react-native';
import { fireEvent, RenderAPI } from '@testing-library/react-native'

jest.mock('src/hooks/useNotificationSaveToken', () => ({useNotificationSaveToken: jest.fn()}));

describe('<GetFCMToken>', () => {
    const useNotificationSaveToken = jest.fn();
let instance:RenderAPI
    beforeEach(() => {
        useNotificationSaveToken.mockReturnValue({
            saveTokenRequest:{
                fcm_token: '',
                platform: '',
                device_name: '',
            }
          }); 
    })
    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })
    it('Should render component', () => {
        expect(instance).toBeDefined()
    })
})