import {useDispatch, useSelector} from 'react-redux';
import {
  getAlbumListData,
  getIsLoading,
  getAlbumListDataError,
  getAlbumDetailData,
  getAlbumDetailLoading,
  getAlbumDetailDataError
} from 'src/redux/photoGallery/selectors';
import {fetchAlbumList, fetchAlbumDetail, emptyData} from 'src/redux/photoGallery/action';
import {
  AlbumDetailBodyGet,
  AlbumDetailType,
  AlbumListBodyGet,
  AlbumListItemType,
} from 'src/redux/photoGallery/types';

export interface UsePhotoGalleryReturn {
  isLoading: boolean;
  albumListData: AlbumListItemType[];
  albumListDataError: string;
  fetchAlbumListData(payload: AlbumListBodyGet): void;
  isDetailLoading: boolean;
  albumDetailData: AlbumDetailType[];
  albumDetailError: string;
  fetchAlbumDetailData(payload: AlbumDetailBodyGet): void;
  emptyAllData(): void;
}

export const usePhotoGallery = (): UsePhotoGalleryReturn => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const albumListData = useSelector(getAlbumListData);
  const albumListDataError = useSelector(getAlbumListDataError);
  const fetchAlbumListData = (payload: AlbumListBodyGet) => {
    dispatch(fetchAlbumList(payload));
  };
  const isDetailLoading = useSelector(getAlbumDetailLoading);
  const albumDetailData = useSelector(getAlbumDetailData);
  const albumDetailError = useSelector(getAlbumDetailDataError);
  const fetchAlbumDetailData = (payload: AlbumDetailBodyGet) => {
    dispatch(fetchAlbumDetail(payload));
  };
  const emptyAllData = () => {
    dispatch(emptyData());
  };
  return {
    isLoading,
    albumListData,
    albumListDataError,
    fetchAlbumListData,
    isDetailLoading,
    albumDetailData,
    albumDetailError,
    fetchAlbumDetailData,
    emptyAllData,
  };
};
