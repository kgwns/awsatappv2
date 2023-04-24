import React, { useState } from 'react'
import { fireEvent, render, RenderAPI } from '@testing-library/react-native'
import VideoPlayerFullScreen from '../VideoPlayerFullScreen';
import Slider from '@react-native-community/slider';
import Video from 'react-native-video';
import { AppState } from 'react-native';
import { images } from 'src/shared/styles/images';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn().mockImplementation(() => [ true, () => null]),
}));

const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isIOS: false,
  isTab: false
}));

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
  useIsFocused: () => jest.fn().mockImplementation(() => Boolean),
  useFocusEffect: () => jest.fn().mockImplementation(() => jest.fn())
}));

describe('<VideoPlayerFullScreen>',() => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const url = 'https://content.jwplatform.com/videos/nzSJqVya-9mPGCDe7.mp4';
  beforeEach(() => {
    jest.useFakeTimers('legacy');
    const component = <VideoPlayerFullScreen url={url} title ={'title'} isPaused={false} onChangeFullScreen={mockFunction} onClose={mockFunction} testID={'id'}/>
    instance = render(component)
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Display control icons while touch the screen",() => {
    const element = instance.getByTestId('VideoPlayerFullScreenId');
    fireEvent(element, 'onPress');
    expect(instance.queryByTestId('topControlId')).not.toBeNull();
  });

  it("should display Control icons",() => {
    expect(instance.queryByTestId('topControlId')).not.toBeNull();
  });

  it("should click close button and call onClose function to close the video",() => {
    const closeId = instance.getByTestId('renderCloseButtonID');
    fireEvent.press(closeId);
    expect(instance.container.props.onClose).toHaveBeenCalled();
  })

  it("Should Display expand icon when the screen is not in full screen and calls toggleFullScreen",() => {
    const component = <VideoPlayerFullScreen isFullScreen={false} url={url} title ={'title'} isPaused={false} onChangeFullScreen={mockFunction} onClose={mockFunction} testID={'id'}/>
    instance = render(component)
    DeviceTypeUtilsMock.isTab = false;
    const toggleFullScreenId = instance.getByTestId('toggleFullscreenID01');
    fireEvent.press(toggleFullScreenId);
    const imageElement = instance.getByTestId('fullScreenIconId');
    expect(imageElement.props.source).toBe(images.expandIcon);
  });

  it("Should Display shrink icon when the screen is in full screen and calls toggleFullScreen",() => {
    const component = <VideoPlayerFullScreen isFullScreen={true} url={url} title ={'title'} isPaused={false} onChangeFullScreen={mockFunction} onClose={mockFunction} testID={'id'}/>
    instance = render(component)
    DeviceTypeUtilsMock.isTab = false;
    const toggleFullScreenId = instance.getByTestId('toggleFullscreenID01');
    fireEvent.press(toggleFullScreenId);
    const imageElement = instance.getByTestId('fullScreenIconId');
    expect(imageElement.props.source).toBe(images.shirnkIcon);
  });

  it('Should test Slider', () => {
    const element = instance.container.findAllByType(Slider)[0];
    fireEvent(element, 'onSlidingComplete',10);
    expect(element.props.inverted).toBeTruthy();
  });

  it('Should display play icon when the user pause the video', () => {
    const element = instance.getByTestId('renderPlaypauseID');
    fireEvent(element, 'onPress');
    const playPauseIconId = instance.getByTestId('playPauseIconId');
    expect(playPauseIconId.props.source).toEqual(images.playIconWhite);
    const videoElement = instance.container.findAllByType(Video)[0];
    expect(videoElement.props.paused).toBeTruthy();
  });

})

describe('<VideoPlayerFullScreen> in tab',() => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const url = 'https://content.jwplatform.com/videos/nzSJqVya-9mPGCDe7.mp4';
  beforeEach(() => {
    DeviceTypeUtilsMock.isTab = true;
    const component = <VideoPlayerFullScreen url={url} title ={'title'} isPaused={false} onChangeFullScreen={mockFunction} onClose={mockFunction} testID={'id'}/>
    instance = render(component)
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should not display toggleFullScreen icon in Tab/iPad",() => {
    expect(instance.queryByTestId('toggleFullscreenID01')).toBeNull();
  });

})

describe('<VideoPlayerFullScreen>',() => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const url = 'https://content.jwplatform.com/videos/nzSJqVya-9mPGCDe7.mp4';
  const setState = mockFunction;
  beforeEach(() => {
    (useState as jest.Mock).mockImplementationOnce(() => [true, setState]).mockImplementationOnce(() => [false, setState]).mockImplementationOnce(() => [false, setState]).mockImplementationOnce(() => [false, setState]);
    DeviceTypeUtilsMock.isTab = true;
    const component = <VideoPlayerFullScreen url={url} title ={'title'} isPaused={false} onChangeFullScreen={mockFunction} onClose={mockFunction} testID={'id'}/>
    instance = render(component)
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should display pause icon when the user play the video', () => {
    const element = instance.getByTestId('renderPlaypauseID');
    fireEvent(element, 'onPress');
    const playPauseIconId = instance.getByTestId('playPauseIconId');
    expect(playPauseIconId.props.source).toEqual(images.pauseIconWhite);
    const videoElement = instance.container.findAllByType(Video)[0];
    expect(videoElement.props.paused).toBeFalsy();
  });

})


