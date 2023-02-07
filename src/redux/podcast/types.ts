import {
  FETCH_PODCAST_LIST,
  FETCH_PODCAST_LIST_SUCCESS,
  FETCH_PODCAST_LIST_FAILED,
  FETCH_PODCAST_EPISODE,
  FETCH_PODCAST_EPISODE_SUCCESS,
  FETCH_PODCAST_EPISODE_FAILED,
} from "./actionTypes"

export interface PodcastListBodyGet {
  tid: number
}

export interface PodcastEpisodeBodyGet {
  nid: number
}

type FieldPodcastSectionExport = {
    id: string,
    title: string,
    url: string,
    bundle: string,
    description: string,
    anghami: {
      url: string,
      text: string
    },
    apple_podcasts: {
      url: string,
      text: string
    },
    google_podcast: {
      url: string,
      text: string
    },
    image: string,
    img_podcast_desktop: string,
    img_podcast_mobile: string,
    spotify: {
      url: string,
      text: string
    },
    name: string
}

export interface PodcastListItemType {
  nid: string,
  type: string,
  view_node: string,
  field_new_sub_title_export: string | null,
  title: string,
  field_announcer_name_export: string | null,
  field_apple_podcast_export: {
    url: string,
    text: string
  } | null,
  body_export: string | null,
  field_duration_export: string | null,
  field_episode_export: string | null,
  field_google_podcast_export: {
    url: string,
    text: string
  } | null,
  field_podcast_image_export: string | null,
  field_podcast_sect_export: FieldPodcastSectionExport,
  field_spotify_export: {
    url: string,
    text: string
  } | null,
  field_spreaker_episode_export: string | null,
  field_spreaker_show_export: string | null,
  isBookmarked: boolean,
  field_total_duration_export: string
}

export interface PodcastEpisodeItemType extends PodcastListItemType{
  field_duration_export_1: string | null,
}  

export type payloadType = {
  rows: PodcastListItemType[];
  pager: object
};

export interface FetchPodcastListType {
  rows: PodcastListItemType[]
  pager: PagerType
}

export interface FetchPodcastEpisodeType {
  rows: PodcastEpisodeItemType[]
  pager: PagerType
}

interface PagerType {
  current_page?: number | null | undefined,
  items_per_page?: number
}

export interface FetchPodcastListSuccessPayloadtype {
  podcastListData: any;
}

export interface FetchPodcastListFailedPayloadtype {
  error: string;
}

export interface FetchPodcastEpisodeSuccessPayloadtype {
  podcastEpisodeData: any;
}

export interface FetchPodcastEpisodeFailedPayloadtype {
  error: string;
}

export type FetchPodcastListSuccessPayload = {
  podcastListData: PodcastListItemType[],
  pager: PagerType
}

export type FetchPodcastEpisodeSuccessPayload = {
  podcastEpisodeData: PodcastEpisodeItemType[],
  pager: PagerType
}

export type PodcastState = {
  podcastListData: PodcastListItemType[];
  podcastEpisodeData: PodcastEpisodeItemType[];
  error: string;
  isLoading: boolean;
}

export interface FetchPodcastListType {
  type: typeof FETCH_PODCAST_LIST,
  payload: PodcastListBodyGet
}

export interface FetchPodcastEpisodeType {
  type: typeof FETCH_PODCAST_EPISODE,
  payload: PodcastEpisodeBodyGet
}

export type FetchPodcastListSuccessType = {
  type: typeof FETCH_PODCAST_LIST_SUCCESS;
  payload: FetchPodcastListSuccessPayloadtype;
};

export type FetchPodcastListFailedType = {
  type: typeof FETCH_PODCAST_LIST_FAILED;
  payload: FetchPodcastListFailedPayloadtype;
};

export type FetchPodcastEpisodeSuccessType = {
  type: typeof FETCH_PODCAST_EPISODE_SUCCESS;
  payload: FetchPodcastEpisodeSuccessPayloadtype;
};

export type FetchPodcastEpisodeFailedType = {
  type: typeof FETCH_PODCAST_EPISODE_FAILED;
  payload: FetchPodcastEpisodeFailedPayloadtype;
};

export type PodcastListActions =
  | FetchPodcastListType
  | FetchPodcastListSuccessType
  | FetchPodcastListFailedType
  | FetchPodcastEpisodeType
  | FetchPodcastEpisodeSuccessType
  | FetchPodcastEpisodeFailedType
