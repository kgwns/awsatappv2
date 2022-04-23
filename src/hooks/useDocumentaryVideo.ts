import {useDispatch, useSelector} from 'react-redux';
import {
  getDocumentaryVideo,
  getIsLoading,
  getDocumentaryVideoError,
} from 'src/redux/documentaryVideo/selectors';
import {fetchDocumentaryVideo} from 'src/redux/documentaryVideo/action';
import {VideoItemType, RequestDocumentaryVideoPayload} from 'src/redux/documentaryVideo/types';

export interface UseVideoReturn {
  isVideoLoading: boolean;
  videoDocumentaryData: VideoItemType[];
  videoDocumentaryError: string;
  fetchDocumentaryVideoRequest(payload: RequestDocumentaryVideoPayload): void;
}

export const useDocumentaryVideo = (): UseVideoReturn => {
  const dispatch = useDispatch();
  const isVideoLoading = useSelector(getIsLoading);
  const videoDocumentaryData = useSelector(getDocumentaryVideo);
  const videoDocumentaryError = useSelector(getDocumentaryVideoError);
  const fetchDocumentaryVideoRequest = (
    payload: RequestDocumentaryVideoPayload,
  ) => {
    dispatch(fetchDocumentaryVideo(payload));
  };
  return {
    isVideoLoading,
    videoDocumentaryData,
    videoDocumentaryError,
    fetchDocumentaryVideoRequest,
  };
};
