import {renderHook, RenderHookResult, act} from '@testing-library/react-hooks';
import {useDispatch} from 'react-redux';
import {
  UsePhotoGalleryReturn,
  usePhotoGallery,
} from '../usePhotoGallery';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('#usePhotoGallery', () => {
  let result: RenderHookResult<undefined, UsePhotoGalleryReturn>;

  const dispatchMock = jest.fn();

  beforeAll(() => {
    (useDispatch as jest.Mock).mockReturnValueOnce(dispatchMock);

    result = renderHook<undefined, UsePhotoGalleryReturn>(() =>
    usePhotoGallery(),
    );
  });

  afterAll(() => {
    jest.clearAllMocks();
    result.unmount();
  });

  describe('#fetchAlbumListData', () => {
    it('should call dispatch with fetchAlbumListData', () => {
      const {
        result: {
          current: {fetchAlbumListData},
        },
      } = result;

      act(() => {
        fetchAlbumListData({
          page: 3,
          items_per_page: 3,
        });
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

  describe('#fetchAlbumDetailData', () => {
    it('should call dispatch with fetchAlbumDetailData', () => {
      const {
        result: {
          current: {fetchAlbumDetailData},
        },
      } = result;

      act(() => {
        fetchAlbumDetailData({ nid: 2});
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

  describe('#emptyAllData', () => {
    it('should call dispatch with emptyAllData', () => {
      const {
        result: {
          current: {emptyAllData},
        },
      } = result;

      act(() => {
        emptyAllData();
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });
});
