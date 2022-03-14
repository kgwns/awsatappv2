import { View, FlatList, StyleSheet } from 'react-native'
import React, {useState, useEffect} from 'react'
import { AuthorWidget, PodcastForYou, ShortArticle, PodcastForYouListType, ArticleSection } from 'src/components/organisms';
import { WidgetHeader, LabelTypeProp,WidgetHeaderProps, LoadingState } from 'src/components/atoms';
import { shortArticleWithTagProperties, videoArchiveData } from 'src/constants/SampleData';
import { DUMMY_IMAGE_URL } from 'src/services/apiUrls';
import { useTranslation } from 'react-i18next';
import { ShortArticleProps } from '../ShortArticle';
import { useTheme } from 'src/shared/styles/ThemeProvider';
import { FavoriteVideo } from '../favoriteVideo/favoriteVideo';
import { screenWidth } from 'src/shared/utils';
import { useAllSiteCategories, useAllWriters, useContentForYou } from 'src/hooks';
import {FavouriteOpinionsBodyGet, FavouriteArticlesBodyGet} from 'src/redux/contentForYou/types';
import { getImageUrl, isNonEmptyArray } from 'src/shared/utils/utilities';
import {flatListUniqueKey} from 'src/constants';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScreensConstants } from 'src/constants';
import { normalize } from 'react-native-elements';

