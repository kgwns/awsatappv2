import React, { useState } from 'react'
import { render, RenderAPI } from '@testing-library/react-native'
import { VideoPlayerComponent } from '../VideoPlayer';
import { useNavigation } from '@react-navigation/native';

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
  }));

  jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(),
    useIsFocused: () => jest.fn().mockImplementation(() => Boolean),
    useFocusEffect: () => jest.fn().mockImplementation(() => jest.fn())
  }));

describe('<VideoPlayer>', () => {
    let instance: RenderAPI
    const mockFunction = jest.fn();
    const url = 'https://content.jwplatform.com/videos/nzSJqVya-9mPGCDe7.mp4'
    const setvideoUrl = mockFunction;
    const setIsPaused = mockFunction;
    const setIsLoading = mockFunction;
    const setFullScreen = mockFunction;
    const setTogglecontrol = mockFunction;
    const setEdge = mockFunction;
    const navigation = {
        navigate: mockFunction,
      }

    beforeEach(() => {
    (useState as jest.Mock).mockImplementation(() => [url, setvideoUrl]);
    (useState as jest.Mock).mockImplementation(() => ['', setTogglecontrol]);
    (useState as jest.Mock).mockImplementation(() => [true, setIsLoading]);
    (useState as jest.Mock).mockImplementation(() => [true, setIsPaused]);
    (useState as jest.Mock).mockImplementation(() => [false, setFullScreen]);
    (useState as jest.Mock).mockImplementation(() => [[], setEdge]);
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
      const component = <VideoPlayerComponent url={url}  />
      instance = render(component)
      jest.useFakeTimers();
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('Should render VideoPlayer', () => {
        expect(instance).toBeDefined()
    })

    // it('Should work', () => {
    //   const useStateSpy = jest.spyOn(React, 'useState');
    //   expect(useStateSpy).toHaveBeenNthCalledWith(2,"https://content.jwplatform.com/videos/nzSJqVya-9mPGCDe7.mp4");
    // });

    // it('Should work', () => {
    //   const useStateSpy = jest.spyOn(React, 'useState');
    //   expect(useStateSpy).toHaveBeenNthCalledWith(1,true);
    // });
})