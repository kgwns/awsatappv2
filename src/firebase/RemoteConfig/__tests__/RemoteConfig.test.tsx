import React from 'react'
import { render, RenderAPI } from '@testing-library/react-native'
import { FetchArabicData } from '../RemoteConfig'
import { useFetchArabicData } from 'src/hooks/useFetchArabicData';
import { firebase } from '@react-native-firebase/remote-config';
jest.mock("@react-native-firebase/remote-config", () => ({
    firebase: {
      remoteConfig: jest.fn()
    },
}));

jest.mock('src/hooks/useFetchArabicData', () => ({
    useFetchArabicData: jest.fn()
}));

describe('<FetchArabicData>', () => {
    const useFetchArabicDataMock = jest.fn();
    let instance:RenderAPI
    beforeEach(() => {
        (firebase.remoteConfig as jest.Mock).mockReturnValue({
            setDefaults: jest.fn().mockResolvedValueOnce({
                fetchAndActivate: jest.fn()
            }),
            fetchAndActivate: jest.fn(),
            getValue:() => ({
                _value: JSON.stringify({
                    arabicWords: 'arabic'
                })
            })
            
          });
        (useFetchArabicData as jest.Mock).mockImplementation(useFetchArabicDataMock);
        useFetchArabicDataMock.mockReturnValue({fetchArabicData:() => {}});

        const component = (
              <FetchArabicData />
          );
          instance = render(component);
    })
    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })
    it('Should render component', () => {
        expect(instance).toBeDefined()
    })
})

describe('<FetchArabicData>', () => {
    const useFetchArabicDataMock = jest.fn();
    let instance:RenderAPI
    beforeEach(() => {
        (firebase.remoteConfig as jest.Mock).mockReturnValue({
            setDefaults: jest.fn().mockResolvedValueOnce({
                fetchAndActivate: jest.fn()
            }),
            fetchAndActivate: jest.fn(),
            getValue:() => ({
                _value: {
                    arabicWords: 'arabic'
                }
            })
            
          });
        (useFetchArabicData as jest.Mock).mockImplementation(useFetchArabicDataMock);
        useFetchArabicDataMock.mockReturnValue({fetchArabicData:() => {}});

        const component = (
              <FetchArabicData />
          );
          instance = render(component);
    })
    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })
    it('Should render component', () => {
        expect(instance).toBeDefined()
    })
})