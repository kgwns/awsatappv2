
import bookmarkSaga, {filterNidInfoFromNodeList, getBookmarked, getDetailedBookmarkInfo, removeBookmarked, sendBookMarkId} from '../sagas';
import { GET_BOOK_MARKED, GET_BOOK_MARKED_DETAIL_INFO, REMOVE_BOOK_MARKED, SEND_BOOK_MARK_ID } from '../actionType';
import { BookmarkIdSuccessDataFieldType, GetBookMarkIdSuccessMessageType, RemoveBookmarkDetailSuccessPayload, SendBookMarkSuccessInfoType } from '../types';
import {takeLatest, takeEvery} from 'redux-saga/effects';
import {testSaga} from 'redux-saga-test-plan';
import { PopulateWidgetType } from 'src/components/molecules';

const data: BookmarkIdSuccessDataFieldType = {
  nid: '12',
  bundle: 'abc'
}

const errorResponse = {
  response: {data: 'Error', status: 500, statusText: 'Error'},
};

const sampleResponse1: SendBookMarkSuccessInfoType = {};

const sampleResponse2: GetBookMarkIdSuccessMessageType = {
  code: '12',
  message: 'example',
  data: [
    {
      nid: '12',
      bundle: 'example'
    },
  ]
};

const sampleResponse3: RemoveBookmarkDetailSuccessPayload = {
  removeBookmarkInfo: {}
};

describe('Test bookmarkSaga  saga', () => {
  it('fire on bookmarkSaga', () => {
    testSaga(bookmarkSaga)
      .next()
      .all([
        takeEvery(SEND_BOOK_MARK_ID, sendBookMarkId),
        takeLatest(GET_BOOK_MARKED, getBookmarked),
        takeEvery(REMOVE_BOOK_MARKED, removeBookmarked),
        takeEvery(GET_BOOK_MARKED_DETAIL_INFO, getDetailedBookmarkInfo)
      ])
      .finish()
      .isDone();
  });
});

