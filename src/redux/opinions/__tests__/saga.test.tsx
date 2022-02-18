
import { all, takeLatest } from "redux-saga/effects";
import { FETCH_OPINIONS } from "../actionTypes";
import opinionsSaga, { fetchOpinions } from "../sagas";

describe('<OpinionsSaga >', () => {
    beforeEach(() => {
        jest.useFakeTimers()
    })
    describe('Check opinion saga method', () => {
        const genObject = opinionsSaga();

        it('should wait for latest FETCH_OPINIONS action and call fetchOpinions', () => {
            const generator = genObject.next();
            expect(generator.value).toEqual(
                all([
                    takeLatest(FETCH_OPINIONS, fetchOpinions),
                ])
            );
        });

        it('should be done on next iteration', () => {
            expect(genObject.next().done).toBeTruthy();
        });
    })
})