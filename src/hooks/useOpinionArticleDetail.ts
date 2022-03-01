import {useDispatch, useSelector} from 'react-redux';
import {
  OpinionArticleDetailBodyGet,
  OpinionArticleDetailItemType,
} from 'src/redux/opinionArticleDetail/types';
import {requestOpinionArticleDetail} from 'src/redux/opinionArticleDetail/action';
import {
  getOpinionArticleData,
  getIsLoading,
  getOpinionArticleError,
} from 'src/redux/opinionArticleDetail/selectors';

export interface UseOpinionArticleDetailReturn {
  isLoading: boolean;
  opinionArticleDetailData: OpinionArticleDetailItemType[];
  opinionArticleError: string;
  fetchOpinionArticleDetail(payload: OpinionArticleDetailBodyGet): void;
}

export const useOpinionArticleDetail = (): UseOpinionArticleDetailReturn => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const opinionArticleDetailData = useSelector(getOpinionArticleData);
  const opinionArticleError = useSelector(getOpinionArticleError);
  const fetchOpinionArticleDetail = (payload: OpinionArticleDetailBodyGet) => {
    dispatch(requestOpinionArticleDetail(payload));
  };

  return {
    isLoading,
    opinionArticleDetailData,
    opinionArticleError,
    fetchOpinionArticleDetail,
  };
};
