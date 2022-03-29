import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, BackHandler } from 'react-native';
import { CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { horizontalEdge, isNonEmptyArray, normalize } from 'src/shared/utils';
import { ScreenContainer } from '..';
import { useBookmark, useLogin } from 'src/hooks';
import { Edge } from 'react-native-safe-area-context';
import Orientation, { OrientationType } from 'react-native-orientation-locker';
import TrackPlayer from 'react-native-track-player';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useWriterDetail } from 'src/hooks';
import { WriterDetailDataType } from 'src/redux/writersDetail/types';
import { WriterBannerImage } from 'src/components/molecules';
import { useOpinions } from 'src/hooks/useOpinions';
import { OpinionWritersArticlesSection } from 'src/components/organisms';
import { OpinionsListItemType } from 'src/redux/opinions/types';

export interface WritersDetailScreenProps {
    route: any;
}

export const WritersDetailScreen = ({
    route,
}: WritersDetailScreenProps) => {
    const navigation = useNavigation<StackNavigationProp<any>>()
    const style = useThemeAwareObject(customStyle);

    const { isLoading, writerDetailData, getWriterDetailData, emptyWriterDetailData } = useWriterDetail();
    const {
        writerOpinionsData, isWriterOpinionLoading,
        fetchWriterOpinionsRequest, emptyWriterOpinionData
    } = useOpinions()
    const { bookmarkIdInfo, sendBookmarkInfo, removeBookmarkedInfo } = useBookmark()
    const { isLoggedIn } = useLogin()


    const [edge, setEdge] = useState<Edge[]>(horizontalEdge);
    const [writerDetailInfo, setWriterDetailInfo] = useState<WriterDetailDataType[]>([])
    const [showupUp, setShowPopUp] = useState(false)
    const [getOrientation, setOrientation] = useState('')
    const [page, setPage] = useState(0);
    const [opinionsDataInfo, setOpinionsDataInfo] = useState(writerOpinionsData)


    useEffect(() => {
        getWriterDetailData({ tid: route.params.tid })

        return () => {
            emptyWriterDetailData()
            emptyWriterOpinionData()
        }
    }, [])

    useEffect(() => {
        Orientation.unlockAllOrientations();
        Orientation.getDeviceOrientation(updateScreenEdge);
        Orientation.addDeviceOrientationListener(updateScreenEdge);
        return () => {
            Orientation.lockToPortrait();
            Orientation.removeOrientationListener(updateScreenEdge);
        };
    }, []);

    useEffect(() => {
        updateOpinionsData()
    }, [writerOpinionsData, bookmarkIdInfo])

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


    const updateScreenEdge = (deviceOrientation: OrientationType) => {
        const edge = getScreenEdge(deviceOrientation);
        setEdge(edge);
    };

    const getScreenEdge = (deviceOrientation: OrientationType): Edge[] => {
        switch (deviceOrientation) {
            case 'LANDSCAPE-LEFT':
                setOrientation('LANDSCAPE')
                return ['right'];
            case 'LANDSCAPE-RIGHT':
                setOrientation('LANDSCAPE')
                return ['left'];
            default:
                setOrientation('PORTRAIT')
                return horizontalEdge;
        }
    };

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

    const renderItem = () => (
        <View style={style.container}>
            {isNonEmptyArray(writerDetailInfo) && <WriterBannerImage data={{
                authorImage: writerDetailInfo[0].field_opinion_writer_photo_export,
            }}
                orientation={getOrientation}
                onPressReturn={onPressBack}
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
        <ScreenContainer edge={edge} isLoading={isLoading}
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
