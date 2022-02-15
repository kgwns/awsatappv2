import { all, takeLatest } from "redux-saga/effects";
import { REQUEST_ARTICLE_DETAIL, REQUEST_RELATED_ARTICLE } from "../actionType";
import articleDetailSaga, { fetchArticleDetail, fetchRelatedArticle } from "../sagas";

describe('<Article Detail Saga >', () => {
    beforeEach(() => {
        jest.useFakeTimers()
    })
    describe('Check ArticleDetail sage method', () => {
        const genObject = articleDetailSaga();

        it('should wait for latest REQUEST_ARTICLE_DETAIL action and call fetchArticleDetail', () => {
            const generator = genObject.next();
            expect(generator.value).toEqual(
                all([
                    takeLatest(REQUEST_ARTICLE_DETAIL, fetchArticleDetail),
                    takeLatest(REQUEST_RELATED_ARTICLE, fetchRelatedArticle)
                ])
            );
        });

        it('should be done on next iteration', () => {
            expect(genObject.next().done).toBeTruthy();
        });
    })
})