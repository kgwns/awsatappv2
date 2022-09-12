import { journalistActions } from '../action';
import journalist from '../reducer';
import {
    JournalistArticleState,
} from '../types';

describe('dashbaord reducer', () => {
    let initialState: JournalistArticleState;
    beforeEach(() => {
        initialState = {
            isLoading: false,
            journalistArticle: [],
            journalistArticleError: '',
            journalistDetail: [],
            error: 'some-error',
            isDetailLoading: true
        };
    });

    test('getJournalistInfoDetail', () => {
        const nextState = journalist(
            initialState,
            journalistActions.getJournalistInfoDetail({ page: 1, nid: '0' }),
        );
        expect(nextState.isLoading).toBeTruthy();
    });

    test('getJournalistInfoDetailSuccess', () => {
        const testData = {
            title: '',
            nid: '0',
            image: '',
            news_categories: {},
            created: '',
            isBookmarked: true,
        }
        initialState.isLoading = true;
        const nextState = journalist(
            initialState,
            journalistActions.getJournalistInfoDetailSuccess({
                journalistData: testData,
            }),
        );
        expect(nextState.isLoading).toBeFalsy();
    });

    test('emptyJournalistArticle', () => {
        const testData = []
        initialState.isLoading = true;
        const nextState = journalist(
            initialState,
            journalistActions.emptyJournalistArticle([]),
        );
        expect(nextState.isLoading).toBeFalsy();
    });

    test('getJournalistInfoDetailFailed', () => {
        const testError = 'some-error';
        initialState.isLoading = true;
        const nextState = journalist(
            initialState,
            journalistActions.getJournalistInfoDetailFailed({
                error: testError,
            }),
        );
        expect(nextState.isLoading).toBeFalsy();
        expect(nextState.error).toEqual(testError);
    });

    test('fetchJournalistDetail', () => {
        const nextState = journalist(
            initialState,
            journalistActions.fetchJournalistDetail({ tid: '1' })
        );
        expect(nextState.isDetailLoading).toBeTruthy();
    });

    test('fetchJournalistDetailSuccess', () => {
        const testData = {
            authorName: '',
            authorImage: '',
            authorDescription: '',
            facebook_url: '',
            instagram_url: '',
            twitter_url: '',
            youtube_url: '',
        }
        initialState.isLoading = true;
        const nextState = journalist(
            initialState,
            journalistActions.fetchJournalistDetailSuccess({
                journalistDetail: testData,
            }),
        );
        expect(nextState.isDetailLoading).toBeFalsy();
    });

    test('emptyJournalistDetail', () => {
        const testData = []
        initialState.isLoading = true;
        const nextState = journalist(
            initialState,
            journalistActions.emptyJournalistDetail([]),
        );
        expect(nextState.isDetailLoading).toBeFalsy();
    });

    test('fetchJournalistDetailFailed', () => {
        const testError = 'some-error';
        initialState.isLoading = true;
        const nextState = journalist(
            initialState,
            journalistActions.fetchJournalistDetailFailed({
                error: testError,
            }),
        );
        expect(nextState.isDetailLoading).toBeFalsy();
        expect(nextState.error).toEqual(testError);
    });
});
