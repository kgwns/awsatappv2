import React, { useState } from 'react';
import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {ScreensConstants, storeSampleData} from '../../../../constants/Constants';
import {NewsLetterScreen} from '../NewsLetterScreen';
import { useNewsLetters } from 'src/hooks';
import { NewsLetterItemType } from 'src/redux/newsLetter/types';
import { NewsLettersWidget } from 'src/components/organisms';
import { NextButton } from 'src/components/atoms';
import { Styles } from 'src/shared/styles';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn().mockImplementation(() => [true,() => null]),
}));

jest.mock('src/hooks/useNewsLetters', () => ({useNewsLetters: jest.fn()}));

const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isTab: false
}));

jest.mock('src/constants/Constants',() => ({
  ...jest.requireActual('src/constants/Constants'),
  TranslateConstants: jest.fn().mockReturnValueOnce('ONBOARD_COMMON_NEXT_BUTTON').mockReturnValueOnce('ONBOARD_NEWSLETTER_TITLE').mockReturnValueOnce('ONBOARD_NEWSLETTER_DESCRIPTION')
}))
const mockFunction = jest.fn();
const useNewsLettersMock = mockFunction
const setState = jest.fn()
const sendSelectedNewsLettersInfoMock = mockFunction
const getSelectedNewsLettersDataMock = mockFunction
const getMyNewsLettersDataMock = mockFunction
const emptySelectedNewsLettersInfoDataMock = mockFunction
const emptySelectedNewsletterDataOnboardMock = mockFunction
const sendSelectedFromNewsletterOnboardMock = mockFunction

const signedInMockWithNewsLettersDataInfo = jest.fn(() => {
  (useState as jest.Mock).mockImplementationOnce(() => [sampleData, setState]).mockImplementationOnce(() => [true, setState]).mockImplementationOnce(() => [sampleData, setState]);
  (useNewsLetters as jest.Mock).mockImplementation(useNewsLettersMock);
  useNewsLettersMock.mockReturnValue({
    isLoading: false,
    sentNewsLettersInfoData: {
      code: 2,
      message: "string"
    },
    selectedNewsLettersData: {
      code: 200,
      message: "string",
      data: sampleData,
    },
    isMyNewsLoading: false,
    myNewsLetters: {
      code: 2,
      message: "string",
      data: sampleData,
    },
    selectedNewsLetterDataOnboard: sampleData,
    sendSelectedNewsLettersInfo: sendSelectedNewsLettersInfoMock,
    getSelectedNewsLettersData: getSelectedNewsLettersDataMock,
    getMyNewsLettersData: getMyNewsLettersDataMock,
    emptySelectedNewsLettersInfoData: emptySelectedNewsLettersInfoDataMock,
    sendSelectedFromNewsletterOnboard: sendSelectedFromNewsletterOnboardMock,
    emptySelectedNewsletterDataOnboard: emptySelectedNewsletterDataOnboardMock,
  });
});

const signedInMockWithoutNewsLettersDataInfo = jest.fn(() => {
  (useState as jest.Mock).mockImplementationOnce(() => [[],setState]).mockImplementationOnce(() => [true,setState]).mockImplementationOnce(() => [[],setState]);
  (useNewsLetters as jest.Mock).mockImplementation(useNewsLettersMock);
  useNewsLettersMock.mockReturnValue({
    isLoading: false,
    sentNewsLettersInfoData: {
      code: 200,
      message: "string"
    },
    selectedNewsLettersData: {
      code:200,
      message:'message',
      data:[
        {
          description: 'description1',
          image: 'image1',
          isSelected: false,
          date: 'date1',
          id: 'id1',
          name: 'newsLetter1'
        },
        {
          description: 'description2',
          image: 'image2',
          isSelected: true,
          date: 'date2',
          id: 'id2',
          name: 'newsLetter2'
        }
      ]
    },
    isMyNewsLoading: false,
    myNewsLetters: {},
    selectedNewsLetterDataOnboard: {},
    sendSelectedNewsLettersInfo: sendSelectedNewsLettersInfoMock,
    getSelectedNewsLettersData: getSelectedNewsLettersDataMock,
    getMyNewsLettersData: getMyNewsLettersDataMock,
    emptySelectedNewsLettersInfoData: emptySelectedNewsLettersInfoDataMock,
    sendSelectedFromNewsletterOnboard: sendSelectedFromNewsletterOnboardMock,
    emptySelectedNewsletterDataOnboard: emptySelectedNewsletterDataOnboardMock,
  });
})

