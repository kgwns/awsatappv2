import React from 'react'
import { render, RenderAPI } from '@testing-library/react-native'
import { FetchArabicData } from '../RemoteConfig'
import { useFetchArabicData } from 'src/hooks/useFetchArabicData';

jest.mock("@react-native-firebase/remote-config", () => ({
    firebase: {
      remoteConfig: () => ({
        setDefaults: jest.fn().mockResolvedValueOnce({
            fetchAndActivate: jest.fn()
        }),
        fetchAndActivate: jest.fn(),
        getValue:() => ({
            _value: {
                arabicWords: 'arabic'
            }
        })
        
      })
    },
}));

jest.mock('src/hooks/useFetchArabicData', () => ({
    useFetchArabicData: jest.fn()
}));

describe('<FetchArabicData>', () => {
    const useFetchArabicDataMock = jest.fn();
    let instance:RenderAPI
    beforeEach(() => {
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