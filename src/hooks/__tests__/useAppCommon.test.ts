import {renderHook, RenderHookResult} from '@testing-library/react-hooks';
import {useDispatch, useSelector} from 'react-redux';
import {useAppCommon,UseAppCommonReturn} from '../useAppCommon';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe('#useAppCommon', () => {
  let result: RenderHookResult<undefined,UseAppCommonReturn>;
  const mockDispatch = jest.fn();

  // test data
  const theme = 'light';
  const isFirstSessionMock = true;
  const serverEnvironmentMock = {};
  const articleFontSizeMock = 10;
  
  // selectors mock
  const themeMock = jest
    .fn()
    .mockReturnValueOnce(theme);
  const selectisFirstSessionMock = jest
    .fn()
    .mockReturnValueOnce(isFirstSessionMock);
  const selectserverEnvironmentMock = jest
    .fn()
    .mockReturnValueOnce(serverEnvironmentMock);
  const selectarticleFontSizeMock = jest
    .fn()
    .mockReturnValueOnce(articleFontSizeMock);


  beforeAll(() => {
    (useSelector as jest.Mock).mockImplementationOnce(themeMock);
    (useDispatch as jest.Mock).mockImplementationOnce(mockDispatch);
    (useSelector as jest.Mock).mockImplementationOnce(
      selectisFirstSessionMock,
    );
    (useSelector as jest.Mock).mockImplementationOnce(
      selectserverEnvironmentMock,
    );
    (useSelector as jest.Mock).mockImplementationOnce(
      selectarticleFontSizeMock,
    );

    result = renderHook<undefined,UseAppCommonReturn>(() => useAppCommon());
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
      expect(theme).toBe('light');
    });
  });

  describe('#isFirstSession', () => {
    it('isFirstSession', () => {
      const {
        result: {
          current: {isFirstSession},
        },
      } = result;
      expect(isFirstSession).toBe(isFirstSessionMock);
    });
  });

  describe('#serverEnvironment', () => {
    it('serverEnvironment', () => {
      const {
        result: {
          current: {serverEnvironment},
        },
      } = result;
      expect(serverEnvironment).toBe(serverEnvironmentMock);
    });
  });

  describe('#articleFontSize', () => {
    it('should articleFontSize', () => {
      const {
        result: {
          current: {articleFontSize},
        },
      } = result;

      expect(articleFontSize).toBe(
        articleFontSizeMock,
      );
    });
  });

});
