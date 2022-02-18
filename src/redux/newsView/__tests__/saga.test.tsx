import { all, takeLatest } from "redux-saga/effects";
import { REQUEST_HERO_LIST_DATA, REQUEST_TOP_LIST_DATA, REQUEST_BOTTOM_LIST_DATA } from "../actionTypes";
import newsViewSaga, { fetchHeroList, fetchTopList, fetchBottomList } from "../sagas";

describe('<NewsViewSaga >', () => {
    beforeEach(() => {
        jest.useFakeTimers()
    })
    describe('Check news view saga method', () => {
        const genObject = newsViewSaga();

        it('should wait for latest REQUEST_HERO_LIST_DATA action and call fetchHeroList', () => {
            const generator = genObject.next();
            expect(generator.value).toEqual(
                all([
                    takeLatest(REQUEST_HERO_LIST_DATA, fetchHeroList),
                ])
            );
        });
        it('should wait for latest REQUEST_TOP_LIST_DATA action and call fetchTopList', () => {
            const generator = genObject.next();
            expect(generator.value).toEqual(
                all([
                    takeLatest(REQUEST_TOP_LIST_DATA, fetchTopList),
                ])
            );
        });
        it('should wait for latest REQUEST_BOTTOM_LIST_DATA action and call fetchBottomList', () => {
            const generator = genObject.next();
            expect(generator.value).toEqual(
                all([
                    takeLatest(REQUEST_BOTTOM_LIST_DATA, fetchBottomList),
                ])
            );
        });

        it('should be done on next iteration', () => {
            expect(genObject.next().done).toBeTruthy();
        });
    })
})