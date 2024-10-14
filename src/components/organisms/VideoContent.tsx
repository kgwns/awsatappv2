import { View, StyleSheet } from 'react-native';
/*
** Horizontal scroll is not working properly By Importing Flatlist using 'react-native' in Android.
** So, We have fixed this by Importing Flatlist from 'react-native-gesture-handler'
*/
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import React, { useState } from 'react';
import { Label, LabelTypeProp, ImageWithIcon, Divider, WidgetHeader, WidgetHeaderProps } from '../atoms';
import { isTab, normalize, screenWidth } from 'src/shared/utils';
import { ImagesName, Styles } from 'src/shared/styles';
import { useTheme } from 'src/shared/styles/ThemeProvider';
import { CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { VideoItemType } from 'src/redux/videoList/types';
import { getImageUrl, convertSecondsToHMS, getShareUrl, isNotEmpty } from 'src/shared/utils/utilities';
import { decode } from 'html-entities';
import { flatListUniqueKey, TranslateConstants, TranslateKey } from 'src/constants/Constants';
import { fonts } from 'src/shared/styles/fonts';
import { getVideoDetail } from 'src/services/videoDetailService';
import Share from 'react-native-share'
import { getSvgImages } from 'src/shared/styles/svgImages';
import { videoEvents } from 'src/shared/utils/analyticsEvents';
import { AnalyticsEvents } from 'src/shared/utils/analytics';

export interface VideoProps {
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
    onPressMore,
    isTabDesign = false,
    isVideoList = false,
    showMore = false
}: { 
    data: VideoItemType[], 
    onPress?: (item: VideoItemType) => void,
    onPressMore?: () => void,
    isTabDesign?: boolean,
    isVideoList?: boolean,
    showMore?: boolean
}) => {
    const CATEGORY_PAGE_VIDEO_CONTENT = TranslateConstants({key:TranslateKey.CATEGORY_PAGE_VIDEO_CONTENT})
    const SECTION_VIDEO_SHARE = TranslateConstants({key:TranslateKey.VIDEO_SHARE})
    const TAB_VIDEO_CONTENT_TITLE = TranslateConstants({key: TranslateKey.TABLET_VIDEO_CONTENT_TITLE})
    const { themeData } = useTheme();
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

    const onPressShare = async (item: VideoItemType) => {
        const requestBody = { nid: item.nid };
        const videoDetailData = await getVideoDetail(requestBody)
        const { title, field_shorturl_export, link_node, body_export } = videoDetailData[0];
        const decodeBody = isNotEmpty(body_export) ? body_export?.split(' ').length : 0;
        const eventName = AnalyticsEvents.SOCIAL_SHARE;
        videoEvents(title, decodeBody, eventName);
        await Share.open({
            title,
            url: getShareUrl(field_shorturl_export!, link_node!),
            failOnCancel: true,
            subject: title
        }).then(response => {
            console.log('Shared successfully :::', response)
        }).catch((error) => {
            console.log('Cancelled share request :::', error)
        })
    }

    const ShareIcon = ({item}: any) => {
        return (
            <TouchableOpacity testID={'shareId'} onPress={() => onPressShare(item)} style={style.shareContainer}>
                <Label style={style.shareTextStyle}
                    children={SECTION_VIDEO_SHARE}
                    numberOfLines={2}
                    color={themeData.primary}
                />
                {getSvgImages({
                    name: ImagesName.shareIcon,
                    width: 16,
                    height: 16,
                })}
            </TouchableOpacity>
        )
    }

    const renderItem = (item: VideoItemType, index: number) => {
        // const timeFormat = dateTimeAgo(item.created_export) Enable timeFormat when required video footer
        
        const imageLink = item.field_thumbnil_multimedia_export ? getImageUrl(item.field_thumbnil_multimedia_export) : undefined;
        // const date = timeFormat.time   Enable date when required video footer
        const time = item.field_jwplayerinfo_export ? convertSecondsToHMS(item.field_jwplayerinfo_export.split('|')[1]) : undefined;
        
        const itemStyle = isTab ? isVideoList ? {} : {  marginBottom: normalize(30),paddingLeft: 20 } : {paddingLeft: 20}
        index === data.length - 1 && { marginRight: 0.04 * screenWidth }
        const moreStyle = isTwoLine ? { height: normalize(isTitleLineCount * 35) } : {}
        return (
            <TouchableOpacity onPress={()=>onItemPress(item)} testID = "videoContentPressId">
                    {isVideoList ? 
                    <View style={[style.tabVideoCardContainer, itemStyle]}>
                    <View style = {style.tabVideoContainer}>
                    <View style = {style.tabVideoLabelContainer}>
                        <Label
                            numberOfLines={3}
                            onTextLayout={onTextLayout}
                            style={[style.tabTextStyle]}
                            labelType={LabelTypeProp.h3}>
                            {decode(item.title)}
                        </Label>
                    </View>
                        <ImageWithIcon bottomTag={time} fallback url={imageLink} onPress={()=>onItemPress(item)} isVideoList = {isVideoList}  />
                        <Divider style={style.divider} />
                    </View> 
                    </View>
                    :
                    <View style={[style.videoCardContainer, itemStyle]}>
                    <ImageWithIcon bottomTag={time} fallback url={imageLink} onPress={()=>onItemPress(item)} />
                    <Label
                        numberOfLines={isTab ? 3 : 2}
                        onTextLayout={onTextLayout}
                        style={[style.textStyle,moreStyle]}
                        labelType={LabelTypeProp.h3}>
                        {decode(item.title)}
                    </Label>
                    <ShareIcon item = {item} />
                   
                   {/*
                   Enable Video Footer when required 
                   <SectionVideoFooter
                        leftTitleColor={style.footerTitleColor.color}
                        rightIcon={() => TimeIcon(timeFormat.icon)}
                        rightDate={date}
                        rightDateColor={style.footerTitleColor.color}
                        rightTitleColor={style.footerTitleColor.color}
                        leftViewsColor={theme.themeData.primary}
                    /> */}
                    </View>
                    }

            </TouchableOpacity>
        )
    }
    
    const SECTION_COMBO_ONE_HEADER_RIGHT = TranslateConstants({ key: TranslateKey.SECTION_COMBO_ONE_HEADER_RIGHT })
    const widgetHeaderData: WidgetHeaderProps = {
        headerLeft: {
            title: isTab ? TAB_VIDEO_CONTENT_TITLE : CATEGORY_PAGE_VIDEO_CONTENT,
            color: isTab ? themeData.primaryBlack : themeData.primary,
            labelType: LabelTypeProp.title3,
            textStyle: style.titleTextStyle
        },
        headerRight: {
            title: SECTION_COMBO_ONE_HEADER_RIGHT,
            icon: () => {
                return getSvgImages({
                name: ImagesName.arrowLeftFaced,
                size: normalize(12),
                style: { marginLeft: normalize(10) }
                })
            },
            labelType: LabelTypeProp.caption2,
            clickable: true,
        },
    };

    return (
        <View style={ isVideoList ? style.tabContainer : style.container}>

            { !showMore &&
                ( isVideoList ? <Divider style={style.divider} /> :
                    <Label style={style.titleTextStyle} 
                        labelType={isTab ? LabelTypeProp.title3 : LabelTypeProp.title1} 
                        children={ isTab ? TAB_VIDEO_CONTENT_TITLE : CATEGORY_PAGE_VIDEO_CONTENT }
                        numberOfLines={2} 
                        testID={'videoContentTitleId'}
                    />
                )
            }

            {
                showMore && <View style={style.headerContainer}>
                    <WidgetHeader {...widgetHeaderData} onPress={onPressMore} />
                </View>
            } 
            <FlatList
                horizontal={!isTabDesign}
                keyExtractor={(_, index) => index.toString()}
                style={ !isVideoList && style.listContainer}
                data={data}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => renderItem(item, index)}
            />
        </View>
    );
};

