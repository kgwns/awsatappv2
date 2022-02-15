import { useDispatch, useSelector } from 'react-redux';
import {
  getIsLoading,
  getArticleData,
  getArticleError,
  getRelatedArticleData,
} from 'src/redux/articleDetail/selectors';
import { ArticleDetailBodyGet, ArticleDetailDataType, RelatedArticleBodyGet, RelatedArticleDataType } from 'src/redux/articleDetail/types';
import { requestArticleDetail, requestRelatedArticle } from 'src/redux/articleDetail/action';

export interface UseArticleDetailReturn {
  isLoading: boolean;
  articleDetailData: ArticleDetailDataType[];
  articleError: string;
  relatedArticleData: RelatedArticleDataType[]
  fetchArticleDetail(payload: ArticleDetailBodyGet): void;
  fetchRelatedArticle(payload: RelatedArticleBodyGet): void;
}

export const useArticleDetail = (): UseArticleDetailReturn => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const articleDetailData = useSelector(getArticleData);
  const articleError = useSelector(getArticleError);
  const relatedArticleData = useSelector(getRelatedArticleData);
  const fetchArticleDetail = (payload: ArticleDetailBodyGet) => {
    dispatch(requestArticleDetail(payload));
  };
  const fetchRelatedArticle = (payload: RelatedArticleBodyGet) => {
    dispatch(requestRelatedArticle(payload));
  };

  return {
    isLoading,
    articleDetailData,
    articleError,
    relatedArticleData,
    fetchArticleDetail,
    fetchRelatedArticle
  };
};