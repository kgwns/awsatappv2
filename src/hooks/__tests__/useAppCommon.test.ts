import {renderHook, RenderHookResult, act} from '@testing-library/react-hooks';
import {useDispatch, useSelector} from 'react-redux';
import { RESET_ARTICLE_FONT_SIZE, STORE_BASE_URL_CONFIG, STORE_FONT_SIZE } from 'src/redux/appCommon/actionType';
import { ServerEnvironment } from 'src/redux/appCommon/types';
import {
  useAppCommon,
  UseAppCommonReturn,
} from '../useAppCommon';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isAndroid: false
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
        payload: { fontSize: 18 }
      });
    });
  });

  describe('#storeBaseUrlConfigInfo', () => {
    let payload =  {
      baseUrlConfig:{
      baseUrl: 'https://aawsat.srpcdigital.com/',
      umsUrl:  "https://awsatapi.srpcdigital.com/",
      imageUrl: 'https://static.srpcdigital.com/',
      profileImageUrl: "https://awsatapi.srpcdigital.com/storage/",
      liveBlogUrl: "https://aawsat.srpcdigital.com/livenews/",
    }}
    it('should call dispatch with base config', () => {
      const {
        result: {
          current: {storeBaseUrlConfigInfo},
        },
      } = result;

      act(() => {
        storeBaseUrlConfigInfo(payload.baseUrlConfig);
      });

      expect(dispatchMock).toHaveBeenCalled();
      expect(dispatchMock).toHaveBeenCalledWith({
        type: STORE_BASE_URL_CONFIG,
        payload: {
          baseUrlConfig: payload.baseUrlConfig
        }
      });
    });
  });

});


describe('#useAppCommon', () => {
  let result: RenderHookResult<undefined, UseAppCommonReturn>;

  const dispatchMock = jest.fn();

  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValueOnce(dispatchMock);
    (useSelector as jest.Mock).mockReturnValue(18);

    result = renderHook<undefined, UseAppCommonReturn>(() =>
      useAppCommon(),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    result.unmount();
  });

    it('should dispatch fontsize as 20', () => {
      DeviceTypeUtilsMock.isAndroid = true;
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
        payload: { fontSize: 20 }
      });
    });
});

describe('#useAppCommon', () => {
  let result: RenderHookResult<undefined, UseAppCommonReturn>;

  const dispatchMock = jest.fn();

  beforeAll(() => {
    (useDispatch as jest.Mock).mockReturnValueOnce(dispatchMock);
    (useSelector as jest.Mock).mockReturnValue(20);

    result = renderHook<undefined, UseAppCommonReturn>(() =>
      useAppCommon(),
    );
  });

  afterAll(() => {
    jest.clearAllMocks();
    result.unmount();
  });
  describe('#storeArticleFontSizeInfo', () => {
    it('should dispatch fontsize as 22', () => {
      DeviceTypeUtilsMock.isAndroid = false;
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
        payload: { fontSize: 22 }
      });
    });
  });

});
