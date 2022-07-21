import {renderHook, RenderHookResult, act} from '@testing-library/react-hooks';
import {useDispatch} from 'react-redux';
import { RESET_ARTICLE_FONT_SIZE, STORE_FONT_SIZE } from 'src/redux/appCommon/actionType';
import { ServerEnvironment } from 'src/redux/appCommon/types';
import {
  useAppCommon,
  UseAppCommonReturn,
} from '../useAppCommon';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('#useAppCommon', () => {
  let result: RenderHookResult<undefined, UseAppCommonReturn>;

  const dispatchMock = jest.fn();

  beforeAll(() => {
    (useDispatch as jest.Mock).mockReturnValueOnce(dispatchMock);

    result = renderHook<undefined, UseAppCommonReturn>(() =>
      useAppCommon(),
    );
  });

  afterAll(() => {
    jest.clearAllMocks();
    result.unmount();
  });

  describe('#select theme', () => {
    it('should return theme', () => {
      const {
        result: {
          current: {theme},
        },
      } = result;
      expect(theme).toBe(undefined);
    });
  });

  describe('#select isFirstSession', () => {
    it('should return isFirstSession', () => {
      const {
        result: {
          current: {isFirstSession},
        },
      } = result;
      expect(isFirstSession).toBe(undefined);
    });
  });

  describe('#select serverEnvironment', () => {
    it('should return serverEnvironment', () => {
      const {
        result: {
          current: {serverEnvironment},
        },
      } = result;
      expect(serverEnvironment).toBe(undefined);
    });
  });

  describe('#select articleFontSize', () => {
    it('should return articleFontSize', () => {
      const {
        result: {
          current: {articleFontSize},
        },
      } = result;
      expect(articleFontSize).toBe(undefined);
    });
  });

  describe('#storeServerEnvironmentInfo', () => {
    it('should call dispatch with get token request action', () => {
      const {
        result: {
          current: {storeServerEnvironmentInfo},
        },
      } = result;

      act(() => {
        storeServerEnvironmentInfo(ServerEnvironment.DEBUG);
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

  describe('#resetFontSizeInfo', () => {
    it('should call dispatch with get token request action', () => {
      const {
        result: {
          current: {resetFontSizeInfo},
        },
      } = result;

      act(() => {
        resetFontSizeInfo();
      });

      expect(dispatchMock).toHaveBeenCalled();
      expect(dispatchMock).toHaveBeenCalledWith({
        type: RESET_ARTICLE_FONT_SIZE,
      });
    });
  });

  describe('#storeArticleFontSizeInfo', () => {
    it('should call dispatch with get token request action', () => {
      const {
        result: {
          current: {storeArticleFontSizeInfo},
        },
      } = result;

      act(() => {
        storeArticleFontSizeInfo();
      });

      expect(dispatchMock).toHaveBeenCalled();
      expect(dispatchMock).toHaveBeenCalledWith({
        type: STORE_FONT_SIZE,
        payload: { fontSize: 16 }
      });
    });
  });

});
