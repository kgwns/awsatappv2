import { View, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { MyTopicsHorizontalSlider, ArticleItem } from 'src/components/molecules'
import { isNonEmptyArray, isTab, normalize, screenWidth } from 'src/shared/utils'
import { useAllSiteCategories, useContentForYou } from 'src/hooks'
import { Label, LabelTypeProp, LoadingState } from 'src/components/atoms'
import { useIsFocused } from '@react-navigation/native'
import { AllSiteCategoriesBodyGet } from 'src/redux/allSiteCategories/types'
import { ArticlesListItemType, FavouriteArticlesBodyGet } from 'src/redux/contentForYou/types'
import { dateTimeAgo, getImageUrl, horizontalEdge, isObjectNonEmpty, TimeIcon } from 'src/shared/utils/utilities'
import { fonts } from 'src/shared/styles/fonts'
import { colors, CustomThemeType } from 'src/shared/styles/colors'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { ScreenContainer } from 'src/components/screens'
import { useTheme } from 'src/shared/styles/ThemeProvider'
import { flatListUniqueKey, TranslateConstants, TranslateKey } from 'src/constants/Constants'
import { MY_NEWS_FIRST_INDEX, MY_NEWS_SECOND_INDEX, NEWS_UNIT_ID } from 'src/hooks/useAds'
import { AdContainer, AdContainerSize } from 'src/components/atoms/adContainer/AdContainer'

export const keyExtractor = (_: any, index: number) => index.toString();

export const MyNewsTopics = () => {
    const isFocused = useIsFocused()
    const styles = useThemeAwareObject(customStyle)
    const { themeData } = useTheme()

    const {
        fetchAllSiteCategoriesRequest,
        allSiteCategoriesData,
        getSelectedTopicsData,
        selectedTopicsData,
    } = useAllSiteCategories()

    const {
        isArticalLoading,
        favouriteArticlesData,
        fetchFavouriteArticlesRequest,
    } = useContentForYou();

    const noContentTitle = TranslateConstants({
        key: TranslateKey.NO_CONTENT_TITLE,
    });

    const allSiteCategoriesPayload: AllSiteCategoriesBodyGet = {
        items_per_page: 50,
    };

    const [selectedIndex, setSelectedIndex] = useState<number>(-1);
    const [pageCount, setPageCount] = useState(0);
    const [selectedTopics, setSelectedTopics] = useState<any[]>([]);
    const [articleData, setArticleData] = useState<ArticlesListItemType[]>([]);
    const [showEmpty, setShowEmpty] = useState<boolean>(false);
    const numberOfColumn = isTab ? 2 : 1;

    useEffect(() => {
        if (isFocused) {
            fetchAllSiteCategoriesRequest(allSiteCategoriesPayload)
            getSelectedTopicsData()
        }
    }, []);

    useEffect(() => {
        if (articleData !== favouriteArticlesData) {
            setArticleData((prevArticleData: any) => [
                ...prevArticleData,
                ...favouriteArticlesData,
            ]);
        }
    }, [favouriteArticlesData]);

    useEffect(() => {
        setInitialData();
    }, [selectedTopicsData]);

    useEffect(() => {
        if (pageCount !== 0) {
            fetchArticleData(selectedTopics, pageCount);
        }
    }, [pageCount]);

    useEffect(() => {
        (!isNonEmptyArray(selectedTopics) && pageCount === 0) || (!isArticalLoading && !isNonEmptyArray(articleData))
            ? setShowEmpty(true)
            : setShowEmpty(false);
    }, [articleData]);

    const topicsList = useMemo(() => {
        const topicsListArray = [];
        if (isNonEmptyArray(allSiteCategoriesData) && isNonEmptyArray(selectedTopicsData.data)) {
            const authorsIdList = selectedTopicsData.data.map((item: any) => item.tid.toString());
            for (let i = 0; i < allSiteCategoriesData.length; i++) {
                if (authorsIdList.includes(allSiteCategoriesData[i].tid)) {
                    topicsListArray.push(allSiteCategoriesData[i]);
                }
            }
        }
        return topicsListArray;
    }, [selectedTopicsData, allSiteCategoriesData]);

    const fetchArticleData = (topicsListProps: any, pageCountProps: any) => {
        const articleBody: FavouriteArticlesBodyGet = {
            page: pageCountProps,
            items_per_page: 10,
            topicsList: topicsListProps
        }
        fetchFavouriteArticlesRequest(articleBody)
    }

    const getTopicsList = () => {
        let topicsIdList = [];
        if (isNonEmptyArray(selectedTopicsData.data)) {
            topicsIdList = selectedTopicsData.data.map((item: any) => {
                return item.tid.toString();
            });
        }
        return topicsIdList;
    };

    const setInitialData = () => {
        const topicsIdList = getTopicsList();
        setPageCount(0);
        setSelectedIndex(-1)
        setArticleData([]);
        setSelectedTopics(topicsIdList);
        fetchArticleData(topicsIdList, 0);
    };

    const loadMoreData = () => {
        setPageCount(pageCount + 1);
    };

    const onPress = (item: any, index: number) => {
        if(index === selectedIndex) {
            return;
        }
        const payloadTopicsList = index === -1 ? getTopicsList() : [item.tid];
        if (payloadTopicsList !== selectedTopics) {
            setPageCount(0);
            setArticleData([]);
            setSelectedIndex(index);
            setSelectedTopics(payloadTopicsList);
            fetchArticleData(payloadTopicsList, 0);
        }
    };

    const renderItem = (item: ArticlesListItemType, index: number) => {
        const timeFormat = dateTimeAgo(item.changed)
        const articleItemStyle = isTab ? numberOfColumn > 1 && articleData.length > 1 ? (index % 2 === 0) ? styles.evenStyle : styles.oddStyle : {} : styles.mobileArticleItem
        const tagName = isObjectNonEmpty(item.field_news_categories_export) ? item.field_news_categories_export[0].title : ''
        return (
            <View style={styles.itemContainer}>
                <ArticleItem
                    index={index}
                    nid={item.nid}
                    image={getImageUrl(item.field_new_photo) || 'placeholderImg'}
                    imageStyle={isTab ? styles.tabImageStyle : styles.imageStyle}
                    tagName={tagName}
                    title={item.title}
                    titleStyle={styles.titleStyle}
                    footerInfo={{
                        rightIcon: () => TimeIcon(timeFormat.icon),
                        rightTitle: timeFormat.time,
                        hideBookmark: true,
                        rightTitleColor: themeData.footerTextColor
                    }}
                    author={''} created={''} isBookmarked={false}
                    showDivider={false}
                    containerStyle={styles.containerStyle}
                    articleItemStyle={articleItemStyle}
                />
                {(index == (MY_NEWS_FIRST_INDEX - 1) || index == (MY_NEWS_SECOND_INDEX - 1)) && 
                    <AdContainer style={{marginBottom: 20}} unitId={NEWS_UNIT_ID} size={AdContainerSize.MEDIUM}/>
                }
            </View>
        )
    };

    const renderFooterComponent = () => {
        return (
            <View>
                {isNonEmptyArray(articleData) && (
                    <View style={styles.loaderStyle}>
                        {isArticalLoading && <LoadingState />}
                    </View>
                )}
            </View>
        );
    };

    const showEmptyData = () => {
        return (
            <View style={styles.centeredStyle}>
                <Label
                    children={noContentTitle}
                    labelType={LabelTypeProp.h1}
                />
            </View>
        );
    };

    const renderTopics = () => (
        <FlatList
            style={styles.listContainer}
            keyExtractor={keyExtractor}
            data={articleData}
            renderItem={({ item, index }) => renderItem(item, index)}
            showsVerticalScrollIndicator={false}
            onEndReached={loadMoreData}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooterComponent}
            listKey={flatListUniqueKey.CONTENT_FOR_YOU + new Date().getTime().toString()}
            numColumns={numberOfColumn}
        />
    );
    return (
        <ScreenContainer edge={horizontalEdge} backgroundColor={styles.screenBackgroundColor?.backgroundColor}>
            <View style={styles.container}>
                <MyTopicsHorizontalSlider
                    topicsList={topicsList}
                    onPress={onPress}
                    selectedIndex={selectedIndex}
                />
                {isArticalLoading && pageCount === 0 ? (
                    <View style={styles.loaderContainer}>
                        <LoadingState />
                    </View>
                ) : showEmpty ? (
                    showEmptyData()
                ) :
                    (
                        renderTopics()
                    )}
            </View>
        </ScreenContainer>
    )
}

