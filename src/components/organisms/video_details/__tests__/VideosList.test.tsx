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
        field_jwplayerinfo_export: "Sys74y7K|44|https://cdn.jwplayer.com/videos/Sys74y7K-9mPGCDe7.mp4",
        mediaId: 'example',
  },
  {
    nid: '12',
    title: 'example',
    created_export: 'example',
    field_image_upload_export: 'example',
    field_mp4_link_export: 'example',
    field_multimedia_section_export: {},
    description: 'example',
    body_export: 'example',
    isBookmarked: true,
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

    test('Should display the video and the time', () => {
      const element = instance.container.findByType(FlatList)
      fireEvent(element, 'renderItem', {item: videoData[0], index: 0});
      const videoVerticalList = instance.container.findAllByType(VideosVerticalList)[0];
      expect(videoVerticalList.props.imageUrl).toBe('https://aawsat.srpcdigital.com/example');
      expect(videoVerticalList.props.time).toBe('00:44');
    });

    test('Should not display the video and the time', () => {
      const element = instance.container.findByType(FlatList)
      fireEvent(element, 'renderItem', {item: videoData[1], index: 1});
      const videoVerticalList = instance.container.findAllByType(VideosVerticalList)[1];
      expect(videoVerticalList.props.imageUrl).toBeUndefined();
      expect(videoVerticalList.props.time).toBeUndefined();
    });

    test('Should call VideosVerticalList itemOnPress', () => {
      const component = (
        <VideosList data={videoData} onItemActionPress={mockFunction}/>
      );
      instance = render(component);
      const element = instance.container.findAllByType(VideosVerticalList)[0]
      fireEvent(element, 'itemOnPress', {item: videoData[0]});
      expect(mockFunction).toHaveBeenCalled()
    });

    test('Should not call VideosVerticalList itemOnPress', () => {
      const component = (
        <VideosList data={videoData} />
      );
      instance = render(component);
      const element = instance.container.findAllByType(VideosVerticalList)[0]
      fireEvent(element, 'itemOnPress', {item: videoData[0]});
      expect(mockFunction).not.toHaveBeenCalled()
    });

  });
});
