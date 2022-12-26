import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import React from 'react';
import { ButtonImage } from 'src/components/atoms/button-image/ButtonImage';
import { AlbumDetailType } from 'src/redux/photoGallery/types';
import { PhotoGalleryDetailFooter } from '../PhotoGalleryDetailFooter';

describe('<PhotoGalleryDetailFooter>', () => {
    let instance: RenderAPI;
    const mockFunction = jest.fn();
    const mockString = 'mockString';
    const data: AlbumDetailType = {
        title: mockString,
        type: 'album',
        field_album_img_export: mockString,
        field_photo_album_export: [mockString],
        body_export: mockString,
        nid: '2982206',
        view_node: mockString,
        created_export: new Date(),
        created: new Date(),
        field_album_source_export: null,
        isBookmarked: false,
    };

    beforeEach(() => {
        const component = (
            <PhotoGalleryDetailFooter albumData={data} isBookmarked={false} onPressSave={mockFunction} onPressFontChange={mockFunction} />
        );
        instance = render(component);
    });

    afterEach(() => {
        jest.clearAllMocks();
        instance.unmount();
    });

    it('should render PhotoGalleryDetailFooter component', () => {
        expect(instance).toBeDefined();
    });

    it('Should call font increase button', () => {
        const element = instance.container.findAllByType(ButtonImage)[0];
        fireEvent(element, 'onPress');
        expect(element).toBeTruthy();
    });

    it('Should call font increase button', () => {
        const element = instance.container.findAllByType(ButtonImage)[1];
        fireEvent(element, 'onPress');
        expect(element).toBeTruthy();
    });

    it('Should call share button', () => {
        const element = instance.container.findAllByType(ButtonImage)[2];
        fireEvent(element, 'onPress');
        expect(element).toBeTruthy();
    });
});
