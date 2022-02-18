import { all, takeLatest } from "redux-saga/effects";
import { FETCH_ALL_WRITERS  } from "../actionTypes";
import allWritersSaga, { fetchAllWriters } from "../sagas";

describe('<AllWritersSaga >', () => {
    beforeEach(() => {
        jest.useFakeTimers()
    })
    describe('Check AllWriters saga method', () => {
        const genObject = allWritersSaga();

        it('should wait for latest FETCH_ALL_WRITERS action and call fetchAllWriters', () => {
            const generator = genObject.next();
            expect(generator.value).toEqual(
                all([
                    takeLatest(FETCH_ALL_WRITERS, fetchAllWriters),
                ])
            );
        });

        it('should be done on next iteration', () => {
            expect(genObject.next().done).toBeTruthy();
        });
    })
})