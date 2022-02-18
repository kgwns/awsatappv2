import {
  EMPTY_SECTION_ARTICLES,
  FETCH_SECTION_ARTICLES,
  FETCH_SECTION_ARTICLES_ERROR,
  FETCH_SECTION_ARTICLES_SUCCESS,
} from './actionTypes';

export interface SectionArticlesBodyGet {
  sectionId: string;
  page: number;
}
export interface FieldSectionArticlesExportType {
  id: string;
  name: string;
}

export interface SectionArticlesItemType {
  field_sectionid_export: string;
  title: string;
}

export interface FetchSectionArticlesSuccessPayloadType {
  sectionArticlesData: any;
}

export interface FetchSectionArticlesFailedPayloadtype {
  error: string;
}

export interface Pager {
  current_page: number;
  items_per_page: string;
}

export type payloadType = {rows: any[]; pager: Pager};

export type SectionArticlesState = {
  sectionArticlesData: payloadType;
  error: string;
  isLoading: boolean;
};

export type FetchSectionArticlesType = {
  type: typeof FETCH_SECTION_ARTICLES;
  payload: SectionArticlesBodyGet;
};

export type FetchSectionArticlesSuccessType = {
  type: typeof FETCH_SECTION_ARTICLES_SUCCESS;
  payload: FetchSectionArticlesSuccessPayloadType;
};

export type FetchSectionArticlesFailedType = {
  type: typeof FETCH_SECTION_ARTICLES_ERROR;
  payload: FetchSectionArticlesFailedPayloadtype;
};
export type emptySectionArticlesDataTpe = {
  type: typeof EMPTY_SECTION_ARTICLES;
};
export type SectionArticlesActions =
  | FetchSectionArticlesType
  | FetchSectionArticlesSuccessType
  | FetchSectionArticlesFailedType
  | emptySectionArticlesDataTpe;
