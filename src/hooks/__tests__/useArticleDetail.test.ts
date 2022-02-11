import { renderHook } from '@testing-library/react-hooks';
import { useSelector } from 'react-redux';
import { useArticleDetail, UseArticleDetailReturn } from '../useArticleDetail';

describe('useArticleDetailReactHook', () => {

    const loadingStateMock = jest.fn().mockReturnValueOnce(false);
    const articleDetailDataMock = jest.fn().mockReturnValueOnce([]);
    const errorMock = jest.fn().mockReturnValueOnce('');

  beforeAll(() => {
    (useSelector as jest.Mock).mockImplementationOnce(loadingStateMock);
    (useSelector as jest.Mock).mockImplementationOnce(articleDetailDataMock);
    (useSelector as jest.Mock).mockImplementationOnce(errorMock);
  })

  it('Should provide a default loading state', () => {
    const { result } = renderHook<undefined,UseArticleDetailReturn>(useArticleDetail);
    expect(result.current.isLoading).toEqual(false);
    expect(result.current.articleDetailData).toEqual([])
    expect(result.current.articleError).toEqual('')
  });
});