import {useDispatch, useSelector} from 'react-redux';
import {
  getOpinionsData,
  getIsLoading,
  getOpinionsError,
  getWriterOpinionIsLoading,
  getWriterOpinionsData,
  getWriterOpinionsError,
  getHomeOpinionNidData,
  getOpinionsByIdData,
} from 'src/redux/opinions/selectors';
import {emptyWriterOpinionAction, fetchOpinions, fetchWriterOpinions, emptyOpinionsAction, fetchOpinionsSuccess} from 'src/redux/opinions/action';
import { FetchOpinionsSuccessPayloadType, OpinionsBodyGet, OpinionsListItemType, WriterOpinionsBodyGet} from 'src/redux/opinions/types';

export interface UseOpinionsReturn {
  isLoading: boolean;
  opinionsData: OpinionsListItemType[];
  opinionByIdData: OpinionsListItemType[];
  opinionsError: string;
  fetchOpinionsRequest(payload: OpinionsBodyGet): void;
  isWriterOpinionLoading: boolean;
  writerOpinionsData: OpinionsListItemType[];
  writerOpinionsError: string;
  fetchWriterOpinionsRequest(payload: WriterOpinionsBodyGet): void;
  emptyWriterOpinionData(): void;
  emptyOpinionsData(): void;
  saveOpinionsSuccessInfo(payload: FetchOpinionsSuccessPayloadType): void
}

export const useOpinions = (): UseOpinionsReturn => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const opinionsData = useSelector(getOpinionsData);
  const opinionByIdData = useSelector(getOpinionsByIdData);
  const opinionsError = useSelector(getOpinionsError);
  const homeOpinionNidList = useSelector(getHomeOpinionNidData);

  const fetchOpinionsRequest = (payload: OpinionsBodyGet) => {
    payload.nid = payload.nid ? payload.nid : homeOpinionNidList;
    dispatch(fetchOpinions(payload));
  };

  const isWriterOpinionLoading = useSelector(getWriterOpinionIsLoading);
  const writerOpinionsData = useSelector(getWriterOpinionsData);
  const writerOpinionsError = useSelector(getWriterOpinionsError);
  const fetchWriterOpinionsRequest = (payload: WriterOpinionsBodyGet) => {
    dispatch(fetchWriterOpinions(payload));
  };

  const emptyWriterOpinionData = () => {
    dispatch(emptyWriterOpinionAction())
  }

  const emptyOpinionsData = () =>{
    dispatch(emptyOpinionsAction())
  }

  const saveOpinionsSuccessInfo = (payload: FetchOpinionsSuccessPayloadType) => {
    dispatch(fetchOpinionsSuccess(payload))
  }

  return {
    isLoading,
    opinionsData,
    opinionByIdData,
    opinionsError,
    fetchOpinionsRequest,
    isWriterOpinionLoading,
    writerOpinionsData,
    writerOpinionsError,
    fetchWriterOpinionsRequest,
    emptyWriterOpinionData,
    emptyOpinionsData,
    saveOpinionsSuccessInfo,
  };
};
