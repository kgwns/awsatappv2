import React, {FunctionComponent} from 'react';
import {View, StyleSheet} from 'react-native';
import { Label, Image, ButtonOutline, LabelTypeProp, HtmlRenderer} from 'src/components/atoms/';
import { normalize, screenWidth } from 'src/shared/utils';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {CustomThemeType,colors} from 'src/shared/styles/colors';
import PlayIcon from 'src/assets/images/icons/Play_black.svg';
import {useTranslation} from 'react-i18next';
import ViewIcon from 'src/assets/images/icons/view.svg';
import CalendarIcon from 'src/assets/images/icons/date.svg';
import { DateIcon, dateTimeAgo, getImageUrl } from 'src/shared/utils/utilities';
import { VideoItemProps } from 'src/components/molecules/video-item/VideoItem';
import { decode } from 'html-entities';
import { MixedStyleRecord } from 'react-native-render-html';
import { fonts } from 'src/shared/styles/fonts';
import ClockIconWhite from 'src/assets/images/icons/clockIcon_white.svg'

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
  const [t] = useTranslation();

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
            {!isDocumentary && <Image fallback url={imageLink} style={styles.imageVideoStyle} resizeMode='cover' /> }
            {isDocumentary && <View style={styles.imageStyle} >
              <Image fallback url={imageLink} style={styles.imageStyle} resizeMode='cover' />
              <View style={styles.titleContainer} >
                <Label style={styles.titleStyle} numberOfLines={2} >{decode(data.title)}</Label>
              </View>
            </View>}
            <View style={styles.containerSpace} />
            <ButtonOutline title={t('videoDetail.employement')}
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
              <ViewIcon fill={colors.white} />
              }
              {data.views&&
              <Label style={styles.footerRightTextStyle} numberOfLines={1}>
                {data.views}
              </Label>
              }
              {data.views&&<Label style={styles.textStyleWithoutMargin} numberOfLines={1}>
                {t('videoDetail.watch')}
              </Label>}
              {data.views&&<Label color={colors.white} style={{marginRight: normalize(10)}}>|</Label>}
              {timeFormat.icon == DateIcon.CALENDAR ? <CalendarIcon fill={colors.white} /> : <ClockIconWhite />}
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
  },
  imageVideoStyle: {
    width: normalize(349),
    height: normalize(187),
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
});
