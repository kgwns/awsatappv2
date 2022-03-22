import { View, StyleSheet, FlatList } from 'react-native';
import React from 'react';
import { Label, LabelTypeProp, ImageWithIcon } from '../atoms';
import { normalize } from 'src/shared/utils';
import { Styles } from 'src/shared/styles';
import { SectionVideoFooter, VideoItemProps } from '../molecules';
import CalendarIcon from 'src/assets/images/icons/calendarIcon.svg'
import EyeIcon from 'src/assets/images/icons/eyeIcon.svg'
import { useTheme } from 'src/shared/styles/ThemeProvider';
import { CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { useTranslation } from 'react-i18next';
import { VideoItemType } from 'src/redux/videoList/types';
import { getImageUrl, timeAgo } from 'src/shared/utils/utilities';
import { decode } from 'html-entities';
import { TouchableOpacity } from 'react-native-gesture-handler';

export interface videoProps {
    storyImage: string,
    storyTitle: string,
    toWatch: string,
    views: number,
    newsDate: number,
    newsMonth: string
}

export const VideoContent = ({ data, onPress }: { data: VideoItemType[], onPress?: (item: VideoItemType) => void }) => {
    const [t] = useTranslation();
    const theme = useTheme();
    const style = useThemeAwareObject(customStyle);
    const onItemPress = (item: VideoItemType) => {
        if(onPress){
            onPress(item)
        }
    }
    const renderItem = (item: VideoItemType) => {
        const imageLink = item.field_thumbnil_multimedia_export ? getImageUrl(item.field_thumbnil_multimedia_export) : undefined;
        const date = t(timeAgo(item.created_export))
        return (
            <TouchableOpacity onPress={()=>onItemPress(item)}>
                <View style={style.container}>
                    <ImageWithIcon fallback url={imageLink}  />
                    <Label style={style.textStyle} labelType={LabelTypeProp.h3} numberOfLines={2} >
                        {decode(item.title)}
                    </Label>
                    <SectionVideoFooter
                        leftTitleColor={Styles.color.smokeyGrey}
                        rightIcon={() => <CalendarIcon color={Styles.color.smokeyGrey} />}
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
            <Label style={style.titleTextStyle} labelType={LabelTypeProp.h3} children={t('categoryPage.videoContent')} numberOfLines={2} />
            <FlatList
                horizontal
                keyExtractor={(_, index) => index.toString()}
                style={style.listContainer}
                data={data}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => renderItem(item)}
            />
        </View>
    );
};;

export default VideoContent;

const customStyle = (theme: CustomThemeType) => {
    const videoContentStyle = StyleSheet.create({
        container: {
            height: normalize(310),
            paddingHorizontal: normalize(10),
            backgroundColor: theme.secondaryWhite
        },
        listContainer: {
            height: normalize(236),
            alignSelf: 'flex-start',
            paddingTop: normalize(15),
            marginVertical: normalize(7),
        },
        titleTextStyle: {
            paddingTop: normalize(10),
            paddingLeft: normalize(20),
            color: theme.primary,
            fontSize: normalize(18)
        },
        imageStyle: {
            width: normalize(263),
            height: normalize(155),
            padding: normalize(20),
            resizeMode: 'stretch'
        },
        textStyle: {
            width: normalize(263),
            paddingVertical: normalize(10)
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
        }
    })
    return videoContentStyle
}