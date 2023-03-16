import { storeInfo } from "src/constants/Constants"
import { getError, getHeroData, getHeroListData, getIsLoading, getOpinionData, 
        getSectionComboFiveData, getSectionComboFourData, 
        getSectionComboOneData, getSectionComboSevenData, 
        getSectionComboSixData, getSectionComboThreeData, 
        getSectionComboTwoData, getTickerData, getTopListData,
        getPodcastHomeData, getEditorsChoiceData, getSpotlightData,
        getSpotlightArticleSectionData, getCoverageData, getFeaturedArticle,
        getHorizontalData, getCoverageDataLoading, getFeaturedArticleLoading,
        getHorizontalDataLoading, getOpinionDataLoading, getPodcastHomeDataLoading, 
        getSectionComboThreeLoading, getSectionComboTwoLoading, getSectionComboOneLoading, getEditorChoiceDataLoading,getInfoGraphicBlockData,
        getInfoGraphicBlockDataLoading,getArchivedArticleSectionData, getSectionComboEightData
    } from "../selectors"
import { ArchivedArticleDataType, EditorsChoiceDataType, InfoGraphicBlockType, LatestArticleDataType, LatestPodcastDataType, MainSectionBlockType, SpotlightDataType } from "../types"

describe('LatestNewsTab Selector', () => {
    const storeData = storeInfo[0]
    test('Get loading state', () => {
        const isLoading: boolean = getIsLoading(storeData)
        expect(isLoading).toEqual(true)
    })

    test('Get hero state', () => {
        const ticker: LatestArticleDataType[] = getTickerData(storeData)
        expect(ticker).toEqual([])
    })

    test('Get hero state', () => {
        const hero: LatestArticleDataType[] = getHeroData(storeData)
        expect(hero).toEqual([])
    })

    test('Get heroList state', () => {
        const heroList: LatestArticleDataType[] = getHeroListData(storeData)
        expect(heroList).toEqual([])
    })

    test('Get heroList state', () => {
        const topList: LatestArticleDataType[] = getTopListData(storeData)
        expect(topList).toEqual([])
    })
    

    test('Get opinion state', () => {
        const opinion = getOpinionData(storeData)
        expect(opinion).toEqual([])
    })

    test('Get sectionComboOne state', () => {
        const comboOne: LatestArticleDataType[] = getSectionComboOneData(storeData)
        expect(comboOne).toEqual([])
    })

    test('Get sectionComboTwo state', () => {
        const comboTwo: LatestArticleDataType[] = getSectionComboTwoData(storeData)
        expect(comboTwo).toEqual([])
    })

    test('Get sectionComboThree state', () => {
        const comboThree: LatestArticleDataType[] = getSectionComboThreeData(storeData)
        expect(comboThree).toEqual([])
    })

    test('Get sectionComboFour state', () => {
        const comboFour: LatestArticleDataType[] = getSectionComboFourData(storeData)
        expect(comboFour).toEqual([])
    })

    test('Get error state', () => {
        const error = getError(storeData)
        expect(error).toEqual('')
    })

    test('Get getSectionComboFiveData state', () => {
        const comboFive: LatestArticleDataType[] = getSectionComboFiveData(storeData)
        expect(comboFive).toEqual([])
    })

    test('Get getSectionComboSixData state', () => {
        const comboSix: LatestArticleDataType[] = getSectionComboSixData(storeData)
        expect(comboSix).toEqual([])
    })

    test('Get getSectionComboSevenData state', () => {
        const comboSeven: LatestArticleDataType[] = getSectionComboSevenData(storeData)
        expect(comboSeven).toEqual([])
    })

    test('Get getSectionComboEightData state', () => {
        const comboEight: LatestArticleDataType[] = getSectionComboEightData(storeData)
        expect(comboEight).toEqual()
    })

    test('Get getPodcastHomeData state', () => {
        const podcastHome: LatestPodcastDataType[] = getPodcastHomeData(storeData)
        expect(podcastHome).toEqual([])
    })

    test('Get getEditorsChoiceData state', () => {
        const editorsChoice: EditorsChoiceDataType[] = getEditorsChoiceData(storeData)
        expect(editorsChoice).toEqual([])
    })

    test('Get getSpotlightData state', () => {
        const spotlight: SpotlightDataType[] = getSpotlightData(storeData)
        expect(spotlight).toEqual([])
    })

    test('Get getSpotlightArticleSectionData state', () => {
        const spotlight: LatestArticleDataType[] = getSpotlightArticleSectionData(storeData)
        expect(spotlight).toEqual([])
    })

    test('Get getCoverageData state', () => {
        const spotlight: MainSectionBlockType[] = getCoverageData(storeData)
        expect(spotlight).toEqual([])
    })

    test('Get getFeaturedArticle state', () => {
        const spotlight: MainSectionBlockType[] = getFeaturedArticle(storeData)
        expect(spotlight).toEqual([])
    })

    test('Get getHorizontalData state', () => {
        const spotlight: MainSectionBlockType[] = getHorizontalData(storeData)
        expect(spotlight).toEqual([])
    })

    test('Get getCoverageDataLoading state', () => {
        const spotlight: boolean = getCoverageDataLoading(storeData)
        expect(spotlight).toEqual(false)
    })

    test('Get getFeaturedArticleLoading state', () => {
        const spotlight: boolean = getFeaturedArticleLoading(storeData)
        expect(spotlight).toEqual(false)
    })

    test('Get getHorizontalDataLoading state', () => {
        const spotlight: boolean = getHorizontalDataLoading(storeData)
        expect(spotlight).toEqual(false)
    })

    test('Get getOpinionDataLoading state', () => {
        const spotlight: boolean = getOpinionDataLoading(storeData)
        expect(spotlight).toEqual(false)
    })

    test('Get getPodcastHomeDataLoading state', () => {
        const spotlight: boolean = getPodcastHomeDataLoading(storeData)
        expect(spotlight).toEqual(false)
    })

    test('Get getEditorChoiceDataLoading state', () => {
        const spotlight: boolean = getEditorChoiceDataLoading(storeData)
        expect(spotlight).toEqual(false)
    })

    test('Get getSectionComboOneLoading state', () => {
        const spotlight: boolean = getSectionComboOneLoading(storeData)
        expect(spotlight).toEqual(false)
    })

    test('Get getSectionComboTwoLoading state', () => {
        const spotlight: boolean = getSectionComboTwoLoading(storeData)
        expect(spotlight).toEqual(false)
    })

    test('Get getSectionComboThreeLoading state', () => {
        const spotlight: boolean = getSectionComboThreeLoading(storeData)
        expect(spotlight).toEqual(false)
    })
    test('Get getInfoGraphicBlockData state', () => {
        const spotlight: InfoGraphicBlockType[] = getInfoGraphicBlockData(storeData)
        expect(spotlight).toEqual()
    })
    test('Get getInfoGraphicBlockDataLoading state', () => {
        const spotlight: boolean = getInfoGraphicBlockDataLoading(storeData)
        expect(spotlight).toEqual()
    })
    test('Get getArchivedArticleSectionData state', () => {
        const spotlight: ArchivedArticleDataType[] = getArchivedArticleSectionData(storeData)
        expect(spotlight).toEqual()
    })
})
