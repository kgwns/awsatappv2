import { EMPTY_CONTACT_US_DETAIL, SEND_CONTACT_US_INFO, SEND_CONTACT_US_INFO_FAILED, SEND_CONTACT_US_INFO_SUCCESS } from '../actionType';
import contactUsInfo from '../reducer';
import {ContactUsInfoState} from '../types';

describe('ContactUs reducer', () => {
  let initialState: ContactUsInfoState;

  beforeEach(() => {
    initialState = {
      isLoading: false,
      sendContactInfoSuccess: 
      {  
        code: 2,
        message: 'string'
      },
      sendContactInfoError: ''
    };
  });

  test('Check loading state when SEND_CONTACT_US_INFO request API', () => {
    const nextState = contactUsInfo(initialState, {
      type: SEND_CONTACT_US_INFO,
      payload: { name: 'abc', email: 'abc@gmail.com', msg: 'example' },
    });
    expect(nextState.isLoading).toBe(true);
  });

  test('Check loading state when SEND_CONTACT_US_INFO_SUCCESS request API', () => {
    const nextState = contactUsInfo(initialState, {
      type: SEND_CONTACT_US_INFO_SUCCESS,
      payload: {code: 12, message: 'example'},
    });
    expect(nextState.isLoading).toBe(false);
  });

  test('Check loading state when SEND_CONTACT_US_INFO_FAILED request API', () => {
    const nextState = contactUsInfo(initialState, {
      type: SEND_CONTACT_US_INFO_FAILED,
      payload: { error: ''},
    });
    expect(nextState.isLoading).toBe(false);
  });

  test('Check loading state when EMPTY_CONTACT_US_DETAIL request API', () => {
    const nextState = contactUsInfo(initialState, {
      type: EMPTY_CONTACT_US_DETAIL,
    });
    expect(nextState.isLoading).toBe(false);
  });

});
