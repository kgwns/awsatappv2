import React from 'react';
import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import { PDFArchiveIOS, PDFArchiveView } from '../PDFArchive.ios';
import { TouchableOpacity } from 'react-native';

describe('<PDFArchive>', () => {
    let instance: RenderAPI
    const mockFunction = jest.fn();

    beforeEach(() => {
        const component =  <PDFArchiveIOS />
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('Should render PDFArchive', () => {
        expect(instance).toBeDefined()
    })

    test('Should call PDFArchiveView onItemClick', () => {
        const element = instance.container.findByType(PDFArchiveView)
        fireEvent(element, 'onItemClick', { nativeEvent: {SelectedPDF: 'abc.pdf'} });
        expect(mockFunction).toBeTruthy();
    });

    test('Should call TouchableOpacity onPress', () => {
        const element = instance.container.findAllByType(TouchableOpacity)[0]
        fireEvent(element, 'onPress');
        expect(mockFunction).toBeTruthy();
    });
})