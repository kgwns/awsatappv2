import { useDispatch, useSelector } from 'react-redux';
import {
  getIsLoading,
  getArticleData,
  getArticleError,
  getRelatedArticleData,
  getArticleSectionLoaded,
} from 'src/redux/articleDetail/selectors';
import { ArticleDetailBodyGet, ArticleDetailDataType, RelatedArticleBodyGet, RelatedArticleDataType } from 'src/redux/articleDetail/types';
import { requestArticleDetail, requestRelatedArticle, emptyData } from 'src/redux/articleDetail/action';
import { sendUserEventTracking, TrackingEventType } from 'src/services/eventTrackService';
import { isInvalidOrEmptyArray } from 'src/shared/utils';

export interface UseArticleDetailReturn {
  isLoading: boolean;
  articleDetailData: ArticleDetailDataType[];
  articleError: string;
  relatedArticleData: RelatedArticleDataType[]
  fetchArticleDetail(payload: ArticleDetailBodyGet): void;
  fetchRelatedArticle(payload: RelatedArticleBodyGet): void;
  emptyAllData(): void;
  isArticleSectionLoaded: boolean
  sendEventToServer: (articleDetail: ArticleDetailDataType[]) => void;
}

export const useArticleDetail = (): UseArticleDetailReturn => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const articleDetailData = useSelector(getArticleData);
  const articleError = useSelector(getArticleError);
  const relatedArticleData = useSelector(getRelatedArticleData);
  const isArticleSectionLoaded = useSelector(getArticleSectionLoaded)

  const fetchArticleDetail = (payload: ArticleDetailBodyGet) => {
    dispatch(requestArticleDetail(payload));
  };
  const fetchRelatedArticle = (payload: RelatedArticleBodyGet) => {
    dispatch(requestRelatedArticle(payload));
  };
  const emptyAllData = () => {
    dispatch(emptyData());
  };

  const sendEventToServer = (articleDetailInfo: ArticleDetailDataType[]) => {
    if (isInvalidOrEmptyArray(articleDetailInfo)) {
      return
    }

    const getArticleID = () => {
      return articleDetailInfo.reduce((prevValue: string[], item: ArticleDetailDataType) => {
        return prevValue.concat(item.nid)
      }, [])
    }

    const listOfNID = getArticleID()
    const allEvents = listOfNID.map((item) => {
      return {
        contentId: item,
        eventType: TrackingEventType.VIEW
      }
    })

    sendUserEventTracking(
      {
        events: allEvents
      }
    )
  }

  return {
    isLoading,
    articleDetailData,
    articleError,
    relatedArticleData,
    isArticleSectionLoaded,
    fetchArticleDetail,
    fetchRelatedArticle,
    emptyAllData,
    sendEventToServer,
  };
};
