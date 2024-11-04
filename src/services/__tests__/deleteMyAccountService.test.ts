import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { fetchDMAConfirmInfo, fetchDMAIntroductionApi, fetchDMAOptionsListApi, makeConfirmDeleteRequest } from "../deleteMyAccountService";
import { FetchDMAIntroductionSuccessPayloadType } from "src/redux/deleteMyAccount/types";
import { FetchDMAOptionsListSuccessPayloadType } from "src/redux/deleteMyAccount/types";
import * as serviceApi from 'src/services/api';
import { DeleteRequestBodyPayload } from "src/redux/deleteMyAccount/types";
const cachedAxiosMock = new MockAdapter(serviceApi.apiWithCache);

describe('Test deleteMyAccount Services', () => {
    const mock = new MockAdapter(axios);
    const introApiResponse: FetchDMAIntroductionSuccessPayloadType = {
       dmaIntroductionData: {
        rows: [
            {
                title: 'mobile app - user delete request view',
                body_export: '<p>سنوقف حسابك لمدة 30 يومًا. وبعد هذه الفترة، سيتم حذف جميع البيانات المرتبطة بحسابك، بما في ذلك ملف التعريف الخاص بك بشكل دائم. إذا كنت ترغب في إعادة تنشيط حسابك، فما عليك سوى تسجيل الدخول إلى تطبيق «الشرق الأوسط» خلال 30 يومًا.</p>\n' +
                    '<p>بعد حذف حسابك بشكل دائم، لا يمكن استرداد معلوماتك، و/أو لا يمكن استعادتها .</p>\n'
            }
        ],
        pager: { current_page: null, total_pages: 1, items_per_page: 10 }
       }
    }
    beforeEach(() => {
        jest.useFakeTimers({
            legacyFakeTimers: true
        });
    })
    afterEach(() => {
        mock.reset();
        cachedAxiosMock.reset();
    });
    it('Should return fetchDMAIntroductionApi Response while fetching Data from API', () => {
        cachedAxiosMock.onGet().reply(200, introApiResponse);

        return fetchDMAIntroductionApi().then(response => {
            expect(response).toBeInstanceOf(Object);
            expect(response).toEqual(introApiResponse)
        });
    });
    it('Should fetchDMAIntroductionApi Throw error while fetching data from API', () => {
        jest.spyOn(serviceApi,'getCacheApiRequest').mockImplementationOnce(() => { throw new Error('Not Able to fetch API') });
        return fetchDMAIntroductionApi().catch((error) => {
            expect(error.message).toEqual('Not Able to fetch API');
        })
    });

});

describe('Test deleteMyAccount Services', () => {
    const mock = new MockAdapter(axios);

    const optionsListApiResponse: FetchDMAOptionsListSuccessPayloadType =  {
        dmaOptionsListData: {
            code: 200,
            message: 'success',
            webmsg: { code: 200, message: 'success' },
            data: [
                {
                    id: 1,
                    en_option: "i don't want to use this app anymore",
                    ar_option: 'لا أريد استخدام التطبيق بعد الآن'
                },
                {
                    id: 2,
                    en_option: "I'm concerned about my privacy",
                    ar_option: 'أنا قلق بشأن خصوصيتي'
                },
                {
                    id: 3,
                    en_option: "I'm getting too many notifications",
                    ar_option: 'أتلقى عددًا كبيرًا جدًا من الإشعارات'
                },
                {
                    id: 4,
                    en_option: "The app isn't working properly",
                    ar_option: 'التطبيق لا يعمل بشكل صحيح'
                },
                {
                    id: 5,
                    en_option: 'Other',
                    ar_option: 'سبب آخر'
                }
            ]
        }
    }
  
    beforeEach(() => {
        jest.useFakeTimers({
            legacyFakeTimers: true
        });
    })
    afterEach(() => {
        mock.reset();
        cachedAxiosMock.reset();
    });

    it('Should return fetchDMAOptionsListApi Response while fetching data from API', () => {
        cachedAxiosMock.onGet().reply(200, optionsListApiResponse);

        return fetchDMAOptionsListApi().then(response => {
            expect(response).toBeInstanceOf(Object);
            expect(response).toEqual(optionsListApiResponse)
        });
    });

    it('Should fetchDMAOptionsListApi Throw error while fetching data from API', () => {
        jest.spyOn(serviceApi,'getCacheApiRequest').mockImplementationOnce(() => { throw new Error('Not Able to fetch API') });
        return fetchDMAOptionsListApi().catch((error) => {
            expect(error.message).toEqual('Not Able to fetch API');
        })
    });
});

