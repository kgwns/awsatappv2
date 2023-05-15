import { recordLogEvent } from "./analytics"

export enum EventsValue {
    sideMenu = 'sideMenu',
    article = 'article',
    video = 'video',
    podcast = 'podcast'
} 

export const sideMenuEventParameter = {
    screen_type: EventsValue.sideMenu,
    screen_name: EventsValue.sideMenu
}

export const articleEventParameter = {
    content_type: EventsValue.article,
    article_name: '',
    article_category: EventsValue.article,
    article_author: '',
    article_length: 0,
    article_publish_date: '',
    tags: ''
}

export const videoEventParameter = {
    content_type: EventsValue.video,
    article_name: '',
    article_category: EventsValue.video,
    article_length: 0
}

export const podcastPlayEventParameter = {
    content_title: '',
    content_duration: '',
    content_type: EventsValue.podcast
}

export const articleEvents = (title: string, author: string, publishedDate: string| Date,
    decodeBody: string, tagTopicsList: string,eventName: string) => {
    const eventParameter = {
        ...articleEventParameter,
        article_name: title,
        article_author: author,
        article_publish_date: publishedDate,
        tags: tagTopicsList,
        article_length: decodeBody.split(' ').length
    }
    recordLogEvent(eventName, eventParameter);
}

export const podcastPlayEvents = (title: string, duration: string, eventName: string) => {
    const eventParameter = {
        ...podcastPlayEventParameter,
        content_title: title,
        content_duration: duration,
    }
    recordLogEvent(eventName, eventParameter);
}

export const videoEvents = (title: string, decodeBody: any, eventName: string) => {
    const eventParameter = {
        ...videoEventParameter,
        article_name: title,
        article_length: decodeBody
    }
    recordLogEvent(eventName, eventParameter);
}

export const podcastShareEvents = (type: string, title: string, decodeBody: string, eventName: string) => {
    const eventParameter = {
        content_type: type,
        article_name: title,
        article_category: type,
        article_length: decodeBody?.split(' ').length
    };
    recordLogEvent(eventName, eventParameter);
}
