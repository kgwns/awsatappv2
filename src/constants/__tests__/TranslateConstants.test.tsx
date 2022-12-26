import {
  TranslateConstants,
  TranslateKey,
} from "../Constants";

jest.mock('react', () => {
  const ActualReact = jest.requireActual('react')
  return {
    ...ActualReact,
    useContext: () => ({}), // what you want to return when useContext get fired goes here
  }
})

describe('TranslateKey', () => {
  test('TranslateKey', () => {

    expect(TranslateConstants({ key: TranslateKey.NOT_SUBSCRIBED })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.DESCRIPTION })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.SIGN_UP })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.GAMES })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.SECTION_MAIN })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.CROSSWORD })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.RETURN })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.SUDOKU })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.SOLVING_CROSS_PUZZLES })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.SOLVING_SUDOKU })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.CROSS_WORD_DESCRIPTION })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.SUDOKU_DESCRIPTION })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.SECTION_COMBO_ONE })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.SECTION_COMBO_TWO })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.SECTION_COMBO_THREE })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.SECTION_COMBO_FOUR })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.SECTION_COMBO_FIVE })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.SECTION_COMBO_SEVEN })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.SECTION_COMBO_SIX })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.EDITOR_CHOICE_HEADER_TITLE })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.DRAWER_PDF_ARCHIVE })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.OPINION_COMBO_TITLE })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.OPINION_ARTICLE_TITLE })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.RICH_HTML_FACTS })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.CONST_MORE })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.CONST_READ_ARTICLE })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.TAB_ALL_TITLE })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.RICH_OPINION_TITLE })).toBeDefined();
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
    expect(TranslateConstants({ key: TranslateKey.OPINION_SLIDER_TITLE })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.ADVERTISE_WITH_US })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.ABOUT_THE_MIDDLE_EAST })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.TERMS_OF_USE })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.EDITORS_PICK_HEADER_TITLE })).toBeDefined();
    expect(TranslateConstants({ key: TranslateKey.default })).toBe('');
  });
})