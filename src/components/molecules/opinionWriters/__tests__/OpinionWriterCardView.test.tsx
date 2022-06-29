import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React, { useState } from 'react';
import { useAppPlayer } from 'src/hooks';
import {OpinionWriterCardView} from 'src/components/molecules';
import FixedTouchable from 'src/shared/utils/FixedTouchable';
import { TouchableOpacity } from 'react-native';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

jest.mock('src/hooks/useAppPlayer', () => ({useAppPlayer: jest.fn()}));

describe('<OpinionWritersCardView>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();

  const setMediaData = jest.fn()
  const setTimeDuration = jest.fn()

  const useAppPlayerMock = jest.fn();
  const setDisableNext = jest.fn();
  const setCanGoBack = jest.fn();
  const setNewsLettersDataInfo = jest.fn()
  const setControlStateMock = jest.fn();
  const setShowMiniPlayerMock = jest.fn();
  const setPlayMock = jest.fn();
  const setPlayerTrackMock = jest.fn();

  //Test Data
  const imageUrl = 'https://picsum.photos/200';
  const writerTitle = 'إياد أبو شقرا';
  const headLine = 'هل بدأ العد العكسي لنهاية حكم جونسون في بريطانيا؟';
  const subHeadLine =
    'حتى الآن كانت معركة الرئاسة الفرنسية من دون مفاجآت تذكر: الرئيس الجالس هو الأقوى. مرشحة اليمين ماري لوبن، تشكل خطراً لكنه غير قاتل، وعلى يمينها إريك زمور';
  const audioLabel = 'استمع الي المقالة ';
  const duration = '3:22';

  beforeEach(() => {
    (useState as jest.Mock).mockImplementation(() => [{}, setMediaData]);
    (useState as jest.Mock).mockImplementation(() => [null, setTimeDuration]);
    (useState as jest.Mock).mockImplementation(() => [false, setDisableNext]);
    (useState as jest.Mock).mockImplementation(() => [false, setCanGoBack]);
    (useState as jest.Mock).mockImplementation(() => [[], setNewsLettersDataInfo]);
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
    const component = (
      <OpinionWriterCardView
        imageUrl={imageUrl}
        writerTitle={writerTitle}
        headLine={headLine}
        subHeadLine={subHeadLine}
        audioLabel={audioLabel}
        duration={duration} nid={''} isBookmarked={false} mediaVisibility={false} onPressBookmark={function (): void {
          throw new Error('Function not implemented.');
        } } authorId={''}      />
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('should render OpinionWritersCardView component', () => {
    expect(instance).toBeDefined();
  });

  // it('Should Press BookMark', () => {
  //   const element = instance.getByTestId('bookmarkTestId');
  //   fireEvent.press(element);
  // });

  it('Should Press PlayIcon', () => {
    const element = instance.container.findAllByType(TouchableOpacity)[0];
    fireEvent.press(element);
    expect(mockFunction).toHaveBeenCalled;
  });
  
  it('Should Press OpinionWritersCard', () => {
    const testID = instance.container.findByType(FixedTouchable);
    fireEvent(testID, 'onPress');
    expect(mockFunction).toHaveBeenCalled;
  }); 
});
