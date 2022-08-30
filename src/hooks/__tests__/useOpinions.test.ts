import {renderHook, RenderHookResult, act} from '@testing-library/react-hooks';
import {useDispatch} from 'react-redux';
import { EMPTY_OPINION_DATA, EMPTY_WRITER_OPINION_DATA } from 'src/redux/opinions/actionTypes';
import {
  useOpinions,
  UseOpinionsReturn,
} from '../useOpinions';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('#useOpinions', () => {
  let result: RenderHookResult<undefined, UseOpinionsReturn>;

  const dispatchMock = jest.fn();

  beforeAll(() => {
    (useDispatch as jest.Mock).mockReturnValueOnce(dispatchMock);

    result = renderHook<undefined, UseOpinionsReturn>(() =>
      useOpinions(),
    );
  });

  afterAll(() => {
    jest.clearAllMocks();
    result.unmount();
  });

  describe('#fetchOpinionsRequest', () => {
    it('should call dispatch with fetchOpinionsRequest', () => {
      const {
        result: {
          current: {fetchOpinionsRequest},
        },
      } = result;

      act(() => {
        fetchOpinionsRequest({page: 1});
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

  describe('#fetchWriterOpinionsRequest', () => {
    it('should call dispatch with fetchWriterOpinionsRequest', () => {
      const {
        result: {
          current: {fetchWriterOpinionsRequest},
        },
      } = result;

      act(() => {
        fetchWriterOpinionsRequest({tid: '2', page: 1});
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

  describe('#saveOpinionsSuccessInfo', () => {
    it('should call dispatch with saveOpinionsSuccessInfo', () => {
      const {
        result: {
          current: {saveOpinionsSuccessInfo},
        },
      } = result;

      act(() => {
        saveOpinionsSuccessInfo({opinionListData: []});
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

  describe('#emptyOpinionsData', () => {
    it('should call dispatch with emptyOpinionsData', () => {
      const {
        result: {
          current: {emptyOpinionsData},
        },
      } = result;

      act(() => {
        emptyOpinionsData();
      });

      expect(dispatchMock).toHaveBeenCalled();
      expect(dispatchMock).toHaveBeenCalledWith({
        type: EMPTY_OPINION_DATA,
      });
    });
  });

  describe('#emptyWriterOpinionData', () => {
    it('should call dispatch with emptyWriterOpinionData', () => {
      const {
        result: {
          current: {emptyWriterOpinionData},
        },
      } = result;

      act(() => {
        emptyWriterOpinionData();
      });

      expect(dispatchMock).toHaveBeenCalled();
      expect(dispatchMock).toHaveBeenCalledWith({
        type: EMPTY_WRITER_OPINION_DATA,
      });
    });
  });

});
