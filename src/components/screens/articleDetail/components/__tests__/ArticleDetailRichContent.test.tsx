import React from 'react';
import { render, RenderAPI } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { RenderQuoteElement, RenderContentElement, RenderDescriptionElement, RenderOpinionElement, RenderReadAlsoElement, RenderNumberElement, generateAssetFontCss, RenderRichHTMLContent } from 'src/components/screens/articleDetail/components/ArticleDetailRichContent';
import { storeSampleData } from 'src/constants/Constants';
import { useTheme } from 'src/shared/styles/ThemeProvider'
import { ArticleDetailDataType, RichHTMLType } from 'src/redux/articleDetail/types';

const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isIOS: false,
  isTab: false
}));
const data: ArticleDetailDataType = {
    title: 'as',
    body: 'as',
    nid: '1',
    image: 'asxdc',
    view_node: 'asdx',
    news_categories: {
        id: '2',
        title: 'as',
        url: 'asd',
        bundle: 'asd',
        name: 'asd'
    },
    tag_topics: {
        id: '2',
        title: 'asd',
        url: 'asd',
        bundle: 'asd',
        name: 'azsxd'
    },
    author: 'azsxd',
    isBookmarked: false,
    caption: 'azsxd',
    subtitle: 'asd',
    jwplayerId: 'asdx',
    created: 'asd',
}

const data1: ArticleDetailDataType = {
    title: 'as',
    body: 'as',
    nid: '1',
    image: 'asxdc',
    view_node: 'asdx',
    news_categories: {
        id: '2',
        title: 'as',
        url: 'asd',
        bundle: 'asd',
        name: 'asd'
    },
    tag_topics: {
        id: '2',
        title: 'asd',
        url: 'asd',
        bundle: 'asd',
        name: 'azsxd'
    },
    author: 'azsxd',
    isBookmarked: false,
    caption: 'azsxd',
    subtitle: 'asd',
    jwplayerId: 'asdx',
    created: 'asd',
    richHTML: [
        {
            type:  RichHTMLType.QUOTE,
            data: {
                id: 'example',
                type: 'example',
                bundle: 'example',
                description: 'example',
                title: 'example',
            }
        },
    ],
}

const data2: ArticleDetailDataType = {
    title: 'as',
    body: 'as',
    nid: '1',
    image: 'asxdc',
    view_node: 'asdx',
    news_categories: {
        id: '2',
        title: 'as',
        url: 'asd',
        bundle: 'asd',
        name: 'asd'
    },
    tag_topics: {
        id: '2',
        title: 'asd',
        url: 'asd',
        bundle: 'asd',
        name: 'azsxd'
    },
    author: 'azsxd',
    isBookmarked: false,
    caption: 'azsxd',
    subtitle: 'asd',
    jwplayerId: 'asdx',
    created: 'asd',
    richHTML: [
        {
            type:  RichHTMLType.CONTENT,
            data: {
                id: 'example',
                type: 'example',
                bundle: 'example',
                title: 'example',
                content: 'example',
                contentData: {
                    title: 'example',
                    body: 'example',
                    nid: 'example',
                    image: 'example',
                }
            }
        },
    ],
}

const data3: ArticleDetailDataType = {
    title: 'as',
    body: 'as',
    nid: '1',
    image: 'asxdc',
    view_node: 'asdx',
    news_categories: {
        id: '2',
        title: 'as',
        url: 'asd',
        bundle: 'asd',
        name: 'asd'
    },
    tag_topics: {
        id: '2',
        title: 'asd',
        url: 'asd',
        bundle: 'asd',
        name: 'azsxd'
    },
    author: 'azsxd',
    isBookmarked: false,
    caption: 'azsxd',
    subtitle: 'asd',
    jwplayerId: 'asdx',
    created: 'asd',
    richHTML: [
        {
            type:  RichHTMLType.DESCRIPTION,
            data: {
                id: 'example',
                type: 'example',
                bundle: 'example',
                description: 'example',
            }
        },
    ],
}

