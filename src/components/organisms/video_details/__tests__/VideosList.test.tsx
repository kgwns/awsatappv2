import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import { VideosList } from '../VideosList';
import { FlatList } from 'react-native';
import { VideosVerticalList } from 'src/components/molecules';

const videoData = [
  {
        nid: '12',
        title: 'example',
        created_export: 'example',
        field_image_upload_export: 'example',
        field_mp4_link_export: 'example',
        field_multimedia_section_export: {},
        field_thumbnil_multimedia_export: 'example',
        description: 'example',
        body_export: 'example',
        isBookmarked: true,
        field_jwplayerinfo_export: 'example',
        mediaId: 'example',
  },
  {
    nid: '12',
    title: 'example',
    created_export: 'example',
    field_image_upload_export: 'example',
    field_mp4_link_export: 'example',
    field_multimedia_section_export: {},
    field_thumbnil_multimedia_export: 'example',
    description: 'example',
    body_export: 'example',
    isBookmarked: true,
    field_jwplayerinfo_export: 'example',
    mediaId: 'example',
},
]

describe('<VideosList>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();

  describe('when VideosList only', () => {
    beforeEach(() => {
      const component = (
          <VideosList data={videoData} onItemActionPress={mockFunction}/>
      );
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    it('Should render VideosList', () => {
      expect(instance).toBeDefined();
    });
    
    test('Should call FlatList onPress', () => {
      const element = instance.container.findByType(FlatList)
      fireEvent(element, 'renderItem', {item: videoData[0], index: 0});
      expect(mockFunction).toBeTruthy()
    });

    test('Should call VideosVerticalList itemOnPress', () => {
      const element = instance.container.findAllByType(VideosVerticalList)[0]
      fireEvent(element, 'itemOnPress', {item: videoData[0]});
      expect(mockFunction).toBeTruthy()
    });

  });
});
