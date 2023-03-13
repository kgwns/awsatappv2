import { ArticleDetailDataType, ArticleDetailState, RelatedArticleDataType, RichHTMLType } from '../types'
import { EMPTY_DATA, REQUEST_ARTICLE_DETAIL, REQUEST_ARTICLE_DETAIL_FAILED, REQUEST_ARTICLE_DETAIL_SUCCESS, REQUEST_ARTICLE_SECTION, REQUEST_ARTICLE_SECTION_FAILED, REQUEST_ARTICLE_SECTION_SUCCESS, REQUEST_RELATED_ARTICLE, REQUEST_RELATED_ARTICLE_FAILED, REQUEST_RELATED_ARTICLE_SUCCESS, REQUEST_RICH_ARTICLE_CONTENT_SUCCESS, REQUEST_RICH_ARTICLE_OPINION_SUCCESS, REQUEST_RICH_ARTICLE_READ_ALSO_SUCCESS } from '../actionType'
import articleDetailReducer from '../reducer'

const sampleData3: RelatedArticleDataType[] = [
    {
      isBookmarked: true,
      title: 'abc',
      body: 'body',
      nid: '12',
      image: 'abc',
      view_node: 'node',
      news_categories: {
        id: '1',
        title: 'qbc',
        url: 'url',
        bundle: 'bundle',
        name: 'name'
      },
      author: 'author',
      created: '23/10/2021'
    },
    {
      isBookmarked: true,
      title: 'abc',
      body: 'body',
      nid: '122',
      image: 'abc',
      view_node: 'node',
      news_categories: {
        id: '12',
        title: 'qbc',
        url: 'url',
        bundle: 'bundle',
        name: 'name'
      },
      author: 'author',
      created: '23/10/2021'
    },
  ];
  
const data: ArticleDetailDataType = {
    title: 'title',
    body: 'body',
    nid: 'nid',
    image: 'image',
    view_node: 'view_node',
    news_categories: {
        title: 'news_categories_title',
        id: 'news_categories_id',
        url: 'http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/94842',
        bundle: 'news_categories_bundle',
        name: 'news_categories_name'
    },
    author: 'author',
    tag_topics: {
        id: '1',
        title: 'asd',
        url: 'http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/94842',
        bundle: 'asd',
        name: 'qsd'
    },
    isBookmarked: false,
    caption: 'asd',
    subtitle: 'asdf',
    jwplayerId: '1',
    created: 'asxdc',
    richHTML: [
        {
            type: RichHTMLType.OPINION,
            data: {
                id: 'id',
                type: 'type',
                bundle: 'bundle',
                opinion: '2312',
                opinionData: {
                    name: 'name',
                    title: 'title',
                    image: 'image',
                    nid: 'nid',
                    writerId: 'id',
                }
            }
        }
    ]
}

const contentData = {
    title: 'title',
    body: 'body',
    nid: 'nid',
    image: 'image',
    view_node: 'view_node',
    news_categories: {
        title: 'news_categories_title',
        id: 'news_categories_id',
        url: 'http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/94842',
        bundle: 'news_categories_bundle',
        name: 'news_categories_name'
    },
    author: 'author',
    tag_topics: {
        id: '1',
        title: 'asd',
        url: 'http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/94842',
        bundle: 'asd',
        name: 'qsd'
    },
    isBookmarked: false,
    caption: 'asd',
    subtitle: 'asdf',
    jwplayerId: '1',
    created: 'asxdc',
    richHTML: [
        {
            type: RichHTMLType.CONTENT,
            data: {
                id: 'id',
                type: 'type',
                bundle: 'bundle',
                opinion: '2312',
                opinionData: {
                    name: 'name',
                    title: 'title',
                    image: 'image',
                    nid: 'nid',
                    writerId: 'id',
                }
            }
        }
    ]
}

const readAlsoData = {
    title: 'title',
    body: 'body',
    nid: 'nid',
    image: 'image',
    view_node: 'view_node',
    news_categories: {
        title: 'news_categories_title',
        id: 'news_categories_id',
        url: 'http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/94842',
        bundle: 'news_categories_bundle',
        name: 'news_categories_name'
    },
    author: 'author',
    tag_topics: {
        id: '1',
        title: 'asd',
        url: 'http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/94842',
        bundle: 'asd',
        name: 'qsd'
    },
    isBookmarked: false,
    caption: 'asd',
    subtitle: 'asdf',
    jwplayerId: '1',
    created: 'asxdc',
    richHTML: [
        {
            type: RichHTMLType.READ_ALSO,
            data: {
                id: 'id',
                type: 'type',
                bundle: 'bundle',
                readAlsoData:[],
                related_content: ['string'],
                title:'title'
            }
        }
    ]
}