const selectedNewsLetterDataOnboardFlowMock = jest.fn(() => {
  (useState as jest.Mock).mockImplementationOnce(() => [[],setState]).mockImplementationOnce(() => [false,setState]).mockImplementationOnce(() => [[],setState]);
  (useNewsLetters as jest.Mock).mockImplementation(useNewsLettersMock);
  useNewsLettersMock.mockReturnValue({
    isLoading: false,
    sentNewsLettersInfoData: {},
    selectedNewsLettersData: {
      code:200,
      message:'message',
      data:[
        {
          description: 'description1',
          image: 'image1',
          isSelected: false,
          date: 'date1',
          id: 'id1',
          name: 'newsLetter1'
        },
        {
          description: 'description2',
          image: 'image2',
          isSelected: true,
          date: 'date2',
          id: 'id2',
          name: 'newsLetter2'
        }
      ]
    },
    isMyNewsLoading: false,
    myNewsLetters: {},
    selectedNewsLetterDataOnboard: ['id2'],
    sendSelectedNewsLettersInfo: sendSelectedNewsLettersInfoMock,
    getSelectedNewsLettersData: getSelectedNewsLettersDataMock,
    getMyNewsLettersData: getMyNewsLettersDataMock,
    emptySelectedNewsLettersInfoData: emptySelectedNewsLettersInfoDataMock,
    sendSelectedFromNewsletterOnboard: sendSelectedFromNewsletterOnboardMock,
    emptySelectedNewsletterDataOnboard: emptySelectedNewsletterDataOnboardMock,
  });
})

const newsLetterDataSelectedFlow = jest.fn(() => {
  (useState as jest.Mock).mockImplementationOnce(() => [sampleData,setState]).mockImplementationOnce(() => [false,setState]).mockImplementationOnce(() => [sampleData,setState]);
  (useNewsLetters as jest.Mock).mockImplementation(useNewsLettersMock);
  useNewsLettersMock.mockReturnValue({
    isLoading: false,
    sentNewsLettersInfoData: {},
    selectedNewsLettersData: {
      code:200,
      message:'message',
      data:[
        {
          description: 'description1',
          image: 'image1',
          isSelected: false,
          date: 'date1',
          id: 'id1',
          name: 'newsLetter1'
        },
        {
          description: 'description2',
          image: 'image2',
          isSelected: true,
          date: 'date2',
          id: 'id2',
          name: 'newsLetter2'
        }
      ]
    },
    isMyNewsLoading: false,
    myNewsLetters: {},
    selectedNewsLetterDataOnboard: {},
    sendSelectedNewsLettersInfo: sendSelectedNewsLettersInfoMock,
    getSelectedNewsLettersData: getSelectedNewsLettersDataMock,
    getMyNewsLettersData: getMyNewsLettersDataMock,
    emptySelectedNewsLettersInfoData: emptySelectedNewsLettersInfoDataMock,
    sendSelectedFromNewsletterOnboard: sendSelectedFromNewsletterOnboardMock,
    emptySelectedNewsletterDataOnboard: emptySelectedNewsletterDataOnboardMock,
  });
})

