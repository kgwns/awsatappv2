import {
  FETCH_FAVOURITE_OPINIONS,
  FETCH_FAVOURITE_OPINIONS_SUCCESS,
  FETCH_FAVOURITE_OPINIONS_ERROR,
  FETCH_FAVOURITE_ARTICLES,
  FETCH_FAVOURITE_ARTICLES_SUCCESS,
  FETCH_FAVOURITE_ARTICLES_ERROR,
  EMPTY_ALL_DATA,
} from './actionTypes';

export interface Pager {
  current_page: number;
  items_per_page: string;
}

export type payloadType = {rows: any[]; pager: Pager};

export interface OpinionsListItemType {
  title: string;
  created_export: Date;
  field_opinion_writer_node_export: FieldOpinionWriterNodeExport[] | FieldOpinionWriterNodeExport;
  nid: string;
  field_opinion_sport_blog_export: FieldOpinionSportBlogExport[];
  field_new_issueno_export: string;
  published_at_export: Date;
  body: string;
  field_edit_letter_writer_export?: any;
  isBookmarked: boolean;
}

export interface FieldOpinionWriterNodeExport {
  id: string;
  title: string;
  url: string;
  bundle: string;
  opinion_writer_photo: string;
  langcode: string;
  name: string;
}

export interface FieldOpinionSportBlogExport {
  id: string;
  title: string;
  bundle: string;
  name: string;
}

export interface FavouriteOpinionsBodyGet {
  page: number;
  items_per_page?: number,
  authorsList?: any,
}

export interface FetchFavouriteOpinionsSuccessPayloadType {
  opinionListData: any;
}

export interface FetchFavouriteOpinionsFailedPayloadtype {
  error: string;
}

export type FetchFavouriteOpinionsType = {
  type: typeof FETCH_FAVOURITE_OPINIONS;
  payload: FavouriteOpinionsBodyGet;
};

export type FetchFavouriteOpinionsSuccessType = {
  type: typeof FETCH_FAVOURITE_OPINIONS_SUCCESS;
  payload: FetchFavouriteOpinionsSuccessPayloadType;
};

export type FetchFavouriteOpinionsFailedType = {
  type: typeof FETCH_FAVOURITE_OPINIONS_ERROR;
  payload: FetchFavouriteOpinionsFailedPayloadtype;
};

export interface FieldArticlesNewsExport {
  id: string;
  title: string;
  url: string;
  bundle: string;
  name: string;
}

export type ArticlesListItemType = {
  nid: string,
  title: string,
  body: string,
  field_image: string,
  view_node: string,
  field_news_categories_export: FieldArticlesNewsExport[],
  field_publication_date_export: string,
  created_export: string,
  changed: string,
  author_resource: string,
  type: string
  field_new_photo: string;
};

export type FavouriteListState = {
  favouriteOpinionData: payloadType;
  error: string;
  isLoading: boolean;
  favouriteArticlesData: payloadType;
  articleError: string;
  isArticleLoading: boolean;
};

export interface FavouriteArticlesBodyGet {
  page: number;
  items_per_page?: number,
  topicsList?: any,
}

export interface FetchFavouriteArticlesSuccessPayloadType {
  favouriteArticlesData: any;
}

export interface FetchFavouriteArticlesFailedPayloadtype {
  articleError: string;
}

export type FetchFavouriteArticlesType = {
  type: typeof FETCH_FAVOURITE_ARTICLES;
  payload: FavouriteArticlesBodyGet;
};

export type FetchFavouriteArticlesSuccessType = {
  type: typeof FETCH_FAVOURITE_ARTICLES_SUCCESS;
  payload: FetchFavouriteArticlesSuccessPayloadType;
};

export type FetchFavouriteArticlesFailedType = {
  type: typeof FETCH_FAVOURITE_ARTICLES_ERROR;
  payload: FetchFavouriteArticlesFailedPayloadtype;
};
export type emptyAllData = {
  type: typeof EMPTY_ALL_DATA;
};
export type FavouriteActions =
  | FetchFavouriteOpinionsType
  | FetchFavouriteOpinionsSuccessType
  | FetchFavouriteOpinionsFailedType
  | FetchFavouriteArticlesType
  | FetchFavouriteArticlesSuccessType
  | FetchFavouriteArticlesFailedType
  | emptyAllData;
