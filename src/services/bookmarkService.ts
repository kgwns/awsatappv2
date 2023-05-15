import { BASE_URL, UMS_BASE_URL } from 'src/services/apiUrls';
import { getApiRequest, postApiRequest } from 'src/services/api';
import { GET_BOOK_DETAIL_INFO_END_POINT, GET_BOOK_MARK_END_POINT, REMOVE_BOOK_MARK_END_POINT, SEND_BOOK_MARK } from './apiEndPoints';
import {
  GetBookmarkDetailBodyGet, 
  RemoveBookmarkDetailDataBody, 
  SendBookMarkBodyGet, 
} from 'src/redux/bookmark/types';

export const sendBookMarkInfo = async (body: SendBookMarkBodyGet) => {
  try {
    return await postApiRequest(
      `${UMS_BASE_URL}${SEND_BOOK_MARK}`, body, undefined
    );
  } catch (error) {
    console.log('bookmarkService - sendBookMarkInfo - error', error)
    throw error;
  }
};

export const getBookMarkInfo = async () => {
  try {
    return await postApiRequest(
      `${UMS_BASE_URL}${GET_BOOK_MARK_END_POINT}`
    );
  } catch (error) {
    console.log('bookmarkService - getBookMarkInfo - error', error)
    throw error;
  }
};

export const removeBookMarkInfo = async (body: RemoveBookmarkDetailDataBody) => {
  try {
    return await postApiRequest(
      `${UMS_BASE_URL}${REMOVE_BOOK_MARK_END_POINT}`, body
    );
  } catch (error) {
    console.log('bookmarkService - removeBookMarkInfo - error', error)
    throw error;
  }
};

export const getBookMarkDetailInfoService = async (body: GetBookmarkDetailBodyGet) => {
  try {
    return await getApiRequest(
      `${BASE_URL}${GET_BOOK_DETAIL_INFO_END_POINT}${body.nid}`,
    );
  } catch (error) {
    console.log('bookmarkService - getBookMarkDetailInfoService - error', error)
    throw error;
  }
};
