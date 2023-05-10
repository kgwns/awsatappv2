import React, {FunctionComponent} from 'react';
import {View, StyleSheet} from 'react-native';
import { Label, LabelTypeProp } from 'src/components/atoms/label/Label';
import { ButtonOutline } from 'src/components/atoms/button-outline/ButtonOutline';
import { Image } from 'src/components/atoms/image/Image';
import { HtmlRenderer } from 'src/components/atoms/htmlRenderer/HtmlRenderer';
import { normalize, screenWidth } from 'src/shared/utils';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {CustomThemeType,colors} from 'src/shared/styles/colors';
import PlayIcon from 'src/assets/images/icons/Play_black.svg';
import ViewIcon from 'src/assets/images/icons/view.svg';
import CalendarIcon from 'src/assets/images/icons/date.svg';
import { DateIcon, dateTimeAgo, getImageUrl } from 'src/shared/utils/utilities';
import { VideoItemProps } from 'src/components/molecules/video-item/VideoItem';
import { decode } from 'html-entities';
import { MixedStyleRecord } from 'react-native-render-html';
import { fonts } from 'src/shared/styles/fonts';
import ClockIconWhite from 'src/assets/images/icons/clockIcon_white.svg'
import { ImageResize } from 'src/shared/styles/text-styles';
import { TranslateConstants, TranslateKey } from '../../../constants/Constants';

export interface VideoInfoProps {
  onPress?: (item:VideoItemProps)=>void;
  isDocumentary?: boolean;
  data: any;
}

export const VideoInfo: FunctionComponent<VideoInfoProps> = ({
  data,
  onPress,
  isDocumentary= false,
}) => {
  const styles = useThemeAwareObject(createStyles);
  const VIDEO_DETAIL_EMPLOYMENT = TranslateConstants({key:TranslateKey.VIDEO_DETAIL_EMPLOYMENT})
  const VIDEO_DETAIL_WATCH = TranslateConstants({key:TranslateKey.VIDEO_DETAIL_WATCH})

  const timeFormat = dateTimeAgo(data.created_export)
  
  const imageLink = data.field_thumbnil_multimedia_export ? getImageUrl(data.field_thumbnil_multimedia_export) : undefined;
  const monthDate = timeFormat.time

  const onPressPlay =()=>{
    console.log('onPressPlay');
    if(onPress){
      onPress(data)
    }
  }
  const htmlTagStyle: MixedStyleRecord = {
    p: {
      direction: 'rtl',
      color: colors.spanishGray,
      fontSize: normalize(13),
      lineHeight: normalize(22),
      textAlign: 'center',
      paddingBottom: normalize(15),
      fontFamily: fonts.AwsatDigital_Regular,
    },
  };
  
  return (
    <View>
      <View style={styles.containerStyle}>
        <View>
          <View style={styles.centerContainer}>
            <View style={isDocumentary ?  styles.imageStyle : styles.imageVideoStyle}>
              <Image fallback={true} url={imageLink}
                style={styles.image}
                resizeMode={ImageResize.COVER}
                defaultImageStyle={styles.image}
              />
            </View>
            {isDocumentary && <View style={styles.titleContainer} >
                <Label style={styles.titleStyle} numberOfLines={2} testID={'titleId'}>{decode(data.title)}</Label>
            </View>}
            <View style={styles.containerSpace} />
            <ButtonOutline title={VIDEO_DETAIL_EMPLOYMENT}
             style={styles.buttonStyle}
             testID='VideoInfoBOL1'
             labelStyle={styles.buttonLabel}
             titleType={LabelTypeProp.h1}
             onPress={onPressPlay}
             rightIcon={() => <View style={styles.rightIconStyle}><PlayIcon fill={colors.black} height={14} width={12}/></View>}
             />
             <View style={styles.containerSpace} />
            {data.title && <Label style={styles.descriptionTextStyle} children={decode(data.title)} />}
            {data.body_export && 
            <View>
              <HtmlRenderer source={data.body_export} tagsStyles={htmlTagStyle} />
            </View>
            }
            <View style={styles.headerLeftStyle}>
              {data.views&&
              <ViewIcon fill={colors.white} testID='viewIconId'/>
              }
              {data.views&&
              <Label style={styles.footerRightTextStyle} numberOfLines={1} testID='viewLabelId'>
                {data.views}
              </Label>
              }
              {data.views&&<Label style={styles.textStyleWithoutMargin} numberOfLines={1}>
                {VIDEO_DETAIL_WATCH}
              </Label>}
              {data.views&&<Label color={colors.white} style={styles.textStyle}>|</Label>}
              {timeFormat.icon === DateIcon.CALENDAR ? <CalendarIcon fill={colors.white} testID={'calendarIconId'} /> : <ClockIconWhite testID={'clockIconId'} />}
              <Label style={[styles.footerRightTextStyle,{color: colors.white}]} numberOfLines={1}>
                {monthDate}
              </Label>
            </View>

          </View>
        </View>
      </View>
    </View>
  );
};

const createStyles = (_theme: CustomThemeType) =>
StyleSheet.create({
  containerStyle: {
    flex : 1,
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(15),
  },
  centerContainer: {
    alignItems: 'center',
  },
  imageStyle: {
    width: normalize(180),
    height: normalize(240),
    overflow: 'hidden',
  },
  imageVideoStyle: {
    width: normalize(349),
    height: normalize(187),
    overflow: 'hidden',
  },
  shortDescriptionStyle: {
    color: colors.spanishGray,
    fontSize: normalize(13),
    lineHeight: normalize(22),
    textAlign: 'center',
    paddingBottom: normalize(15),
  },
  descriptionTextStyle: {
    fontSize: 14,
    lineHeight: 25,
    color: colors.white,
    textAlign: 'center',
    paddingBottom: normalize(10),
    fontFamily: fonts.IBMPlexSansArabic_Regular,
  },
  labelStyle: {
    fontSize: normalize(11),
    color: colors.white,
    paddingRight: normalize(5),
    paddingBottom: normalize(10),
  },
  containerSpace: {
    paddingVertical: normalize(8)
  },
  buttonStyle: {
    backgroundColor:colors.white,
    borderWidth: 0,
    width: normalize(144),
    height: normalize(40)
  },
  rightIconStyle: {
    marginRight: normalize(15),
  },
  headerLeftStyle: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    paddingBottom: normalize(15),
  },
  textStyleWithoutMargin: {
    fontSize: normalize(12),
    lineHeight: normalize(16),
    color: colors.white,
    marginRight: normalize(5),
  },
  footerRightTextStyle: {
    fontSize: 12,
    lineHeight: 26,
    color: colors.greenishBlue,
    marginHorizontal: normalize(5),
    fontFamily: fonts.AwsatDigital_Regular,
  },
  buttonLabel: {
    color: colors.black,
    fontFamily: fonts.AwsatDigital_Regular,
    fontSize: 14,
    lineHeight: 26
  },
  titleContainer: {
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleStyle: {
    color: colors.darkRed,
    fontSize: 40,
    lineHeight: 55,
    fontFamily: fonts.AwsatDigital_Bold,
    width: 0.8 * screenWidth,
    textAlign: 'center',
  },
  image: {
    width: '100%', 
    height: '100%'
  },
  textStyle: {
    marginRight: normalize(10)
  }
});
