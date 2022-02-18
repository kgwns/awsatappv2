import { all, takeLatest } from "redux-saga/effects";
import { REQUEST_HOME } from "../actionType";
import homeSaga, { fetchHome } from "../sagas";

describe('<HomeSaga >', () => {
    beforeEach(() => {
        jest.useFakeTimers()
    })
    describe('Check Home saga method', () => {
        const genObject = homeSaga();

        it('should wait for latest REQUEST_HOME action and call fetchHome', () => {
            const generator = genObject.next();
            expect(generator.value).toEqual(
                all([
                    takeLatest(REQUEST_HOME, fetchHome),
                ])
            );
        });

        it('should be done on next iteration', () => {
            expect(genObject.next().done).toBeTruthy();
        });
    })
})