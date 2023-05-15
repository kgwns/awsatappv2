import { render, RenderAPI } from '@testing-library/react-native';
import React, { useRef, useState } from 'react';
import ArticleDetailVideo from '../ArticleDetailVideo';
import Video from 'react-native-video';
import { fetchVideoDetailInfo } from 'src/services/VideoServices';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
  useRef: jest.fn(),
}));

jest.mock('src/services/VideoServices', () => ({
  fetchVideoDetailInfo: jest.fn(),
}));

const sampleData = {
  playlist: [
    {
      sources: [
        {
          file: "https://cdn.jwplayer.com/videos/DscUrCZ5-9mPGCDe7.mp4",
          type: "video/mp4",
          height: 960,
          width: 960,
          label: "540p",
          bitrate: 823186,
          filesize: 7305781,
          framerate: 25.0
        }
      ],
    }
  ],
}

describe('<ArticleDetailVideo />', () => {
  let instance: RenderAPI
  const mockFunction = jest.fn();
  const videoRefs: any = { current: [Video] };
  const videoPlayer: any = { current: Video };
  const setPlayerUrl = mockFunction;
  const mockVideodetailinfo = fetchVideoDetailInfo as jest.Mock<any>;

  beforeEach(() => {
    jest.useFakeTimers({
      legacyFakeTimers: true
    });
    (useRef as jest.Mock).mockReturnValueOnce(videoPlayer);
    (useRef as jest.Mock).mockReturnValueOnce(videoRefs);
    (useState as jest.Mock).mockImplementation(() => ['https://cdn.jwplayer.com/videos/DscUrCZ5-9mPGCDe7.mp4', setPlayerUrl]);
    const component = <ArticleDetailVideo paused={false} mediaId={'DscUrCZ5'} currentTime={'10:00:56'} playerVisible={true} isFullScreen={true} videoRefs={videoRefs} />
    instance = render(component)
    jest.useFakeTimers({
      legacyFakeTimers: true
    });
  })

  afterEach(() => {
    jest.clearAllMocks()
    instance.unmount()
  })

  it('should render component', () => {
    expect(instance).toBeDefined()
  })
  it('should call mockVideodetailinfo',async () => {
    mockVideodetailinfo.mockImplementation(() => sampleData );
    expect(mockVideodetailinfo({mediaID: 'DscUrCZ5'})).toBe(sampleData);
  })
  it('should call mockVideodetailinfo throw error',async () => {
    mockVideodetailinfo.mockImplementation(() => { throw new Error('error Message')});
    try{
      await fetchVideoDetailInfo({mediaID:'23'});
    } catch(err: any) {
      expect(err.message).toEqual("error Message");
    }
  })
})

describe('<ArticleDetailVideo without mediaId />', () => {
  let instance: RenderAPI
  const mockFunction = jest.fn();
  const videoRefs: any = { current: [Video] };
  const videoPlayer: any = { current: Video };
  const setPlayerUrl = mockFunction;

  beforeEach(() => {
    (useRef as jest.Mock).mockReturnValueOnce(videoPlayer);
    (useRef as jest.Mock).mockReturnValueOnce(videoRefs);
    (useState as jest.Mock).mockImplementation(() => ['https://cdn.jwplayer.com/videos/DscUrCZ5-9mPGCDe7.mp4', setPlayerUrl]);
    const component = <ArticleDetailVideo paused={false} currentTime={'10:00:56'} playerVisible={true} isFullScreen={true} videoRefs={videoRefs} />
    instance = render(component)
    jest.useFakeTimers({
      legacyFakeTimers: true
    });
  })

  afterEach(() => {
    jest.clearAllMocks()
    instance.unmount()
  })

  it('should render component', () => {
    expect(instance).toBeDefined()
  })
})

