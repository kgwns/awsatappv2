import {render, RenderAPI} from '@testing-library/react-native';
import React, {useState}  from 'react';
import DraggableVideoPlayer  from '../DraggableVideoPlayer';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

jest.mock("src/hooks/useAppPlayer", () => ({
  useAppPlayer: () => {
    return {
      showMiniPlayer: false,
      isPlaying: false,
      selectedTrack: {},
      showControls: false,
      setControlState: () => [],
      setShowMiniPlayer: () => [],
      setPlay: () => [],
      setPlayerTrack: () => [],
    }
  },
}));

describe('<DraggableVideoPlayer />', () => {
  let instance: RenderAPI;
  const url= "http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/94842";

  const sampleData: any = {current :
    [
    {
      body: 'example',
      title: 'example',
      nid: 'example',
      isBookmarked: true,
      type: 'example',
      blockName: 'example',
      position: 'example',
    },
    {
      body: 'example',
      title: 'example',
      nid: 'example',
      isBookmarked: true,
      type: 'example',
      blockName: 'example',
      position: 'example',
    },
    {
      body: 'example',
      title: 'example',
      nid: 'example',
      isBookmarked: true,
      type: 'example',
      blockName: 'example',
      position: 'example',
    },
    {
      body: 'example',
      title: 'example',
      nid: 'example',
      isBookmarked: true,
      type: 'example',
      blockName: 'example',
      position: 'example',
    },
  ]}

  const mockFunction = jest.fn();
  const setOrientation = mockFunction;

  beforeEach(() => {
    (useState as jest.Mock).mockImplementation(() => ['PORTRAIT', setOrientation]);
    const component = <DraggableVideoPlayer paused={false} url={url} videoRefs={sampleData} />
    instance = render(component)
  })

  afterEach(() => {
    jest.clearAllMocks()
    instance.unmount()
  })

  it('should render component', () => {
    expect(instance).toBeDefined()
  })
})

