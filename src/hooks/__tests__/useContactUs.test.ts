import {renderHook, RenderHookResult, act} from '@testing-library/react-hooks';
import {useDispatch} from 'react-redux';
import { EMPTY_CONTACT_US_DETAIL } from 'src/redux/contactUs/actionType';
import {
  useContactUs,
  UseContactUsReturn,
} from '../useContactUs';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('#useContactUs', () => {
  let result: RenderHookResult<undefined, UseContactUsReturn>;

  const dispatchMock = jest.fn();

  beforeAll(() => {
    (useDispatch as jest.Mock).mockReturnValueOnce(dispatchMock);

    result = renderHook<undefined, UseContactUsReturn>(() =>
      useContactUs(),
    );
  });

  afterAll(() => {
    jest.clearAllMocks();
    result.unmount();
  });

  describe('#sendContactUsInfo', () => {
    it('should call dispatch with sendContactUsInfo', () => {
      const {
        result: {
          current: {sendContactUsInfo},
        },
      } = result;

      act(() => {
        sendContactUsInfo({email: 'abc@gmail.com', name: 'example', msg: 'abc'});
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

  describe('#emptyContactUsInfo', () => {
    it('should call dispatch with emptyContactUsInfo', () => {
      const {
        result: {
          current: {emptyContactUsInfo},
        },
      } = result;

      act(() => {
        emptyContactUsInfo();
      });

      expect(dispatchMock).toHaveBeenCalled();
      expect(dispatchMock).toHaveBeenCalledWith({
        type: EMPTY_CONTACT_US_DETAIL,
      });
    });
  });

});