describe('ArticleDetail Reducer', () => {
    const nid: number = 123
    const tid: number = 123456

    const errorMessage = 'This is sample error'

    let initialState: ArticleDetailState;
    beforeEach(() => {
        initialState = {
            isLoading: true,
            error: 'Error',
            articleDetailData: [data],
            pager: {
                current_page: null,
                items_per_page: 1
            },
            relatedArticleData: sampleData3,
            articleSectionData: [data],
            articleSectionLoaded: true
        }
    })

    test('Check loading state when request API', () => {
        const nextState = articleDetailReducer(initialState, {
            type: REQUEST_ARTICLE_DETAIL,
            payload: { nid: nid }
        })
        expect(nextState.isLoading).toBe(true)
    })

    test('On Success of article details API', () => {
        const nextState = articleDetailReducer(initialState, {
            type: REQUEST_ARTICLE_DETAIL_SUCCESS,
            payload: { articleDetailData: [], pager: {} }
        })
        expect(nextState.isLoading).toBe(false)
    })

    test('On Failed of article details API', () => {
        const nextState = articleDetailReducer(initialState, {
            type: REQUEST_ARTICLE_DETAIL_FAILED,
            payload: { error: errorMessage }
        })
        expect(nextState.isLoading).toBe(false)
    })

    test('Check loading state when request Related Article API', () => {
        const nextState = articleDetailReducer(initialState, {
            type: REQUEST_RELATED_ARTICLE,
            payload: { tid: tid }
        })
        expect(nextState.isLoading).toBe(true)
    })

    test('On Success of Related Article details API', () => {
        const nextState = articleDetailReducer(initialState, {
            type: REQUEST_RELATED_ARTICLE_SUCCESS,
            payload: { relatedArticleData: [] }
        })
        expect(nextState.isLoading).toBe(false)
    })

    test('On Failed of Related Article details API', () => {
        const nextState = articleDetailReducer(initialState, {
            type: REQUEST_RELATED_ARTICLE_FAILED,
            payload: { error: errorMessage }
        })
        expect(nextState.isLoading).toBe(false)
    })

    test('Check loading state when request Article section API', () => {
        const nextState = articleDetailReducer(initialState, {
            type: REQUEST_ARTICLE_SECTION,
            payload: {   id: 1,
                page: 1,
                items_per_page:10,
                current_nid: 1,}
        })
        expect(nextState.isLoading).toBe(true)
    })

    test('On Success of Article section details API', () => {
        const nextState = articleDetailReducer(initialState, {
            type: REQUEST_ARTICLE_SECTION_SUCCESS,
            payload: { articleSectionData: [],
                pager: {} }
        })
        expect(nextState.isLoading).toBe(false)
    })

    test('On Failed of Related Article section API', () => {
        const nextState = articleDetailReducer(initialState, {
            type: REQUEST_ARTICLE_SECTION_FAILED,
            payload: { error: errorMessage }
        })
        expect(nextState.isLoading).toBe(false)
    })

    test('On Success of rich Article section details API', () => {
        initialState = {
            isLoading: true,
            error: 'Error',
            articleDetailData: [readAlsoData],
            pager: {
                current_page: null,
                items_per_page: 1
            },
            relatedArticleData: sampleData3,
            articleSectionData: [data],
            articleSectionLoaded: true
        }
        const nextState = articleDetailReducer(initialState, {
            type: REQUEST_RICH_ARTICLE_READ_ALSO_SUCCESS,
            payload: [{name:'name',nid:'232'}] as any
        })
        expect(nextState.isLoading).toBe(true)
    })

    test('On Success of rich Article section details API', () => {
        initialState = {
            isLoading: true,
            error: 'Error',
            articleDetailData: [contentData],
            pager: {
                current_page: null,
                items_per_page: 1
            },
            relatedArticleData: sampleData3,
            articleSectionData: [data],
            articleSectionLoaded: true
        }
        const nextState = articleDetailReducer(initialState, {
            type: REQUEST_RICH_ARTICLE_CONTENT_SUCCESS,
            payload: { contentBundleData: [{name:'name',title:"title",nid:"2312",image:'image',writerId:'28writer'}]}
        })
        expect(nextState.isLoading).toBe(true)
    })

    test('On Success of rich Article section details API', () => {
        const nextState = articleDetailReducer(initialState, {
            type: REQUEST_RICH_ARTICLE_OPINION_SUCCESS,
            payload: { opinionData: [{name:'name',title:"title",nid:"2312",image:'image',writerId:'28writer'}]}
        })
        expect(nextState.isLoading).toBe(true)
    })
    
    test('On empty data', () => {
        const nextState = articleDetailReducer(initialState, {
            type: EMPTY_DATA,
        })
        expect(nextState.isLoading).toBe(false)
    })
})

