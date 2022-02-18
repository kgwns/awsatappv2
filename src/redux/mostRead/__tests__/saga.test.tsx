import { all, takeLatest } from "redux-saga/effects";
import { FETCH_MOST_READ } from "../actionTypes";
import mostReadSaga, { fetchMostRead } from "../sagas";

describe('<MostReadSaga >', () => {
    beforeEach(() => {
        jest.useFakeTimers()
    })
    describe('Check most read saga method', () => {
        const genObject = mostReadSaga();

        it('should wait for latest FETCH_MOST_READ action and call fetchMostRead', () => {
            const generator = genObject.next();
            expect(generator.value).toEqual(
                all([
                    takeLatest(FETCH_MOST_READ, fetchMostRead),
                ])
            );
        });

        it('should be done on next iteration', () => {
            expect(genObject.next().done).toBeTruthy();
        });
    })
})