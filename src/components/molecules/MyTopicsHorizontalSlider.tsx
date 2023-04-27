import {
    ScrollView,
    ScrollViewProps,
    StyleProp,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useRef } from 'react';
import { isIOS, isTab, normalize, normalizeBy320, screenWidth } from 'src/shared/utils';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { colors, CustomThemeType } from 'src/shared/styles/colors';
import { Label } from 'src/components/atoms';
import { fonts } from 'src/shared/styles/fonts';
import { Styles } from 'src/shared/styles';
import { AllSiteCategoriesItemType } from 'src/redux/allSiteCategories/types';
import { TranslateConstants, TranslateKey } from '../../constants/Constants';

export interface MyTopicsHorizontalSliderProps {
    topicsList: AllSiteCategoriesItemType[];
    onPress?: (item: any, index: number) => void;
    style?: StyleProp<ScrollViewProps>;
    showAll?: boolean;
    selectedIndex?: number;
}

export const MyTopicsHorizontalSlider = ({
    topicsList,
    onPress,
    style,
    showAll = true,
    selectedIndex,
}: MyTopicsHorizontalSliderProps) => {
    const CONST_FAVORITE_FILTERS_EVERYONE = TranslateConstants({key:TranslateKey.FAVORITE_FILTERS_EVERYONE})
    const styles = useThemeAwareObject(customStyle);
    const scrollRef = useRef<ScrollView>(null);
    const scrollToEnd = () => {
        if (isIOS) {
            return;
        }
        scrollRef.current?.scrollToEnd();
    };
    const onItemPress = (item: any, index: number) => {
        onPress && onPress(item, index);
    };
    const onAllPress = () => {
        onPress && onPress(null, -1);
    };
    
    const renderShowAll = () => (
        <View style={styles.showAllContainer}>
            <TouchableOpacity onPress={onAllPress}
                style={[
                    styles.filterItem,
                    selectedIndex === -1 && styles.filterActive,
                ]}>
                <Label
                    children={CONST_FAVORITE_FILTERS_EVERYONE}
                    style={styles.label}
                    color={
                        selectedIndex === -1
                            ? colors.white
                            : Styles.color.grayishGreen
                    }
                />
            </TouchableOpacity>
        </View>
    );

    const renderTopicsList = () => {
        return topicsList.map((item: AllSiteCategoriesItemType, index: number) => {
            const name = item.name
            return (
                <View style={styles.itemStyle}>
                    <TouchableOpacity testID={`MyNewsTopics_${index}`} key={index} activeOpacity={0.8} onPress={() => onItemPress(item, index)}
                        style={[styles.filterItem, selectedIndex === index && styles.filterActive]}>
                        <Label children={name} style={styles.label}
                            color={selectedIndex === index ? Styles.color.white : Styles.color.grayishGreen}
                        />
                    </TouchableOpacity>
                </View>
            );
        })
    };

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.contentStyle}
                ref={scrollRef}
                horizontal={true}
                bounces={false}
                style={style}
                showsHorizontalScrollIndicator={false}
                keyboardShouldPersistTaps={'always'}
                onContentSizeChange={() => scrollToEnd()}>
                {showAll && renderShowAll()}
                {renderTopicsList()}
            </ScrollView>
        </View>
    );
};

const customStyle = (theme: CustomThemeType) =>
    StyleSheet.create({
        container: {
            width: '100%',
            marginTop: normalize(10),
            paddingVertical: isTab ? 20 : 10,
        },
        contentStyle: {
            flexGrow: 1,
            paddingLeft: isTab ? 0.03 * screenWidth : 0
        },
        filterItem: {
            marginRight: normalizeBy320(5),
            borderWidth: 1,
            borderColor: Styles.color.cyanGray,
            paddingLeft: normalize(15),
            paddingRight: normalize(15),
            paddingTop: normalize(7),
            paddingBottom: isIOS ? normalize(4) : normalize(7),
            borderRadius: normalize(20)
        },
        filterActive: {
            backgroundColor: theme.filterBackgroundColor,
            borderColor: theme.filterBorderColor,
        },
        label: {
            fontSize: 12,
            lineHeight: 16,
            fontFamily: fonts.AwsatDigital_Regular,
        },
        showAllContainer: {
            paddingRight: normalize(5),
            paddingLeft: normalize(10)
        },
        itemStyle: {
            paddingRight: normalize(5)
        }
    });
