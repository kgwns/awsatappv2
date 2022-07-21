import React from 'react';
import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {storeSampleData} from '../../../constants/SampleData';
import {VideoContent} from '..';
import { VideoItemType } from 'src/redux/videoList/types';
import { TouchableOpacity } from 'react-native';

describe('<VideoContent>', () => {
  let instance: RenderAPI;
  const sampleData: VideoItemType[] = [
    {
      nid: '1',
      title: '123',
      isBookmarked: true
    },
    {
      nid: '2',
      title: '124',
      isBookmarked: true
    },
    {
      nid: '3',
      title: '124',
      isBookmarked: true
    },
  ];
  const mockFn = jest.fn();

  beforeEach(() => {
    const component = (
      <Provider store={storeSampleData}>
        <VideoContent data={sampleData} onPress={mockFn} isTabDesign={true}/>
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  test('Should render VideoContent component', () => {
    expect(instance).toBeDefined();
  });

});
