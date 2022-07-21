import {renderHook, RenderHookResult, act} from '@testing-library/react-hooks';
import {useDispatch} from 'react-redux';
import {
  useAppPlayer,
  UseAppPlayerReturn,
} from '../useAppPlayer';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('#useAppPlayer', () => {
  let result: RenderHookResult<undefined, UseAppPlayerReturn>;

  const dispatchMock = jest.fn();

  beforeAll(() => {
    (useDispatch as jest.Mock).mockReturnValueOnce(dispatchMock);

    result = renderHook<undefined, UseAppPlayerReturn>(() =>
      useAppPlayer(),
    );
  });

  afterAll(() => {
    jest.clearAllMocks();
    result.unmount();
  });

  describe('#select showMiniPlayer', () => {
    it('should return showMiniPlayer', () => {
      const {
        result: {
          current: {showMiniPlayer},
        },
      } = result;
      expect(showMiniPlayer).toBe(undefined);
    });
  });

  describe('#select isPlaying', () => {
    it('should return isPlaying', () => {
      const {
        result: {
          current: {isPlaying},
        },
      } = result;
      expect(isPlaying).toBe(undefined);
    });
  });

  describe('#select showControls', () => {
    it('should return showControls', () => {
      const {
        result: {
          current: {showControls},
        },
      } = result;
      expect(showControls).toBe(undefined);
    });
  });

  describe('#setControlState', () => {
    it('should call dispatch with get token request action', () => {
      const {
        result: {
          current: {setControlState},
        },
      } = result;

      act(() => {
        setControlState(true);
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

  describe('#setShowMiniPlayer', () => {
    it('should call dispatch with get token request action', () => {
      const {
        result: {
          current: {setShowMiniPlayer},
        },
      } = result;

      act(() => {
        setShowMiniPlayer(true);
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

  describe('#setPlay', () => {
    it('should call dispatch with get token request action', () => {
      const {
        result: {
          current: {setPlay},
        },
      } = result;

      act(() => {
        setPlay(true);
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

  describe('#setPlayerTrack', () => {
    it('should call dispatch with get token request action', () => {
      const {
        result: {
          current: {setPlayerTrack},
        },
      } = result;

      act(() => {
        setPlayerTrack([]);
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

});