const data4: ArticleDetailDataType = {
    title: 'as',
    body: 'as',
    nid: '1',
    image: 'asxdc',
    view_node: 'asdx',
    news_categories: {
        id: '2',
        title: 'as',
        url: 'asd',
        bundle: 'asd',
        name: 'asd'
    },
    tag_topics: {
        id: '2',
        title: 'asd',
        url: 'asd',
        bundle: 'asd',
        name: 'azsxd'
    },
    author: 'azsxd',
    isBookmarked: false,
    caption: 'azsxd',
    subtitle: 'asd',
    jwplayerId: 'asdx',
    created: 'asd',
    richHTML: [
        {
            type:  RichHTMLType.OPINION,
            data: {
                id: 'example',
                type: 'example',
                bundle: 'example',
                opinion: 'example',
                opinionData: {
                    name: 'example',
                    title: 'example',
                    image: 'example',
                    nid: 'example',
                    writerId: 'example',
                }
            }
        },
    ],
}

const data5: ArticleDetailDataType = {
    title: 'as',
    body: 'as',
    nid: '1',
    image: 'asxdc',
    view_node: 'asdx',
    news_categories: {
        id: '2',
        title: 'as',
        url: 'asd',
        bundle: 'asd',
        name: 'asd'
    },
    tag_topics: {
        id: '2',
        title: 'asd',
        url: 'asd',
        bundle: 'asd',
        name: 'azsxd'
    },
    author: 'azsxd',
    isBookmarked: false,
    caption: 'azsxd',
    subtitle: 'asd',
    jwplayerId: 'asdx',
    created: 'asd',
    richHTML: [
        {
            type:  RichHTMLType.READ_ALSO,
            data: {
                id: 'example',
                type: 'example',
                bundle: 'example',
                related_content: ['example'],
                title: 'example',
                readAlsoData: ['example','example','example'],
            }
        },
    ],
}

const data6: ArticleDetailDataType = {
    title: 'as',
    body: 'as',
    nid: '1',
    image: 'asxdc',
    view_node: 'asdx',
    news_categories: {
        id: '2',
        title: 'as',
        url: 'asd',
        bundle: 'asd',
        name: 'asd'
    },
    tag_topics: {
        id: '2',
        title: 'asd',
        url: 'asd',
        bundle: 'asd',
        name: 'azsxd'
    },
    author: 'azsxd',
    isBookmarked: false,
    caption: 'azsxd',
    subtitle: 'asd',
    jwplayerId: 'asdx',
    created: 'asd',
    richHTML: [
        {
            type:  RichHTMLType.NUMBERS,
            data: {
                id: 'example',
                title: 'example',
                bundle: 'example',
                description: 'example',
            }
        },
    ],
}

const data7: ArticleDetailDataType = {
    title: 'as',
    body: 'as',
    nid: '1',
    image: 'asxdc',
    view_node: 'asdx',
    news_categories: {
        id: '2',
        title: 'as',
        url: 'asd',
        bundle: 'asd',
        name: 'asd'
    },
    tag_topics: {
        id: '2',
        title: 'asd',
        url: 'asd',
        bundle: 'asd',
        name: 'azsxd'
    },
    author: 'azsxd',
    isBookmarked: false,
    caption: 'azsxd',
    subtitle: 'asd',
    jwplayerId: 'asdx',
    created: 'asd',
    richHTML: [
        {
            type:  'default',
            data: {}
        },
    ],
}

const data8: ArticleDetailDataType = {
    title: 'as',
    body: 'as',
    nid: '1',
    image: 'asxdc',
    view_node: 'asdx',
    news_categories: {
        id: '2',
        title: 'as',
        url: 'asd',
        bundle: 'asd',
        name: 'asd'
    },
    tag_topics: {
        id: '2',
        title: 'asd',
        url: 'asd',
        bundle: 'asd',
        name: 'azsxd'
    },
    author: 'azsxd',
    isBookmarked: false,
    caption: 'azsxd',
    subtitle: 'asd',
    jwplayerId: 'asdx',
    created: 'asd',
    richHTML: [
        {
            type:  null,
            data: {}
        },
    ],
}

