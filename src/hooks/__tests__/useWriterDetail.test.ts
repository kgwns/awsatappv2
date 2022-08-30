import {renderHook, RenderHookResult, act} from '@testing-library/react-hooks';
import {useDispatch} from 'react-redux';
import { EMPTY_WRITER_DETAIL } from 'src/redux/writersDetail/actionTypes';
import {
  useWriterDetail,
  UseWriterDetailReturn,
} from '../useWriterDetail';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('#useWriterDetail', () => {
  let result: RenderHookResult<undefined, UseWriterDetailReturn>;

  const dispatchMock = jest.fn();

  beforeAll(() => {
    (useDispatch as jest.Mock).mockReturnValueOnce(dispatchMock);

    result = renderHook<undefined, UseWriterDetailReturn>(() =>
      useWriterDetail(),
    );
  });

  afterAll(() => {
    jest.clearAllMocks();
    result.unmount();
  });

  describe('#getWriterDetailData', () => {
    it('should call dispatch with getWriterDetailData', () => {
      const {
        result: {
          current: {getWriterDetailData},
        },
      } = result;

      act(() => {
        getWriterDetailData({tid: '2'});
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

  describe('#emptyWriterDetailData', () => {
    it('should call dispatch with emptyWriterDetailData', () => {
      const {
        result: {
          current: {emptyWriterDetailData},
        },
      } = result;

      act(() => {
        emptyWriterDetailData();
      });

      expect(dispatchMock).toHaveBeenCalled();
      expect(dispatchMock).toHaveBeenCalledWith({
        type: EMPTY_WRITER_DETAIL,
      });
    });
  });

});
