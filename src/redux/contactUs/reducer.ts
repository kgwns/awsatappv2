import {
  SEND_CONTACT_US_INFO,
  SEND_CONTACT_US_INFO_SUCCESS,
  SEND_CONTACT_US_INFO_FAILED,
  EMPTY_CONTACT_US_DETAIL,
} from './actionType';
import {
  ContactUsInfoState,
  ContactUsInfoAction,
} from './types';

const initialData: ContactUsInfoState = {
  isLoading: false,
  sendContactInfoSuccess: {},
  sendContactInfoError: '',
};

export default (state = initialData, action: ContactUsInfoAction) => {
  switch (action.type) {
    case SEND_CONTACT_US_INFO:
      return {
        ...state,
        isLoading: true,
        sendContactInfoSuccess: {},
        sendContactInfoError: '',
      }
    case SEND_CONTACT_US_INFO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        sendContactInfoSuccess: action.payload
      }
    case SEND_CONTACT_US_INFO_FAILED:
      return {
        ...state,
        isLoading: false,
        sendContactInfoError: action.payload.error
      }
    case EMPTY_CONTACT_US_DETAIL:
      return {
        ...state,
        isLoading: false,
        sendContactInfoSuccess: {},
        sendContactInfoError: '',
      }
    default:
      return { ...state }
  }
}
