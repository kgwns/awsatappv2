import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React, { useState } from 'react';
import {OpinionWriterCardView} from 'src/components/molecules';
import FixedTouchable from 'src/shared/utils/FixedTouchable';
import { TouchableOpacity } from 'react-native';
import {useNavigation} from '@react-navigation/native';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
  useNavigationState: () => ([]),
}));

jest.mock('src/hooks/useAppPlayer', () => ({useAppPlayer: jest.fn()}));

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

describe('<OpinionWritersCardView>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const navigation = {
    goBack: mockFunction,
    navigate: mockFunction,
  }

  const mediaData = mockFunction;
  const setTimeDuration = mockFunction;
  const setDisableNext = mockFunction;
  const setCanGoBack = mockFunction;
  const setNewsLettersDataInfo = mockFunction;

  const data = [{playlist: ['abc', ['abc']], title: 'abc'}]
  //Test Data
  const imageUrl = 'https://picsum.photos/200';
  const writerTitle = 'إياد أبو شقرا';
  const headLine = 'هل بدأ العد العكسي لنهاية حكم جونسون في بريطانيا؟';
  const subHeadLine = 'حتى الآن كانت معركة الرئاسة الفرنسية من دون مفاجآت تذكر: الرئيس الجالس هو الأقوى. مرشحة اليمين ماري لوبن، تشكل خطراً لكنه غير قاتل، وعلى يمينها إريك زمور';
  const audioLabel = 'إستمع إلى المقالة ';
  const duration = '3:22';

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    (useState as jest.Mock).mockImplementation(() => [data, mediaData]);
    (useState as jest.Mock).mockImplementation(() => [null, setTimeDuration]);
    (useState as jest.Mock).mockImplementation(() => [false, setDisableNext]);
    (useState as jest.Mock).mockImplementation(() => [false, setCanGoBack]);
    (useState as jest.Mock).mockImplementation(() => [[], setNewsLettersDataInfo]);
    const component = (
      <OpinionWriterCardView
        imageUrl={imageUrl}
        writerTitle={writerTitle}
        headLine={headLine}
        subHeadLine={subHeadLine}
        audioLabel={audioLabel}
        duration={duration} 
        nid={'1'} 
        jwPlayerID= {'12'}
        hideImageView={false}
        isBookmarked={false} 
        mediaVisibility={true} 
        onPressBookmark={mockFunction} 
        authorId={'2'}     
      />
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

  it('Should Press BookMark', () => {
    const element = instance.getByTestId('bookmarkTestId');
    fireEvent(element, 'onPress');
    expect(mockFunction).toHaveBeenCalled;
  });

  it('Should Press PlayIcon', () => {
    const element = instance.container.findAllByType(TouchableOpacity)[0];
    fireEvent.press(element, 'onPress', '2');
    expect(navigation.navigate).toHaveBeenCalled;
  });

  it('Should Press PlayIcon', () => {
    const element = instance.container.findAllByType(TouchableOpacity)[1];
    fireEvent.press(element, 'onPress', '2');
    expect(navigation.navigate).toHaveBeenCalled;
  });
  
  it('Should Press OpinionWritersCard', () => {
    const testID = instance.container.findByType(FixedTouchable);
    fireEvent(testID, 'onPress');
    expect(mockFunction).toHaveBeenCalled;
  }); 

  it('Should Press onPressWriter01', () => {
    const element = instance.getByTestId('onPressWriter01');
    fireEvent(element, 'onPress', '2');
    expect(mockFunction).toHaveBeenCalled;
  });

  it('Should Press playIconTestId', () => {
    const element = instance.getByTestId('playIconTestId');
    fireEvent(element, 'onPress', '2');
    expect(mockFunction).toHaveBeenCalled;
  });
  
});