const podcastForYouData: PodcastForYouListType = {
    image: DUMMY_IMAGE_URL,
    name: 'إسم البودكاست',
    title: 'عنوان حلثه البودكاست',
    author: 'الخميس',
    created: '45 دقيقه'
}

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
        isLoading,
        favouriteOpinionsData,
        fetchFavouriteOpinionsRequest,
        isArticalLoading,
        favouriteArticlesData,
        fetchFavouriteArticlesRequest,
        emptyAllData,
    } = useContentForYou();
    const [selectedAuthors, setSelectedAuthors] = useState([])
    const [selectedTopics, setSelectedTopics] = useState([])
    const [isAllLoading, setIsAllLoading] = useState(false)
    const [page, setPage] = useState(0)
    const initialPageData = {
        opinionsData: {data:[],loaded: false},
        articleSectionData: {data:[],loaded: false},
        shortArticleData: {data:[],loaded: false}
    }
    const [pageAllData,setPageAllData] = useState<AllContentData[]>([initialPageData])
    const widgetHeaderData: WidgetHeaderProps = {
        headerLeft: {
            title: t('favorite.articles_that_interest_you'),
            color: themeData.primary,
            labelType: LabelTypeProp.h2,
        },
    };
    const navigation = useNavigation<StackNavigationProp<any>>()

    useEffect(() => {
        emptyAllData();
        getSelectedTopicsData();
        getSelectedAuthorsData();
    }, []);

    useEffect(() => {
        fetchSelectedDataFromAllTopics()
    }, [selectedTopicsData]);

    useEffect(() => {
        fetchSelectedDataFromAllAuthors();
    }, [selectedAuthorsData]);

    useEffect(() => {
        setIsAllLoading(true)
        formatArticleSectionData()
    }, [favouriteArticlesData]);

    useEffect(() => {
        setIsAllLoading(true)
        formatOpinionsData()
    }, [favouriteOpinionsData]);

    const formatOpinionsData = () => {
        let updatedPageData = [...pageAllData];
        updatedPageData[page].opinionsData  = {data:favouriteOpinionsData, loaded: true} ;
        setPageAllData(updatedPageData);
        checkLoadData()
    }

    const checkLoadData = () =>{
        if(pageAllData[page].articleSectionData.loaded&&pageAllData[page].opinionsData.loaded&&pageAllData[page].shortArticleData.loaded){
            setIsAllLoading(false)
        }
    }

    const formatArticleSectionData = () => {
        let formatArticleSectionData = []
        let formatShortArticleData = []
        for (const [index,item] of favouriteArticlesData.entries()) {
            let formattedData = {
                ...shortArticleWithTagProperties,
                titleColor: themeData.primaryBlack,
                body: item.body,
                flag: '',
                title: item.title,
                nid: item.nid,
                image: getImageUrl(item.field_image),
                news_categories: item.field_news_categories_export,
                author: item.author_resource,
                created: item.created_export,
                isBookmarked: false,
                loaded: true
            }
            if(index<2){
                formatArticleSectionData.push(formattedData)
            }else{
                formattedData.image = item.field_image
                formattedData.flag= item.field_news_categories_export?.title,
                formatShortArticleData.push(formattedData)
            }
        }
        let pageDataUpdate = [...pageAllData];
        pageDataUpdate[page].articleSectionData  = {data:formatArticleSectionData, loaded: true} ;
        pageDataUpdate[page].shortArticleData  = {data:formatShortArticleData, loaded:true} ;
        setPageAllData(pageDataUpdate);
        checkLoadData()
    }

    const fetchSelectedDataFromAllAuthors = () => {
        if (isNonEmptyArray(selectedAuthorsData.data)) {
            const selectedAuthors = selectedAuthorsData.data.map((item:any)=>{
                return item.tid
            });
            setSelectedAuthors(selectedAuthors);
            console.log(selectedAuthors,'selectedAuthorsDataselectedAuthorsData');
            fetchOpinionData(selectedAuthors,0);
        }
    };

    const fetchSelectedDataFromAllTopics = () => {
        if (isNonEmptyArray(selectedTopicsData.data)) {
            const selectedTopics = selectedTopicsData.data.map((item:any)=>{
                return item.tid
            });
            setSelectedTopics(selectedTopics);
            fetchArticleData(selectedTopics,0);
        }
    };

    const fetchOpinionData =(authorsList:any, pageCount: number) => {
        let opinionBody : FavouriteOpinionsBodyGet = {
            page: pageCount,
            items_per_page: 3,
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
        if(!isAllLoading){
            let pageCount = page+1
            setPage(pageCount)
            setPageAllData(pageData => [...pageData, initialPageData]);
            fetchOpinionData(selectedAuthors,pageCount)
            fetchArticleData(selectedTopics,pageCount)
            setIsAllLoading(true)
        }
    }

    const onPressArticle = (nid: string) => {
        nid && navigation.navigate(ScreensConstants.ARTICLE_DETAIL_SCREEN, { nid: nid })
      }

    const renderContentForYou = (item: AllContentData, index: number) => (
        <View key={flatListUniqueKey.CONTENT_FOR_YOU + index} style={{flex: 1}}>
            {/* <PodcastForYou title={podcastForYouTitle} data={Array(5).fill(podcastForYouData)} /> */}
            <AuthorWidget
                widgetHeader={t('favorite.articles_from_your_favorite_writers')}
                listKey={flatListUniqueKey.CONTENT_FOR_YOU+'authorWidget'+index}
                data={item.opinionsData.data}
            />
            {item.articleSectionData.loaded&&<View style={{paddingHorizontal: 0.04 * screenWidth}}>
                <WidgetHeader {...widgetHeaderData} />
            </View>}
            {/* <View style={{paddingHorizontal: 0.04 * screenWidth}}>
                <FavoriteVideo data={videoArchiveData} />
            </View> */}
            <ArticleSection
                listKey={flatListUniqueKey.CONTENT_FOR_YOU+'articleSection'+index}
                data={item.articleSectionData.data}
                showFooterTitle={false}
                showDivider={false}
            />
            <ShortArticle
                listKey={flatListUniqueKey.CONTENT_FOR_YOU+'shortArticle'+index}
                data={item.shortArticleData.data}
                onPress={onPressArticle}
                onUpdateBookmark={() => { }}
                showSignUpPopUp={() => {}}
            />
        </View>
    )
    const renderFooterComponent = () =>{
        return (
            <View style={styles.loaderStyle}>
                {(isLoading || isArticalLoading) && <LoadingState />}
            </View>
        )
    }

    return (
        <View>
            <FlatList
                data={pageAllData}
                keyExtractor={(_, index) => index.toString()}
                onEndReached={loadMoreData}
                onEndReachedThreshold={0.3}
                showsVerticalScrollIndicator={false}
                listKey={flatListUniqueKey.CONTENT_FOR_YOU + new Date().getTime().toString()}
                renderItem={({ item, index }) => renderContentForYou(item, index)}
                ListFooterComponent={renderFooterComponent}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    loaderStyle: {
        width: '100%',
        height: normalize(60),
        alignItems: 'center',
        justifyContent: 'center'
    }
})