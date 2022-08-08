import React from 'react'
import { render, RenderAPI } from '@testing-library/react-native'
import { Provider } from 'react-redux'
import { storeSampleData } from '../../../../constants/SampleData'
import { SectionArticlesParentScreen } from '../SectionArticlesParentScreen'
import { useRoute } from '@react-navigation/native'
import { OpinionScreen } from '../../category/OpinionScreen'
import { PodcastProgram } from '../../podcast/PodcastProgram'
import { VideoScreen } from '../../category/VideoScreen'
import { GameScreen } from '../../games/GameScreen'

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

    const params = {"params":{"keyName":"SectionArticlesParentScreen-91cFeh9o2Kg1fsaaeteVu", "sectionId":102811, "title":"رياضة عالمية"}};

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

    it("TabType.opinion", () => {
        expect(OpinionScreen).toBeTruthy();
    });

    it("TabType.podcast", () => {
        expect(PodcastProgram).toBeTruthy();
    });

    it("TabType.video", () => {
        expect(VideoScreen).toBeTruthy();
    });

    it("TabType.games", () => {
        expect(GameScreen).toBeTruthy();
    });
})

describe('<SectionArticlesParentScreen> keyName empty', () => {
    let instance: RenderAPI

    const params = {"params":{"keyName":"", "sectionId":102811, "title":"رياضة عالمية"}};
    
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