describe('ArticleDetail Reducer', () => {
    const nid: number = 123
    const tid: number = 123456

    const errorMessage = 'This is sample error'

    let initialState: ArticleDetailState;
    beforeEach(() => {
        initialState = {
            isLoading: true,
            error: '',
            articleDetailData: [],
            pager: {},
            relatedArticleData: [],
            articleSectionData: [],
            articleSectionLoaded: true
        }
    })

    test('Check loading state when request API', () => {
        const nextState = articleDetailReducer(initialState, {
            type: REQUEST_ARTICLE_DETAIL,
            payload: { nid: nid }
        })
        expect(nextState.isLoading).toBe(true)
    })

    test('On Success of article details API', () => {
        const nextState = articleDetailReducer(initialState, {
            type: REQUEST_ARTICLE_DETAIL_SUCCESS,
            payload: { articleDetailData: [], pager: {} }
        })
        expect(nextState.isLoading).toBe(false)
    })

    test('On Failed of article details API', () => {
        const nextState = articleDetailReducer(initialState, {
            type: REQUEST_ARTICLE_DETAIL_FAILED,
            payload: { error: errorMessage }
        })
        expect(nextState.isLoading).toBe(false)
    })

    test('Check loading state when request Related Article API', () => {
        const nextState = articleDetailReducer(initialState, {
            type: REQUEST_RELATED_ARTICLE,
            payload: { tid: tid }
        })
        expect(nextState.isLoading).toBe(true)
    })

    test('On Success of Related Article details API', () => {
        const nextState = articleDetailReducer(initialState, {
            type: REQUEST_RELATED_ARTICLE_SUCCESS,
            payload: { relatedArticleData: [] }
        })
        expect(nextState.isLoading).toBe(false)
    })

    test('On Failed of Related Article details API', () => {
        const nextState = articleDetailReducer(initialState, {
            type: REQUEST_RELATED_ARTICLE_FAILED,
            payload: { error: errorMessage }
        })
        expect(nextState.isLoading).toBe(false)
    })

    test('Check loading state when request Article section API', () => {
        const nextState = articleDetailReducer(initialState, {
            type: REQUEST_ARTICLE_SECTION,
            payload: {   id: 1,
                page: 1,
                items_per_page:10,
                current_nid: 1,}
        })
        expect(nextState.isLoading).toBe(true)
    })

    test('On Success of Article section details API', () => {
        const nextState = articleDetailReducer(initialState, {
            type: REQUEST_ARTICLE_SECTION_SUCCESS,
            payload: { articleSectionData: [],
                pager: {} }
        })
        expect(nextState.isLoading).toBe(false)
    })

    test('On Failed of Related Article section API', () => {
        const nextState = articleDetailReducer(initialState, {
            type: REQUEST_ARTICLE_SECTION_FAILED,
            payload: { error: errorMessage }
        })
        expect(nextState.isLoading).toBe(false)
    })

    test('On Success of rich Article section details API', () => {
        const nextState = articleDetailReducer(initialState, {
            type: REQUEST_RICH_ARTICLE_READ_ALSO_SUCCESS,
            payload: { nid: '2'}
        })
        expect(nextState.isLoading).toBe(true)
    })

    test('On Success of rich Article section details API', () => {
        const nextState = articleDetailReducer(initialState, {
            type: REQUEST_RICH_ARTICLE_CONTENT_SUCCESS,
            payload: { contentBundleData: []}
        })
        expect(nextState.isLoading).toBe(true)
    })

    test('On Success of rich Article section details API', () => {
        const nextState = articleDetailReducer(initialState, {
            type: REQUEST_RICH_ARTICLE_OPINION_SUCCESS,
            payload: { opinionData: {}}
        })
        expect(nextState.isLoading).toBe(true)
    })
    
    test('On empty data', () => {
        const nextState = articleDetailReducer(initialState, {
            type: EMPTY_DATA,
        })
        expect(nextState.isLoading).toBe(false)
    })

    test('Default State', () => {
        const nextState = articleDetailReducer(
          initialState, { type:'' }
        )
        expect(nextState.isLoading).toBeTruthy()
      })
})