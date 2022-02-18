import { all, takeLatest } from "redux-saga/effects";
import { REQUEST_TICKER_HERO_DATA, REQUEST_HERO_AND_TOP_LIST_DATA, REQUEST_OPINION_LIST_DATA, 
    REQUEST_SECTION_COMBO_ONE, REQUEST_SECTION_COMBO_TWO, REQUEST_SECTION_COMBO_THREE, REQUEST_SECTION_COMBO_FOUR } from "../actionType";
import articleDetailSaga, { fetchTickerAndHeroWidgetData, fetchHeroListTopListWidgetData, fetchOpinionWidgetData, fetchSectionCombo } from "../sagas";


describe('<LatestNewsSaga >', () => {
    beforeEach(() => {
        jest.useFakeTimers()
    })
    describe('Check Latest news saga method', () => {
        const genObject = articleDetailSaga();

        it('should wait for latest REQUEST_TICKER_HERO_DATA action and call fetchTickerAndHeroWidgetData', () => {
            const generator = genObject.next();
            expect(generator.value).toEqual(
                all([
                    takeLatest(REQUEST_TICKER_HERO_DATA, fetchTickerAndHeroWidgetData),
                ])
            );
        });
        it('should wait for latest REQUEST_HERO_AND_TOP_LIST_DATA action and call fetchHeroListTopListWidgetData', () => {
            const generator = genObject.next();
            expect(generator.value).toEqual(
                all([
                    takeLatest(REQUEST_HERO_AND_TOP_LIST_DATA, fetchHeroListTopListWidgetData),
                ])
            );
        });
        it('should wait for latest REQUEST_OPINION_LIST_DATA action and call fetchOpinionWidgetData', () => {
            const generator = genObject.next();
            expect(generator.value).toEqual(
                all([
                    takeLatest(REQUEST_OPINION_LIST_DATA, fetchOpinionWidgetData),
                ])
            );
        });
        it('should wait for latest REQUEST_SECTION_COMBO_ONE action and call fetchSectionCombo', () => {
            const generator = genObject.next();
            expect(generator.value).toEqual(
                all([
                    takeLatest(REQUEST_SECTION_COMBO_ONE, fetchSectionCombo),
                ])
            );
        });
        it('should wait for latest REQUEST_SECTION_COMBO_TWO action and call fetchSectionCombo', () => {
            const generator = genObject.next();
            expect(generator.value).toEqual(
                all([
                    takeLatest(REQUEST_SECTION_COMBO_TWO, fetchSectionCombo),
                ])
            );
        });
        it('should wait for latest REQUEST_SECTION_COMBO_THREE action and call fetchSectionCombo', () => {
            const generator = genObject.next();
            expect(generator.value).toEqual(
                all([
                    takeLatest(REQUEST_SECTION_COMBO_THREE, fetchSectionCombo),
                ])
            );
        });
        it('should wait for latest REQUEST_SECTION_COMBO_FOUR action and call fetchSectionCombo', () => {
            const generator = genObject.next();
            expect(generator.value).toEqual(
                all([
                    takeLatest(REQUEST_SECTION_COMBO_FOUR, fetchSectionCombo),
                ])
            );
        });
        it('should be done on next iteration', () => {
            expect(genObject.next().done).toBeTruthy();
        });
    })
})