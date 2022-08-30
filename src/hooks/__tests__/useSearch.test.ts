import {renderHook, RenderHookResult, act} from '@testing-library/react-hooks';
import {useDispatch} from 'react-redux';
import { CLEAR_SEARCH_HISTORY } from 'src/redux/search/actionTypes';
import {
  useSearch,
  UseSearchReturn,
} from '../useSearch';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('#useSearch', () => {
  let result: RenderHookResult<undefined, UseSearchReturn>;

  const dispatchMock = jest.fn();

  beforeAll(() => {
    (useDispatch as jest.Mock).mockReturnValueOnce(dispatchMock);

    result = renderHook<undefined, UseSearchReturn>(() =>
      useSearch(),
    );
  });

  afterAll(() => {
    jest.clearAllMocks();
    result.unmount();
  });

  describe('#fetchSearchRequest', () => {
    it('should call dispatch with fetchSearchRequest', () => {
      const {
        result: {
          current: {fetchSearchRequest},
        },
      } = result;

      act(() => {
        fetchSearchRequest({ searchText: 'abc' });
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

  describe('#emptySearchHistory', () => {
    it('should call dispatch with emptySearchHistory', () => {
      const {
        result: {
          current: {emptySearchHistory},
        },
      } = result;

      act(() => {
        emptySearchHistory();
      });

      expect(dispatchMock).toHaveBeenCalled();
      expect(dispatchMock).toHaveBeenCalledWith({
        type: CLEAR_SEARCH_HISTORY,
      });
    });
  });

  describe('#setSearchHistory', () => {
    it('should call dispatch with setSearchHistory', () => {
      const {
        result: {
          current: {setSearchHistory},
        },
      } = result;

      act(() => {
        setSearchHistory(['abc', 'bcd']);
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

});
