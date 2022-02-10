import { useDispatch, useSelector } from 'react-redux';
import {
  getIsLoading,
  getArticleData,
  getArticleError,
} from 'src/redux/articleDetail/selectors';
import { ArticleDetailBodyGet, ArticleDetailDataType } from 'src/redux/articleDetail/types';
import { requestArticleDetail } from 'src/redux/articleDetail/action';

export interface UseArticleDetailReturn {
  isLoading: boolean;
  articleDetailData: ArticleDetailDataType[];
  articleError: string;
  fetchArticleDetail(payload: ArticleDetailBodyGet): void;
}

export const useArticleDetail = (): UseArticleDetailReturn => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const articleDetailData = useSelector(getArticleData);
  const articleError = useSelector(getArticleError);
  const fetchArticleDetail = (payload: ArticleDetailBodyGet) => {
    dispatch(requestArticleDetail(payload));
  };

  return {
    isLoading,
    articleDetailData,
    articleError,
    fetchArticleDetail,
  };
};