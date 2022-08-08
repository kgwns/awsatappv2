import React from 'react';
import { render, RenderAPI } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { RenderQuoteElement, RenderContentElement, RenderDescriptionElement, RenderOpinionElement, RenderReadAlsoElement, RenderNumberElement, generateAssetFontCss, RenderRichHTMLContent } from 'src/components/screens/articleDetail/components/ArticleDetailRichContent';
import { storeSampleData } from 'src/constants/SampleData';
import { useTheme } from 'src/shared/styles/ThemeProvider'
import { ArticleDetailDataType } from 'src/redux/articleDetail/types';


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
    created: 'asd'
}

describe('<RenderRichHTMLContent>', () => {
    let instance: RenderAPI;
    beforeEach(() => {
        const component = 
            <Provider store={storeSampleData}>
                <RenderRichHTMLContent articleItem={data} articleFontSize={16} />
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