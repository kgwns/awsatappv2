import { FETCH_ENTITY_QUEUE_DATA, FETCH_ENTITY_QUEUE_FAILED, FETCH_ENTITY_QUEUE_SUCCESS } from './actionType'

export enum EntityQueueArticleType {
    ARTICLE = 'article',
    ALBUM = 'album',
    OPINION = 'opinion'
}

export type NewsCategoriesDataType = {
    id: string,
    title: string,
    url: string,
    bundle: string,
    description: string,
    title_seo: string,
    name: string
}

export type EntityQueueListType = {
    title: string,
    type: string,
    nid: string,
    body_export: string,
    field_image_export: string,
    field_new_photo: string,
    field_thumbnil_multimedia_export?: string,
    field_jwplayer_id_opinion_export?: string,
    field_opinion_writer_node_export?: any,
    created_export: string,
    field_new_resource_export?: string,
    field_publication_date_export: string,
    field_podcast_image_export?: string,
    field_spreaker_episode_export?: string,
    field_total_duration_export?: string,
    field_video_media_id_export?: string,
    field_podcast_sect_export?: string,
    field_news_categories_export?: NewsCategoriesDataType,
    field_album_img_export?: string,
    field_display_export?: string,
    changed: string,
    link_node: string
}

export type EntityListPayloadType = {
    id: string | number
}

export type EntityQueueSuccessDataType = {
    entityQueueList: EntityQueueListType
}

export type FetchEntityQueueSuccessDataType = {
    entityQueueList: EntityQueueListType
}

export type FetchEntityQueueFailedDataType = {
    entityQueueListError: string
}

export type FetchEntityQueueType = {
    type: typeof FETCH_ENTITY_QUEUE_DATA
    payload: EntityListPayloadType
}

export type FetchEntityQueueSuccessType = {
    type: typeof FETCH_ENTITY_QUEUE_SUCCESS,
    payload: any;
}

export type FetchEntityQueueFailedType = {
    type: typeof FETCH_ENTITY_QUEUE_FAILED,
    payload: any;
}

export type EntityQueueActionType = 
    | FetchEntityQueueType
    | FetchEntityQueueSuccessType
    | FetchEntityQueueFailedType