const customStyle = (theme: CustomThemeType) => StyleSheet.create({
    container: {
        flex: 1,
    },
    titleStyle: {
        fontFamily: fonts.AwsatDigital_Bold,
        fontSize: 20,
        lineHeight: 28,
        textAlign: 'left',
        paddingVertical: normalize(8),
        color: theme.primaryBlack,
    },
    imageStyle: {
        width: '100%',
        height: 'auto',
        aspectRatio: 1.34
    },
    tabImageStyle: {
        // Enable when New UI change requested
        // width: 0.5 * screenWidth,
        // height: 'auto',
        // aspectRatio: 1.34,
    },
    listContainer: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: colors.transparent,
        paddingBottom: isTab ? 20 : 0,
    },
    loaderStyle: {
        width: '100%',
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loaderContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    centeredStyle: {
        flex: 0.9,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemContainer: {
        flex: 1,
        marginHorizontal: (isTab ? 0.03 : 0) * screenWidth
    },
    articleContainer: {
        paddingHorizontal: (isTab ? 0.02 : 0.04) * screenWidth
    },
    evenStyle: {
        marginRight: normalize(10),
    },
    oddStyle: {
        marginLeft: normalize(10),
    },
    mobileArticleItem: {
        paddingBottom: normalize(20),
    },
    screenBackgroundColor: {
        backgroundColor: theme.backgroundColor,
    },
    containerStyle:{ 
        paddingTop: normalize(20) ,
        marginHorizontal: (isTab ? 0.02 : 0.04) * screenWidth,
    }
})
