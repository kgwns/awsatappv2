import {useDispatch, useSelector} from 'react-redux';
import {
  getVideoData,
  getIsLoading,
  getVideoError,
} from 'src/redux/videoList/selectors';
import {fetchVideoList} from 'src/redux/videoList/action';
import {VideoItemType} from 'src/redux/videoList/types';

export interface UseVideoReturn {
  isLoading: boolean;
  videoData: VideoItemType[];
  videoError: string;
  fetchVideoRequest(): void;
}

export const useVideoList = (): UseVideoReturn => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const videoData = useSelector(getVideoData);
  const videoError = useSelector(getVideoError);
  const fetchVideoRequest = () => {
    dispatch(fetchVideoList());
  };
  return {
    isLoading,
    videoData,
    videoError,
    fetchVideoRequest,
  };
};
