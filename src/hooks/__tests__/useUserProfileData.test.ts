import {renderHook, RenderHookResult, act} from '@testing-library/react-hooks';
import {useDispatch} from 'react-redux';
import { EMPTY_USER_PROFILE_DATA, FETCH_PROFILE_USER_DETAILS } from 'src/redux/profileUserDetail/actionTypes';
import {
  useUserProfileData,
  UseUserProfileDetail,
} from '../useUserProfileData';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('#useUserProfileData', () => {
  let result: RenderHookResult<undefined, UseUserProfileDetail>;

  const dispatchMock = jest.fn();

  beforeAll(() => {
    (useDispatch as jest.Mock).mockReturnValueOnce(dispatchMock);

    result = renderHook<undefined, UseUserProfileDetail>(() =>
      useUserProfileData(),
    );
  });

  afterAll(() => {
    jest.clearAllMocks();
    result.unmount();
  });

  describe('#sendUserProfileInfo', () => {
    it('should call dispatch with sendUserProfileInfo', () => {
      const {
        result: {
          current: {sendUserProfileInfo},
        },
      } = result;

      act(() => {
        sendUserProfileInfo({email: 'abc@gmail.com'});
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

  describe('#updateUserImageRequest', () => {
    it('should call dispatch with updateUserImageRequest', () => {
      const {
        result: {
          current: {updateUserImageRequest},
        },
      } = result;

      act(() => {
        updateUserImageRequest({image: 'url'});
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

  describe('#emptyUserProfileInfoData', () => {
    it('should call dispatch with emptyUserProfileInfoData', () => {
      const {
        result: {
          current: {emptyUserProfileInfoData},
        },
      } = result;

      act(() => {
        emptyUserProfileInfoData();
      });

      expect(dispatchMock).toHaveBeenCalled();
      expect(dispatchMock).toHaveBeenCalledWith({
        type: EMPTY_USER_PROFILE_DATA,
      });
    });
  });

  describe('#fetchProfileDataRequest', () => {
    it('should call dispatch with fetchProfileDataRequest', () => {
      const {
        result: {
          current: {fetchProfileDataRequest},
        },
      } = result;

      act(() => {
        fetchProfileDataRequest();
      });

      expect(dispatchMock).toHaveBeenCalled();
      expect(dispatchMock).toHaveBeenCalledWith({
        type: FETCH_PROFILE_USER_DETAILS,
      });
    });
  });

});
