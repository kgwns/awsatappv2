import { all, takeLatest } from "redux-saga/effects";
import { REQUEST_STATIC_DETAIL } from "../actionType";
import { fetchStaticDetail, termsAndAboutUsSaga } from '../sagas'

const sampleResponse = {
    "rows": [
        {
            "title": "mobileapp-terms",
            "body_export": "<p>هذا الموقع الإلكتروني تابع لإدارة الشرق الأوسط التي تصدر عن الشركة السعودية البريطانية للنشر والتسويق في بريطانيا ويشار لها لاحقاً بعبارة \"موقع الشرق الأوسط\" أو \"الموقع\" متاح لاستخدامك الشخصي، ويخضع دخولك واستخدامك لهذا الموقع لبنود وشروط الاستخدام هذه، ولأنظمة بريطانيا، وكذلك يعد وصولك ودخولك إلى الموقع موافقة دون قيد أو شرط على بنود وشروط الاستخدام، سواء أكنت مستخدماً مسجلاً أم لم تكن، وتسري هذا الموافقة اعتباراً من تاريخ أول استخدام لك لهذا الموقع.</p>\n"
        }
    ],
    "pager": {
        "current_page": null,
        "items_per_page": 10
    }
}

const errorResponse = {
    response: { data: 'Error', status: 500, statusText: 'Error' }
}

describe('<Terms and About Us Saga >', () => {
    const id = 123

    beforeEach(() => {
        jest.useFakeTimers({
            legacyFakeTimers: true
        })
    })
    describe('Check ArticleDetail sage method', () => {
        const genObject = termsAndAboutUsSaga();

        it('should wait for latest REQUEST_STATIC_DETAILL action and call fetchArticleDetail', () => {
            const generator = genObject.next();
            expect(generator.value).toEqual(
                all([
                    takeLatest(REQUEST_STATIC_DETAIL, fetchStaticDetail),
                ])
            );
        });

        it('should be done on next iteration', () => {
            expect(genObject.next().done).toBeTruthy();
        });
    })


    describe('TermsAndAboutUs', () => {
        it('check TermsAndAboutUs success', () => {
            const genObject = fetchStaticDetail({
                type: REQUEST_STATIC_DETAIL,
                payload: {id }
            })
            genObject.next({})
            genObject.next({})
        })
        it('check TermsAndAboutUs success', () => {
            const genObject = fetchStaticDetail({
                type: REQUEST_STATIC_DETAIL,
                payload: {id }
            })
            genObject.next({rows: []})
            genObject.next({rows: []})
        })

        it('check TermsAndAboutUs success', () => {
            const genObject = fetchStaticDetail({
                type: REQUEST_STATIC_DETAIL,
                payload: {id }
            })
            genObject.next(sampleResponse)
            genObject.next(sampleResponse)
        })

        it('check TermsAndAboutUs success', () => {
            const genObject = fetchStaticDetail({
                type: REQUEST_STATIC_DETAIL,
                payload: {id }
            })
            genObject.next()
            genObject.next()
        })

        it('check TermsAndAboutUs failed', () => {
            const genObject = fetchStaticDetail({
                type: REQUEST_STATIC_DETAIL,
                payload: {id }
            })
            genObject.next(sampleResponse)
            genObject.throw(errorResponse)
        })
        it('check TermsAndAboutUs failed', () => {
            const genObject = fetchStaticDetail({
                type: REQUEST_STATIC_DETAIL,
                payload: {id }
            })
            genObject.next(sampleResponse)
            genObject.throw({})
        })
    })
})