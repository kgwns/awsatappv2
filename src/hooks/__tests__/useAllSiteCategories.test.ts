import {renderHook, RenderHookResult, act} from '@testing-library/react-hooks';
import {useSelector, useDispatch} from 'react-redux';
import { EMPTY_SELECTED_TOPICS_INFO, EMPTY_SEND_TOPICS_INFO, GET_SELECTED_TOPICS } from 'src/redux/allSiteCategories/actionTypes';
import {
  useAllSiteCategories,
  UseAllSiteCategoriesReturn,
} from '../useAllSiteCategories';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('#useAllSiteCategories', () => {
  let result: RenderHookResult<undefined, UseAllSiteCategoriesReturn>;

  const sendSelectedTopicInfoMock = {
    paramObjectsMap: {
      userProductReviewId: 0,
    },
  };
  const isLoadingMock = true;
  const allSiteCategoriesErrorMock = 'some-error-message';
  const dispatchMock = jest.fn();

  const selectSendSelectedTopicInfoMock = jest
    .fn()
    .mockReturnValueOnce(sendSelectedTopicInfoMock);

  const selectisLoadingMock = jest
    .fn()
    .mockReturnValueOnce(isLoadingMock);

  const selectallSiteCategoriesErrorMock = jest
    .fn()
    .mockReturnValueOnce(allSiteCategoriesErrorMock);

  beforeAll(() => {
    (useSelector as jest.Mock).mockImplementationOnce(
      selectisLoadingMock,
    );
    (useSelector as jest.Mock).mockImplementationOnce(
      selectSendSelectedTopicInfoMock,
    );
    (useSelector as jest.Mock).mockImplementationOnce(
      selectallSiteCategoriesErrorMock,
    );
    (useDispatch as jest.Mock).mockReturnValueOnce(dispatchMock);

    result = renderHook<undefined, UseAllSiteCategoriesReturn>(() =>
      useAllSiteCategories(),
    );
  });

  afterAll(() => {
    jest.clearAllMocks();
    result.unmount();
  });

  describe('#select isLoading', () => {
    it('should return isLoading', () => {
      const {
        result: {
          current: {isLoading},
        },
      } = result;
      expect(isLoading).toBe(true);
    });
  });

  describe('#select allSiteCategoriesError', () => {
    it('should return allSiteCategoriesError', () => {
      const {
        result: {
          current: {allSiteCategoriesError},
        },
      } = result;
      expect(allSiteCategoriesError).toBe(undefined);
    });
  });

  describe('#sendSelectedTopicInfo', () => {
    it('should call dispatch with get token request action', () => {
      const {
        result: {
          current: {sendSelectedTopicInfo},
        },
      } = result;

      act(() => {
        sendSelectedTopicInfo({tid: '2'});
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

  describe('#getSelectedTopicsData', () => {
    it('should call dispatch with get token request action', () => {
      const {
        result: {
          current: {getSelectedTopicsData},
        },
      } = result;

      act(() => {
        getSelectedTopicsData();
      });

      expect(dispatchMock).toHaveBeenCalled();
      expect(dispatchMock).toHaveBeenCalledWith({
        type: GET_SELECTED_TOPICS,
      });
    });
  });

  describe('#fetchAllSiteCategoriesRequest', () => {
    it('should call dispatch with get token request action', () => {
      const {
        result: {
          current: {fetchAllSiteCategoriesRequest},
        },
      } = result;

      act(() => {
        fetchAllSiteCategoriesRequest({items_per_page: 2});
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

  describe('#emptySelectedTopicsInfoData', () => {
    it('should call dispatch with get token request action', () => {
      const {
        result: {
          current: {emptySelectedTopicsInfoData},
        },
      } = result;

      act(() => {
        emptySelectedTopicsInfoData();
      });

      expect(dispatchMock).toHaveBeenCalled();
      expect(dispatchMock).toHaveBeenCalledWith({
        type: EMPTY_SELECTED_TOPICS_INFO,
      });
    });
  });

  describe('#emptySendTopicsInfoData', () => {
    it('should call dispatch with get token request action', () => {
      const {
        result: {
          current: {emptySendTopicsInfoData},
        },
      } = result;

      act(() => {
        emptySendTopicsInfoData();
      });

      expect(dispatchMock).toHaveBeenCalled();
      expect(dispatchMock).toHaveBeenCalledWith({
        type: EMPTY_SEND_TOPICS_INFO,
      });
    });
  });

  describe('#updateAllSiteCategoriesData', () => {
    it('should call dispatch with get token request action', () => {
      const {
        result: {
          current: {updateAllSiteCategoriesData},
        },
      } = result;

      act(() => {
        updateAllSiteCategoriesData([]);
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

});
