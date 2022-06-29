import React from 'react';
import { render, RenderAPI } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { RenderQuoteElement, RenderContentElement, RenderDescriptionElement, RenderOpinionElement, RenderReadAlsoElement, RenderNumberElement, generateAssetFontCss } from 'src/components/screens/articleDetail/components/ArticleDetailRichContent';
import { storeSampleData } from 'src/constants/SampleData';
import { useTheme } from 'src/shared/styles/ThemeProvider'

describe('<RenderQuoteElement>', () => {
    let instance: RenderAPI;
    beforeEach(() => {
        const component = 
            <Provider store={storeSampleData}>
                <RenderQuoteElement paragraphInfo={{
                    id: '',
                    type: '',
                    bundle: '',
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
                    id: '',
                    type: '',
                    bundle: '',
                    content: '',
                    title: '',
                    contentData: {
                        title: '',
                        body: '',
                        nid: '',
                        image: ''
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

describe('<RenderDescriptionElement>', () => {
    let instance: RenderAPI;
    beforeEach(() => {
        const component = 
            <Provider store={storeSampleData}>
                <RenderDescriptionElement paragraphInfo={{
                    id: '',
                    type: '',
                    bundle: '',
                    description: ''
                }} fontSize={0}/>
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
                    id: '',
                    type: '',
                    bundle: '',
                    opinion: '',
                    opinionData: {
                        name: '',
                        title: '',
                        image: '',
                        nid: '',
                        writerId: ''
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

describe('<RenderReadAlsoElement>', () => {
    let instance: RenderAPI;
    beforeEach(() => {
        const component = 
            <Provider store={storeSampleData}>
                <RenderReadAlsoElement paragraphInfo={{
                    id: '',
                    type: '',
                    bundle: '',
                    related_content: [''],
                    title: '',
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
                    id: '',
                    bundle: '',
                    description: '',
                    title: ''
                }} fontSize={0}/>
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