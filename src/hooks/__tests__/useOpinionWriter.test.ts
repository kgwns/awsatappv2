import {renderHook, RenderHookResult, act} from '@testing-library/react-hooks';
import {useDispatch} from 'react-redux';
import {
  useOpinionWriter,
  UseOpinionWriterReturn,
} from '../useOpinionWriter';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('#useOpinionWriter', () => {
  let result: RenderHookResult<undefined, UseOpinionWriterReturn>;

  const dispatchMock = jest.fn();

  beforeAll(() => {
    (useDispatch as jest.Mock).mockReturnValueOnce(dispatchMock);

    result = renderHook<undefined, UseOpinionWriterReturn>(() =>
      useOpinionWriter(),
    );
  });

  afterAll(() => {
    jest.clearAllMocks();
    result.unmount();
  });

  describe('#fetchOpinionWriterRequest', () => {
    it('should call dispatch with fetchOpinionWriterRequest', () => {
      const {
        result: {
          current: {fetchOpinionWriterRequest},
        },
      } = result;

      act(() => {
        fetchOpinionWriterRequest({items_per_page: 5});
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

});
