import {renderHook, RenderHookResult, act} from '@testing-library/react-hooks';
import {useDispatch} from 'react-redux';
import {
  useTermsAndAboutUs,
  UseTermsAndAboutUsReturn,
} from '../useTermsAndAboutUs';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('#useTermsAndAboutUs', () => {
  let result: RenderHookResult<undefined, UseTermsAndAboutUsReturn>;

  const dispatchMock = jest.fn();

  beforeAll(() => {
    (useDispatch as jest.Mock).mockReturnValueOnce(dispatchMock);

    result = renderHook<undefined, UseTermsAndAboutUsReturn>(() =>
      useTermsAndAboutUs(),
    );
  });

  afterAll(() => {
    jest.clearAllMocks();
    result.unmount();
  });

  describe('#fetchStaticDetail', () => {
    it('should call dispatch with fetchStaticDetail', () => {
      const {
        result: {
          current: {fetchStaticDetail},
        },
      } = result;

      act(() => {
        fetchStaticDetail({id: 23});
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

});
