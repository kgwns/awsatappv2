import React from 'react';
import { render, RenderAPI } from '@testing-library/react-native';
import { PDFViewManager } from 'src/components/screens/pdfArchive/PDFArchiveViewManager';

describe('<PDFArchive>', () => {
    let instance: RenderAPI

    beforeEach(() => {
        const component =  <PDFViewManager />
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