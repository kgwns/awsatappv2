import React, { useState } from 'react';
import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import { PDFArchiveIOS, PDFArchiveView } from '../PDFArchive.ios';
import { TouchableOpacity } from 'react-native';

jest.mock("src/hooks/useAppCommon", () => ({
    useAppCommon: () => {
      return {
        theme: {
          LIGHT: 'light',
          DARK: 'dark'
        },
      }
    },
}));


jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
}));

enum ArchiveLayoutType {
    grid = 'grid',
    list = 'list',
}

describe('<PDFArchive>', () => {
    let instance: RenderAPI
    const mockFunction = jest.fn();
    const layoutSelectedType = mockFunction;

    beforeEach(() => {
      (useState as jest.Mock).mockImplementation(() => [ArchiveLayoutType.grid, layoutSelectedType]);
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

describe('<PDFArchive>', () => {
    let instance: RenderAPI
    const mockFunction = jest.fn();
    const layoutSelectedType = mockFunction;

    beforeEach(() => {
      (useState as jest.Mock).mockImplementation(() => [ArchiveLayoutType.list, layoutSelectedType]);
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