import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import React from 'react';
import { AlbumListItemType } from 'src/redux/photoGallery/types';
import { PhotoGalleryItem } from '../PhotoGalleryItem';
import ArticleWithOutImage from 'src/components/molecules/ArticleWithOutImage';

jest.mock("src/hooks/useLogin", () => ({
    useLogin: () => {
      return {
        isLoggedIn: true,
      }
    },
  }));

describe('<PhotoGalleryDetailFooter>', () => {
    let instance: RenderAPI;
    const mockFunction = jest.fn();
    const mockString = 'mockString';
    const data: AlbumListItemType = {
        title: mockString,
        type: 'album',
        field_album_img_export: mockString,
        nid: '2982206',
        published_at_export: new Date(),
        field_publication_date_export: new Date(),
        created: new Date(),
        field_album_source_export: null,
        isBookmarked: false,
    };

    beforeEach(() => {
        const component = (
            <PhotoGalleryItem item={data}  isBookmarked={false} title={mockString} imageUrl={mockString} nid={mockString} created={new Date()} onUpdateBookmark={mockFunction} onPress={mockFunction} isFavouriteTab={false}/>
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

    it('Should call onPressBookmark', () => {
        const element = instance.container.findAllByType(ArticleWithOutImage)[0];
        fireEvent(element, 'onPressBookmark');
        expect(mockFunction).toHaveBeenCalled();
    });

    it('Should call onPress', () => {
        const element = instance.container.findAllByType(ArticleWithOutImage)[0];
        fireEvent(element, 'onPress');
        expect(mockFunction).toHaveBeenCalled();
    });

});

describe('<PhotoGalleryDetailFooter>', () => {
    let instance: RenderAPI;
    const mockFunction = jest.fn();
    const mockString = 'mockString';
    const data: AlbumListItemType = {
        title: mockString,
        type: 'album',
        field_album_img_export: mockString,
        nid: '2982206',
        published_at_export: new Date(),
        field_publication_date_export: new Date(),
        created: new Date(),
        field_album_source_export: null,
        isBookmarked: false,
    };

    beforeEach(() => {
        const component = (
            <PhotoGalleryItem item={data}  isBookmarked={false} title={mockString} imageUrl={mockString} nid={mockString} created={new Date()} onUpdateBookmark={mockFunction} onPress={mockFunction} isFavouriteTab={true}/>
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

    it('Should call onPressBookmark', () => {
        const element = instance.container.findAllByType(ArticleWithOutImage)[0];
        fireEvent(element, 'onPressBookmark');
        expect(mockFunction).toHaveBeenCalled();
    });

});
