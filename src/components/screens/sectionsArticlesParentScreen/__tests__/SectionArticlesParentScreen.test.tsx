import React from 'react'
import { render, RenderAPI } from '@testing-library/react-native'
import { Provider } from 'react-redux'
import { storeSampleData } from '../../../../constants/Constants'
import { SectionArticlesParentScreen as SAPScreen } from '../SectionArticlesParentScreen'
import { useRoute } from '@react-navigation/native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const SectionArticlesParentScreen = () => (
    <GestureHandlerRootView>
        <SAPScreen/>
    </GestureHandlerRootView>
)

jest.mock('@react-navigation/native', () => ({
    useRoute: jest.fn(),
    useNavigation: () => ({
        navigate: jest.fn(),
        dispatch: jest.fn(),
        goBack: jest.fn(),
        addListener: jest.fn(),
      }),
      useIsFocused: jest.fn()
  }));

jest.mock('react-native-safe-area-context', () => ({
    ...jest.requireActual('react-native-safe-area-context'),
    useSafeAreaInsets: () => ({
        top: 10,
        bottom: 10
    })
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

    const params = {"params":{"sectionId":102811, "title":"رياضة عالمية"}};
    
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

describe('<SectionArticlesParentScreen> keyName opinion', () => {
    let instance: RenderAPI

    const params = {"params":{"keyName":"opinion","sectionId":102811, "title":"رياضة عالمية"}};
    
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

describe('<SectionArticlesParentScreen> keyName photos', () => {
    let instance: RenderAPI

    const params = {"params":{"keyName":"photos","sectionId":102811, "title":"رياضة عالمية"}};
    
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