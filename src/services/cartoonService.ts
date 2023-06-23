import { BASE_URL } from 'src/services/apiUrls';
import { getCacheApiRequest } from 'src/services/api';
import { CARTOON_LIST_END_POINT } from './apiEndPoints';
import { CartoonListBodyType } from 'src/redux/cartoon/types';

export const fetchCartoonListApi = async (body: CartoonListBodyType) => {
    try {
        return await getCacheApiRequest(
            `${BASE_URL}${CARTOON_LIST_END_POINT}`,
            {
                params: {
                    page: body.page,
                    items_per_page: body.items_per_page ?? 10,
                },
            },
        );
    } catch (error) {
        console.log('cartoonService - fetchCartoonListApi - error', error)
        throw error;
    }
};
