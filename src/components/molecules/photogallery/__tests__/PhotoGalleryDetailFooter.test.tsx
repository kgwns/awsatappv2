import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import React from 'react';
import Share from 'react-native-share';
import { ButtonImage } from 'src/components/atoms/button-image/ButtonImage';
import { AlbumDetailType } from 'src/redux/photoGallery/types';
import { PhotoGalleryDetailFooter } from '../PhotoGalleryDetailFooter';
const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isTab: false
}));

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

    it('Should call share button return response', () => {
        jest.spyOn(Share,'open').mockResolvedValue({response:true} as any);
        const element = instance.container.findAllByType(ButtonImage)[1];
        fireEvent(element, 'onPress');
        expect(element).toBeTruthy();
    });

    it('Should call share button throws error', () => {
        jest.spyOn(Share,'open').mockRejectedValue('error');
        const element = instance.container.findAllByType(ButtonImage)[1];
        fireEvent(element, 'onPress');
        expect(element).toBeTruthy();
    });

    it('Should call save button', () => {
        const element = instance.container.findAllByType(ButtonImage)[2];
        fireEvent(element, 'onPress');
        expect(element).toBeTruthy();
    });
});

describe('render isBookmarked as true in <PhotoGalleryDetailFooter> ', () => {
    let instance: RenderAPI;
    
    beforeEach(() => {
        const component = (
            <PhotoGalleryDetailFooter albumData={data} isBookmarked={true} onPressSave={mockFunction} onPressFontChange={mockFunction} />
        );
        instance = render(component);
    });

    afterEach(() => {
        jest.clearAllMocks();
        instance.unmount();
    });

    it('should render PhotoGalleryDetailFooter component', () => {
        DeviceTypeUtilsMock.isIOS = false;
        expect(instance).toBeDefined();
    });

    it('should render PhotoGalleryDetailFooter component in iOS', () => {
        DeviceTypeUtilsMock.isIOS = true;
        expect(instance).toBeDefined();
    });

    it('should render PhotoGalleryDetailFooter component in Tab', () => {
        DeviceTypeUtilsMock.isTab = true;
        expect(instance).toBeDefined();
    });
});

describe('render <PhotoGalleryDetailFooter> with tab true ', () => {
    let instance: RenderAPI;

    beforeEach(() => {
        DeviceTypeUtilsMock.isTab = true;
        const component = (
            <PhotoGalleryDetailFooter albumData={data} isBookmarked={true} onPressSave={mockFunction} onPressFontChange={mockFunction} />
        );
        instance = render(component);
    });

    afterEach(() => {
        jest.clearAllMocks();
        instance.unmount();
    });

    it('should render PhotoGalleryDetailFooter component in Tab', () => {
        expect(instance).toBeDefined();
    });
});