describe('Test bookmark  error', () => {

  it('check sendBookMarkId success', () => {
    const genObject = sendBookMarkId({
      type: SEND_BOOK_MARK_ID,
      payload: {nid: '123',bundle:'string'},
    })
    genObject.next(sampleResponse1)
    genObject.next(sampleResponse1)
  })

  it('check sendBookMarkId failed', () => {
    const genObject = sendBookMarkId({
      type: SEND_BOOK_MARK_ID,
      payload: {nid: '123',bundle:'string'},
    });
    genObject.next();
    genObject.throw(errorResponse);
  });

  it('check sendBookMarkId failed', () => {
    const genObject = sendBookMarkId({
      type: SEND_BOOK_MARK_ID,
      payload: {nid: '123',bundle:'string'},
    });
    genObject.next();
    genObject.throw({});
  });

  it('check getBookmarked success', () => {
    const genObject = getBookmarked()
    genObject.next(sampleResponse2)
    genObject.next(sampleResponse2)
  })

  it('check getBookmarked failed', () => {
    const genObject = getBookmarked();
    genObject.next();
    genObject.throw(errorResponse);
  });

  it('check getBookmarked failed', () => {
    const genObject = getBookmarked();
    genObject.next();
    genObject.throw({});
  });

  it('check removeBookmarked success', () => {
    const genObject = removeBookmarked({
      type: REMOVE_BOOK_MARKED,
      payload: {nid: '123'},
    })
    genObject.next(sampleResponse3)
    genObject.next(sampleResponse3)
  })

  it('check removeBookmarked failed', () => {
    const genObject = removeBookmarked({
      type: REMOVE_BOOK_MARKED,
      payload: {nid: '123'},
    });
    genObject.next();
    genObject.throw(errorResponse);
  });

  it('check removeBookmarked failed', () => {
    const genObject = removeBookmarked({
      type: REMOVE_BOOK_MARKED,
      payload: {nid: '123'},
    });
    genObject.next();
    genObject.throw({});
  });

  it('check getDetailedBookmarkInfo success', () => {
    const genObject = getDetailedBookmarkInfo({
      type: GET_BOOK_MARKED_DETAIL_INFO,
      payload: {nid: '123', page: 2},
    });
    genObject.next([{nid: '2', type: PopulateWidgetType.ARTICLE, field_image_export: [
      "http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/styles/1300xauto/public/2021/05/19/1621360599843676600.jpg?itok=R3hR8_wt"
    ],
    field_news_categories_export: [{
      id: 'id',
      title: 'title',
      url: 'url',
      bundle: 'bundle',
      name: 'name',
    }],
    field_tags_topics_export: [
      {
          "id": "51816",
          "title": "فيروس كورونا الجديد",
          "url": "http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/51816",
          "bundle": "tags_topics",
          "name": "فيروس كورونا الجديد"
      }
    ],
    }]);
    genObject.next([{nid: '2', type: PopulateWidgetType.ARTICLE, field_image_export: [
      "http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/styles/1300xauto/public/2021/05/19/1621360599843676600.jpg?itok=R3hR8_wt"
    ],
    field_news_categories_export: [{
      id: 'id',
      title: 'title',
      url: 'url',
      bundle: 'bundle',
      name: 'name',
    }],
    field_tags_topics_export: [
      {
          "id": "51816",
          "title": "فيروس كورونا الجديد",
          "url": "http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/51816",
          "bundle": "tags_topics",
          "name": "فيروس كورونا الجديد"
      }
    ],
    }]);
  });

  it('check getDetailedBookmarkInfo success', () => {
    const genObject = getDetailedBookmarkInfo({
      type: GET_BOOK_MARKED_DETAIL_INFO,
      payload: {nid: '123', page: 2},
    });
    genObject.next([{nid: '2', type: PopulateWidgetType.ARTICLE, field_image_export: [], field_news_categories_export: [], field_tags_topics_export: []}]);
    genObject.next([{nid: '2', type: PopulateWidgetType.ARTICLE, field_image_export: [], field_news_categories_export: [], field_tags_topics_export: []}]);
  });

  it('check getDetailedBookmarkInfo success', () => {
    const genObject = getDetailedBookmarkInfo({
      type: GET_BOOK_MARKED_DETAIL_INFO,
      payload: {nid: '123', page: 2},
    });
    genObject.next([{nid: '2', type: PopulateWidgetType.PODCAST}]);
    genObject.next([{nid: '2', type: PopulateWidgetType.PODCAST}]);
  });

  it('check getDetailedBookmarkInfo success', () => {
    const genObject = getDetailedBookmarkInfo({
      type: GET_BOOK_MARKED_DETAIL_INFO,
      payload: {nid: '123', page: 2},
    });
    genObject.next([{nid: '2', type: PopulateWidgetType.VIDEO}]);
    genObject.next([{nid: '2', type: PopulateWidgetType.VIDEO}]);
  });

  it('check getDetailedBookmarkInfo success', () => {
    const genObject = getDetailedBookmarkInfo({
      type: GET_BOOK_MARKED_DETAIL_INFO,
      payload: {nid: '123', page: 2},
    });
    genObject.next([{nid: '2'}]);
    genObject.next([{nid: '2'}]);
  });

  it('check getDetailedBookmarkInfo success', () => {
    const genObject = getDetailedBookmarkInfo({
      type: GET_BOOK_MARKED_DETAIL_INFO,
      payload: {nid: '123', page: 2},
    });
    genObject.next([{nid: '2', type: PopulateWidgetType.OPINION, field_opinion_writer_node_export: [
      {
        id: "94179",
        title: "  سام منسی",
        url: "http://srpcawsatdev.prod.acquia-sites.com/fa/taxonomy/term/94179",
        bundle: "writer",
        opinion_writer_photo: "http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/styles/304x292/public/2019/02/18/sam-mensi-26112018.jpg?itok=AxvknBRJ",
        langcode: "Persian, Farsi",
        name: "  سام منسی"
      },
      {
        id: "93970",
        title: " Ilan Jonas",
        url: "http://srpcawsatdev.prod.acquia-sites.com/en/taxonomy/term/93970",
        bundle: "writer",
        opinion_writer_photo: "http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/styles/304x292/public/2018/07/19/ar-180718419.jpg?itok=FGj8JPu0",
        langcode: "إنجليزية",
        name: " Ilan Jonas"
      }
    ],
    field_jwplayer_id_opinion_export: [
      {
        id: 'example',
        title: 'example',
        url: 'example',
        bundle: 'example',
        name: 'example',
      },
      {
        id: 'example',
        title: 'example',
        url: 'example',
        bundle: 'example',
        name: 'example',
      }
    ]
  }]);
    genObject.next([{nid: '2', type: PopulateWidgetType.OPINION, field_opinion_writer_node_export: [
      {
        id: "94179",
        title: "  سام منسی",
        url: "http://srpcawsatdev.prod.acquia-sites.com/fa/taxonomy/term/94179",
        bundle: "writer",
        opinion_writer_photo: "http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/styles/304x292/public/2019/02/18/sam-mensi-26112018.jpg?itok=AxvknBRJ",
        langcode: "Persian, Farsi",
        name: "  سام منسی"
      },
      {
        id: "93970",
        title: " Ilan Jonas",
        url: "http://srpcawsatdev.prod.acquia-sites.com/en/taxonomy/term/93970",
        bundle: "writer",
        opinion_writer_photo: "http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/styles/304x292/public/2018/07/19/ar-180718419.jpg?itok=FGj8JPu0",
        langcode: "إنجليزية",
        name: " Ilan Jonas"
      }
    ],
    field_jwplayer_id_opinion_export: [
      {
        id: 'example',
        title: 'example',
        url: 'example',
        bundle: 'example',
        name: 'example',
      },
      {
        id: 'example',
        title: 'example',
        url: 'example',
        bundle: 'example',
        name: 'example',
      }
    ]
  }]);
  });

  it('check getDetailedBookmarkInfo success', () => {
    const genObject = getDetailedBookmarkInfo({
      type: GET_BOOK_MARKED_DETAIL_INFO,
      payload: {nid: '123', page: 2},
    });
    genObject.next([{nid: '2', type: PopulateWidgetType.OPINION, field_opinion_writer_node_export: [], 
    jwplayer: [
      {
        id: 'example',
        title: 'example',
        url: 'example',
        bundle: 'example',
        name: 'example',
      }
    ]
    }]);
    genObject.next([{nid: '2', type: PopulateWidgetType.OPINION, field_opinion_writer_node_export: [], 
    jwplayer: [
      {
        id: 'example',
        title: 'example',
        url: 'example',
        bundle: 'example',
        name: 'example',
      }
    ]
    }]);
  });

  it('check getDetailedBookmarkInfo success', () => {
    const genObject = getDetailedBookmarkInfo({
      type: GET_BOOK_MARKED_DETAIL_INFO,
      payload: {nid: '123', page: 2},
    });
    genObject.next([]);
    genObject.next([]);
  });

  it('check getDetailedBookmarkInfo failed', () => {
    const genObject = getDetailedBookmarkInfo({
      type: GET_BOOK_MARKED_DETAIL_INFO,
      payload: {nid: '123', page: 2},
    });
    genObject.next();
    genObject.throw(errorResponse);
  });

  it('check getDetailedBookmarkInfo failed', () => {
    const genObject = getDetailedBookmarkInfo({
      type: GET_BOOK_MARKED_DETAIL_INFO,
      payload: {nid: '123', page: 2},
    });
    genObject.next();
    genObject.throw({});
  });
});

describe('Test exported function', () => {
  it('Test filterNidInfoFromNodeList', () => {
      expect(filterNidInfoFromNodeList([data])).toBeTruthy();
  });
  it('Test filterNidInfoFromNodeList', () => {
    expect(filterNidInfoFromNodeList([{bundle: 'example'}])).toBeTruthy();
});
});