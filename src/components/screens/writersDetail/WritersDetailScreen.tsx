import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, BackHandler } from 'react-native';
import { CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { horizontalAndTop, isNonEmptyArray, isObjectNonEmpty, normalize } from 'src/shared/utils';
import { ScreenContainer } from '..';
import { useAllWriters, useBookmark, useLogin } from 'src/hooks';
import TrackPlayer from 'react-native-track-player';
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useWriterDetail } from 'src/hooks';
import { WriterDetailDataType } from 'src/redux/writersDetail/types';
import { WriterBannerImage } from 'src/components/molecules';
import { useOpinions } from 'src/hooks/useOpinions';
import { OpinionWritersArticlesSection } from 'src/components/organisms';
import { OpinionsListItemType } from 'src/redux/opinions/types';
import { decodeHTMLTags, horizontalEdge } from 'src/shared/utils/utilities';

export interface WritersDetailScreenProps {
    route: any;
}

export const WritersDetailScreen = ({
    route,
}: WritersDetailScreenProps) => {
    const navigation = useNavigation<StackNavigationProp<any>>()
    const isFocused = useIsFocused();

    const style = useThemeAwareObject(customStyle);

    const { isLoading, writerDetailData,
        getWriterDetailData, emptyWriterDetailData
    } = useWriterDetail();

    const {
        writerOpinionsData, isWriterOpinionLoading,
        fetchWriterOpinionsRequest, emptyWriterOpinionData
    } = useOpinions()

    const { 
        bookmarkIdInfo, 
        sendBookmarkInfo, removeBookmarkedInfo 
    } = useBookmark()

    const { 
        isLoggedIn 
    } = useLogin()

    const { selectedAuthorsData, getSelectedAuthorsData,
        sendSelectedWriterInfo, removeAuthorRequest
    } = useAllWriters();


    const [writerDetailInfo, setWriterDetailInfo] = useState<WriterDetailDataType[]>([])
    const [showupUp, setShowPopUp] = useState(false)
    const [page, setPage] = useState(0);
    const [opinionsDataInfo, setOpinionsDataInfo] = useState(writerOpinionsData)
    const [isFollowed, setIsFollowed] = useState(false)
    
    const stopTrackPlayer = async () => {
        await TrackPlayer.reset();
    }

    useFocusEffect(
        React.useCallback(() => {
            const unsubscribe = () => { stopTrackPlayer() };
            return () => {
                unsubscribe();
            }
        }, [])
    );

    useEffect(() => {
        if(isFocused){
            getWriterDetailData({ tid: route.params.tid })
            getSelectedAuthorsData()

            return () => {
                emptyWriterDetailData()
                emptyWriterOpinionData()
            }
        }
    }, [isFocused])

    useEffect(() => {
        updateOpinionsData()
    }, [writerOpinionsData, bookmarkIdInfo])

    useEffect(() => {
        if (isNonEmptyArray(writerDetailData) && isObjectNonEmpty(selectedAuthorsData) ) {
            const isFollowed = validateFollow(writerDetailData[0].tid)
            setIsFollowed(isFollowed)
        }
    }, [ writerDetailData, selectedAuthorsData])

    const validateFollow = (id: string): boolean => {
        return isObjectNonEmpty(selectedAuthorsData) ? selectedAuthorsData.data.some((value: any) => value.tid == id) : false
    }

    const updateOpinionsData = () => {
        if (isNonEmptyArray(writerOpinionsData)) {
            const opinions = updateBookmark(writerOpinionsData)
            setOpinionsDataInfo(opinions)
        }
    }

    useEffect(() => {
        setWriterDetailInfo(writerDetailData)
    }, [writerDetailData])

    useEffect(() => {
        fetchWriterOpinionsRequest({ tid: route.params.tid, page: page });
    }, [page]);

    useEffect(() => {
        const backAction = () => {
            TrackPlayer.stop();
            return false;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);

    const updateBookmark = (data: OpinionsListItemType[]) => {
        return data.map((item: OpinionsListItemType) => (
            {
                ...item,
                isBookmarked: validateBookmark(item.nid)
            }
        ))
    }

    const validateBookmark = (nid: string): boolean => {
        return isNonEmptyArray(bookmarkIdInfo) ? bookmarkIdInfo.some(value => value.nid === nid) : false
    }

    const updatedChangeBookmark = (data: OpinionsListItemType[], index: number) => {
        const updatedData = [...data]
        const bookmarkStatus = !updatedData[index]?.isBookmarked ?? true
        updatedData[index].isBookmarked = bookmarkStatus
        updateBookmarkInfo(updatedData[index].nid, bookmarkStatus)
        return updatedData
    }

    const updateBookmarkInfo = (nid: string, isBookmarked: boolean) => {
        if (isLoggedIn) {
            isBookmarked ? sendBookmarkInfo({ nid }) : removeBookmarkedInfo({ nid })
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
        if (!isWriterOpinionLoading) {
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

    const renderItem = () => (
        <View style={style.container}>
            {isNonEmptyArray(writerDetailInfo) && <WriterBannerImage data={{
                authorImage: writerDetailInfo[0].field_opinion_writer_photo_export,
                authorName: writerDetailInfo[0].name,
                authorDescription: decodeHTMLTags(writerDetailInfo[0].field_description),
                facebook_url:writerDetailInfo[0].field_opinion_facebook_export,
                twitter_url:writerDetailInfo[0].field_opinion_twitter_export,
                instagram_url:writerDetailInfo[0].field_instagram_url_export,
            }}
                orientation={'PORTRAIT'}
                onPressReturn={onPressBack}
                isFollowed={isFollowed}
                onPressFollow={() => onPressFollow(writerDetailInfo[0].tid)}
            />}
            <OpinionWritersArticlesSection
                data={opinionsDataInfo}
                onScroll={gotoNextPage}
                isLoading={isWriterOpinionLoading}
                hideImageView={true}
                onUpdateOpinionArticlesBookmark={updatedOpinionArticlesBookmark}
            />
        </View>
    );

    return (
        <ScreenContainer edge={horizontalEdge} isLoading={isLoading}
            isSignUpAlertVisible={showupUp}
            onCloseSignUpAlert={onCloseSignUpAlert}>
            {!isLoading && <>
                <FlatList
                    style={style.flatList}
                    data={[{}]}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                />
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
});
