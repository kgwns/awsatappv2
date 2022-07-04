import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import {ListenToArticleCard} from '..';
import { useAppPlayer } from 'src/hooks';
import React from 'react';
import { ButtonImage } from '../../atoms'

jest.mock('src/hooks/useAppPlayer', () => ({useAppPlayer: jest.fn()}));

describe('<ListenToArticleCard>', () => {
  let instance: RenderAPI;

  const mockFunction = jest.fn();

  const useAppPlayerMock = jest.fn();
  const setControlStateMock = jest.fn();
  const setShowMiniPlayerMock = jest.fn();
  const setPlayMock = jest.fn();
  const setPlayerTrackMock = jest.fn();

  beforeEach(() => {
    (useAppPlayer as jest.Mock).mockImplementation(useAppPlayerMock);
    useAppPlayerMock.mockReturnValue({
      showMiniPlayer: false,
      isPlaying: false,
      selectedTrack: {},
      showControls: false,
      setControlState: setControlStateMock,
      setShowMiniPlayer: setShowMiniPlayerMock,
      setPlay: setPlayMock,
      setPlayerTrack: setPlayerTrackMock,
    });
    const component = <ListenToArticleCard />;
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
    fireEvent(testItemId, 'onPress', {nid:'0'});
    expect(mockFunction).toBeTruthy();
  });

  test('Should call button image onPress', () => {
    const element = instance.container.findByType(ButtonImage)
    fireEvent(element, 'onPress', {nid:'0'});
    expect(mockFunction).toBeTruthy();
  })
});
