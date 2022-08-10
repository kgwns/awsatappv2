import React from 'react'
import { render, RenderAPI } from '@testing-library/react-native'
import { Provider } from 'react-redux'
import { storeSampleData } from '../../../../constants/SampleData'
import { SectionArticlesParentScreen } from '../SectionArticlesParentScreen'
import { useRoute } from '@react-navigation/native'

jest.mock('@react-navigation/native', () => ({
    useRoute: jest.fn(),
    useNavigation: () => ({
        navigate: jest.fn(),
        dispatch: jest.fn(),
        goBack: jest.fn(),
        addListener: jest.fn(),
      }),
  }));

describe('<SectionArticlesParentScreen> with keyName', () => {
    let instance: RenderAPI

    const params = {"params":{"keyName":"podcast", "sectionId":102811, "title":"رياضة عالمية"}};

    beforeEach(() => {
        (useRoute as jest.Mock).mockReturnValue(params);
        const component = 
            <Provider store={storeSampleData}>
                <SectionArticlesParentScreen />
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

describe('<SectionArticlesParentScreen> with keyName', () => {
    let instance: RenderAPI

    const params = {"params":{"keyName":"games", "sectionId":102811, "title":"رياضة عالمية"}};

    beforeEach(() => {
        (useRoute as jest.Mock).mockReturnValue(params);
        const component = 
            <Provider store={storeSampleData}>
                <SectionArticlesParentScreen />
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

describe('<SectionArticlesParentScreen> with keyName', () => {
    let instance: RenderAPI

    const params = {"params":{"keyName":"video", "sectionId":102811, "title":"رياضة عالمية"}};

    beforeEach(() => {
        (useRoute as jest.Mock).mockReturnValue(params);
        const component = 
            <Provider store={storeSampleData}>
                <SectionArticlesParentScreen />
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

describe('<SectionArticlesParentScreen> keyName empty', () => {
    let instance: RenderAPI

    const params = {"params":{"keyName":"abc", "sectionId":102811, "title":"رياضة عالمية"}};
    
    beforeEach(() => {
        (useRoute as jest.Mock).mockReturnValue(params);
        const component = 
            <Provider store={storeSampleData}>
                <SectionArticlesParentScreen />
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

describe('<SectionArticlesParentScreen> keyName empty', () => {
    let instance: RenderAPI

    const params = {"params":{ "sectionId":102811, "title":"رياضة عالمية"}};
    
    beforeEach(() => {
        (useRoute as jest.Mock).mockReturnValue(params);
        const component = 
            <Provider store={storeSampleData}>
                <SectionArticlesParentScreen />
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