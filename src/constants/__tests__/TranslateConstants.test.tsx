import {
  TranslateConstants,
  TranslateKey,
} from "../Constants";
import * as Redux from 'react-redux';

jest.mock('react', () => {
  const ActualReact = jest.requireActual('react')
  return {
    ...ActualReact,
    useContext: () => ({}), // what you want to return when useContext get fired goes here
  }
})

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

const arabicWords = {
  return: 'return',
  signUpAlert:{
  notSubscribed: 'notSubscribed',
  description: 'description',
  signUp: 'signUp'
  },
  games: {
  crossword: 'crossword', 
  sudoku: 'sudoku', 
  solvingCrossPuzzles: 'solvingCrossPuzzles', 
  solvingSudoku: 'solvingSudoku', 
  crosswordDescription: 'crosswordDescription', 
  sudokuDescription: 'sudokuDescription', 
  games: 'games'
  },
  sectionTab: {
    main: 'main'
  },
  latestNewsTab: {
    sectionComboOne:{
      headerLeft: 'headerLeft'
    },
    sectionComboTwo:{
      headerLeft: 'headerLeft'
    },
    sectionComboThree:{
      headerLeft: 'headerLeft'
    },
    sectionComboFour:{
      headerLeft: 'headerLeft'
    },
    sectionComboFive:{
      headerLeft: 'headerLeft'
    },
    sectionComboSix:{
      headerLeft: 'headerLeft'
    },
    sectionComboSeven:{
      headerLeft: 'headerLeft'
    },
    sectionComboEight:{
      headerLeft: 'headerLeft'
    },
    editorsChoice:{
      headerLeft: 'headerLeft'
    },
    sectionWriters:{
      headerLeft: 'headerLeft',
      sliderLeftHeader: 'sliderLeftHeader'
    },
    editorsPick:{
      headerRight: 'headerRight'
    },
    archivedArticle:{
      headerTitle: 'headerTitle'
    }
  },
  drawer:{
    pdfArchive: 'pdfArchive',
    callUs: 'callUs',
    advertiseWithUs:'advertiseWithUs',
    aboutTheMiddleEast: 'aboutTheMiddleEast',
    termsOfUse: 'termsOfUse'
  },
  opinion:{
    opinionArticles: 'opinionArticles'
  },
  richHTMLContent:{
    facts: 'facts',
    readArticle: 'readArticle',
    opinionTitle: 'opinionTitle'
  },
  common:{
    more: 'more',
    ok: 'ok'
  },
  myNewsWriters:{
    allTxt: 'allTxt',
    noContent: 'noContent'
  },
  contactUs:{
    name: 'name',
    email: 'email',
    yourLetter: 'yourLetter',
    send: 'send'
  },
  profileSetting:{
    alert: 'alert'
  },
  opinionArticleDetail:{
    listenToArticle: 'listenToArticle'
  },
  onboardSuccess:{
    successMessage: 'successMessage',
    mailAcknowledgement: 'mailAcknowledgement',
    goToHome: 'goToHome',
    goToMyNews: 'goToMyNews'
  },
  weatherDetail: {
    sunrise: 'sunrise',
    sunset: 'sunset',
    sidebarTitle: 'sidebarTitle',
    max: 'max',
    humidity: 'humidity',
    speed: 'speed',
    kmh: 'kmh',
    visibility: 'visibility',
    pressure: 'pressure',
    seaCondition: 'seaCondition',
    km: 'km',
    mbar: 'mbar',
    enableLocation: 'enableLocation',
    noInformation: 'noInformation'
  },
  articleDetail:{
    contentBundleWidgetTitle: 'contentBundleWidgetTitle'
  },
  displayTag:{
    liveTagTitle: 'liveTagTitle',
    specialTagTitle: 'specialTagTitle',
    analysisTagTitle: 'analysisTagTitle'
  },
  notRegisteredPopUp:{
    createAccountDescription: 'createAccountDescription',
    notSubscribed: 'notSubscribed',
    saveArticleToYourFavourite: 'saveArticleToYourFavourite',
    signUp: 'signUp',
    logIn: 'logIn',
  },
  favorite:{
    articles_that_interest_you: 'articles_that_interest_you',
    articles_from_your_favorite_writers: 'articles_from_your_favorite_writers'
  },
  contentForYou:{
    emptyDataLabel: 'emptyDataLabel'
  },
  default:{
    default: ''
  }
}

