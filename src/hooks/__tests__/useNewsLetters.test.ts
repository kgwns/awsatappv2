import {renderHook, RenderHookResult, act} from '@testing-library/react-hooks';
import {useDispatch} from 'react-redux';
import { EMPTY_SELECTED_NEWSLETTER_DATA_FROM_ONBOARD, EMPTY_SELECTED_NEWS_LETTERS_INFO, GET_MY_NEWS_LETTERS, GET_SELECTED_NEWS_LETTERS } from 'src/redux/newsLetter/actionTypes';
import {
  useNewsLetters,
  UseNewsLettersReturn,
} from '../useNewsLetters';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('#useNewsLetters', () => {
  let result: RenderHookResult<undefined, UseNewsLettersReturn>;

  const dispatchMock = jest.fn();

  beforeAll(() => {
    (useDispatch as jest.Mock).mockReturnValueOnce(dispatchMock);

    result = renderHook<undefined, UseNewsLettersReturn>(() =>
      useNewsLetters(),
    );
  });

  afterAll(() => {
    jest.clearAllMocks();
    result.unmount();
  });

  describe('#sendSelectedNewsLettersInfo', () => {
    it('should call dispatch with sendSelectedNewsLettersInfo', () => {
      const {
        result: {
          current: {sendSelectedNewsLettersInfo},
        },
      } = result;

      act(() => {
        sendSelectedNewsLettersInfo({tid: '2'});
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

  describe('#getSelectedNewsLettersData', () => {
    it('should call dispatch with getSelectedNewsLettersData', () => {
      const {
        result: {
          current: {getSelectedNewsLettersData},
        },
      } = result;

      act(() => {
        getSelectedNewsLettersData();
      });

      expect(dispatchMock).toHaveBeenCalled();
      expect(dispatchMock).toHaveBeenCalledWith({
        type: GET_SELECTED_NEWS_LETTERS,
      });
    });
  });

  describe('#getMyNewsLettersData', () => {
    it('should call dispatch with getMyNewsLettersData', () => {
      const {
        result: {
          current: {getMyNewsLettersData},
        },
      } = result;

      act(() => {
        getMyNewsLettersData();
      });

      expect(dispatchMock).toHaveBeenCalled();
      expect(dispatchMock).toHaveBeenCalledWith({
        type: GET_MY_NEWS_LETTERS,
      });
    });
  });

  describe('#emptySelectedNewsLettersInfoData', () => {
    it('should call dispatch with emptySelectedNewsLettersInfoData', () => {
      const {
        result: {
          current: {emptySelectedNewsLettersInfoData},
        },
      } = result;

      act(() => {
        emptySelectedNewsLettersInfoData();
      });

      expect(dispatchMock).toHaveBeenCalled();
      expect(dispatchMock).toHaveBeenCalledWith({
        type: EMPTY_SELECTED_NEWS_LETTERS_INFO,
      });
    });
  });

  describe('#sendSelectedFromNewsletterOnboard', () => {
    it('should call dispatch with sendSelectedFromNewsletterOnboard', () => {
      const {
        result: {
          current: {sendSelectedFromNewsletterOnboard},
        },
      } = result;

      act(() => {
        sendSelectedFromNewsletterOnboard([]);
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

  describe('#emptySelectedNewsletterDataOnboard', () => {
    it('should call dispatch with emptySelectedNewsletterDataOnboard', () => {
      const {
        result: {
          current: {emptySelectedNewsletterDataOnboard},
        },
      } = result;

      act(() => {
        emptySelectedNewsletterDataOnboard();
      });

      expect(dispatchMock).toHaveBeenCalled();
      expect(dispatchMock).toHaveBeenCalledWith({
        type: EMPTY_SELECTED_NEWSLETTER_DATA_FROM_ONBOARD,
      });
    });
  });

});
