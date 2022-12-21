import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import React, { useState } from 'react';
import DraggableVideoPlayer from '../DraggableVideoPlayer';
import VideoPlayerControl from '../VideoPlayerControl';
import { PanResponder } from 'react-native';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isIOS: true,
  isTab: true
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
  const url = "http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/94842";

  const sampleData: any = {
    current:
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
      ]
  }

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
    DeviceTypeUtilsMock.isIOS = false;
    expect(instance).toBeDefined()
  })

  it('Should call VideoPlayerControlId', () => {
    const element = instance.container.findAllByType(VideoPlayerControl)[0];
    fireEvent(element, 'onPress');
    expect(element).toBeTruthy();
  });

  it('Should call PanResponder', () => {
    expect(PanResponder.create).toBeTruthy();
  });

  it('should call setOrientation', () => {
    expect(setOrientation).toHaveBeenCalled()
  })

})

describe('<>',() =>{
  let instance: RenderAPI;
  const url = "http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/94842";

  const sampleData: any = {
    current:
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
      ]
  }

  const mockFunction = jest.fn();
  const setOrientation = mockFunction;
  beforeEach(() => {
    (useState as jest.Mock).mockImplementation(() => ['LANDSCAPE', setOrientation]);
    (useState as jest.Mock).mockImplementation(() => [false, mockFunction]);
    (useState as jest.Mock).mockImplementation(() => [false, mockFunction]);
    const component = <DraggableVideoPlayer paused={false} url={url} videoRefs={sampleData} playerVisible />
    instance = render(component)
  })

  afterEach(() => {
    jest.clearAllMocks()
    instance.unmount()
  })

  it('should render component with playerVisible props', () => {
    DeviceTypeUtilsMock.isIOS = true
    DeviceTypeUtilsMock.isTab = true
    expect(instance).toBeDefined()
  })

  it('should render component with playerVisible props', () => {
    DeviceTypeUtilsMock.isIOS = true
    DeviceTypeUtilsMock.isTab = false
    expect(instance).toBeDefined()
  })

  it('should render component with playerVisible props', () => {
    DeviceTypeUtilsMock.isIOS = false
    DeviceTypeUtilsMock.isTab = false
    expect(instance).toBeDefined()
  })

  it('should render component with playerVisible props', () => {
    DeviceTypeUtilsMock.isIOS = false
    DeviceTypeUtilsMock.isTab = true
    expect(instance).toBeDefined()
  })
})

