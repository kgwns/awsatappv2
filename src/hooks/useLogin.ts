import { useDispatch, useSelector } from 'react-redux';
import {
  getLoginData,
  getIsLoading,
  getLoginError,
  getIsSkipped,
  getForgotPasswordResponse,
} from 'src/redux/login/selectors';
import { fetchLogin, userLoginSkipped, userLogout,requestForgotPassword,emptyForgotPasswordResponse,emptyLoginData } from 'src/redux/login/action';
import { FetchLoginPayloadType, ForgotPasswordRequestPayloadType } from 'src/redux/login/types';
import { SaveTokenAfterRegistraionBodyType } from 'src/redux/notificationSaveToken/types';
import { useNotificationSaveToken } from './useNotificationSaveToken';
import { LoginManager } from 'react-native-fbsdk-next';
import { recordLogEvent, recordUserId } from 'src/shared/utils';
import { AnalyticsEvents } from 'src/shared/utils/analytics';
import { useAppCommon, useKeepNotified, useBookmark, useSearch, useAllWriters, useAllSiteCategories, useUserProfileData } from 'src/hooks';

export interface UseLoginReturn {
  isLoading: boolean;
  loginData: any;
  loginError: string;
  fetchLoginRequest(payload: FetchLoginPayloadType): void;
  isLoggedIn: boolean;
  token: string;
  user: any;
  fetchLogoutRequest(): void;
  loginSkipped(): void;
  isSkipped: boolean;
  forgotPassswordResponse: any
  forgotPassworRequest(payload : ForgotPasswordRequestPayloadType): void
  emptyforgotPassworResponseInfo():void
  emptyLoginDataInfo():void
  makeUserLogout(): void;
}

export const useLogin = (): UseLoginReturn => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const loginData = useSelector(getLoginData);
  const loginError = useSelector(getLoginError);
  const isSkipped = useSelector(getIsSkipped)
  const isLoggedIn = loginData?.token?.access_token ? true : false;
  const token = loginData?.token?.access_token ? loginData?.token?.access_token : null;
  const user = loginData?.user;
  const forgotPassswordResponse = useSelector(getForgotPasswordResponse);

  const { saveTokenAfterRegistrationRequest, saveTokenData } = useNotificationSaveToken();
  const { emptySearchHistory } = useSearch();
  const { userProfileData,emptyUserProfileInfoData } = useUserProfileData();
  const { emptySelectedTopicsInfoData } = useAllSiteCategories();
  const { emptySelectedAuthorsInfoData } = useAllWriters();
  const { removeBookmark } = useBookmark();
  const { removeKeepNotificationInfo } = useKeepNotified()
  const { resetFontSizeInfo  } = useAppCommon();

  const fetchLoginRequest = (payload: FetchLoginPayloadType) => {
    dispatch(fetchLogin(payload));
  };
  const fetchLogoutRequest = () => {
    dispatch(userLogout());
  }
  const loginSkipped = () => {
    dispatch(userLoginSkipped());
  }
  const forgotPassworRequest = (payload :ForgotPasswordRequestPayloadType)=>{
    dispatch(requestForgotPassword(payload));
  }
  const emptyforgotPassworResponseInfo = () => {
    dispatch(emptyForgotPasswordResponse())
  }
  const emptyLoginDataInfo = () => {
    dispatch(emptyLoginData())
  }

  const unlinkFcmToken = () => {
    if(saveTokenData?.id){
        const payload: SaveTokenAfterRegistraionBodyType = {
          id: (saveTokenData?.id).toString(),
          uid: -1,
        };
        saveTokenAfterRegistrationRequest(payload);
      }
    }
    
  const logoutFromfacebook = () => {
    try {
      if (userProfileData?.user?.provider === 'facebook') {
        LoginManager.logOut();
      }
    } catch {
      return;
    }
  };

  const makeUserLogout = () => {
    unlinkFcmToken();
    logoutFromfacebook()
    recordLogEvent(AnalyticsEvents.LOG_OUT);
    const userId = userProfileData?.user?.id.toString();
    recordUserId(userId);
    fetchLogoutRequest();
    removeBookmark()
    removeKeepNotificationInfo()
    emptyUserProfileInfoData();
    emptySelectedTopicsInfoData()
    emptySelectedAuthorsInfoData()
    emptySearchHistory();
    resetFontSizeInfo();
  }

  return {
    isLoading,
    loginData,
    loginError,
    fetchLoginRequest,
    isLoggedIn,
    token,
    user,
    fetchLogoutRequest,
    loginSkipped,
    isSkipped,
    forgotPassswordResponse,
    forgotPassworRequest,
    emptyforgotPassworResponseInfo,
    emptyLoginDataInfo,
    makeUserLogout,
  };
};