const mockArabicWords = {arabicWords}

describe('TranslateKey', () => {
  
  beforeEach(() => {
    jest.spyOn(Redux, 'useSelector').mockImplementation((callback) => callback(mockArabicWords))
  })

  test('TranslateKey', () => {
    
    expect(TranslateConstants({ key: TranslateKey.RETURN})).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.NOT_SUBSCRIBED})).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.DESCRIPTION })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.SIGN_UP })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.CROSSWORD })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.SUDOKU })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.SOLVING_CROSS_PUZZLES })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.SOLVING_SUDOKU })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.CROSS_WORD_DESCRIPTION })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.SUDOKU_DESCRIPTION })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.GAMES })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.SECTION_MAIN })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.SECTION_COMBO_ONE })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.SECTION_COMBO_TWO })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.SECTION_COMBO_THREE })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.SECTION_COMBO_FOUR })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.SECTION_COMBO_FIVE })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.SECTION_COMBO_SIX })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.SECTION_COMBO_SEVEN })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.SECTION_COMBO_EIGHT })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.EDITOR_CHOICE_HEADER_TITLE })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.DRAWER_PDF_ARCHIVE })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.OPINION_COMBO_TITLE })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.OPINION_ARTICLE_TITLE })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.RICH_HTML_FACTS })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.CONST_MORE })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.CONST_READ_ARTICLE })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.RICH_OPINION_TITLE })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.TAB_ALL_TITLE })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.NO_CONTENT_TITLE })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.DRAWER_CALL_US })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.CONTACT_US_NAME })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.CONTACT_US_EMAIL })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.CONTACT_US_LETTER })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.CONTACT_US_SEND })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.TEXT_ALERT })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.COMMON_OK })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.LISTEN_TO_ARTICLE })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.ONBOARD_SUCCESS_MESSAGE })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.ONBOARD_SUCCESS_MAIL_ACKNOWLEDGEMENT })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.ONBOARD_SUCCESS_GO_TO_HOME })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.ONBOARD_SUCCESS_GO_TO_MY_NEWS })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.WEATHER_DETAILS_SUNRISE })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.WEATHER_DETAILS_SUNSET })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.WEATHER_DETAILS_SIDEBAR })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.WEATHER_DETAILS_MAX })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.WEATHER_DETAILS_HUMIDITY })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.WEATHER_DETAILS_SPEED })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.WEATHER_DETAILS_KM })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.WEATHER_DETAILS_VISIBILITY })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.WEATHER_DETAILS_KMH })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.WEATHER_DETAILS_PRESSURE })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.WEATHER_DETAILS_MBAR })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.WEATHER_DETAILS_ENABLE_LOCATION })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.WEATHER_DETAILS_SEA_CONDITION })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.OPINION_SLIDER_TITLE })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.ADVERTISE_WITH_US })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.ABOUT_THE_MIDDLE_EAST })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.TERMS_OF_USE })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.EDITORS_PICK_HEADER_TITLE })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.WEATHER_NO_INFORMATION_TEXT })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.CONTENT_BUNDLE_WIDGET_TITLE })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.ARCHIVED_ARTICLE_SECTION_TITLE })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.LIVE_TAG_TITLE })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.SPECIAL_TAG_TITLE })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.ANALYSIS_TAG_TITLE })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.CREATE_ACCOUNT_DESCRIPTION })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.NOT_SUBSCRIBED_POP_UP })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.SIGN_UP_POP_UP })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.LOG_IN_POP_UP })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.FAVORITE_ARTICLES_THAT_INTEREST_YOU })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.FAVORITE_ARTICLE_FROM_YOUR_FAVORITE_WRITERS })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.CONTENT_FOR_YOU_EMPTY_DATA_LABEL })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.default })).toBe('');   
  });

})

