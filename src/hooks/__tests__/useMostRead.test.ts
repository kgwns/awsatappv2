import {renderHook, RenderHookResult, act} from '@testing-library/react-hooks';
import {useDispatch} from 'react-redux';
import {
    UseMostReadReturn,
    useMostRead,
} from '../useMostRead';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('#usePhotoGallery', () => {
  let result: RenderHookResult<undefined, UseMostReadReturn>;

  const dispatchMock = jest.fn();

  beforeAll(() => {
    (useDispatch as jest.Mock).mockReturnValueOnce(dispatchMock);

    result = renderHook<undefined, UseMostReadReturn>(() =>
    useMostRead(),
    );
  });

  afterAll(() => {
    jest.clearAllMocks();
    result.unmount();
  });

  describe('#fetchMostReadRequest', () => {
    it('should call dispatch with fetchMostReadRequest', () => {
      const {
        result: {
          current: {fetchMostReadRequest},
        },
      } = result;

      act(() => {
        fetchMostReadRequest();
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

});
