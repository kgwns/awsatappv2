import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { flatListUniqueKey, ScreensConstants } from 'src/constants/Constants';
import { ArticleFooterProps, GridViewItem } from '../molecules';
import { CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { dateTimeAgo, isNonEmptyArray, isNotEmpty, isTab, isTypeAlbum, normalize, screenWidth } from 'src/shared/utils';
import { Divider } from '../atoms';
import { MainSectionBlockType } from 'src/redux/latestNews/types';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ImagesName, Styles } from 'src/shared/styles';
import { getSvgImages } from 'src/shared/styles/svgImages';
import { fonts } from 'src/shared/styles/fonts';
import { TimeIcon } from 'src/shared/utils/utilities';

interface ArticleGridViewProps {
    data: MainSectionBlockType[];
    showHighlightTitle?: boolean;
}

export const ArticleGridView = ({
    data,
    showHighlightTitle = true,
}: ArticleGridViewProps) => {
    const navigation = useNavigation<StackNavigationProp<any>>()
    const style = useThemeAwareObject(customStyle)

    const onPress = (nid: string, isAlbum: boolean) => {
        if (isNotEmpty(nid)) {
            const screenName = isAlbum ? ScreensConstants.PHOTO_GALLERY_DETAIL_SCREEN : ScreensConstants.ARTICLE_DETAIL_SCREEN;
            navigation.navigate(screenName, { nid });
        }
    }

    const articleFooterDataSet: ArticleFooterProps = {
        leftTitleColor: isTab ? Styles.color.black900 : Styles.color.silverChalice,
        leftIcon: () => { 
            return getSvgImages({
            name: ImagesName.clock,
            size: normalize(12),
            style: { marginRight: normalize(7) }
            })
        },
        rightTitleColor: Styles.color.silverChalice,
        leftTitleStyle: isTab ? style.tabLeftTitleStyle : style.leftTitleStyle
    };

    const renderItem = (item: MainSectionBlockType, index: number) => {
        const highlightTitle = item.news_categories?.title || ''
        const isAlbum = isTypeAlbum(item.type);
        const timeFormat = dateTimeAgo(item.created)

        articleFooterDataSet.rightTitleColor = style.footerTitleColor.color
        articleFooterDataSet.leftTitle = timeFormat.time
        articleFooterDataSet.leftTitleColor = style.footerTitleColor.color
        articleFooterDataSet.leftIcon = () => TimeIcon(timeFormat.icon) 
        articleFooterDataSet.hideBookmark = isTab

        return (
            <TouchableOpacity activeOpacity={0.8} key={flatListUniqueKey.ARTICLE_GRID_VIEW + index}
                onPress={() => onPress(item.nid, isAlbum)} testID = "gridViewClick" style = { isTab &&style.gridContainer}>
                <GridViewItem
                    {...item}
                    imageUrl={item.image}
                    title={item.title}
                    highlightedTitle={highlightTitle}
                    showHighlightTitle={showHighlightTitle}
                    index={index}
                    displayType={item.displayType}
                    isAlbum={isTypeAlbum(item.type)}
                    footerData = { isTab && articleFooterDataSet}
                    showDivider={!isTab}
                    bodyStyle={isTab ? style.tabletBodyStyle : {}}
                    tabBodyLineCount={isTab ? 2 : 3}
                />
            </TouchableOpacity>
        );
    };

    if (!isNonEmptyArray(data)) {
        return null
    }

    const renderItemSeparatorComponent = () => {
        return (
            <View style={ isTab ? style.tabDividerContainer : style.dividerContainer} testID={'dividerId'}>
                <Divider style={style.divider} />
            </View>
        )
    }

    return (
        <View style = {style.container}>
            { !isTab && renderItemSeparatorComponent()}
                    <FlatList
                        keyExtractor={(_, index) => index.toString()}
                        listKey={
                            flatListUniqueKey.ARTICLE_GRID_VIEW +
                            new Date().getTime().toString()
                        }
                        showsVerticalScrollIndicator={false}
                        data={data}
                        style={ !isTab && style.contentContainer}
                        contentContainerStyle={ !isTab && style.contentContainer}
                        ItemSeparatorComponent={() => renderItemSeparatorComponent()}
                        renderItem={({ item, index }) => renderItem(item, index)}
                        numColumns={isTab ? 3 : 2}
                        columnWrapperStyle={ isTab && style.tabWrapperStyle}
                        testID={'flatListId'}
                    />
            
            <View style={style.spaceStyle}>
                {renderItemSeparatorComponent()}
            </View>
        </View>
    );
};

export default ArticleGridView;

const customStyle = (theme: CustomThemeType) => StyleSheet.create({
    divider: {
        height: 1,
        backgroundColor: theme.dividerColor,
    },
    container: {
        backgroundColor: theme.mainBackground,
    },
    dividerContainer: {
        paddingHorizontal: 0.04 * screenWidth,
    },
    contentContainer: {
        padding: 0,
        margin: 0
    },
    spaceStyle: {
        marginTop: 5
    },
    gridContainer: {
        flex: 0.30
    },
    tabWrapperStyle:{
        justifyContent:'space-between'
    },
    tabDividerContainer: { 
        marginBottom: 23
    },
    footerTitleColor: {
        color: theme.footerTextColor
    },
    tabletBodyStyle:{
        fontFamily: fonts.Effra_Arbc_Regular,
        fontSize: 16,
        lineHeight: 24,
        textAlign: 'left' ,
        fontWeight:'400',
        color: theme.summaryColor
    },
    tabLeftTitleStyle: {
        fontFamily: fonts.Effra_Arbc_Regular,
        fontWeight: '400',
        fontSize: 13,
        lineHeight: 16,
    },
    leftTitleStyle: {
        fontFamily: fonts.IBMPlexSansArabic_Regular,
        fontSize: 12,
        lineHeight: 20
    }
});