describe('<RenderRichHTMLContent>', () => {
    let instance: RenderAPI;
    beforeEach(() => {
        const component = 
            <Provider store={storeSampleData}>
                <RenderRichHTMLContent articleItem={data1} articleFontSize={16} />
            </Provider> 
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('Should render component', () => {
        expect(instance).toBeDefined()
    })

    it('Should render component', () => {
        expect(render( <RenderRichHTMLContent articleItem={data2} articleFontSize={16} />)).toBeDefined()
    })

    it('Should render component', () => {
        expect(render( <RenderRichHTMLContent articleItem={data3} articleFontSize={16} />)).toBeDefined()
    })

    it('Should render component', () => {
        expect(render( <RenderRichHTMLContent articleItem={data4} articleFontSize={16} />)).toBeDefined()
    })

    it('Should render component', () => {
        expect(render( <RenderRichHTMLContent articleItem={data5} articleFontSize={16} />)).toBeDefined()
    })

    it('Should render component', () => {
        expect(render( <RenderRichHTMLContent articleItem={data6} articleFontSize={16} />)).toBeDefined()
    })

    it('Should render component', () => {
        expect(render( <RenderRichHTMLContent articleItem={data} articleFontSize={16} />)).toBeDefined()
    })

    it('Should render component', () => {
        expect(render( <RenderRichHTMLContent articleItem={data7} articleFontSize={16} />)).toBeDefined()
    })

    it('Should render component without data', () => {
        expect(render( <RenderRichHTMLContent articleItem={data8} articleFontSize={16} />)).toBeDefined()
    })
})

describe('<RenderQuoteElement>', () => {
    let instance: RenderAPI;
    beforeEach(() => {
        const component = 
            <Provider store={storeSampleData}>
                <RenderQuoteElement paragraphInfo={{
                    id: '2',
                    type: 'asd',
                    bundle: 'qawse',
                    description: 'awsed',
                    title: 'awsd'
                }} />
            </Provider> 
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('Should render component', () => {
        expect(instance).toBeDefined()
    })
})

describe('<RenderQuoteElement>', () => {
    let instance: RenderAPI;
    beforeEach(() => {
        const component = 
            <Provider store={storeSampleData}>
                <RenderQuoteElement paragraphInfo={{
                    id: '2',
                    type: 'asd',
                    bundle: 'qawse',
                    description: '',
                    title: ''
                }} />
            </Provider> 
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('Should render component', () => {
        expect(instance).toBeDefined()
    })
})

describe('<RenderContentElement>', () => {
    let instance: RenderAPI;
    beforeEach(() => {
        const component = 
            <Provider store={storeSampleData}>
                <RenderContentElement paragraphInfo={{
                    id: '2',
                    type: 'as',
                    bundle: 'qwde',
                    content: 'qwe',
                    title: 'qsdw',
                    contentData: {
                        title: 'qwer',
                        body: 'asd',
                        nid: '2',
                        image: 'sdfe'
                    }
                }}/>
            </Provider> 
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('Should render component', () => {
        expect(instance).toBeDefined()
    })

    it('useTheme to be Defined', () => {
        expect(useTheme).toBeDefined()
    })
})

describe('<RenderContentElement>', () => {
    let instance: RenderAPI;
    beforeEach(() => {
        const component = 
            <Provider store={storeSampleData}>
                <RenderContentElement paragraphInfo={{
                    id: '2',
                    type: 'as',
                    bundle: 'qwde',
                    content: 'qwe',
                    title: 'qsdw',
                    contentData: {}
                }}/>
            </Provider> 
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('Should render component', () => {
        expect(instance).toBeDefined()
    })

    it('useTheme to be Defined', () => {
        expect(useTheme).toBeDefined()
    })
})

describe('<RenderDescriptionElement>', () => {
    let instance: RenderAPI;
    beforeEach(() => {
        const component = 
            <Provider store={storeSampleData}>
                <RenderDescriptionElement paragraphInfo={{
                    id: '2',
                    type: 'qsw',
                    bundle: 'qsdw',
                    description: 'sqdwf'
                }} fontSize={16}/>
            </Provider> 
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('Should render component', () => {
        expect(instance).toBeDefined()
    })

    it('useTheme to be Defined', () => {
        expect(useTheme).toBeDefined()
    })
})

describe('<RenderDescriptionElement>', () => {
    let instance: RenderAPI;
    beforeEach(() => {
        const component = 
            <Provider store={storeSampleData}>
                <RenderDescriptionElement paragraphInfo={{
                    id: '2',
                    type: 'qsw',
                    bundle: 'qsdw',
                    description: ''
                }} fontSize={16}/>
            </Provider> 
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('Should render component', () => {
        expect(instance).toBeDefined()
    })

    it('useTheme to be Defined', () => {
        expect(useTheme).toBeDefined()
    })
})

describe('<RenderOpinionElement>', () => {
    let instance: RenderAPI;
    beforeEach(() => {
        const component = 
            <Provider store={storeSampleData}>
                <RenderOpinionElement paragraphInfo={{
                    id: '2',
                    type: 'as',
                    bundle: 'ASD',
                    opinion: 'ASDF',
                    opinionData: {
                        name: 'ASDF',
                        title: 'ASAD',
                        image: 'qwe',
                        nid: '2',
                        writerId: '1'
                    }
                }} />
            </Provider> 
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('Should render component', () => {
        expect(instance).toBeDefined()
    })
})

describe('<RenderOpinionElement>', () => {
    let instance: RenderAPI;
    beforeEach(() => {
        const component = 
            <Provider store={storeSampleData}>
                <RenderOpinionElement paragraphInfo={{
                    id: '2',
                    type: 'as',
                    bundle: 'ASD',
                    opinion: 'ASDF',
                    opinionData: {}
                }} />
            </Provider> 
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('Should render component', () => {
        expect(instance).toBeDefined()
    })
})

describe('<RenderReadAlsoElement>', () => {
    let instance: RenderAPI;
    beforeEach(() => {
        const component = 
            <Provider store={storeSampleData}>
                <RenderReadAlsoElement paragraphInfo={{
                    id: '2',
                    type: 'qw',
                    bundle: 'qawse',
                    related_content: ['qws'],
                    title: 'qawse',
                    readAlsoData: [{id: 12}, {id: 21}]
                }}/>
            </Provider> 
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('Should render component', () => {
        expect(instance).toBeDefined()
    })
})

describe('<RenderReadAlsoElement>', () => {
    let instance: RenderAPI;
    beforeEach(() => {
        const component = 
            <Provider store={storeSampleData}>
                <RenderReadAlsoElement paragraphInfo={{
                    id: '2',
                    type: 'qw',
                    bundle: 'qawse',
                    related_content: ['qws'],
                    title: 'qawse',
                    readAlsoData: []
                }}/>
            </Provider> 
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('Should render component', () => {
        expect(instance).toBeDefined()
    })
})

describe('<RenderNumberElement>', () => {
    let instance: RenderAPI;
    beforeEach(() => {
        const component = 
            <Provider store={storeSampleData}>
                <RenderNumberElement paragraphInfo={{
                    id: '2',
                    bundle: 'gh',
                    description: 'vbnm',
                    title: 'bnm'
                }} fontSize={16}/>
            </Provider> 
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('Should render component', () => {
        expect(instance).toBeDefined()
    })
})

describe('<RenderNumberElement>', () => {
    let instance: RenderAPI;
    beforeEach(() => {
        const component = 
            <Provider store={storeSampleData}>
                <RenderNumberElement/>
            </Provider> 
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('Should render component', () => {
        expect(instance).toBeDefined()
    })
})

describe('<generateAssetFontCss>', () => {
    const fontFileName = 'Effra-Regular';
    const fileUri = 'Effra-Regular.ttf';
    const result = `@font-face {
        font-family: '${fontFileName}';
        src: local('${fontFileName}'), url('${fileUri}') ;
    }`;

    it('generateAssetFontCss', () => {
        expect(generateAssetFontCss({
            fontFileName: 'Effra-Regular',
            extension: 'ttf',
          })).toEqual(result)
    })
})

describe('<RenderRichHTMLContent> in IOS', () => {
    let instance: RenderAPI;
    beforeEach(() => {
        DeviceTypeUtilsMock.isTab = false;
        DeviceTypeUtilsMock.isIOS = true;
        const component = 
            <Provider store={storeSampleData}>
                <RenderRichHTMLContent articleItem={data2} articleFontSize={16} />
            </Provider> 
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('Should render component in IOS ', () => {
        expect(instance).toBeDefined()
    })
})

describe('<RenderRichHTMLContent> in Tab ', () => {
    let instance: RenderAPI;
    beforeEach(() => {
        DeviceTypeUtilsMock.isTab = true;
        DeviceTypeUtilsMock.isIOS = false;
        const component = 
            <Provider store={storeSampleData}>
                <RenderRichHTMLContent articleItem={data2} articleFontSize={16} />
            </Provider> 
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('Should render component in Tab ', () => {
        expect(instance).toBeDefined()
    })
})
