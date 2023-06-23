import { all, takeLatest } from 'redux-saga/effects';
import { GET_SELECTED_NOTIFICATION, SEND_SELECTED_NOTIFICATION, GET_LIST_OF_NOTIFICATION } from '../actionType';
import keepNotifiedSaga, {sendSelectedNotificationRequest,getSelectedNotificationRequest, getListOfNotificationOption} from '../sagas';

const mockString = 'mockString';

const errorResponse = {
  response: {data: 'Error', status: 500, statusText: 'Error'},
};

describe('<Article Detail Saga >', () => {
  beforeEach(() => {
    jest.useFakeTimers({
      legacyFakeTimers: true
    })
  });

  describe('Check keepNotifiedSaga sage method', () => {
      const genObject = keepNotifiedSaga();

      it('should test all keepNotifiedSaga', () => {
          const generator = genObject.next();
          expect(generator.value).toEqual(
              all([
                  takeLatest(SEND_SELECTED_NOTIFICATION, sendSelectedNotificationRequest),
                  takeLatest(GET_SELECTED_NOTIFICATION, getSelectedNotificationRequest),
                  takeLatest(GET_LIST_OF_NOTIFICATION, getListOfNotificationOption)
              ])
          );
      });

      it('should be done on next iteration', () => {
          expect(genObject.next().done).toBeTruthy();
      });
  })

  describe('Test keep notified  error', () => {
    it('check sendSelectedNotificationRequest failed', () => {
      const genObject = sendSelectedNotificationRequest({
        type: SEND_SELECTED_NOTIFICATION,
        payload: {nid: mockString},
      });
      genObject.next();
      genObject.throw(errorResponse);
    });

    it('check sendSelectedNotificationRequest failed', () => {
      const genObject = sendSelectedNotificationRequest({
        type: SEND_SELECTED_NOTIFICATION,
        payload: {nid: mockString},
      });
      genObject.next();
      genObject.throw({});
    });

    it('check getSelectedNotificationRequest failed', () => {
      const genObject = getSelectedNotificationRequest();
      genObject.next();
      genObject.throw(errorResponse);
    });

    it('check getSelectedNotificationRequest failed', () => {
      const genObject = getSelectedNotificationRequest();
      genObject.next();
      genObject.throw({});
    });
  });

  describe('Test keep success', () => {
    it('check sendSelectedNotificationRequest success', () => {
      const genObject = sendSelectedNotificationRequest({
        type: SEND_SELECTED_NOTIFICATION,
        payload: {nid: mockString},
      });
      genObject.next({})
      genObject.next({})
    });

    it('check getSelectedNotificationRequest success', () => {
      const genObject = getSelectedNotificationRequest();
      genObject.next({})
      genObject.next({})
    });
  });

  describe('Related getListOfNotificationOption', () => {
    it('check getListOfNotificationOption success', () => {
        const genObject = getListOfNotificationOption()
        genObject.next({})
        genObject.next({})
    })

    it('check getListOfNotificationOption failed', () => {
        const genObject = getListOfNotificationOption()
        genObject.next()
        genObject.throw(errorResponse)
    })

    it('check getListOfNotificationOption failed', () => {
      const genObject = getListOfNotificationOption()
      genObject.next()
      genObject.throw({})
  })
  })
});
