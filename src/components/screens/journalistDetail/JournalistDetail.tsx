import React, { useEffect, useState, useMemo } from 'react';
import { StyleSheet, View, FlatList, Animated } from 'react-native';
import { CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { isIOS, isNonEmptyArray, isNotchDevice, isObjectNonEmpty, isTab, normalize } from 'src/shared/utils';
import { ScreenContainer } from '..';
import { useAllWriters, useBookmark, useLogin, useWriterDetail, useJournalist } from 'src/hooks';
import { useIsFocused, useNavigation, useNavigationState } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { WriterBannerImage, DetailHeader, DetailHeaderTablet } from 'src/components/molecules';
import { JournalistSection } from 'src/components/organisms';
import { horizontalEdge, } from 'src/shared/utils/utilities';
import { PopulateWidgetType } from 'src/components/molecules/populateWidget/PopulateWidget';
import { ScreensConstants } from 'src/constants/Constants'
import { JournalistArticleData, JournalistDetailDataType } from 'src/redux/journalist/types';

export interface JournalistDetailScreenProps {
    route: any;
}

export const JournalistDetail = ({
    route,
}: JournalistDetailScreenProps) => {
    const navigation = useNavigation<StackNavigationProp<any>>()
    const routes = useNavigationState(state => state.routes)
    const isFocused = useIsFocused();

    const style = useThemeAwareObject(journalistCustomStyle);

    const {
        bookmarkIdInfo,
        sendBookmarkInfo, removeBookmarkedInfo,
        validateBookmark,
    } = useBookmark()

    const { isLoggedIn } = useLogin()

    const { emptyWriterDetailData
    } = useWriterDetail();

    const { selectedAuthorsData, getSelectedAuthorsData,
        sendSelectedWriterInfo, removeAuthorRequest, validateFollow,
    } = useAllWriters();

    const { journalistArticleInfo, getJournalistArticleInfo, journalistDetailData, getJournalistDetailInfo,
        isDetailLoading, isArticleLoading, emptyJournalistArticleInfo } = useJournalist();

    const [showupUp, setShowPopUp] = useState(false)
    const [page, setPage] = useState(0);
    const [isFollowed, setIsFollowed] = useState(false)
    const [scrollY, setScrollY] = useState(new Animated.Value(0))
    const [articleState, setArticleState] = useState<JournalistArticleData[]>([])
    const [journalistDetail, setJournalistDetail] = useState<JournalistDetailDataType[]>([])

    const detailRoutes = useMemo(() => routes.filter((detailRoute) =>
        detailRoute.name === ScreensConstants.ARTICLE_DETAIL_SCREEN ||
        detailRoute.name === ScreensConstants.OPINION_ARTICLE_DETAIL_SCREEN ||
        detailRoute.name === ScreensConstants.WRITERS_DETAIL_SCREEN ||
        detailRoute.name === ScreensConstants.JOURNALIST_DETAIL_SCREEN), [routes]);
    const noOfDetailRoutes = detailRoutes.length

    const jId = route.params.tid

    useEffect(() => {
        emptyJournalistArticleInfo()
    }, [])

    useEffect(() => {
        setScrollY(new Animated.Value(0))
        if (isFocused) {
            getJournalistDetailInfo({ tid: jId })
            getSelectedAuthorsData()
            // enable when orientation required for mobile
            // Orientation.lockToPortrait()
            return () => {
                emptyWriterDetailData()
            }
        }
    }, [isFocused])

    useEffect(() => {
        if (isNonEmptyArray(journalistDetailData) && isObjectNonEmpty(selectedAuthorsData)) {
            const isFollow = validateFollow(jId)
            setIsFollowed(isFollow)
        }
    }, [journalistDetailData, selectedAuthorsData])


    useEffect(() => {
        setJournalistDetail(journalistDetailData)
    }, [journalistDetailData])

    useEffect(() => {
        getJournalistArticleInfo({ nid: jId, page });
    }, [page]);

    useEffect(() => {
        updateArticleState()
    }, [journalistArticleInfo, bookmarkIdInfo])

    const updateArticleState = () => {
        if (isNonEmptyArray(journalistArticleInfo)) {
            const articles = updateBookmark(journalistArticleInfo)
            setArticleState(articles)
        }
    }

    const updateBookmark = (data: JournalistArticleData[]) => {
        return data.map((item: JournalistArticleData) => (
            {
                ...item,
                isBookmarked: validateBookmark(item.nid)
            }
        ))
    }

    const updatedChangeBookmark = (data: JournalistArticleData[], index: number) => {
        const updatedData = [...data]
        const bookmarkStatus = !updatedData[index]?.isBookmarked ?? true
        updatedData[index].isBookmarked = bookmarkStatus
        updateBookmarkInfo(updatedData[index].nid, bookmarkStatus)
        return updatedData
    }

    const updateBookmarkInfo = (nid: string, isBookmarked: boolean) => {
        if (isLoggedIn) {
            isBookmarked ? sendBookmarkInfo({ nid, bundle: PopulateWidgetType.ARTICLE }) : removeBookmarkedInfo({ nid })
        } else {
            setShowPopUp(true)
        }
    }

    const onCloseSignUpAlert = () => {
        setShowPopUp(false)
    }

    const onUpdateArticlesBookmark = (index: number) => {
        if (!isLoggedIn) {
            setShowPopUp(true)
            return
        }
        const updatedData = updatedChangeBookmark(articleState, index)
        setArticleState(updatedData)
    }

    const onPressBack = () => {
        navigation.goBack()
    }

    const gotoNextPage = () => {
        if (!isArticleLoading && articleState.length % 10 === 0) {
            setPage(page + 1);
        }
    };

    const onPressFollow = (id: string) => {
        if (!isLoggedIn) {
            setShowPopUp(true)
            return
        }

        const newFollowed = !isFollowed
        const data = [...journalistDetail]
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
        }

        return (
            <View style={style.backContainer}>
                {isTab ? <DetailHeaderTablet {...headerProps} /> : <DetailHeader {...headerProps} />}
            </View>
        );
    };

    const renderItem = () => {
        const hideBackArrow = (Number.parseInt(JSON.stringify(scrollY)) > 50)
        const journalistData = isNonEmptyArray(journalistDetail) ? journalistDetail[0] : {} as JournalistDetailDataType

        return (
            <View style={style.container}>
                {isObjectNonEmpty(journalistData) && <WriterBannerImage isWriter isFocused data={journalistData}
                    orientation={'PORTRAIT'}
                    onPressReturn={onPressBack}
                    showIsFollowed={false}
                    isFollowed={isFollowed}
                    onPressFollow={() => onPressFollow(jId)}
                    hideBackArrow={hideBackArrow}
                    visibleHome={noOfDetailRoutes > 1}
                    onPressHome={onPressHome}
                />}
                <JournalistSection
                    data={articleState}
                    isLoading={isArticleLoading}
                    onScroll={gotoNextPage}
                    onUpdateArticlesBookmark={onUpdateArticlesBookmark}
                />
            </View>
        )
    };

    return (
        <ScreenContainer edge={horizontalEdge} isLoading={isDetailLoading}
            isSignUpAlertVisible={showupUp}
            onCloseSignUpAlert={onCloseSignUpAlert}>
            {renderHeader()}
            {!isDetailLoading && <>
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

const journalistCustomStyle = (theme: CustomThemeType) => StyleSheet.create({
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
