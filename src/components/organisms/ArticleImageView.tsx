import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { flatListUniqueKey, ScreensConstants } from 'src/constants';
import { CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { isNonEmptyArray, isNotEmpty, isTab, screenWidth } from 'src/shared/utils';
import { Divider, Label, Image, LabelTypeProp, LiveBlogTag } from '../atoms';
import { MainSectionBlockType } from '~/redux/latestNews/types';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ImageResize } from 'src/shared/styles/text-styles';
import { fonts } from 'src/shared/styles/fonts';
import { displayTypes } from 'src/constants/SharedConstants';

interface ArticleImageViewProps {
    data: MainSectionBlockType[];
    showHighlightTitle?: boolean;
    showImage?: boolean;
}

export const ArticleImageView = ({
    data,
    showHighlightTitle = true,
    showImage = true,
}: ArticleImageViewProps) => {
    const navigation = useNavigation<StackNavigationProp<any>>()
    const style = useThemeAwareObject(customStyle)

    const onPress = (nid: string) => {
        if (isNotEmpty(nid)) {
            navigation.navigate(ScreensConstants.ARTICLE_DETAIL_SCREEN, { nid: nid })
        }
    }
    const renderItem = (item: MainSectionBlockType, index: number) => {
        const highlightTitle = item.news_categories?.title || ''
        const isLive = isNotEmpty(item.displayType) && item.displayType == displayTypes.liveCoverage;
        return (
            <TouchableOpacity activeOpacity={0.8} key={flatListUniqueKey.ARTICLE_IMAGE_VIEW + index} onPress={() => onPress(item.nid)}>
                <View style={style.rowContainer}>
                    <View style={style.labelContainer}>
                        {showHighlightTitle && <Label style={style.highlightedTitle} children={highlightTitle} labelType={LabelTypeProp.h5} />}
                        {isLive && <LiveBlogTag enableBottomMargin/>}
                        <Label children={item.title} numberOfLines={3} style={[style.labelStyle, isLive && {marginTop:10}]} />
                    </View>
                    {showImage && <View style={style.imageContainer}>
                        <Image url={item.image} style={style.imageStyle} resizeMode={ImageResize.COVER} fallback />
                    </View>}
                </View>
            </TouchableOpacity>
        );
    };

    if (!isNonEmptyArray(data)) {
        return null
    }

    const renderItemSeparatorComponent = () => {
        return (
            <View>
                <Divider style={style.divider} />
            </View>
        )
    }

    return (
        <View style={style.container}>
            <FlatList
                keyExtractor={(_, index) => index.toString()}
                listKey={
                    flatListUniqueKey.ARTICLE_IMAGE_VIEW +
                    new Date().getTime().toString()
                }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={style.contentContainer}
                data={data}
                ItemSeparatorComponent={() => renderItemSeparatorComponent()}
                renderItem={({ item, index }) => renderItem(item, index)}
            />
            <View style={style.dividerContainer}>
                <Divider style={style.divider} />
            </View>
        </View>
    );
};

export default ArticleImageView;

const customStyle = (theme: CustomThemeType) => StyleSheet.create({
    divider: {
        height: 1,
        backgroundColor: theme.dividerColor,
    },
    dividerContainer: {
        paddingHorizontal: 0.04 * screenWidth,
    },
    container: {
        backgroundColor: theme.mainBackground,
    },
    rowContainer: {
        backgroundColor: theme.mainBackground,
        flexDirection: 'row',
        paddingTop: 25
    },
    imageContainer: {
        width: 144,
        height: 'auto',
        aspectRatio: 4/3,
    },
    imageStyle: {
        width: '100%',
        height: '100%',
    },
    labelContainer: {
        flex: 1,
        marginEnd: 5
    },
    labelStyle: {
        fontSize: isTab ? 20 : 16,
        lineHeight: isTab ? 32 : 25,
        color: theme.primaryBlack,
        textAlign: 'left',
        fontFamily: fonts.AwsatDigital_Bold,
    },
    contentContainer: {
        paddingHorizontal: 0.04 * screenWidth,
    },
    highlightedTitle: {
        fontSize: isTab ? 14 :12,
        lineHeight: isTab ? 20 :18,
        color: theme.primary,
        fontFamily: fonts.Effra_Arbc_Regular,
        marginBottom: 10
    }
});
