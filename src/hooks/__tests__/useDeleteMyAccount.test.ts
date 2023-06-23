import { RenderHookResult, act, renderHook } from "@testing-library/react-hooks";
import { UseDeleteMyAccountReturn, useDeleteMyAccount } from "../useDeleteMyAccount";
import { useDispatch } from "react-redux";
import { FETCH_DMA_INTRODUCTION, FETCH_DMA_OPTIONS_LIST } from "src/redux/deleteMyAccount/actionTypes";

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
  }));
  
  describe('#useDeleteMyAccount', () => {
    let result: RenderHookResult<undefined, UseDeleteMyAccountReturn>;
  
    const dispatchMock = jest.fn();
  
    beforeAll(() => {
      (useDispatch as jest.Mock).mockReturnValueOnce(dispatchMock);
  
      result = renderHook<undefined, UseDeleteMyAccountReturn>(() =>
        useDeleteMyAccount(),
      );
    });
  
    afterAll(() => {
      jest.clearAllMocks();
      result.unmount();
    });
  
    describe('#fetchDMAIntroductionRequest', () => {
      it('should call dispatch with fetchDMAIntroductionRequest', () => {
        const {
          result: {
            current: {fetchDMAIntroductionRequest},
          },
        } = result;
  
        act(() => {
            fetchDMAIntroductionRequest();
        });
  
        expect(dispatchMock).toHaveBeenCalled();
        expect(dispatchMock).toHaveBeenCalledWith({
            type: FETCH_DMA_INTRODUCTION,
        });
      });
    });
  
    describe('#fetchDMAOptionsListRequest', () => {
      it('should call dispatch with fetchDMAOptionsListRequest', () => {
        const {
          result: {
            current: {fetchDMAOptionsListRequest},
          },
        } = result;
  
        act(() => {
            fetchDMAOptionsListRequest();
        });
  
        expect(dispatchMock).toHaveBeenCalled();
        expect(dispatchMock).toHaveBeenCalledWith({
          type: FETCH_DMA_OPTIONS_LIST,
        });
      });
    });
  
  });
  