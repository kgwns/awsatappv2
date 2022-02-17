import {renderHook} from '@testing-library/react-hooks';
import {useSelector} from 'react-redux';
import {useOpinions, UseOpinionsReturn} from '../useOpinions';

describe('useOpinionsTabReactHook', () => {
  const loadingStateMock = jest.fn().mockReturnValueOnce(false);
  const opinionsDatarMock = jest.fn().mockReturnValueOnce([]);

  beforeAll(() => {
    (useSelector as jest.Mock).mockImplementationOnce(loadingStateMock);
    (useSelector as jest.Mock).mockImplementationOnce(opinionsDatarMock);
  });

  it('Should provide a default loading state', () => {
    const {result} = renderHook<undefined, UseOpinionsReturn>(useOpinions);
    expect(result.current.isLoading).toEqual(false);
    expect(result.current.opinionsData).toEqual([]);
  });
});