describe('<VideoPlayerFullScreen>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const url = 'https://content.jwplatform.com/videos/nzSJqVya-9mPGCDe7.mp4';

  beforeEach(() => {
    jest.useFakeTimers('legacy');
    const component = <VideoPlayerFullScreen url={url} title={'title'} isPaused={false} onChangeFullScreen={mockFunction} onClose={mockFunction} testID={'id'} />
    instance = render(component)
  })

  afterEach(() => {
    jest.clearAllMocks()
    instance.unmount()
  })

  it('Should render VideoPlayer in iOS', () => {
    DeviceTypeUtilsMock.isIOS = true;
    expect(instance).toBeDefined()
  })

  it('Should pause the video, when the video ends', () => {
    const element = instance.container.findAllByType(Video)[0];
    fireEvent(element, 'onEnd');
    jest.spyOn(global, 'setTimeout');
    jest.runAllTimers();
    const videoElement = instance.container.findByType(Video);
    expect(videoElement.props.paused).toBeTruthy();
  });

  it('Should display control icons when the video loads', () => {
    const element = instance.container.findAllByType(Video)[0];
    fireEvent(element, 'onLoad', { data: { duration: 0 } });
    expect(instance.queryByTestId('topControlId')).not.toBeNull();
  });

  it('Should display control icons when the video load starts', () => {
    const element = instance.container.findAllByType(Video)[0];
    fireEvent(element, 'onLoadStart');
    expect(instance.queryByTestId('topControlId')).not.toBeNull();
  });

  it('Should pause the video, when the app is in inactive state', async () => {
    const appStateSpy = jest.spyOn(AppState, 'addEventListener');
    AppState.currentState = 'inactive';
    await appStateSpy.mock.calls[0][1]('active');
    const videoElement = instance.container.findByType(Video);
    expect(videoElement.props.paused).toBeTruthy();
  });

  it('Should pause the video, when the app is in active state', async () => {
    const appStateSpy = jest.spyOn(AppState, 'addEventListener');
    AppState.currentState = 'active';
    await appStateSpy.mock.calls[0][1]('inactive');
    const videoElement = instance.container.findByType(Video);
    expect(videoElement.props.paused).toBeTruthy();
  });
})

describe("<VideoPlayerFullScreen>", () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const setState = mockFunction;
  beforeEach(() => {
    jest.spyOn(React,'useRef').mockReturnValue({current: 10});
    (useState as jest.Mock).mockImplementation(() => [false,setState]);
    const component = <VideoPlayerFullScreen url={'url'} title={'title'} isPaused={false} onChangeFullScreen={mockFunction} onClose={mockFunction} testID={'id'} />
    instance = render(component);
  })
  afterEach(() => {
    jest.clearAllMocks();
  })
  it("Drag the video with currentTime as 10 and the video should not paused",() => { 
    const element = instance.container.findByType(Video);
    fireEvent(element,'onProgress',{currentTime:2,seekableDuration: 40});
    expect(element.props.paused).toBeFalsy();
  });
  it("Drag the video with currentTime as 10 and the video should not paused",() => {
    const element = instance.container.findByType(Video);
    fireEvent(element,'onProgress',{currentTime:10,seekableDuration: 40});
    expect(element.props.paused).toBeFalsy();
  });
  it("Drag the video with currentTime as 20 and the video should not paused",() => {
    const element = instance.container.findByType(Video);
    fireEvent(element,'onProgress',{currentTime:20,seekableDuration: 40});
    expect(element.props.paused).toBeFalsy();
  });
  it("Should call onprogress when the video complete",() => {
    const element = instance.container.findByType(Video);
    fireEvent(element,'onProgress',{currentTime: 0,seekTime: 0});
    expect(element.props.paused).toBeFalsy();
  })
  it("Should call onprogress",() => {
    const element = instance.container.findByType(Video);
    fireEvent(element,'onProgress',{currentTime: 0,seekTime: 10});
    expect(element.props.paused).toBeFalsy();
  })
})

describe('<VideoPlayerFullScreen>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const url = 'https://content.jwplatform.com/videos/nzSJqVya-9mPGCDe7.mp4';
  const tapActionTimeout = mockFunction;

  beforeEach(() => {
    jest.useFakeTimers('legacy');
    (useState as jest.Mock).mockImplementationOnce(() => [false, tapActionTimeout]);
    const component = <VideoPlayerFullScreen title = {'title'} url={url} isPaused={false} onChangeFullScreen={mockFunction} onClose={mockFunction} testID={'id'} />
    instance = render(component)
  })

  afterEach(() => {
    jest.clearAllMocks()
    instance.unmount()
  })

  it('Should call onLoad and it should not display control icons', () => {
    const element = instance.container.findAllByType(Video)[0];
    fireEvent(element, 'onLoad', { data: { duration: 0 } });
    jest.runAllTimers();
    expect(instance.queryByTestId('topControlId')).toBeNull();
  });
});

describe('<VideoPlayerFullScreen>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const url = 'https://content.jwplatform.com/videos/nzSJqVya-9mPGCDe7.mp4';
  const isLoading = mockFunction;

  beforeEach(() => {
    jest.useFakeTimers('legacy');
    (useState as jest.Mock).mockImplementation(() => [true, isLoading]);
    const component = <VideoPlayerFullScreen title = {'title'} url={url} isPaused={false} onChangeFullScreen={mockFunction} onClose={mockFunction} testID={'id'} />
    instance = render(component)
  })

  afterEach(() => {
    jest.clearAllMocks()
    instance.unmount()
  })

  it('Should display loadingState when the video loads', () => {
    const element = instance.container.findByType(Video);
    fireEvent(element,'onProgress',{currentTime: 3});
    expect(instance.queryByTestId('loading')).not.toBeNull();
  });

  it("should Display LoadingState",() => {
    expect(instance.queryByTestId('loading')).not.toBeNull();
  })
});