const profileSettingContentStyleMock = jest.fn(() => {
  (useState as jest.Mock).mockImplementationOnce(() => [[],setState]).mockImplementationOnce(() => [true,setState]).mockImplementationOnce(() => [[],setState]);
  (useNewsLetters as jest.Mock).mockImplementation(useNewsLettersMock);
  useNewsLettersMock.mockReturnValue({
    isLoading: false,
    sentNewsLettersInfoData: {
      code: 200,
      message: "string"
    },
    selectedNewsLettersData: {
      code:200,
      message:'message',
      data:[
        {
          description: 'description1',
          image: 'image1',
          isSelected: false,
          date: 'date1',
          id: 'id1',
          name: 'newsLetter1'
        },
        {
          description: 'description2',
          image: 'image2',
          isSelected: true,
          date: 'date2',
          id: 'id2',
          name: 'newsLetter2'
        }
      ]
    },
    isMyNewsLoading: false,
    myNewsLetters: {
      data:[
        {
          description: 'description1',
          image: 'image1',
          isSelected: false,
          date: 'date1',
          tid: 'id1',
          name: 'newsLetter1'
        },
        {
          description: 'description2',
          image: 'image2',
          isSelected: true,
          date: 'date2',
          tid: 'id3',
          name: 'newsLetter2'
        }
      ]
    },
    selectedNewsLetterDataOnboard: {},
    sendSelectedNewsLettersInfo: sendSelectedNewsLettersInfoMock,
    getSelectedNewsLettersData: getSelectedNewsLettersDataMock,
    getMyNewsLettersData: getMyNewsLettersDataMock,
    emptySelectedNewsLettersInfoData: emptySelectedNewsLettersInfoDataMock,
    sendSelectedFromNewsletterOnboard: sendSelectedFromNewsletterOnboardMock,
    emptySelectedNewsletterDataOnboard: emptySelectedNewsletterDataOnboardMock,
  });
})

const onBoardMockWithoutNewsLettersDataInfo = jest.fn(() => {
  (useState as jest.Mock).mockImplementationOnce(() => [[],setState]).mockImplementationOnce(() => [false,setState]).mockImplementationOnce(() => [[],setState]);
    (useNewsLetters as jest.Mock).mockImplementation(useNewsLettersMock);
    useNewsLettersMock.mockReturnValue({
      isLoading: false,
      sentNewsLettersInfoData: {
        code: 200,
        message: "string"
      },
      selectedNewsLettersData: {
        code:200,
        message:'message'
      },
      isMyNewsLoading: false,
      myNewsLetters: {},
      selectedNewsLetterDataOnboard: {},
      sendSelectedNewsLettersInfo: sendSelectedNewsLettersInfoMock,
      getSelectedNewsLettersData: getSelectedNewsLettersDataMock,
      getMyNewsLettersData: getMyNewsLettersDataMock,
      emptySelectedNewsLettersInfoData: emptySelectedNewsLettersInfoDataMock,
      sendSelectedFromNewsletterOnboard: sendSelectedFromNewsletterOnboardMock,
      emptySelectedNewsletterDataOnboard: emptySelectedNewsletterDataOnboardMock,
    });
})


const sampleData: NewsLetterItemType[] =[
  {
    title: 'abc',
    subTitle: 'def',
    image: 'abc',
    tid: '12',
    isSelected: false
  },
  {
    title: 'abc',
    subTitle: 'def',
    image: 'abc',
    tid: '13',
    isSelected: true
  },
]

