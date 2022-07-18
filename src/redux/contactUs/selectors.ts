import { AppState, Selector } from 'src/redux/rootReducer';
import { ContactUsInfoSuccessPayload } from './types';

export const getIsLoading: Selector<boolean> = (state: AppState) =>
  state.contactUsInfo.isLoading;

export const getSendSuccessInfo: Selector<ContactUsInfoSuccessPayload> = (state: AppState) =>
  state.contactUsInfo.sendContactInfoSuccess;

export const getSendInfoError: Selector<string> = (state: AppState) =>
  state.contactUsInfo.sendContactInfoError;
