import {useDispatch, useSelector} from 'react-redux';
import {
  getSectionArticlesData,
  getIsLoading,
  getSectionArticlesError,
} from 'src/redux/sectionArticles/selectors';
import {
  fetchSectionArticles,
  emptySectionArticlesData,
} from 'src/redux/sectionArticles/action';
import {
  payloadType,
  SectionArticlesBodyGet,
} from 'src/redux/sectionArticles/types';

export interface UseSectionArticlesReturn {
  isLoading: boolean;
  sectionArticlesData: payloadType;
  sectionArticlesError: string;
  emptySectionArticleData(): void;
  fetchSectionArticlesRequest(payload: SectionArticlesBodyGet): void;
}

export const useSectionArticles = (): UseSectionArticlesReturn => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const sectionArticlesData = useSelector(getSectionArticlesData);
  const sectionArticlesError = useSelector(getSectionArticlesError);
  const emptySectionArticleData = () => {
    dispatch(emptySectionArticlesData());
  };
  const fetchSectionArticlesRequest = (payload: SectionArticlesBodyGet) => {
    dispatch(fetchSectionArticles(payload));
  };
  return {
    isLoading,
    sectionArticlesData,
    sectionArticlesError,
    emptySectionArticleData,
    fetchSectionArticlesRequest,
  };
};
