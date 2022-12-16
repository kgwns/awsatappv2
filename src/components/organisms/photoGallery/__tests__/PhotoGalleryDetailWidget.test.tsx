import { render, RenderAPI } from '@testing-library/react-native';
import { PhotoGalleryDetailWidget } from '../PhotoGalleryDetailWidget';
import React from 'react';

const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
    ...jest.requireActual('src/shared/utils/dimensions'),
    isTab: false,
    isIOS: true
}));

describe("test PhotoGalleryDetailWidget", () => {
    let instance: RenderAPI
    const data = {
        created: 'created',
        body_export: 'body_export',
        field_photo_album_export: [
            {
                image: 'image1'
            },
            {
                image: 'image2'
            }
        ],
        captions: [
            {
                caption: true
            }
        ]
    }
    beforeEach(() => {
        const component = (
            <PhotoGalleryDetailWidget data={data} fontSize={16} />
        )
        instance = render(component)
    })
    afterEach(() => {
        jest.clearAllMocks();
        instance.unmount();
    })
    it('should render a component in ios', () => {
        expect(instance).toBeDefined();
    })
    it('should render a component in android', () => {
        DeviceTypeUtilsMock.isIOS = false
        expect(instance).toBeDefined();
    })
})

describe("test PhotoGalleryDetailWidget which returns renderImagesWithText", () => {
    let instance: RenderAPI;
    const data = {
        created: 'created',
        body_export: 'body_export',
        field_photo_album_export: [],
    }
    beforeEach(() => {
        const component = (
            <PhotoGalleryDetailWidget data={data} fontSize={16} />
        )
        instance = render(component)
    })
    afterEach(() => {
        jest.clearAllMocks();
        instance.unmount();
    })
    it('should render a component in ios', () => {
        expect(instance).toBeDefined();
    })
    it('should render a component in android', () => {
        DeviceTypeUtilsMock.isIOS = false
        expect(instance).toBeDefined();
    })
})