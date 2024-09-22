import {useDispatch, useSelector} from 'react-redux';
import {
  getVideoData,
  getIsLoading,
  getVideoError,
  getIsVideoLoading,
  getVideoPaginationData,
  getVideoPaginationError,
  getVideoByData,
} from 'src/redux/videoList/selectors';
import {fetchVideoList, fetchVideoListById, fetchVideoListWithPagination} from 'src/redux/videoList/action';
import {VideoItemType, VideoListBodyGet} from 'src/redux/videoList/types';

export interface UseVideoReturn {
  isLoading: boolean;
  isVideoLoading: boolean;
  videoData: VideoItemType[];
  videoPaginationData: VideoItemType[];
  videoByIdData: VideoItemType[];
  videoError: string;
  errorMessage: string;
  fetchVideoRequest(payload: VideoListBodyGet): void;
  fetchVideoById(id: string): void;
  fetchVideoWithPagination(payload: VideoListBodyGet): void;
}

export const useVideoList = (): UseVideoReturn => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const videoData = useSelector(getVideoData);
  const videoError = useSelector(getVideoError);
  const isVideoLoading = useSelector(getIsVideoLoading);
  const videoPaginationData = useSelector(getVideoPaginationData);
  const videoByIdData = useSelector(getVideoByData);
  const errorMessage = useSelector(getVideoPaginationError);
  const fetchVideoRequest = (payload: VideoListBodyGet) => {
    dispatch(fetchVideoList(payload));
  };
  const fetchVideoById = (id: string) => {
    dispatch(fetchVideoListById(id));
  };
  const fetchVideoWithPagination = (payload: VideoListBodyGet) => {
    dispatch(fetchVideoListWithPagination(payload));
  };
  return {
    isLoading,
    videoData,
    videoError,
    fetchVideoRequest,
    fetchVideoById,
    fetchVideoWithPagination,
    isVideoLoading,
    videoPaginationData,
    videoByIdData,
    errorMessage,
  };
};
