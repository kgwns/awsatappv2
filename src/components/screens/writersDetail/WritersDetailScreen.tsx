import React, { useEffect, useState, useMemo } from 'react';
import { StyleSheet, View, FlatList, Animated } from 'react-native';
import { CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { isIOS, isNonEmptyArray, isNotchDevice, isObjectNonEmpty, isTab, normalize, screenWidth } from 'src/shared/utils';
import { ScreenContainer } from '..';
import { useAllWriters, useBookmark, useLogin, useWriterDetail } from 'src/hooks';
import { useIsFocused, useNavigation, useNavigationState } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { WriterDetailDataType } from 'src/redux/writersDetail/types';
import { WriterBannerImage, DetailHeader, DetailHeaderTablet } from 'src/components/molecules'
import { OpinionWritersArticlesSection } from 'src/components/organisms';
import { OpinionsListItemType } from 'src/redux/opinions/types';
import { decodeHTMLTags, horizontalEdge } from 'src/shared/utils/utilities';
import { PopulateWidgetType } from 'src/components/molecules/populateWidget/PopulateWidget';
import { ScreensConstants } from 'src/constants/Constants'
import { fetchWriterOpinionsApi } from 'src/services/opinionsService';
import { AxiosError } from 'axios';

export interface WritersDetailScreenProps {
    route: any;
}

export const WritersDetailScreen = ({
    route,
}: WritersDetailScreenProps) => {
    const navigation = useNavigation<StackNavigationProp<any>>()
    const routes = useNavigationState(state => state.routes)
    const isFocused = useIsFocused();
    
    const style = useThemeAwareObject(customStyle);

    const { isLoading, writerDetailData,
        getWriterDetailData, emptyWriterDetailData
    } = useWriterDetail();

    const { 
        bookmarkIdInfo, 
        sendBookmarkInfo, removeBookmarkedInfo,
        validateBookmark,
    } = useBookmark()

    const { 
        isLoggedIn 
    } = useLogin()

    const { selectedAuthorsData, getSelectedAuthorsData,
        sendSelectedWriterInfo, removeAuthorRequest, validateFollow,
    } = useAllWriters();


    const [writerDetailInfo, setWriterDetailInfo] = useState<WriterDetailDataType[]>([])
    const [showupUp, setShowPopUp] = useState(false)
    const [page, setPage] = useState(0);
    const [opinionsDataInfo, setOpinionsDataInfo] = useState<OpinionsListItemType[]>([])
    const [isFollowed, setIsFollowed] = useState(false)
    const [scrollY, setScrollY] = useState(new Animated.Value(0))
    const [isWriterOpinionLoading, setIsWriterOpinionLoading] = useState(true)
    const [allOpinionLoaded, setAllOpinionLoaded] = useState<boolean>(false)

    const detailRoutes = useMemo(() => routes.filter((detailRoute) =>
        detailRoute.name === ScreensConstants.ARTICLE_DETAIL_SCREEN ||
        detailRoute.name === ScreensConstants.OPINION_ARTICLE_DETAIL_SCREEN ||
        detailRoute.name === ScreensConstants.WRITERS_DETAIL_SCREEN), [routes]);
    const noOfDetailRoutes = detailRoutes.length

    useEffect(() => {
        setScrollY(new Animated.Value(0))
        if(isFocused){
            getWriterDetailData({ tid: route.params.tid })
            getSelectedAuthorsData()
            // Orientation.lockToPortrait() //Disabled for iPad orientation

            return () => {
                emptyWriterDetailData()
            }
        }
    }, [isFocused])

    useEffect(() => {
        onChangeBookmarkInfo()
    }, [bookmarkIdInfo])

    useEffect(() => {
        if (isNonEmptyArray(writerDetailData) && isObjectNonEmpty(selectedAuthorsData) ) {
            const isFollow = validateFollow(writerDetailData[0].tid)
            setIsFollowed(isFollow)
        }
    }, [ writerDetailData, selectedAuthorsData])

    const onChangeBookmarkInfo = () => {
        const writerOpinionsData = [...opinionsDataInfo]
        updateOpinionsData(writerOpinionsData)
    }

    const updateOpinionsData = (writerOpinionsData: any) => {
        if (isNonEmptyArray(writerOpinionsData)) {
            const opinions = updateBookmark(writerOpinionsData)
            setOpinionsDataInfo(opinions)
        }
    }

    useEffect(() => {
        setWriterDetailInfo(writerDetailData)
    }, [writerDetailData])

    useEffect(() => {
        fetchOpinionData()
    }, [page]);

    const fetchOpinionData = async () => {
        setIsWriterOpinionLoading(true)
        try {
            const response = await fetchWriterOpinionsApi({ tid: route.params.tid, page: page });
            if (response && response.rows && isNonEmptyArray(response.rows)) {
                const data = opinionsDataInfo.concat(response.rows)
                updateOpinionsData(data)
            } else {
                setAllOpinionLoaded(true)
            }
            setIsWriterOpinionLoading(false)
        } catch (error) {
            handleAxiosError(error)
        }
    }

    const handleAxiosError = (error: any) => {
        const errorResponse: AxiosError = error as AxiosError;
        if (errorResponse.response) {
            const errorMessage: { message: string } = errorResponse.response.data;
            console.log("🚀 handleAxiosError ~ errorMessage", errorMessage)
        }
    }

    const updateBookmark = (data: OpinionsListItemType[]) => {
        return data.map((item: OpinionsListItemType) => (
            {
                ...item,
                isBookmarked: validateBookmark(item.nid)
            }
        ))
    }

    const updatedChangeBookmark = (data: OpinionsListItemType[], index: number): OpinionsListItemType[] => {
        const updatedData = [...data]
        const bookmarkStatus = !updatedData[index]?.isBookmarked ?? true
        updatedData[index].isBookmarked = bookmarkStatus
        updateBookmarkInfo(updatedData[index].nid, bookmarkStatus)
        return updatedData
    }

    const updateBookmarkInfo = (nid: string, isBookmarked: boolean) => {
        if (isLoggedIn) {
            isBookmarked ? sendBookmarkInfo({ nid, bundle: PopulateWidgetType.OPINION }) : removeBookmarkedInfo({ nid })
        } else {
            setShowPopUp(true)
        }
    }

    const onCloseSignUpAlert = () => {
        setShowPopUp(false)
    }

    const updatedOpinionArticlesBookmark = (index: number) => {
        if (!isLoggedIn) {
            setShowPopUp(true)
            return
        }
        const updatedData = updatedChangeBookmark(opinionsDataInfo, index)
        setOpinionsDataInfo(updatedData)
    }

    const onPressBack = () => {
        navigation.goBack()
    }

    const gotoNextPage = () => {
        if (!isWriterOpinionLoading && !allOpinionLoaded) {
            setPage(page + 1);
        }
    };

    const onPressFollow = (id: string) => {
        if (!isLoggedIn) {
            setShowPopUp(true)
            return
        }

        const newFollowed = !isFollowed
        const data = [...writerDetailInfo]
        data[0].isFollowed = !data[0].isFollowed
        setIsFollowed(newFollowed)
        onUpdateFollow(id, newFollowed)
    }

    const onUpdateFollow = (id: string, hasFollowed: boolean) => {
        if (isLoggedIn) {
            hasFollowed ? sendSelectedWriterInfo({ tid: id, isList: false }) : removeAuthorRequest({ tid: id })
        } else {
            setShowPopUp(true)
        }
    }

    const onScroll = (event: any) => {
        setScrollY(event.nativeEvent.contentOffset.y)
    }

    const onPressHome = () => {
        navigation.popToTop()
    }

    const renderHeader = () => {
        const headerProps = {
            visibleHome: noOfDetailRoutes > 1,
            onHomePress: () => onPressHome(),
            onBackPress: () => onPressBack(),
            containerStyle: isTab && { paddingHorizontal: normalize(0.02 * screenWidth) },
        }

        return (
            <View style={style.backContainer}>
                {isTab ? <DetailHeaderTablet {...headerProps} /> : <DetailHeader {...headerProps} />}
            </View>
        );
    };

    const renderItem = () => {
        const hideBackArrow = (Number.parseInt(JSON.stringify(scrollY)) > 50)
        return (
            <View style={style.container}>
                {isNonEmptyArray(writerDetailInfo) && <WriterBannerImage  isWriter isFocused data={{
                    authorImage: writerDetailInfo[0].field_opinion_writer_photo_export,
                    authorName: writerDetailInfo[0].name,
                    authorDescription: decodeHTMLTags(writerDetailInfo[0].field_description),
                    facebook_url: writerDetailInfo[0].field_opinion_facebook_export,
                    twitter_url: writerDetailInfo[0].field_opinion_twitter_export,
                    instagram_url: writerDetailInfo[0].field_instagram_url_export,
                }}
                    orientation={'PORTRAIT'}
                    onPressReturn={onPressBack}
                    isFollowed={isFollowed}
                    onPressFollow={() => onPressFollow(writerDetailInfo[0].tid)}
                    hideBackArrow={hideBackArrow}
                    visibleHome={noOfDetailRoutes > 1}
                    onPressHome={onPressHome}
                />}
                <OpinionWritersArticlesSection
                    data={opinionsDataInfo}
                    onScroll={gotoNextPage}
                    isLoading={isWriterOpinionLoading}
                    hideImageView={true}
                    onUpdateOpinionArticlesBookmark={updatedOpinionArticlesBookmark}
                />
            </View>
        )
    };

    return (
        <ScreenContainer edge={horizontalEdge} isLoading={isLoading}
            isSignUpAlertVisible={showupUp}
            onCloseSignUpAlert={onCloseSignUpAlert}>
            {renderHeader()}
            {!isLoading && <>
                <FlatList
                    style={style.flatList}
                    data={[{}]}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    onScroll={onScroll}
                />
                {/* For Navigation Reference
                {(Number.parseInt(JSON.stringify(scrollY)) > 50) && <DetailHeader visibleHome={noOfDetailRoutes > 1} onHomePress={onPressHome} onBackPress={onPressBack} />} */}
            </>
            }
        </ScreenContainer>
    );
};

const customStyle = (theme: CustomThemeType) => StyleSheet.create({
    container: {
        paddingBottom: normalize(80),
        backgroundColor: theme.backgroundColor,
    },
    flatList: {
        flex: 1,
        height: '100%',
    },
    footer: {
        width: '100%',
    },
    backContainer: {
        width: '100%',
        height: isTab ? 100 : isIOS ? isNotchDevice ? normalize(98) : normalize(92) : normalize(72),
        backgroundColor: theme.secondaryWhite,
        justifyContent: 'center',
    }
});
