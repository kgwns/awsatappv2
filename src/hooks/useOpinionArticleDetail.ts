import {useDispatch, useSelector} from 'react-redux';
import {
  OpinionArticleDetailBodyGet,
  OpinionArticleDetailItemType,
  RelatedOpinionBodyGet,
  OpinionsListItemType
} from 'src/redux/opinionArticleDetail/types';
import {requestOpinionArticleDetail,fetchRelatedOpinion,emptyRelatedOpinionDataList} from 'src/redux/opinionArticleDetail/action';
import {
  getOpinionArticleData,
  getIsLoading,
  getOpinionArticleError,
  getIsLoadingRelatedOpinion,
  getRelatedOpinionData,
  getRelatedOpinionError,
} from 'src/redux/opinionArticleDetail/selectors';

export interface UseOpinionArticleDetailReturn {
  isLoading: boolean;
  opinionArticleDetailData: OpinionArticleDetailItemType[];
  opinionArticleError: string;
  fetchOpinionArticleDetail(payload: OpinionArticleDetailBodyGet): void;
  isLoadingRelatedOpinion:boolean,
  relatedOpinionError: string,
  relatedOpinionListData: OpinionsListItemType[],
  fetchRelatedOpinionData(payload: RelatedOpinionBodyGet): void;
  emptyRelatedOpinionData(): void;
}

export const useOpinionArticleDetail = (): UseOpinionArticleDetailReturn => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const opinionArticleDetailData = useSelector(getOpinionArticleData);
  const opinionArticleError = useSelector(getOpinionArticleError);
  const isLoadingRelatedOpinion = useSelector(getIsLoadingRelatedOpinion);
  const relatedOpinionListData = useSelector(getRelatedOpinionData);
  const relatedOpinionError = useSelector(getRelatedOpinionError);
  const fetchOpinionArticleDetail = (payload: OpinionArticleDetailBodyGet) => {
    dispatch(requestOpinionArticleDetail(payload));
  };
  const fetchRelatedOpinionData = (payload: RelatedOpinionBodyGet) => {
    dispatch(fetchRelatedOpinion(payload));
  };
  const emptyRelatedOpinionData = () => {
    dispatch(emptyRelatedOpinionDataList());
  };

  return {
    isLoading,
    opinionArticleDetailData,
    opinionArticleError,
    fetchOpinionArticleDetail,
    isLoadingRelatedOpinion,
    relatedOpinionListData,
    relatedOpinionError,
    fetchRelatedOpinionData,
    emptyRelatedOpinionData
  };
};
