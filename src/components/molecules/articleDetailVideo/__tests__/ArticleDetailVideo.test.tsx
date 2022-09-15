import { render, RenderAPI } from '@testing-library/react-native';
import React, { useRef, useState } from 'react';
import ArticleDetailVideo from '../ArticleDetailVideo';
import Video from 'react-native-video';
import {fetchVideoDetailInfo} from 'src/services/VideoServices';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
  useRef: jest.fn(),
}));

jest.mock('src/services/VideoServices', () => ({
  fetchVideoDetailInfo: jest.fn(),
}));

const sampleData = {
  title: "من هي خطيبة ولي عهد الأردن؟",
  description: "",
  playlist: [
      {
          "title": "من هي خطيبة ولي عهد الأردن؟",
          "mediaid": "DscUrCZ5",
          "link": "https://cdn.jwplayer.com/previews/DscUrCZ5",
          "image": "https://cdn.jwplayer.com/v2/media/DscUrCZ5/poster.jpg?width=720",
          "duration": 71,
          "pubdate": 1660838194,
          "description": "",
          "tags": "خطيبة ولي عهد الأردن",
          "sources": [
              {
                  "file": "https://cdn.jwplayer.com/videos/DscUrCZ5-9mPGCDe7.mp4",
                  "type": "video/mp4",
                  "height": 960,
                  "width": 960,
                  "label": "540p",
                  "bitrate": 823186,
                  "filesize": 7305781,
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

  beforeEach(() => {
    (useRef as jest.Mock).mockReturnValueOnce(videoPlayer);
    (useRef as jest.Mock).mockReturnValueOnce(videoRefs);
    (useState as jest.Mock).mockImplementation(() => ['https://cdn.jwplayer.com/videos/DscUrCZ5-9mPGCDe7.mp4', setPlayerUrl]);
    (fetchVideoDetailInfo as jest.Mock).mockReturnValueOnce(() => sampleData);
    const component = <ArticleDetailVideo paused={false} mediaId={'DscUrCZ5'} currentTime={'10:00:56'} playerVisible={true} isFullScreen={true} videoRefs={videoRefs} />
    instance = render(component)
    jest.useFakeTimers();
  })

  afterEach(() => {
    jest.clearAllMocks()
    instance.unmount()
  })

  it('should render component', () => {
    expect(instance).toBeDefined()
  })
  it('should render component', () => {
    expect(setPlayerUrl).toHaveBeenCalled()
  })
  it('should render component', () => {
    expect(fetchVideoDetailInfo).toBe(sampleData)
  })
})

