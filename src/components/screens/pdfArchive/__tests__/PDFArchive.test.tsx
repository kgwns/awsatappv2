import React from 'react';
import { render, RenderAPI } from '@testing-library/react-native';
import { PDFArchive } from '..';

describe('<PDFArchive>', () => {
    let instance: RenderAPI

    beforeEach(() => {
        const component =  <PDFArchive />
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('Should render PDFArchive', () => {
        expect(instance).toBeDefined()
    })
})