export default VideoContent;

const customStyle = (theme: CustomThemeType) => {
    return StyleSheet.create({
        container: {
            height: 'auto',
            backgroundColor: isTab ? theme.sectionStoryVideo : theme.secondaryWhite,
            paddingBottom: isTab ? 0 : 20,
            marginLeft: isTab ? -20 : 0
        },
        videoCardContainer: {
            backgroundColor: isTab ? theme.sectionStoryVideo : theme.secondaryWhite,
            paddingLeft: 0,
        },
        listContainer: {
            height: 'auto',
            alignSelf: 'flex-start',
            paddingTop: normalize(15),
            marginVertical: normalize(7),
        },
        titleTextStyle: {
            paddingTop: normalize(25),
            marginLeft: isTab ? 22 : normalize(0.04 * screenWidth),
            color: theme.primaryBlack,
            fontFamily: fonts.AwsatDigital_Black,
            fontWeight:'900',
            fontSize: 25,
            lineHeight: 36
        },
        imageStyle: {
            width: normalize(263),
            height: normalize(155),
            padding: normalize(20),
            resizeMode: 'stretch'
        },
        textStyle: {
            width: normalize(263),
            paddingTop: normalize(10),
            fontFamily: fonts.AwsatDigital_Bold,
            fontSize: 16,
            lineHeight: 26
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
        footerTitleColor: {
            color: theme.footerTextColor
        },
        tabContainer: {
            height: 'auto',
            paddingBottom: isTab ? 0 : 20,
        },
        tabVideoCardContainer: {
            flex: 1,
        },
        tabTextStyle: {
            paddingVertical: normalize(10),
            fontFamily: fonts.AwsatDigital_Bold,
            fontWeight: '700',
            fontSize: 18,
            lineHeight: 29,
        },
        tabVideoLabelContainer: {
            flex:1
        },
        tabVideoContainer: {
            flexDirection:'row',
            width:'100%',
            justifyContent:'space-between',
            flexWrap:'wrap',
        },
        divider: {
            height: 1,
            backgroundColor: theme.dividerColor,
            marginTop: 20,
            marginBottom:20
        },
        shareTextStyle: {
            fontFamily: fonts.AwsatDigital_Regular,
            fontSize: 16,
            lineHeight: 24,
            fontWeight: '400',
            marginLeft:10,
            marginTop: 5
        },
        shareContainer: {
            flex:1,
            alignItems:'center',
            flexDirection:'row-reverse',
            justifyContent:'flex-end'
        },
        headerContainer: {
          paddingHorizontal: isTab ? 0 : 0.04 * screenWidth,
          backgroundColor: theme.secondaryWhite,
          paddingTop: normalize(30),
          paddingBottom: normalize(10),
        }
    })
}
