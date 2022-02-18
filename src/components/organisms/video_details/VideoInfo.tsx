import React, {FunctionComponent} from 'react';
import {View, StyleSheet} from 'react-native';
import { Label, Image, ButtonOutline, LabelTypeProp} from 'src/components/atoms/';
import { VideoItemProps } from 'src/components/molecules/';
import { normalize } from 'src/shared/utils';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {CustomThemeType} from 'src/shared/styles/colors';
import { colors } from 'src/shared/styles/colors';
import PlayIcon from 'src/assets/images/icons/Play_black.svg';
import {useTranslation} from 'react-i18next';
import ViewIcon from 'src/assets/images/icons/view.svg';
import DateIcon from 'src/assets/images/icons/date.svg';

export interface VideoInfoProps {
  data: VideoItemProps;
}

export const VideoInfo: FunctionComponent<VideoInfoProps> = ({
  data,
}) => {
  const styles = useThemeAwareObject(createStyles);
  const [t] = useTranslation();

  return (
    <View>
      <View style={styles.containerStyle}>
        <View>
          <View style={styles.centerContainer}>
            <Image url={data.imageUrl} style={styles.imageStyle} />
            <View style={styles.containerSpace} />
            <ButtonOutline title={data.videoLabel}
             style={styles.buttonStyle}
             labelStyle={styles.buttonLabel}
             titleType={LabelTypeProp.h1}
             onPress={()=>{console.log('button pressed')}}
             rightIcon={() => <View style={styles.rightIconStyle}><PlayIcon fill={colors.black}/></View>}
             />
             <View style={styles.containerSpace} />
            <Label style={styles.descriptionTextStyle} children={data.des} numberOfLines={4} />
            <Label style={styles.shortDescriptionStyle} children={data.shortDescription} numberOfLines={2} />
            <View style={styles.headerLeftStyle}>
              <ViewIcon fill={colors.white} />
              <Label style={styles.footerRightTextStyle} numberOfLines={1}>
                {data.views}
              </Label>
              <Label style={styles.textStyleWithoutMargin} numberOfLines={1}>
                {t('videoDetail.watch')}
              </Label>
              <Label color={colors.white} style={{marginRight: normalize(10)}}>|</Label>
              <DateIcon fill={colors.white} />
              <Label style={[styles.footerRightTextStyle,{color: colors.white}]} numberOfLines={1}>
                {data.date}
              </Label>
              <Label style={styles.textStyleWithoutMargin} numberOfLines={1}>
                {data.month}
              </Label>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const createStyles = (theme: CustomThemeType) =>
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
    resizeMode: 'cover',
  },
  shortDescriptionStyle: {
    color: colors.spanishGray,
    fontSize: normalize(13),
    lineHeight: normalize(22),
    textAlign: 'center',
    paddingBottom: normalize(15),
  },
  descriptionTextStyle: {
    fontSize: normalize(13),
    lineHeight: normalize(22),
    color: colors.white,
    textAlign: 'center',
    paddingBottom: normalize(15),
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
    width: '60%',
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
    fontSize: normalize(12),
    lineHeight: normalize(16),
    color: colors.greenishBlue,
    marginHorizontal: normalize(5),
  },
  buttonLabel: {
    color: colors.black,
  },
});
