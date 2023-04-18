import {useDispatch, useSelector} from 'react-redux';
import {
  getVideoData,
  getIsLoading,
  getVideoError,
  getIsVideoLoading,
  getVideoPaginationData,
  getVideoPaginationError,
} from 'src/redux/videoList/selectors';
import {fetchVideoList, fetchVideoListWithPagination} from 'src/redux/videoList/action';
import {VideoItemType, VideoListBodyGet} from 'src/redux/videoList/types';

export interface UseVideoReturn {
  isLoading: boolean;
  isVideoLoading: boolean;
  videoData: VideoItemType[];
  videoPaginationData: VideoItemType[];
  videoError: string;
  errorMessage: string;
  fetchVideoRequest(payload: VideoListBodyGet): void;
  fetchVideoWithPagination(payload: VideoListBodyGet): void;
}

export const useVideoList = (): UseVideoReturn => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const videoData = useSelector(getVideoData);
  const videoError = useSelector(getVideoError);
  const isVideoLoading = useSelector(getIsVideoLoading);
  const videoPaginationData = useSelector(getVideoPaginationData);
  const errorMessage = useSelector(getVideoPaginationError);
  const fetchVideoRequest = (payload: VideoListBodyGet) => {
    dispatch(fetchVideoList(payload));
  };
  const fetchVideoWithPagination = (payload: VideoListBodyGet) => {
    dispatch(fetchVideoListWithPagination(payload));
  };
  return {
    isLoading,
    videoData,
    videoError,
    fetchVideoRequest,
    fetchVideoWithPagination,
    isVideoLoading,
    videoPaginationData,
    errorMessage,
  };
};
