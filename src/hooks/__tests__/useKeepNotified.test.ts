import {renderHook, RenderHookResult, act} from '@testing-library/react-hooks';
import {useDispatch} from 'react-redux';
import {
  useKeepNotified,
  UseKeepNotifiedReturn,
} from '../useKeepNotified';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('#useKeepNotified', () => {
  let result: RenderHookResult<undefined, UseKeepNotifiedReturn>;

  const dispatchMock = jest.fn();

  beforeAll(() => {
    (useDispatch as jest.Mock).mockReturnValueOnce(dispatchMock);

    result = renderHook<undefined, UseKeepNotifiedReturn>(() =>
      useKeepNotified(),
    );
  });

  afterAll(() => {
    jest.clearAllMocks();
    result.unmount();
  });

  describe('#sendSelectedInfoRequest', () => {
    it('should call dispatch with sendSelectedInfoRequest', () => {
      const {
        result: {
          current: {sendSelectedInfoRequest},
        },
      } = result;

      act(() => {
        sendSelectedInfoRequest({nid: '2'});
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

  describe('#getSelectedInfoRequest', () => {
    it('should call dispatch with getSelectedInfoRequest', () => {
      const {
        result: {
          current: {getSelectedInfoRequest},
        },
      } = result;

      act(() => {
        getSelectedInfoRequest();
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

  describe('#removeSelectedNotificationInfo', () => {
    it('should call dispatch with removeSelectedNotificationInfo', () => {
      const {
        result: {
          current: {removeSelectedNotificationInfo},
        },
      } = result;

      act(() => {
        removeSelectedNotificationInfo();
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

  describe('#getAllNotificationList', () => {
    it('should call dispatch with getAllNotificationList', () => {
      const {
        result: {
          current: {getAllNotificationList},
        },
      } = result;

      act(() => {
        getAllNotificationList();
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });


  describe('#removeKeepNotificationInfo', () => {
    it('should call dispatch with removeKeepNotificationInfo', () => {
      const {
        result: {
          current: {removeKeepNotificationInfo},
        },
      } = result;

      act(() => {
        removeKeepNotificationInfo();
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

});