describe('Test deleteMyAccount Services', () => {
    const mock = new MockAdapter(axios);
    const confirmDeleteApiResponse = {
        rows: [
          {
            title: 'mobile app - user delete request view 2',
            body_export: '<p>سيتم حذف بيانات ملفك الشخصي ومعلومات الحساب والمفضلة.</p>\n' +
              '<p>سيتم حذف حسابك في غضون 30 يومًا. إذا لم تقم بتسجيل الدخول خلال تلك الفترة ، فستتم إزالة جميع معلوماتك بشكل دائم ولا يمكن استردادها في المستقبل.</p>\n'
          }
        ],
        pager: { current_page: null, total_pages: 1, items_per_page: 10 }
      }
  
    beforeEach(() => {
        jest.useFakeTimers({
            legacyFakeTimers: true
        });
    })
    afterEach(() => {
        mock.reset();
        cachedAxiosMock.reset();
    });
    it('Should Return fetchDMAConfirmInfo response while fetching Data from API', () => {
        cachedAxiosMock.onGet().reply(200,confirmDeleteApiResponse);

        return fetchDMAConfirmInfo().then(response => {
            expect(response).toBeInstanceOf(Object);
            expect(response).toEqual(confirmDeleteApiResponse)
        });
    });
    it('Should fetchDMAConfirmInfo Throw error while fetching data from API', () => {
        jest.spyOn(serviceApi,'getCacheApiRequest').mockImplementationOnce(() => { throw new Error('Not Able to fetch API') });
        return fetchDMAConfirmInfo().catch((error) => {
            expect(error.message).toEqual('Not Able to fetch API');
        })
    });

});

describe('Test deleteMyAccount Services', () => {
    const mock = new MockAdapter(axios);
    const requestConfirmDeleteRequest: DeleteRequestBodyPayload = {
        option_id: '3',
        comment: 'comment'
    }
    const confirmDeleteApiResponse = {
        pager: {
            current_page: null,
            items_per_page: 10,
            total_pages: 1,
        },
        rows: [
            {
                body_export: "<p>سيتم حذف بيانات ملفك الشخصي ومعلومات الحساب والمفضلة.</p> <p>سيتم حذف حسابك في غضون 30 يومًا. إذا لم تقم بتسجيل الدخول خلال تلك الفترة ، فستتم إزالة جميع معلوماتك بشكل دائم ولا يمكن استردادها في المستقبل.</p>",
                title: "mobile app - user delete request view 2",
            },
        ],
    }
  
    beforeEach(() => {
        jest.useFakeTimers({
            legacyFakeTimers: true
        });
    })
    afterEach(() => {
        mock.reset();
    });
    it('Should return makeConfirmDeleteRequest Response while fetching Data from API', () => {
        mock.onPost().reply(200, confirmDeleteApiResponse);

        return makeConfirmDeleteRequest(requestConfirmDeleteRequest).then(response => {
            expect(response).toBeInstanceOf(Object);
            expect(response).toEqual(confirmDeleteApiResponse)
        });
    });
    it('Should makeConfirmDeleteRequest Throw error while fetching data from API', () => {
        jest.spyOn(serviceApi,'postApiRequest').mockImplementationOnce(() => { throw new Error('Not Able to fetch API') });
        return makeConfirmDeleteRequest(requestConfirmDeleteRequest).catch((error) => {
            expect(error.message).toEqual('Not Able to fetch API');
        })
    });

});
