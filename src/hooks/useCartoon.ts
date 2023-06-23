import { useDispatch, useSelector } from "react-redux";
import { getIsLoading, getCartoonListData, getHasNextPage } from 'src/redux/cartoon/selectors'
import { CartoonDataType, CartoonListBodyType } from "src/redux/cartoon/types";
import { fetchCartoonList } from "src/redux/cartoon/action";

export type UseCartoonReturn = {
    isLoading: boolean;
    cartoonList: CartoonDataType[];
    hasNextPage: boolean;
    getCartoonListInfo: (payload: CartoonListBodyType) => void;
};

export const useCartoon = (): UseCartoonReturn => {
    const dispatch = useDispatch();

    const isLoading = useSelector(getIsLoading);
    const cartoonList = useSelector(getCartoonListData);
    const hasNextPage = useSelector(getHasNextPage)

    const getCartoonListInfo = (payload: CartoonListBodyType) => {
        dispatch(fetchCartoonList(payload))
    };

    return {
        isLoading,
        cartoonList,
        hasNextPage,
        getCartoonListInfo,
    }
}
