import { renderHook } from '@testing-library/react-hooks';
import { useSelector } from 'react-redux';
import { useLatestNewsTab, UseLatestNewsReturn } from '../useLatestNewsTab';

describe('useLatestNewsTabReactHook', () => {

    const loadingStateMock = jest.fn().mockReturnValueOnce(false);
    const tickerMock = jest.fn().mockReturnValueOnce([]);
    const heroMock = jest.fn().mockReturnValueOnce([]);
    const heroListMock = jest.fn().mockReturnValueOnce([]);
    const topListMock = jest.fn().mockReturnValueOnce([]);
    const errorMock = jest.fn().mockReturnValueOnce('');

  beforeAll(() => {
    (useSelector as jest.Mock).mockImplementationOnce(loadingStateMock);
    (useSelector as jest.Mock).mockImplementationOnce(tickerMock);
    (useSelector as jest.Mock).mockImplementationOnce(heroMock);
    (useSelector as jest.Mock).mockImplementationOnce(heroListMock);
    (useSelector as jest.Mock).mockImplementationOnce(topListMock);
    (useSelector as jest.Mock).mockImplementationOnce(errorMock);
  })

  it('Should provide a default loading state', () => {
    const { result } = renderHook<undefined,UseLatestNewsReturn>(useLatestNewsTab);
    expect(result.current.isLoading).toEqual(false);
    expect(result.current.hero).toEqual([])
  });
});