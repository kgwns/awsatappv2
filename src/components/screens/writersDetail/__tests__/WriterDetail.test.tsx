import { render, RenderAPI } from '@testing-library/react-native'
import React, { useState } from 'react'
import { Provider } from 'react-redux'
import { storeSampleData } from 'src/constants/SampleData'
import { WritersDetailScreen } from '../WritersDetailScreen'
jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
  }));

describe('< Writer Detail >', () => {
    let instance: RenderAPI
    const mockFunction = jest.fn();
  const setWriterDetailInfo = mockFunction;
  const setShowPopUp = mockFunction;
  const setPage = mockFunction;
  const setOpinionsDataInfo = mockFunction;

    beforeEach(() => {
    (useState as jest.Mock).mockImplementation(() => [[], setWriterDetailInfo]);
    (useState as jest.Mock).mockImplementation(() => [false, setShowPopUp]);
    (useState as jest.Mock).mockImplementation(() => [0, setPage]);
    (useState as jest.Mock).mockImplementation(() => [[], setOpinionsDataInfo]);
        const component =
            <Provider store={storeSampleData}>
                <WritersDetailScreen route={{params: {tid: '12345'}}}/>
            </Provider>
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    test('Should render component', () => {
        expect(instance).toBeDefined()
    })
})