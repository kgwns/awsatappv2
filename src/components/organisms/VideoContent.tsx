import { View, StyleSheet, FlatList, LayoutChangeEvent } from 'react-native';
import React, { useState } from 'react';
import { Label, LabelTypeProp, ImageWithIcon } from '../atoms';
import { isTab, normalize, screenWidth } from 'src/shared/utils';
import { Styles } from 'src/shared/styles';
import { SectionVideoFooter } from '../molecules';
import { useTheme } from 'src/shared/styles/ThemeProvider';
import { CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { useTranslation } from 'react-i18next';
import { VideoItemType } from 'src/redux/videoList/types';
import { dateTimeAgo, getImageUrl, convertSecondsToHMS, TimeIcon } from 'src/shared/utils/utilities';
import { decode } from 'html-entities';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { flatListUniqueKey } from 'src/constants';
import { fonts } from 'src/shared/styles/fonts';

export interface videoProps {
    storyImage: string,
    storyTitle: string,
    toWatch: string,
    views: number,
    newsDate: number,
    newsMonth: string
}

export const VideoContent = ({ 
    data, 
    onPress,
    isTabDesign = false
}: { 
    data: VideoItemType[], 
    onPress?: (item: VideoItemType) => void,
    isTabDesign?: boolean
}) => {
    const [t] = useTranslation();
    const theme = useTheme();
    const style = useThemeAwareObject(customStyle);
    const [isTitleLineCount, setIsTitleLineCount] = useState(1)
    const [isTwoLine, setIsTwoLine] = useState<boolean>(false)

    const onItemPress = (item: VideoItemType) => {
        if(onPress){
            onPress(item)
        }
    }

    const onTextLayout = (e: any) => {
        if (e.nativeEvent.lines.length > 1 && !isTwoLine) {
            setIsTwoLine(true)
            setIsTitleLineCount(e.nativeEvent.lines ? e.nativeEvent.lines.length : 1)
        }
    }

    const renderItem = (item: VideoItemType, index: number) => {
        const timeFormat = dateTimeAgo(item.created_export)
        
        const imageLink = item.field_thumbnil_multimedia_export ? getImageUrl(item.field_thumbnil_multimedia_export) : undefined;
        const date = timeFormat.time
        const time = item.field_jwplayerinfo_export ? convertSecondsToHMS(item.field_jwplayerinfo_export.split('|')[1]) : undefined;
        
        const itemStyle = isTab ? { paddingHorizontal: 0.02 * screenWidth, height: normalize(260) } :
            index === data.length - 1 && { marginRight: 0.04 * screenWidth }

        const moreStyle = isTwoLine ? { height: normalize(isTitleLineCount * 35) } : {}
        return (
            <TouchableOpacity onPress={()=>onItemPress(item)}>
                <View style={[style.videoCardContainer, itemStyle]}>
                    <ImageWithIcon bottomTag={time} fallback url={imageLink} onPress={()=>onItemPress(item)}  />
                    <Label
                        onTextLayout={onTextLayout}
                        style={[style.textStyle, moreStyle]}
                        labelType={LabelTypeProp.h3}>
                        {decode(item.title)}
                    </Label>
                    
                    <SectionVideoFooter
                        leftTitleColor={Styles.color.smokeyGrey}
                        rightIcon={() => TimeIcon(timeFormat.icon)}
                        rightDate={date}
                        rightDateColor={Styles.color.smokeyGrey}
                        rightTitleColor={Styles.color.smokeyGrey}
                        leftViewsColor={theme.themeData.primary}
                    />
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <View style={style.container}>
            <Label style={style.titleTextStyle} labelType={LabelTypeProp.title3} children={t('categoryPage.videoContent')} numberOfLines={2} />
            <FlatList
                horizontal={!isTabDesign}
                keyExtractor={(_, index) => index.toString()}
                listKey={flatListUniqueKey.VIDEO_CONTENT}
                style={style.listContainer}
                data={data}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => renderItem(item, index)}
            />
        </View>
    );
};;

export default VideoContent;

const customStyle = (theme: CustomThemeType) => {
    const videoContentStyle = StyleSheet.create({
        container: {
            height: 'auto',
            backgroundColor: theme.secondaryWhite,
            paddingBottom: isTab ? 0 : 20,
        },
        videoCardContainer: {
            backgroundColor: theme.secondaryWhite,
            paddingLeft: isTab ? normalize(0.02 * screenWidth) : normalize(0.04 * screenWidth),
        },
        listContainer: {
            height: 'auto',
            alignSelf: 'flex-start',
            paddingTop: normalize(15),
            marginVertical: normalize(7),
        },
        titleTextStyle: {
            paddingTop: normalize(10),
            marginLeft: isTab ? normalize(0.02 * screenWidth) : normalize(0.04 * screenWidth),
            color: theme.primary,
        },
        imageStyle: {
            width: normalize(263),
            height: normalize(155),
            padding: normalize(20),
            resizeMode: 'stretch'
        },
        textStyle: {
            width: normalize(263),
            paddingVertical: normalize(10),
            fontFamily: fonts.AwsatDigitalBetav10_Bold,
        },
        baseStyle: {
            alignSelf: 'flex-start',
            flex: 1,
            flexDirection: 'row'
        },
        verticalDivider: {
            color: Styles.color.silverChalice,
            paddingBottom: normalize(10),
            paddingHorizontal: normalize(10)
        },
        timeStyle: {
            right: 0,
            bottom: 0,
            position: 'absolute',
            backgroundColor: Styles.color.greyDark,
            paddingHorizontal: normalize(5),
            paddingVertical: normalize(3),
            marginVertical: 3,
            fontSize: normalize(10),
            color: Styles.color.white,
        },
    })
    return videoContentStyle
}