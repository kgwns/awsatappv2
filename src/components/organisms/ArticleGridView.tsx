import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { flatListUniqueKey, ScreensConstants } from 'src/constants/Constants';
import { GridViewItem } from '../molecules';
import { CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { isNonEmptyArray, isNotEmpty, isTypeAlbum, screenWidth } from 'src/shared/utils';
import { Divider } from '../atoms';
import { MainSectionBlockType } from 'src/redux/latestNews/types';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useOrientation } from 'src/hooks';

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
    const { isPortrait } = useOrientation();
    const onPress = (nid: string, isAlbum: boolean) => {
        if (isNotEmpty(nid)) {
            const screenName = isAlbum ? ScreensConstants.PHOTO_GALLERY_DETAIL_SCREEN : ScreensConstants.ARTICLE_DETAIL_SCREEN;
            navigation.navigate(screenName, { nid: nid });
        }
    }

    const renderItem = (item: MainSectionBlockType, index: number) => {
        const highlightTitle = item.news_categories?.title || ''
        const isAlbum = isTypeAlbum(item.type);

        return (
            <View style = { isPortrait ? style.gridContainer : style.gridContainerTab}>
            <TouchableOpacity activeOpacity={0.8} key={flatListUniqueKey.ARTICLE_GRID_VIEW + index}
                onPress={() => onPress(item.nid, isAlbum)} testID = "gridViewClick">
                <GridViewItem
                    imageUrl={item.image}
                    title={item.title}
                    highlightedTitle={highlightTitle}
                    showHighlightTitle={showHighlightTitle}
                    index={index}
                    displayType={item.displayType}
                    isAlbum={isTypeAlbum(item.type)}
                />
            </TouchableOpacity>
            </View>
        );
    };

    if (!isNonEmptyArray(data)) {
        return null
    }

    const renderItemSeparatorComponent = () => {
        return (
            <View style={style.dividerContainer}>
                <Divider style={style.divider} />
            </View>
        )
    }

    return (
        <View style={style.container}>
            {renderItemSeparatorComponent()}
            <FlatList
                keyExtractor={(_, index) => index.toString()}
                listKey={
                    flatListUniqueKey.ARTICLE_GRID_VIEW +
                    new Date().getTime().toString()
                }
                showsVerticalScrollIndicator={false}
                data={data}
                style={style.contentContainer}
                contentContainerStyle={style.contentContainer}
                ItemSeparatorComponent={() => renderItemSeparatorComponent()}
                renderItem={({ item, index }) => renderItem(item, index)}
                numColumns={2}
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
        width: 0.5*screenWidth
    },
    gridContainerTab: {
        width:'50%',
    }
});
