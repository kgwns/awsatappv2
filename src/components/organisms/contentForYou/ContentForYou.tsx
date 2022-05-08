import { View, FlatList, StyleSheet } from 'react-native'
import React, {useState, useEffect, useRef} from 'react'
import { AuthorWidget, ShortArticle, ArticleSection } from 'src/components/organisms';
import { WidgetHeader, LabelTypeProp,WidgetHeaderProps, LoadingState, Label } from 'src/components/atoms';
import { shortArticleWithTagProperties } from 'src/constants/SampleData';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'src/shared/styles/ThemeProvider';
import { isTab, screenHeight, screenWidth } from 'src/shared/utils';
import { useAllSiteCategories, useAllWriters, useContentForYou, useBookmark } from 'src/hooks';
import {FavouriteOpinionsBodyGet, FavouriteArticlesBodyGet} from 'src/redux/contentForYou/types';
import { getImageUrl, isNonEmptyArray, isObjectNonEmpty } from 'src/shared/utils/utilities';
import {flatListUniqueKey} from 'src/constants';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScreensConstants } from 'src/constants';
import { normalize } from 'react-native-elements';
import { CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { NewsCategoriesType } from 'src/redux/latestNews/types';
import TrackPlayer, { State, usePlaybackState, RepeatMode, } from 'react-native-track-player';

interface AllContentData {
    opinionsData: any,
    articleSectionData: any,
    shortArticleData: any,
}

export const ContentForYou = () => {
    const { themeData } = useTheme()
    const [t] = useTranslation()
    const {selectedTopicsData, getSelectedTopicsData} = useAllSiteCategories();
    const {selectedAuthorsData, getSelectedAuthorsData} = useAllWriters();
    const {
        isLoading: opinionLoading,
        favouriteOpinionsData,
        fetchFavouriteOpinionsRequest,
        isArticalLoading,
        favouriteArticlesData,
        fetchFavouriteArticlesRequest,
    } = useContentForYou();
    const { sendBookmarkInfo, removeBookmarkedInfo, bookmarkIdInfo} = useBookmark()
    const [selectedAuthors, setSelectedAuthors] = useState([])
    const [selectedTopics, setSelectedTopics] = useState([])
    const [isAllLoading, setIsAllLoading] = useState(false)
    const [page, setPage] = useState(0)
    const [initialLoading, setInitialLoading] = useState(true)
    const initialPageData = {
        opinionsData: {data:[],loaded: false},
        articleSectionData: {data:[],loaded: false},
        shortArticleData: {data:[],loaded: false}
    }
    const [pageAllData,setPageAllData] = useState<AllContentData[]>([])

    const widgetHeaderData: WidgetHeaderProps = {
        headerLeft: {
            title: t('favorite.articles_that_interest_you'),
            color: themeData.primary,
            labelType: LabelTypeProp.h2,
            elementContainerStyle: {paddingHorizontal: 0}
        },
    };
    const navigation = useNavigation<StackNavigationProp<any>>()
    const styles = useThemeAwareObject(customStyles)
    const selectedTopicsRef = useRef(true);
    const selectedAuthorsRef = useRef(true);
    const selectedLoaderRef = useRef(true);

    const [selectedTrack, setSelectedTrack] = useState<any>(null);
    const playbackState = usePlaybackState();

    const togglePlayback = async (nid: string, mediaData: any) => {
        let playList = isNonEmptyArray(mediaData.playlist) ? mediaData.playlist[0] : {};

        if (!isObjectNonEmpty(playList) || !isObjectNonEmpty(mediaData)) {
        return
        }

        const id = nid
        const media = playList.sources[0]?.file ? playList.sources[0]?.file : '';
        const title = mediaData.title ? mediaData.title : '';

        let setupPlayer = async () => {
        await TrackPlayer.setupPlayer();
        await TrackPlayer.updateOptions({ stopWithApp: true });
        await TrackPlayer.add({
            id: id,
            url: media,
            title: title,
            artist: title,
        });
        await TrackPlayer.setRepeatMode(RepeatMode.Off);
        await TrackPlayer.play();
        }

        if(selectedTrack == nid){
        if (playbackState === State.Playing) {
            await TrackPlayer.pause();
        }
        else if (playbackState === State.Paused) {
            await TrackPlayer.play();
        }
        else if ( playbackState === State.Paused ||  playbackState == State.None || playbackState == State.Stopped) {
            setupPlayer()
        }
        }else{
            await TrackPlayer.reset();
            setupPlayer()
        }
        setSelectedTrack(nid) 
    }

    useFocusEffect(
        React.useCallback(() => {
            const unsubscribe = () => { stopTrackPlayer() };
            return () => {
                unsubscribe();
            }
        }, [])
    );

    const stopTrackPlayer = async () => {
        await TrackPlayer.reset();
    }


    useEffect(() => {
        getSelectedTopicsData();
        getSelectedAuthorsData();
    }, []);

    useEffect(() => {
        if (selectedTopicsRef.current) {
            selectedTopicsRef.current = false;
        } else {
            const topicsSelected = returnItems(selectedTopicsData.data)
            if( JSON.stringify(topicsSelected) != JSON.stringify(selectedTopics)){
                if (isNonEmptyArray(selectedTopicsData.data)) {
                    setIsAllLoading(true);
                    setPage(0);
                    setPageAllData([{
                        opinionsData: {data:[],loaded: false},
                        articleSectionData: {data:[],loaded: false},
                        shortArticleData: {data:[],loaded: false}
                    }]);
                    fetchSelectedDataFromAllTopics()
                } else {
                    checkDataLoaded()
                }               
            }
            else{
                checkDataLoaded()
            }
        }
    }, [selectedTopicsData]);

    useEffect(() => {
        if (selectedAuthorsRef.current) {
            selectedAuthorsRef.current = false;
        } else {
            const authorsSelected = returnItems(selectedAuthorsData.data)
            if(JSON.stringify(authorsSelected) != JSON.stringify(selectedAuthors)){
                if (isNonEmptyArray(selectedAuthorsData.data)) {
                    setIsAllLoading(true);
                    setPage(0);
                    setPageAllData([{
                        opinionsData: {data:[],loaded: false},
                        articleSectionData: {data:[],loaded: false},
                        shortArticleData: {data:[],loaded: false}
                    }]);
                    fetchSelectedDataFromAllAuthors();
                } else {
                    checkDataLoaded()
                }                
            }else{
                checkDataLoaded()
            }
        }
    }, [selectedAuthorsData]);

    const returnItems = (data:any) => {
        if(isNonEmptyArray(data)){
            return data.map((item:any)=>{
                return item.tid
            })
        }else{
            return [];
        }
    }

    const checkDataLoaded = () => {
        if(!isNonEmptyArray(selectedTopicsData.data) && !isNonEmptyArray(selectedAuthorsData.data)){
            setPageAllData([])
            setSelectedTopics([])
            setSelectedAuthors([])
            setInitialLoading(false)
        }else if(!isNonEmptyArray(selectedTopicsData.data)){
            setSelectedTopics([])
            let updatedPageData = [...pageAllData];
            updatedPageData.forEach((i:any)=>{
                i.articleSectionData = {data: [], loaded: true}
                i.shortArticleData = {data: [], loaded: true}
            })
            setPageAllData(updatedPageData)
        }else if(!isNonEmptyArray(selectedAuthorsData.data)){
            setSelectedAuthors([])
            let updatedPageData = [...pageAllData];
            updatedPageData.forEach((i:any)=>{
                i.opinionsData = {data: [], loaded: true}
            })
            setPageAllData(updatedPageData)
        }
    }

    useEffect(() => {
        setIsAllLoading(true)
        formatArticleSectionData()
    }, [favouriteArticlesData]);

    useEffect(() => {
        setIsAllLoading(true)
        formatOpinionsData()
    }, [favouriteOpinionsData]);

    useEffect(() => {
        checkBookmarkUpdate()
    }, [bookmarkIdInfo]);

    useEffect(() => {
        if(!isAllLoading && page == 0 && !isNonEmptyArray(selectedTopicsData.data)){
            loadMoreData();
        }
        if(selectedLoaderRef.current) {
            selectedLoaderRef.current = false;
        } else {
            if(!isAllLoading && page == 0 ){              
                if(isNonEmptyArray(selectedTopicsData.data) && !isNonEmptyArray(pageAllData[0]?.articleSectionData.data)){
                    fetchSelectedDataFromAllTopics();
                }
                if(isNonEmptyArray(selectedAuthorsData.data) && !isNonEmptyArray(pageAllData[0]?.opinionsData.data)){
                    fetchSelectedDataFromAllAuthors();
                }
            }
        }
    }, [isAllLoading]);
    
    const checkBookmarkUpdate = () => {
        let bookmarkData = [...pageAllData]
        for (let i = 0; i < bookmarkData.length; i++) {
            let bookmarkArticlesData = updateBookmark(bookmarkData[i].articleSectionData.data);
            let bookmarkShortArticles = updateBookmark(bookmarkData[i].shortArticleData.data);
            bookmarkData[i].articleSectionData.data = bookmarkArticlesData
            bookmarkData[i].shortArticleData.data = bookmarkShortArticles
        }
        setPageAllData(bookmarkData)
    }

    const formatOpinionsData = () => {
        let updatedPageData = [...pageAllData];
        if(updatedPageData[page]!=undefined){
            updatedPageData[page].opinionsData  = {data:favouriteOpinionsData, loaded: true} ;
            setPageAllData(updatedPageData);
            checkLoadData()
        }
    }

    const checkLoadData = () =>{
        checkBookmarkUpdate();
        if(pageAllData[page] && pageAllData[page] && (pageAllData[page].articleSectionData.loaded || pageAllData[page].opinionsData.loaded)){
            setIsAllLoading(false);
            setInitialLoading(false);
            checkDataLoaded();
        }
    }

    const formatArticleSectionData = () => {
        let formatArticleSectionData = []
        let formatShortArticleData = []
        for(let i = 0; i < favouriteArticlesData.length; i++){
            const item = favouriteArticlesData[i]
            const newsCategory = isNonEmptyArray(item.field_news_categories_export) ? item.field_news_categories_export[0] : {} as NewsCategoriesType
            let formattedData = {
                ...shortArticleWithTagProperties,
                labelType: LabelTypeProp.h2,
                body: item.body,
                title: item.title,
                nid: item.nid,
                image: getImageUrl(item.field_image),
                news_categories: newsCategory,
                author: item.author_resource,
                created: item.created_export,
                isBookmarked: false,
                loaded: true,
                flag: newsCategory?.title
            }
            if(i<2){
                formatArticleSectionData.push(formattedData)
            }else{
                const newsCategory = isNonEmptyArray(favouriteArticlesData[i].field_news_categories_export) ? favouriteArticlesData[i].field_news_categories_export[0] : {} as NewsCategoriesType
                formattedData.image = favouriteArticlesData[i].field_image;
                formattedData.tagName= newsCategory?.title;
                formatShortArticleData.push(formattedData)
            }
        }
        let pageDataUpdate = [...pageAllData];
        if(pageDataUpdate[page]!=undefined){
            pageDataUpdate[page].articleSectionData  = {data:formatArticleSectionData, loaded: true} ;
            pageDataUpdate[page].shortArticleData  = {data:formatShortArticleData, loaded:true} ;
            setPageAllData(pageDataUpdate);
            checkLoadData()
        }
    }

    const fetchSelectedDataFromAllAuthors = () => {
        if (isNonEmptyArray(selectedAuthorsData.data)) {
            const selectedAuthors = selectedAuthorsData.data.map((item:any)=>{
                return item.tid
            });
            setSelectedAuthors(selectedAuthors);
            fetchOpinionData(selectedAuthors,0);
        }else{
            setSelectedAuthors([]);
        }
    };

    const fetchSelectedDataFromAllTopics = () => {
        if (isNonEmptyArray(selectedTopicsData.data)) {
            const selectedTopics = selectedTopicsData.data.map((item:any)=>{
                return item.tid
            });
            setSelectedTopics(selectedTopics);
            fetchArticleData(selectedTopics,0);
        }else{
            setSelectedTopics([]);
        }
    };

    const fetchOpinionData =(authorsList:any, pageCount: number) => {
        let opinionBody : FavouriteOpinionsBodyGet = {
            page: pageCount,
            items_per_page: isTab ? 4 : 3,
            authorsList: authorsList
        }
        fetchFavouriteOpinionsRequest(opinionBody)
    }

    const fetchArticleData =(topicsList:any, pageCount: any) => {
        let opinionBody : FavouriteArticlesBodyGet = {
            page: pageCount,
            items_per_page: 10,
            topicsList: topicsList
        }
        fetchFavouriteArticlesRequest(opinionBody)
    }

    const loadMoreData = () => {
        if(!isAllLoading && !isArticalLoading && !opinionLoading){
            let pageCount = page+1
            setPage(pageCount)
            setPageAllData(pageData => [...pageData, initialPageData]);
            if(isNonEmptyArray(selectedAuthors)) fetchOpinionData(selectedAuthors,pageCount);
            if(isNonEmptyArray(selectedTopics)) fetchArticleData(selectedTopics,pageCount);
            setIsAllLoading(true)
        }
    }

    const onPressArticle = (nid: string) => {
        nid && navigation.navigate(ScreensConstants.ARTICLE_DETAIL_SCREEN, { nid: nid })
    }

    const updateBookmarkInfo = (nid: string, isBookmarked: boolean) => {
        isBookmarked ? sendBookmarkInfo({ nid }) : removeBookmarkedInfo({ nid })
    }

    const validateBookmark = (nid: string): boolean => {
        return isNonEmptyArray(bookmarkIdInfo) ? bookmarkIdInfo.some(value => value.nid == nid) : false
    }

    const updateBookmark = (data: any) => {
        return data.map((item: any) => (
          {
            ...item,
            isBookmarked: validateBookmark(item.nid)
          }
        ))
      }

    const renderContentForYou = (item: AllContentData, index: number) => (
        <View key={flatListUniqueKey.CONTENT_FOR_YOU + index} style={styles.spaceStyle}>
            {/* <PodcastForYou title={podcastForYouTitle} data={Array(5).fill(podcastForYouData)} /> */}
            {isNonEmptyArray(item.opinionsData.data) && <AuthorWidget
                widgetHeader={t('favorite.articles_from_your_favorite_writers')}
                listKey={flatListUniqueKey.CONTENT_FOR_YOU + 'authorWidget' + index}
                data={item.opinionsData.data}
                containerStyle={{ paddingTop: 0 }}
                widgetHeaderContainerStyle={styles.authorWidgetContainer}
                widgetHeaderStyle={styles.authorWidgetHeader}
                togglePlayback={togglePlayback}
                selectedTrack={selectedTrack}
            />}
            
            {isNonEmptyArray(item.articleSectionData.data) &&
                <View style={styles.articleWidgetHeader}>
                    <WidgetHeader {...widgetHeaderData} />
                </View>
            }
            {/* <View style={{paddingHorizontal: 0.04 * screenWidth}}>
                <FavoriteVideo data={videoArchiveData} />
            </View> */}
            {isNonEmptyArray(item.articleSectionData.data) && <ArticleSection
                listKey={flatListUniqueKey.CONTENT_FOR_YOU+'articleSection'+index}
                data={item.articleSectionData.data}
                showFooterTitle={false}
                isFromFavorites={true}
                onUpdateBookmark={updateBookmarkInfo}
                numColumns={isTab ? 2 : 1}
                addStyle={styles.articleContainer}
            />}
            {isNonEmptyArray(item.shortArticleData.data)&& <ShortArticle
                listKey={flatListUniqueKey.CONTENT_FOR_YOU+'shortArticle'+index}
                data={item.shortArticleData.data}
                onPress={onPressArticle}
                onUpdateBookmark={updateBookmarkInfo}
                showSignUpPopUp={() => {}}
                addStyle={styles.topArticleContainer}
                showBody={isTab ? true : false}
                leftContainerStyle={isTab ? {flex: 1} : {}}
                imageStyleProp={isTab ? styles.topArticleImage : {}}
                
            />}
        </View>
    )
    const renderFooterComponent = () =>{
        return (
            <View>
                {isNonEmptyArray(pageAllData)?
                    <View style={styles.loaderStyle}>
                        {(opinionLoading || isArticalLoading) && <LoadingState />}
                    </View>:
                    showEmptyData()
                }
            </View>
        )
    }

    const loadingView = () => (
        <View style={styles.container}>
            <LoadingState />
        </View>
    )

    const showEmptyData = () => {
        return <View style={styles.container}>
            <Label children={'لم يتم حفظ أي شيء حتى الآن'} labelType={LabelTypeProp.h1} />
        </View>
    }

    return (
        <View style={styles.contentContainer}>
            {!initialLoading  ?
                <View>
                    <FlatList
                    data={pageAllData}
                    keyExtractor={(_, index) => index.toString()}
                    onEndReached={loadMoreData}
                    onEndReachedThreshold={0.5}
                    showsVerticalScrollIndicator={false}
                    listKey={flatListUniqueKey.CONTENT_FOR_YOU + new Date().getTime().toString()}
                    renderItem={({ item, index }) => renderContentForYou(item, index)}
                    ListFooterComponent={renderFooterComponent}
                    />
                </View> :
                loadingView()
            }
        </View>
    )
}

const customStyles = (theme: CustomThemeType) => StyleSheet.create({
    contentContainer: {
        flex: 1
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 0.80 * screenHeight
    },
    loaderStyle: {
        width: '100%',
        height: normalize(60),
        alignItems: 'center',
        justifyContent: 'center'
    },
    spaceStyle: {
        flex: 1,
    },
    authorWidgetContainer: {
        paddingHorizontal: 0,
        paddingTop: normalize(10),
        backgroundColor: theme.backgroundColor
    },
    authorWidgetHeader: {
        paddingHorizontal: isTab ? normalize(0.02 * screenWidth) : normalize(0.04 * screenWidth),
        paddingBottom:normalize(8),
    },
    articleWidgetHeader: {
        paddingHorizontal: isTab ? normalize(0.02 * screenWidth) : normalize(0.04 * screenWidth),
        backgroundColor: theme.backgroundColor,
        paddingTop: normalize(20),
        paddingBottom: normalize(8),
    },
    articleContainer: {
        paddingHorizontal: (isTab ? 0.02 : 0.04) * screenWidth
    },
    topArticleContainer: {
        paddingHorizontal: (isTab ? 0.02 : 0.04) * screenWidth,
        paddingBottom: 0,
    },
    topArticleImage: {
        flex: 0,
        width: 153,
        height: 125
    },
})