describe('<NewsLettersScreen> when the user is Signed in', () => {
  let instance: RenderAPI;

  const mockFunction = jest.fn();

  beforeEach(() => {
    signedInMockWithNewsLettersDataInfo();
    const component = (
      <Provider store={storeSampleData}>
        <GestureHandlerRootView>
          <NewsLetterScreen route={{ params: { nid: 123, canGoBack: true } }}/>
        </GestureHandlerRootView>
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('Should render NewsLettersScreen component', () => {
    expect(instance).toBeDefined();
  });

  it('Should render NewsLettersScreen component in Tab', () => {
    DeviceTypeUtilsMock.isTab = true;
    expect(instance).toBeDefined();
  });

  it('Should call NewsLettersWidget changeSelectedStatus', () => {
    const element = instance.container.findByType(NewsLettersWidget)
    fireEvent(element, 'changeSelectedStatus', {item: sampleData[0], selected: true});
    expect(mockFunction).toBeTruthy()
  });
  
});

describe('<NewsLettersScreen> when the user is in onBoard Flow', () => {
  let instance: RenderAPI;
  const navigation = {
    navigate: jest.fn(),
    goBack: jest.fn()
  }
  beforeEach(() => {
    onBoardMockWithoutNewsLettersDataInfo();
    const component = (
      <Provider store={storeSampleData}>
        <GestureHandlerRootView>
          <NewsLetterScreen route={{ params: { nid: 123, canGoBack: false } }} navigation = {navigation} />
        </GestureHandlerRootView>
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('Should Disable the button, when initial data is set', () => {
    const element = instance.container.findByType(NextButton);
    expect(element.props.disabled).toBeTruthy();
  });

  it("Should display NextButton, when BackButton is not available",() => {
    expect(instance.queryByTestId('nextButtonTestId')).not.toBeNull();
  })

  it("should navigate to success screen when the NextButton is clicked",() => {
    expect(navigation.navigate).toHaveBeenCalled();
    expect(navigation.navigate).toHaveBeenCalledWith(ScreensConstants.KEEP_NOTIFIED_ONBOARD_SCREEN);
  })

  it("should apply content style in View",() => {
    const testId = instance.getByTestId('viewId');
    expect(testId.props.style).toEqual({flex: 1, justifyContent: "flex-start", paddingTop: 30})
  })
});

describe('<NewsLettersScreen> when the user is Signed in', () => {
  let instance: RenderAPI;
  const navigation = {
    navigate: jest.fn()
  }
  beforeEach(() => {
    signedInMockWithoutNewsLettersDataInfo();
    const component = (
      <Provider store={storeSampleData}>
        <GestureHandlerRootView>
          <NewsLetterScreen route={{ params: { nid: 123, canGoBack: true } }} navigation = {navigation} />
        </GestureHandlerRootView>
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it("BackButton is enabled, So NextButton is not displayed",() => {
    expect(instance.queryByTestId('nextButtonTestId')).toBeNull();
  })
  it("BackButton is enabled, So OnBoardNewsLetterTitle is not in the screen",() => {
    expect(instance.queryByTestId('onBoardNewsLetterTitleTestId')).toBeNull();
  })

});

describe('<NewsLettersScreen> when the user is Signed in', () => {
  let instance: RenderAPI;
  const navigation = {
    navigate: jest.fn()
  }
  beforeEach(() => {
    profileSettingContentStyleMock();
    const component = (
      <Provider store={storeSampleData}>
        <GestureHandlerRootView>
          <NewsLetterScreen route={{ params: { nid: 123, canGoBack: true } }} navigation = {navigation} />
        </GestureHandlerRootView>
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });
  
  it("should apply profileSettingContentStyle in View",() => {
    const testId = instance.getByTestId('viewId');
    expect(testId.props.style).toEqual({flex: 1, justifyContent: "flex-start"})
  })
});

describe('<NewsLettersScreen> when the user is in onBoardFlow', () => {
  let instance: RenderAPI;
  const navigation = {
    navigate: jest.fn()
  }
  beforeEach(() => {
    newsLetterDataSelectedFlow();
    const component = (
      <Provider store={storeSampleData}>
        <GestureHandlerRootView>
          <NewsLetterScreen route={{ params: { nid: 123, canGoBack: false } }} navigation = {navigation} />
        </GestureHandlerRootView>
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it("should display button and the button is not disabled",() => {
    expect(instance.queryByTestId('nextButtonTestId')).not.toBeNull();
    expect(instance.queryByTestId('nextButtonTestId').props.disabled).toBeFalsy();
  });

  it("should call NextButton onPress when have an state newsLetterDataInfo and called with selected id",() => {
    const testId = instance.container.findByType(NextButton);
    fireEvent(testId,'onPress');
    expect(testId).not.toBeNull();
  });


  it('Should display in greenishBlue when a user selects a newsLetter', () => {
    const element = instance.container.findByType(NewsLettersWidget)
    fireEvent(element, 'changeSelectedStatus', sampleData[0]);
    const cardTestId = instance.getAllByTestId('CardTestId')[0];
    expect(cardTestId.props.style.backgroundColor).toEqual(Styles.color.greenishBlue)
  });

});

describe('<NewsLettersScreen> when the user is in onBoardFlow', () => {
  let instance: RenderAPI;
  const navigation = {
    navigate: jest.fn()
  }
  beforeEach(() => {
    selectedNewsLetterDataOnboardFlowMock();
    const component = (
      <Provider store={storeSampleData}>
        <GestureHandlerRootView>
          <NewsLetterScreen route={{ params: { nid: 123, canGoBack: false } }} navigation = {navigation} />
        </GestureHandlerRootView>
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it("should call NextButton onPress while contains array in selectedNewsLetterDataOnboard",() => {
    const testId = instance.container.findByType(NextButton);
    fireEvent.press(testId);
  })  
});

