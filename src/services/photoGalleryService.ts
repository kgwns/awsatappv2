import {BASE_URL} from 'src/services/apiUrls';
import {getApiRequest, getCacheApiRequest} from 'src/services/api';
import {
  PHOTO_GALLERY_LIST_ENDPOINT,
  PHOTO_GALLERY_DETAIL_ENDPOINT,
} from './apiEndPoints';
import {
  FetchAlbumListSuccessPayloadType,
  FetchAlbumDetailSuccessPayloadType,
  AlbumListBodyGet,
  AlbumDetailBodyGet
} from 'src/redux/photoGallery/types';

export const fetchAlbumListApi = async (body: AlbumListBodyGet) => {
  try {
    const response: FetchAlbumListSuccessPayloadType = await getApiRequest(
      `${BASE_URL}${PHOTO_GALLERY_LIST_ENDPOINT}`,
      {
        params: {
          page: body.page,
          items_per_page: body.items_per_page,
        },
      },
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchAlbumDetailApi = async (body: AlbumDetailBodyGet) => {
  try {
    const response: FetchAlbumDetailSuccessPayloadType = await getCacheApiRequest(
      `${BASE_URL}${PHOTO_GALLERY_DETAIL_ENDPOINT}${body.nid}`,
    );
    return response;
  } catch (error) {
    throw error;
  }
};
