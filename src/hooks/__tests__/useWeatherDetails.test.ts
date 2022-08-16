import {renderHook, RenderHookResult, act} from '@testing-library/react-hooks';
import {useDispatch} from 'react-redux';
import {
  useWeatherDetails,
  UseWeatherDetailsReturn,
} from '../useWeatherDetails';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('#useWeatherDetails', () => {
  let result: RenderHookResult<undefined, UseWeatherDetailsReturn>;

  const dispatchMock = jest.fn();

  beforeAll(() => {
    (useDispatch as jest.Mock).mockReturnValueOnce(dispatchMock);

    result = renderHook<undefined, UseWeatherDetailsReturn>(() =>
      useWeatherDetails(),
    );
  });

  afterAll(() => {
    jest.clearAllMocks();
    result.unmount();
  });

  describe('#fetchWeatherDetailsInfo', () => {
    it('should call dispatch with fetchWeatherDetailsInfo', () => {
      const {
        result: {
          current: {fetchWeatherDetailsInfo},
        },
      } = result;

      act(() => {
        fetchWeatherDetailsInfo({ lat: 20, lon: 20});
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

  describe('#fetchWeatherDetailsVisibilityInfo', () => {
    it('should call dispatch with fetchWeatherDetailsVisibilityInfo', () => {
      const {
        result: {
          current: {fetchWeatherDetailsVisibilityInfo},
        },
      } = result;

      act(() => {
        fetchWeatherDetailsVisibilityInfo({ lat: 20, lon: 20});
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

});
