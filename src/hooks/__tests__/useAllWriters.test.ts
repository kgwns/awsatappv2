import {renderHook, RenderHookResult, act} from '@testing-library/react-hooks';
import {useDispatch, useSelector} from 'react-redux';
import { DESELECT_ALL_WRITERS, EMPTY_SELECTED_AUTHORS, EMPTY_SELECTED_AUTHORS_INFO, EMPTY_SELECTED_WRITERS_DATA_FROM_ONBOARD, EMPTY_SEND_AUTHOR_INFO, GET_SELECTED_AUTHOR, REMOVE_AUTHOR } from 'src/redux/allWriters/actionTypes';
import {
  useAllWriters,
  UseAllWritersReturn,
} from '../useAllWriters';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('#useAllWriters', () => {
  let result: RenderHookResult<undefined, UseAllWritersReturn>;
  const dispatchMock = jest.fn();
  const selectedAuthorsDataMock = {data:[{reponse:true}]}

  
  beforeAll(() => {
    (useDispatch as jest.Mock).mockReturnValueOnce(dispatchMock);
    (useSelector as jest.Mock).mockReturnValue(selectedAuthorsDataMock);

    result = renderHook<undefined, UseAllWritersReturn>(() =>
      useAllWriters(),
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
      expect(isLoading).toBe(selectedAuthorsDataMock);
    });
  });

  describe('#select allSiteCategoriesError', () => {
    it('should return allSiteCategoriesError', () => {
      const {
        result: {
          current: {allWritersError},
        },
      } = result;
      expect(allWritersError).toBe(selectedAuthorsDataMock);
    });
  });
  describe('#fetchAllWritersRequest', () => {
    it('should call dispatch with get token request action', () => {
      const {
        result: {
          current: {fetchAllWritersRequest},
        },
      } = result;

      act(() => {
        fetchAllWritersRequest({items_per_page: 2});
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

  describe('#sendSelectedWriterInfo', () => {
    it('should call dispatch with get token request action', () => {
      const {
        result: {
          current: {sendSelectedWriterInfo},
        },
      } = result;

      act(() => {
        sendSelectedWriterInfo({tid: '2', isList: false});
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

  describe('#getSelectedAuthorsData', () => {
    it('should call dispatch with get token request action', () => {
      const {
        result: {
          current: {getSelectedAuthorsData},
        },
      } = result;

      act(() => {
        getSelectedAuthorsData();
      });

      expect(dispatchMock).toHaveBeenCalled();
      expect(dispatchMock).toHaveBeenCalledWith({
        type: GET_SELECTED_AUTHOR,
      });
    });
  });

  describe('#emptySelectedAuthorsInfoData', () => {
    it('should call dispatch with get token request action', () => {
      const {
        result: {
          current: {emptySelectedAuthorsInfoData},
        },
      } = result;

      act(() => {
        emptySelectedAuthorsInfoData();
      });

      expect(dispatchMock).toHaveBeenCalled();
      expect(dispatchMock).toHaveBeenCalledWith({
        type: EMPTY_SELECTED_AUTHORS_INFO,
      });
    });
  });

  describe('#emptySelectedAuthorsData', () => {
    it('should call dispatch with get token request action', () => {
      const {
        result: {
          current: {emptySelectedAuthorsData},
        },
      } = result;

      act(() => {
        emptySelectedAuthorsData();
      });

      expect(dispatchMock).toHaveBeenCalled();
      expect(dispatchMock).toHaveBeenCalledWith({
        type: EMPTY_SELECTED_AUTHORS,
      });
    });
  });

  describe('#emptySendAuthorInfoData', () => {
    it('should call dispatch with get token request action', () => {
      const {
        result: {
          current: {emptySendAuthorInfoData},
        },
      } = result;

      act(() => {
        emptySendAuthorInfoData();
      });

      expect(dispatchMock).toHaveBeenCalled();
      expect(dispatchMock).toHaveBeenCalledWith({
        type: EMPTY_SEND_AUTHOR_INFO,
      });
    });
  });

  describe('#emptySelectedWritersDataOnboard', () => {
    it('should call dispatch with get token request action', () => {
      const {
        result: {
          current: {emptySelectedWritersDataOnboard},
        },
      } = result;

      act(() => {
        emptySelectedWritersDataOnboard();
      });

      expect(dispatchMock).toHaveBeenCalled();
      expect(dispatchMock).toHaveBeenCalledWith({
        type: EMPTY_SELECTED_WRITERS_DATA_FROM_ONBOARD,
      });
    });
  });

  describe('#updateAllWritersData', () => {
    it('should call dispatch with get token request action', () => {
      const {
        result: {
          current: {updateAllWritersData},
        },
      } = result;

      act(() => {
        updateAllWritersData();
      });

      expect(dispatchMock).toHaveBeenCalled();
      expect(dispatchMock).toHaveBeenCalledWith({
        type: DESELECT_ALL_WRITERS,
      });
    });
  });

  describe('#requestAllSelectedWritersDetailsData', () => {
    it('should call dispatch with get token request action', () => {
      const {
        result: {
          current: {requestAllSelectedWritersDetailsData},
        },
      } = result;

      act(() => {
        requestAllSelectedWritersDetailsData({tid: '2', items_per_page: 2});
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

  describe('#sendSelectedFromOnboard', () => {
    it('should call dispatch with get token request action', () => {
      const {
        result: {
          current: {sendSelectedFromOnboard},
        },
      } = result;

      act(() => {
        sendSelectedFromOnboard([]);
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });
  describe('#removeAuthorRequest', () => {
    it('should call dispatch with get token request action', () => {
      const {
        result: {
          current: {removeAuthorRequest},
        },
      } = result;

      act(() => {
        removeAuthorRequest({tid:'12'});
      });
      expect(dispatchMock).toBeTruthy();
    });
  });
});
