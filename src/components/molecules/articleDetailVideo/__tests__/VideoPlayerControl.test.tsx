import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import React, { useState, useRef } from 'react';
import VideoPlayerControl from '../VideoPlayerControl';
import Video from 'react-native-video';
import { AppState } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
  useRef: jest.fn(),
}));

const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isIOS: false
}));

jest.mock("src/hooks/useAppPlayer", () => ({
  useAppPlayer: () => {
    return {
      showMiniPlayer: true,
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

describe('<VideoPlayerControl>', () => {
  let instance: RenderAPI;
 
  const mockFunction = jest.fn();
  const setCurrentTime = mockFunction;
  const setDuration = mockFunction;
  const setIsLoading = mockFunction;
  const setPaused = mockFunction;
  const setTapActionTimeout = mockFunction;
  const setShowControls = mockFunction;
  const setInitialPlay = mockFunction;
  const setScreenType = mockFunction;
  const videoPlayer = mockFunction;

  describe('<VideoPlayerControl> with miniPlayer true', () => {

    beforeEach(() => {
      jest.useFakeTimers({
        legacyFakeTimers: true
      });
      (useRef as jest.Mock).mockImplementation(() => [sampleData, videoPlayer]);
      (useState as jest.Mock).mockImplementation(() => [0, setCurrentTime]);
      (useState as jest.Mock).mockImplementation(() => [0, setDuration]);
      (useState as jest.Mock).mockImplementation(() => [true, setIsLoading]);
      (useState as jest.Mock).mockImplementation(() => [true, setPaused]);
      (useState as jest.Mock).mockImplementation(() => ['null', setTapActionTimeout]);
      (useState as jest.Mock).mockImplementation(() => [false, setShowControls]);
      (useState as jest.Mock).mockImplementation(() => [true, setInitialPlay]);
      (useState as jest.Mock).mockImplementation(() => ['contain', setScreenType]);

      const component = (
        <GestureHandlerRootView>
          <VideoPlayerControl
            url={url} isMiniPlayer={true} paused={true}
            playerVisible={false} isFullScreenPlayer={false}
            isFullScreen={true} videoRefs={sampleData}
            setMiniPlayerVisible={mockFunction} setPlayerDetails={mockFunction} showReplay={false}
            onChangeFullScreen={mockFunction}
          />
        </GestureHandlerRootView>
      )
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });

    it('should render VideoPlayerControl component', () => {
      expect(instance).toBeDefined();
    });

    it('Should call VideoPlayerControlId', () => {
      const element = instance.getByTestId('VideoPlayerControlId');
      fireEvent(element, 'onPress');
      expect(element).toBeTruthy();
    });

    it('Should call Video onEnd', () => {
      DeviceTypeUtilsMock.isIOS = false;
      const element = instance.container.findAllByType(Video)[0];
      fireEvent(element, 'onEnd');
      expect(element).toBeTruthy();
    });

    it('Should call Video onEnd in iOS', () => {
      DeviceTypeUtilsMock.isIOS = true;
      const element = instance.container.findAllByType(Video)[0];
      fireEvent(element, 'onEnd');
      expect(element).toBeTruthy();
    });


    it('Should call Video onLoad', () => {
      DeviceTypeUtilsMock.isIOS = false;
      const element = instance.container.findAllByType(Video)[0];
      fireEvent(element, 'onLoad', { data: { duration: 30 } });
      expect(element).toBeTruthy();
    });


    it('Should call Video onLoadStart', () => {
      const element = instance.container.findAllByType(Video)[0];
      fireEvent(element, 'onLoadStart');
      expect(element).toBeTruthy();
    });

    it('Should call Video onSeek', () => {
      const element = instance.container.findAllByType(Video)[0];
      fireEvent(element, 'onSeek');
      expect(element).toBeTruthy();
    });
  })

  describe('<VideoPlayerControl> with fullScreenPlayer true', () => {
    beforeEach(() => {
      (useRef as jest.Mock).mockImplementation(() => [sampleData, videoPlayer]);
      (useState as jest.Mock).mockImplementation(() => [1, setCurrentTime]);
      (useState as jest.Mock).mockImplementation(() => [0, setDuration]);
      (useState as jest.Mock).mockImplementation(() => [true, setIsLoading]);
      (useState as jest.Mock).mockImplementation(() => [false, setPaused]);
      (useState as jest.Mock).mockImplementation(() => [null, setTapActionTimeout]);
      (useState as jest.Mock).mockImplementation(() => [true, setShowControls]);
      (useState as jest.Mock).mockImplementation(() => [true, setInitialPlay]);
      (useState as jest.Mock).mockImplementation(() => ['contain', setScreenType]);

      const component = (
        <GestureHandlerRootView>
          <VideoPlayerControl
          url={url} isMiniPlayer={false} paused={false}
          playerVisible={false} isFullScreenPlayer={true}
          isFullScreen={true} videoRefs={sampleData} showReplay={true}
          setMiniPlayerVisible={mockFunction} setPlayerDetails={mockFunction}
          onChangeFullScreen={mockFunction}
        />
        </GestureHandlerRootView>
      )
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });

    it('should render VideoPlayerControl component with isFullScreenPlayer true', () => {
      expect(instance).toBeDefined();
    });

  })

  describe('<VideoPlayerControl> default Player', () => {
    beforeEach(() => {
      (useRef as jest.Mock).mockImplementation(() => [sampleData, videoPlayer]);
      (useState as jest.Mock).mockImplementation(() => [1, setCurrentTime]);
      (useState as jest.Mock).mockImplementation(() => [0, setDuration]);
      (useState as jest.Mock).mockImplementation(() => [true, setIsLoading]);
      (useState as jest.Mock).mockImplementation(() => [false, setPaused]);
      (useState as jest.Mock).mockImplementation(() => [null, setTapActionTimeout]);
      (useState as jest.Mock).mockImplementation(() => [true, setShowControls]);
      (useState as jest.Mock).mockImplementation(() => [true, setInitialPlay]);
      (useState as jest.Mock).mockImplementation(() => ['contain', setScreenType]);
      (useState as jest.Mock).mockImplementation(() => [false, mockFunction]);

      const component = (
        <GestureHandlerRootView>
          <VideoPlayerControl
            url={url} paused={false}
            playerVisible={false} videoRefs={sampleData}
            setMiniPlayerVisible={mockFunction} setPlayerDetails={mockFunction} showReplay={true}
            onChangeFullScreen={mockFunction}
          />
        </GestureHandlerRootView>
      )
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });

    it('should render VideoPlayerControl component with isFullScreenPlayer true', () => {
      expect(instance).toBeDefined();
    });
    it("should call onVideoPress",() => {
      const testId = instance.getByTestId('videoId');
      fireEvent(testId,'onPress');
      expect(mockFunction).toHaveBeenCalled();
    })
    it('When renderPlaypauseID is pressed', () => {
      const testItemId = instance.getByTestId('renderPlaypauseID');
      fireEvent(testItemId, 'onPress',{});
      expect(mockFunction).toBeTruthy();
    });
  })

});

describe("test videoPlayerControl",() => {
  const mockFunction = jest.fn();
  const setShowControl = mockFunction;
  beforeEach(() => {
    (useState as jest.Mock).mockImplementation(() => [true,setShowControl]);
  })
  afterEach(() => {
    jest.clearAllMocks();
  })
  it("test if the setShowControl state false",() => {
    const instance = render(
      <GestureHandlerRootView>
        <VideoPlayerControl
          url={'url'} paused={false}
          isMiniPlayer={false}
          playerVisible={true} videoRefs={sampleData}
          setMiniPlayerVisible={mockFunction} setPlayerDetails={mockFunction} showReplay={true}
          onChangeFullScreen={mockFunction}
        />
      </GestureHandlerRootView>
    )
    expect(instance).toBeDefined();
    expect(setShowControl).toHaveBeenCalled();
    expect(setShowControl).toHaveBeenCalledWith(false);
  })
})

describe("test videoPlayerControl onProgress",() => {
  const mockFunction = jest.fn();
  const setState = mockFunction;
  beforeEach(() => {
    (useState as jest.Mock).mockImplementation(() => [false,setState]);
  })
  afterEach(() => {
    jest.clearAllMocks();
  })
  it("test the Video onProgress function when the loading state is false",() => {
    const instance = render(
      <GestureHandlerRootView>
        <VideoPlayerControl
          url={'url'} paused={false}
          isMiniPlayer={false}
          playerVisible={true} videoRefs={sampleData}
          setMiniPlayerVisible={mockFunction} setPlayerDetails={mockFunction} showReplay={true}
          onChangeFullScreen={mockFunction}
        />
      </GestureHandlerRootView>
    )
    const element = instance.container.findByType(Video);
    fireEvent(element,'onProgress',{currentTime:'15:30'});
    expect(setState).toHaveBeenCalled();
    expect(setState).toHaveBeenCalledWith('15:30');
  })
})

describe("test videoPlayerControl onLoad",() => {
  const mockFunction = jest.fn();
  const setState = mockFunction;
  beforeEach(() => {
    jest.useFakeTimers({
      legacyFakeTimers: true
    });
    (useState as jest.Mock).mockImplementation(() => [false,setState]);
  })
  afterEach(() => {
    jest.clearAllMocks();
  })
  it("test the Video onLoad function",() => {
    const instance = render(
      <GestureHandlerRootView>
        <VideoPlayerControl
          url={'url'} paused={false}
          isMiniPlayer={false}
          playerVisible={true} videoRefs={sampleData}
          setMiniPlayerVisible={mockFunction} setPlayerDetails={mockFunction} showReplay={true}
          onChangeFullScreen={mockFunction}
        />
      </GestureHandlerRootView>
    )      
    const element = instance.container.findByType(Video);
    fireEvent(element,'onLoad',{duration:10});
    expect(setState).toHaveBeenCalled();
  })
})

describe("test videoPlayerControl renderPlaypauseID onPaused function",() => {
  const mockFunction = jest.fn();
  it("test onPaused function",() => {
    const instance = render(
        <VideoPlayerControl
          url={'url'} paused={false}
          isMiniPlayer={false}
          playerVisible={true} videoRefs={sampleData}
          setMiniPlayerVisible={mockFunction} setPlayerDetails={mockFunction} showReplay={true}
          onChangeFullScreen={mockFunction} setReset={mockFunction}
        />
    )      
    const element = instance.container.findByType(Video);
    fireEvent(element,'onEnd');
    expect(instance.container.props.setReset).toHaveBeenCalled();
    expect(instance.container.props.setReset).toHaveBeenCalledWith(true);
  })

  it("should call setTimeout",() => {
    const setPaused = jest.fn();
    jest.useFakeTimers({
      legacyFakeTimers: true
    });
    (useState as jest.Mock).mockImplementation(() => [false, setPaused]);
    (useRef as jest.Mock).mockImplementation(() => ({current:{seek: jest.fn()}}));
    render(
      <GestureHandlerRootView>
        <VideoPlayerControl
          url={'url'} paused={false}
          isMiniPlayer={false}
          playerVisible={true} videoRefs={sampleData}
          setMiniPlayerVisible={mockFunction} setPlayerDetails={mockFunction} showReplay={true}
          onChangeFullScreen={mockFunction} setReset={mockFunction}
        />
      </GestureHandlerRootView>
    )
    const spyon = jest.spyOn(global,'setTimeout');
    expect(spyon).toHaveBeenCalled();
    jest.runAllTimers();
    expect(setPaused).toHaveBeenCalled();
  })

})

describe("VideoPlayerControl",() => {
  const mockFunction = jest.fn();
  const setState = jest.fn();
  let instance: RenderAPI;
  beforeEach(() => {
    (useState as jest.Mock).mockImplementation(() => [false, setState]);
    instance = render(
      <GestureHandlerRootView>
        <VideoPlayerControl
          url={'url'} paused={false}
          isMiniPlayer={false}
          playerVisible={true} videoRefs={sampleData}
          setMiniPlayerVisible={mockFunction} setPlayerDetails={mockFunction} showReplay={true}
          onChangeFullScreen={mockFunction} setReset={mockFunction}
        />
      </GestureHandlerRootView>
    )
  });
  afterEach(() => {
    jest.clearAllMocks();
  })
  it("Should call AppState listener with inactive state",() => {
    const spyon = jest.spyOn(AppState,'addEventListener');
    expect(instance).toBeDefined();
    expect(spyon).toHaveBeenCalled();
    AppState.currentState = 'inactive';
    spyon.mock.calls[0][1]('inactive');
    expect(setState).toHaveBeenCalled();
  })

  it("Should call AppState listener with active state",() => {
    const spyon = jest.spyOn(AppState,'addEventListener');
    expect(instance).toBeDefined();
    expect(spyon).toHaveBeenCalled();
    AppState.currentState = 'active';
    spyon.mock.calls[0][1]('active');
    expect(setState).toHaveBeenCalled();
  })

})

