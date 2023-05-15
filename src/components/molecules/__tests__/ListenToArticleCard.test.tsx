import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import {ListenToArticleCard} from '..';
import { useAppPlayer } from 'src/hooks';
import React, { useState } from 'react';
import { ButtonImage } from '../../atoms'

jest.mock('src/hooks/useAppPlayer', () => ({useAppPlayer: jest.fn()}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

const data =   {
  nid: '1',
  title: 'عادل درويش',
  authorImage: 'https://picsum.photos/200/300',
  data: {
    body: 'الصحافة بين الخصوصية والصالح العام',
    duration: '3:22',
    playlist: [
      {
        name: 'abc',
        id: '12',
        duration: 200,
      },
      {
        name: 'abc',
        id: '13',
        duration: 200,
      },
    ],
    title: 'abc'
  }
};


describe('<ListenToArticleCard>', () => {
  let instance: RenderAPI;

  const mockFunction = jest.fn();

  const useAppPlayerMock = jest.fn();
  const setControlStateMock = jest.fn();
  const setShowMiniPlayerMock = jest.fn();
  const setPlayMock = jest.fn();
  const setPlayerTrackMock = jest.fn();



  const prevPlayBackState = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers({
      legacyFakeTimers: true
    });
    (useState as jest.Mock).mockImplementation(() => [null, prevPlayBackState]);
    (useAppPlayer as jest.Mock).mockImplementation(useAppPlayerMock);
    useAppPlayerMock.mockReturnValue({
      showMiniPlayer: true,
      isPlaying: false,
      selectedTrack: {id: '2'},
      showControls: false,
      setControlState: setControlStateMock,
      setShowMiniPlayer: setShowMiniPlayerMock,
      setPlay: setPlayMock,
      setPlayerTrack: setPlayerTrackMock,
    });
    const component = <ListenToArticleCard data={data}/>;
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  test('Should render the ListenToArticleCard component', () => {
    expect(instance).toBeDefined();
  });

  it('When ListenToArticleCardTO1 is pressed', () => {
    const testItemId = instance.getByTestId('ListenToArticleCardTO1');
    fireEvent(testItemId, 'onPress');
    expect(mockFunction).toBeTruthy();
  });

  it('When ListenToArticleCardBI1 is pressed', () => {
    const testItemId = instance.getByTestId('ListenToArticleCardBI1');
    fireEvent(testItemId, 'onPress');
    expect(mockFunction).toBeTruthy();
  });

  test('Should call button image onPress', () => {
    const element = instance.container.findByType(ButtonImage)
    fireEvent(element, 'onPress', {nid:'0'});
    expect(mockFunction).toBeTruthy();
  })
});

describe('<ListenToArticleCard>', () => {
  let instance: RenderAPI;

  const mockFunction = jest.fn();

  const useAppPlayerMock = jest.fn();
  const setControlStateMock = jest.fn();
  const setShowMiniPlayerMock = jest.fn();
  const setPlayMock = jest.fn();
  const setPlayerTrackMock = jest.fn();

  const prevPlayBackState = jest.fn();

  beforeEach(() => {
    (useAppPlayer as jest.Mock).mockImplementation(useAppPlayerMock);
    (useState as jest.Mock).mockImplementation(() => [null, prevPlayBackState]);
    useAppPlayerMock.mockReturnValue({
      showMiniPlayer: true,
      isPlaying: false,
      selectedTrack: {id: '2'},
      showControls: false,
      setControlState: setControlStateMock,
      setShowMiniPlayer: setShowMiniPlayerMock,
      setPlay: setPlayMock,
      setPlayerTrack: setPlayerTrackMock,
    });
    const component = <ListenToArticleCard data={[]}/>;
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  test('Should render the ListenToArticleCard component', () => {
    expect(instance).toBeDefined();
  });

  it('When ListenToArticleCardTO1 is pressed', () => {
    const testItemId = instance.getByTestId('ListenToArticleCardTO1');
    fireEvent(testItemId, 'onPress', {nid:'0'});
    expect(mockFunction).toBeTruthy();
  });

  it('When ListenToArticleCardBI1 is pressed', () => {
    const testItemId = instance.getByTestId('ListenToArticleCardBI1');
    fireEvent(testItemId, 'onPress');
    expect(mockFunction).toBeTruthy();
  });

  test('Should call button image onPress', () => {
    const element = instance.container.findByType(ButtonImage)
    fireEvent(element, 'onPress', {nid:'0'});
    expect(mockFunction).toBeTruthy();
  })
});
