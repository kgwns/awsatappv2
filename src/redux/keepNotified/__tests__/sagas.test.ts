import { SEND_SELECTED_NOTIFICATION } from '../actionType';
import {sendSelectedNotificationRequest,getSelectedNotificationRequest} from '../sagas';

const mockString = 'mockString';

const errorResponse = {
  response: {data: 'Error', status: 500, statusText: 'Error'},
};


describe('Test keep notified  error', () => {
  it('check sendSelectedNotificationRequest failed', () => {
    const genObject = sendSelectedNotificationRequest({
      type: SEND_SELECTED_NOTIFICATION,
      payload: {nid: mockString},
    });
    genObject.next();
    genObject.throw(errorResponse);
  });

  it('check getSelectedNotificationRequest failed', () => {
    const genObject = getSelectedNotificationRequest();
    genObject.next();
    genObject.throw(errorResponse);
  });
});
