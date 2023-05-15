import '@testing-library/jest-dom';
import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React, { useState } from 'react';
import {OpinionWriterCardView} from 'src/components/molecules';
import FixedTouchable from 'src/shared/utils/FixedTouchable';
import { TouchableOpacity } from 'react-native';
import {useNavigation, useNavigationState} from '@react-navigation/native';
import { isIOS, isTab } from 'src/shared/utils';
import { ScreensConstants } from 'src/constants/Constants';
const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isTab: false,
  isIOS: false
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
  useNavigationState: jest.fn()
}));

jest.mock("src/hooks/useAppPlayer", () => ({
  useAppPlayer: () => {
    return {
      showMiniPlayer: true,
      isPlaying: false,
      showControls: false,
      setControlState: () => [],
      setShowMiniPlayer: () => [],
      setPlay: () => [],
      setPlayerTrack: () => [],
      selectedTrack: { id: '4opinion' },
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

  const data = [{playlist: ['abc', ['abc']], title: 'abc'}]
  //Test Data
  const imageUrl = 'https://picsum.photos/200';
  const writerTitle = 'إياد أبو شقرا';
  const headLine = 'هل بدأ العد العكسي لنهاية حكم جونسون في بريطانيا؟';
  const subHeadLine = 'حتى الآن كانت معركة الرئاسة الفرنسية من دون مفاجآت تذكر: الرئيس الجالس هو الأقوى. مرشحة اليمين ماري لوبن، تشكل خطراً لكنه غير قاتل، وعلى يمينها إريك زمور';
  const audioLabel = 'إستمع إلى المقالة ';
  const duration = '3:22';
  beforeEach(() => {
    jest.useFakeTimers({
      legacyFakeTimers: true
    });
    (useNavigationState as jest.Mock).mockReturnValue([]);
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    (useState as jest.Mock).mockImplementation(() => [data, mediaData]);
    (useState as jest.Mock).mockImplementation(() => ['100', setTimeDuration]);

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

  it('should render OpinionWritersCardView component in tab', () => {
    DeviceTypeUtilsMock.isTab = true;
    expect(instance).toBeDefined();
    expect(isTab).toEqual(true)
    expect(isIOS).toEqual(false);
  });

  it('should render OpinionWritersCardView component in tab', () => {
    DeviceTypeUtilsMock.isIOS = true;
    expect(isIOS).toBeDefined();
    expect(isIOS).toEqual(true);
  });

  it('Should display timeDuration', () => {
    expect(instance.queryByTestId('durationId')).not.toBeNull();
  });
  
  it('Should Press OpinionWritersCard', () => {
    const testID = instance.container.findByType(FixedTouchable);
    fireEvent(testID, 'onPress');
    expect(mockFunction).toHaveBeenCalled;
  }); 

  it("Fixed Touchable onPress should navigate to opinion article detail screen",() => {
    const element = instance.container.findByType(FixedTouchable);
    fireEvent(element,'onPress');
    expect(navigation.navigate).toHaveBeenCalled();
  })

  it('Should click writer name and navigate to writerDetailScreen', () => {
    const element = instance.getByTestId('onPressWriter01');
    fireEvent.press(element);
    expect(navigation.navigate).toHaveBeenCalled();
    expect(navigation.navigate).toHaveBeenCalledWith(ScreensConstants.WRITERS_DETAIL_SCREEN,{tid:'2'});
  });

  it('Should Press playIcon', () => {
    const element = instance.getByTestId('playIconTestId');
    fireEvent.press(element);
    
  });
  
});
describe('<OpinionWritersCardView>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const navigation = {
    goBack: mockFunction,
    navigate: mockFunction,
  }

  const mediaData = mockFunction;
  const setTimeDuration = mockFunction;

  const data = {
    playlist: [
        {
            name: 'abc',
            id: '12',
            duration: 336,
            sources: [
                {
                    file: 'file'
                }
            ]
        },
        {
            name: 'abc',
            id: '13',
            duration: 336,
            sources: [
                {
                    file: 'file1'
                }
            ]
        },
    ],
    title: 'abc'
}
  //Test Data
  const imageUrl = 'https://picsum.photos/200';
  const writerTitle = 'إياد أبو شقرا';
  const headLine = 'هل بدأ العد العكسي لنهاية حكم جونسون في بريطانيا؟';
  const subHeadLine = 'حتى الآن كانت معركة الرئاسة الفرنسية من دون مفاجآت تذكر: الرئيس الجالس هو الأقوى. مرشحة اليمين ماري لوبن، تشكل خطراً لكنه غير قاتل، وعلى يمينها إريك زمور';
  const audioLabel = 'إستمع إلى المقالة ';
  const duration = '3:22';
  beforeEach(() => {
    jest.useFakeTimers({
      legacyFakeTimers: true
    });
    (useNavigationState as jest.Mock).mockReturnValue([]);
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    (useState as jest.Mock).mockImplementation(() => [data, mediaData]);
    (useState as jest.Mock).mockImplementation(() => ['100', setTimeDuration]);
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

  it('Should Press playIcon', () => {
    const element = instance.getByTestId('playIconTestId');
    fireEvent.press(element);
  });
  
});

describe('<OpinionWritersCardView>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const navigation = {
    goBack: mockFunction,
    navigate: mockFunction,
  }

  const mediaData = mockFunction;
  const setTimeDuration = mockFunction;

  const data = {
    playlist: [
        {
            name: 'abc',
            id: '12',
            duration: 336,
            sources: [
                {
                    file: 'file'
                }
            ]
        },
        {
            name: 'abc',
            id: '13',
            duration: 336,
            sources: [
                {
                    file: 'file1'
                }
            ]
        },
    ],
    title: 'abc'
}
  //Test Data
  const imageUrl = 'https://picsum.photos/200';
  const writerTitle = 'إياد أبو شقرا';
  const headLine = 'هل بدأ العد العكسي لنهاية حكم جونسون في بريطانيا؟';
  const subHeadLine = 'حتى الآن كانت معركة الرئاسة الفرنسية من دون مفاجآت تذكر: الرئيس الجالس هو الأقوى. مرشحة اليمين ماري لوبن، تشكل خطراً لكنه غير قاتل، وعلى يمينها إريك زمور';
  const audioLabel = 'إستمع إلى المقالة ';
  const duration = '3:22';
  beforeEach(() => {
    jest.useFakeTimers({
      legacyFakeTimers: true
    });
    (useNavigationState as jest.Mock).mockReturnValue([]);
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    (useState as jest.Mock).mockImplementation(() => [data, mediaData]);
    (useState as jest.Mock).mockImplementation(() => ['100', setTimeDuration]);
    const component = (
      <OpinionWriterCardView
        imageUrl={imageUrl}
        writerTitle={writerTitle}
        headLine={headLine}
        subHeadLine={subHeadLine}
        audioLabel={audioLabel}
        duration={duration} 
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

  it('Should Press playIcon', () => {
    const element = instance.getByTestId('playIconTestId');
    fireEvent.press(element);
  });
  
});

describe('<OpinionWritersCardView>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const navigation = {
    goBack: mockFunction,
    navigate: mockFunction,
  }

  const mediaData = mockFunction;
  const setTimeDuration = mockFunction;

  const data = {
    playlist: [
        {
            name: 'abc',
            id: '12',
            duration: 336,
            sources: [
                {
                    file: 'file'
                }
            ]
        },
        {
            name: 'abc',
            id: '13',
            duration: 336,
            sources: [
                {
                    file: 'file1'
                }
            ]
        },
    ],
    title: 'abc'
}
  //Test Data
  const imageUrl = 'https://picsum.photos/200';
  const writerTitle = 'إياد أبو شقرا';
  const headLine = 'هل بدأ العد العكسي لنهاية حكم جونسون في بريطانيا؟';
  const subHeadLine = 'حتى الآن كانت معركة الرئاسة الفرنسية من دون مفاجآت تذكر: الرئيس الجالس هو الأقوى. مرشحة اليمين ماري لوبن، تشكل خطراً لكنه غير قاتل، وعلى يمينها إريك زمور';
  const audioLabel = 'إستمع إلى المقالة ';
  const duration = '3:22';
  beforeEach(() => {
    jest.useFakeTimers({
      legacyFakeTimers: true
    });
    (useNavigationState as jest.Mock).mockReturnValue([]);
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    (useState as jest.Mock).mockImplementation(() => [data, mediaData]);
    (useState as jest.Mock).mockImplementation(() => ['100', setTimeDuration]);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('Should not Display divider when showDivider is false', () => {
    const component = (
      <OpinionWriterCardView
        imageUrl={imageUrl}
        writerTitle={writerTitle}
        headLine={headLine}
        subHeadLine={subHeadLine}
        audioLabel={audioLabel}
        duration={duration} 
        jwPlayerID= {'12'}
        hideImageView={false}
        isBookmarked={false} 
        mediaVisibility={true} 
        onPressBookmark={mockFunction} 
        authorId={'2'}     
        showDivider={false}
      />
    );
    instance = render(component);
    expect(instance.queryByTestId('dividerLineId')).toBeNull();
  });

  it('Should Display divider when showDivider is true', () => {
    const component = (
      <OpinionWriterCardView
        imageUrl={imageUrl}
        writerTitle={writerTitle}
        headLine={headLine}
        subHeadLine={subHeadLine}
        audioLabel={audioLabel}
        duration={duration} 
        isBookmarked={false} 
        mediaVisibility={true} 
        onPressBookmark={mockFunction} 
        authorId={'2'}     
        showDivider={true}
      />
    );
    instance = render(component);
    expect(instance.queryByTestId('dividerLineId')).not.toBeNull();
  });
  
});

describe("OpinionWriterCardView",() => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  beforeEach(() => {
    (useNavigationState as jest.Mock).mockReturnValue([]);
    const component = (
      <OpinionWriterCardView
      imageUrl={''}
      writerTitle={'writerTitle'}
      headLine={''}
      subHeadLine={''}
      audioLabel={'audioLabel'}
      duration={''} 
      nid={''} 
      jwPlayerID= {''}
      hideImageView={true}
      isBookmarked={true} 
      mediaVisibility={false} 
      onPressBookmark={mockFunction} 
      authorId={''}     
    />
    );
    instance = render(component);
  });
  afterEach(() => {
    jest.clearAllMocks();
  })
  it("should not display writer title when the hideImageView props is true",() => {
    expect(instance.queryByText('writerTitle')).not.toBeInTheDocument();
  });
  it("should not display audio label when the mediaVisibility props is false",() => {
    expect(instance.queryByText('audioLabel')).not.toBeInTheDocument();
  })
  it("should not render Touchable Opacity when the mediaVisibility props is false",() => {
    expect(instance.queryByTestId('onPressPlayTestId')).not.toBeInTheDocument();
  })
  it("should not render ButtonImage when the mediaVisibility props is false",() => {
    expect(instance.queryByTestId('playIconTestId')).not.toBeInTheDocument();
  })
})

describe("OpinionWriterCardView",() => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const navigation = {
    goBack: mockFunction,
    navigate: mockFunction,
  }
  //Test Data
  const imageUrl = 'https://picsum.photos/200';
  const writerTitle = 'إياد أبو شقرا';
  const headLine = 'هل بدأ العد العكسي لنهاية حكم جونسون في بريطانيا؟';
  const subHeadLine = 'حتى الآن كانت معركة الرئاسة الفرنسية من دون مفاجآت تذكر: الرئيس الجالس هو الأقوى. مرشحة اليمين ماري لوبن، تشكل خطراً لكنه غير قاتل، وعلى يمينها إريك زمور';
  const audioLabel = 'إستمع إلى المقالة ';
  const duration = '3:22';
  beforeEach(() => {
    jest.useFakeTimers({
      legacyFakeTimers: true
    });
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    (useNavigationState as jest.Mock).mockReturnValue([]);
    const component = (
      <OpinionWriterCardView
        imageUrl={imageUrl}
        writerTitle={writerTitle}
        headLine={headLine}
        subHeadLine={subHeadLine}
        audioLabel={audioLabel}
        duration={duration} 
        nid={''} 
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
  })

  it("Fixed Touchable onPress should not navigate to opinionArticleDetail when nid is empty",() => {
    const element = instance.container.findByType(FixedTouchable);
    fireEvent(element,'onPress');
    expect(navigation.navigate).not.toHaveBeenCalled();
  })

})

describe("OpinionWriterCardView",() => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const navigation = {
    goBack: mockFunction,
    navigate: mockFunction,
    push: mockFunction
  }
  //Test Data
  const imageUrl = 'https://picsum.photos/200';
  const writerTitle = 'إياد أبو شقرا';
  const headLine = 'هل بدأ العد العكسي لنهاية حكم جونسون في بريطانيا؟';
  const subHeadLine = 'حتى الآن كانت معركة الرئاسة الفرنسية من دون مفاجآت تذكر: الرئيس الجالس هو الأقوى. مرشحة اليمين ماري لوبن، تشكل خطراً لكنه غير قاتل، وعلى يمينها إريك زمور';
  const audioLabel = 'إستمع إلى المقالة ';
  const duration = '3:22';
  beforeEach(() => {
    jest.useFakeTimers({
      legacyFakeTimers: true
    });
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    (useNavigationState as jest.Mock).mockReturnValue([{name:ScreensConstants.WRITERS_DETAIL_SCREEN}]);
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
  })

  it("Fixed Touchable onPress should push to opinionArticleDetail ",() => {
    const element = instance.container.findByType(FixedTouchable);
    fireEvent(element,'onPress');
    expect(navigation.push).toHaveBeenCalled();
    expect(navigation.push).toHaveBeenCalledWith(ScreensConstants.OPINION_ARTICLE_DETAIL_SCREEN,{nid:'1'})
  })

})

describe("OpinionWriterCardView",() => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const navigation = {
    goBack: mockFunction,
    navigate: mockFunction,
    push: mockFunction
  }
  //Test Data
  const imageUrl = 'https://picsum.photos/200';
  const writerTitle = 'إياد أبو شقرا';
  const headLine = 'هل بدأ العد العكسي لنهاية حكم جونسون في بريطانيا؟';
  const subHeadLine = 'حتى الآن كانت معركة الرئاسة الفرنسية من دون مفاجآت تذكر: الرئيس الجالس هو الأقوى. مرشحة اليمين ماري لوبن، تشكل خطراً لكنه غير قاتل، وعلى يمينها إريك زمور';
  const audioLabel = 'إستمع إلى المقالة ';
  const duration = '3:22';
  beforeEach(() => {
    jest.useFakeTimers({
      legacyFakeTimers: true
    });
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    (useNavigationState as jest.Mock).mockReturnValue([{name:ScreensConstants.WRITERS_DETAIL_SCREEN}]);
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
        authorId={''}     
      />
    );
    instance = render(component);
  });
  afterEach(() => {
    jest.clearAllMocks();
  })

  it("should not navigate to writer detail screen when clicks writers",() => {
    const element = instance.container.findAllByType(TouchableOpacity)[0];
    fireEvent(element,'onPress');
    expect(navigation.navigate).not.toHaveBeenCalled();
  })

})