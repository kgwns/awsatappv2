import { BASE_URL, UMS_BASE_URL } from 'src/services/apiUrls';
import { getApiRequest, postApiRequest } from 'src/services/api';
import { GET_BOOK_DETAIL_INFO_END_POINT, GET_BOOK_MARK_END_POINT, REMOVE_BOOK_MARK_END_POINT, SEND_BOOK_MARK } from './apiEndPoints';
import { GetBookmarkDetailBodyGet, GetBookmarkDetailSuccessPayload, GetBookMarkSuccessInfoType, RemoveBookmarkDetailDataBody, RemoveBookmarkDetailSuccessPayload, SendBookMarkBodyGet, SendBookMarkDetailSuccessPayload } from 'src/redux/bookmark/types';

export const sendBookMarkInfo = async (body: SendBookMarkBodyGet) => {
  try {
    const response: SendBookMarkDetailSuccessPayload = await postApiRequest(
      `${UMS_BASE_URL}${SEND_BOOK_MARK}`, body, undefined
    );
    return response;
  } catch (error) {
    console.log(`error: ${error}`);
    throw error;
  }
};

export const getBookMarkInfo = async () => {
  try {
    const response: GetBookMarkSuccessInfoType = await postApiRequest(
      `${UMS_BASE_URL}${GET_BOOK_MARK_END_POINT}`
    );
    return response;
  } catch (error) {
    console.log(`error: ${error}`);
    throw error;
  }
};

export const removeBookMarkInfo = async (body: RemoveBookmarkDetailDataBody) => {
  try {
    const response: RemoveBookmarkDetailSuccessPayload = await postApiRequest(
      `${UMS_BASE_URL}${REMOVE_BOOK_MARK_END_POINT}`, body
    );
    return response;
  } catch (error) {
    console.log(`error: ${error}`);
    throw error;
  }
};

export const getBookMarkDetailInfoService = async (body: GetBookmarkDetailBodyGet) => {
  try {
    const response: GetBookmarkDetailSuccessPayload = await getApiRequest(
      `${BASE_URL}${GET_BOOK_DETAIL_INFO_END_POINT}${body.nid}`,
    );
    return response;
  } catch (error) {
    console.log(`error: ${error}`);
    throw error;
  }
};