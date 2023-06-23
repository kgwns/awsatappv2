import { all, takeLatest } from "redux-saga/effects";
import { REQUEST_HOME } from "../actionType";
import homeSaga, { fetchHome } from "../sagas";

const errorResponse = {
    response: { data: 'Error', status: 500, statusText: 'Error' }
}

const sampleResponse = {
    homeData: {}
}

describe('<HomeSaga >', () => {
    beforeEach(() => {
        jest.useFakeTimers({
            legacyFakeTimers: true
        })
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

    describe('Related fetchHome', () => {
        it('check fetchHome success', () => {
            const genObject = fetchHome({
                type: REQUEST_HOME,
                payload: {
                    page: 1
                }
            })
            genObject.next(sampleResponse)
            genObject.next(sampleResponse)
        })


        it('check fetchHome failed', () => {
            const genObject = fetchHome({
                type: REQUEST_HOME,
                payload: {
                    page: 1
                }
            })
            genObject.next()
            genObject.throw(errorResponse)
        })

        it('check fetchHome failed', () => {
            const genObject = fetchHome({
                type: REQUEST_HOME,
                payload: {
                    page: 1
                }
            })
            genObject.next()
            genObject.throw({})
        })
    })
})