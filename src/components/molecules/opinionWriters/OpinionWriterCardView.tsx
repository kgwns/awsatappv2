import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {ButtonImage, Label, Image, Divider} from 'src/components/atoms';
import {normalize, screenWidth} from 'src/shared/utils';
import PlayIcon from 'src/assets/images/icons/play_icon.svg';
import {ImagesName, Styles} from 'src/shared/styles';
import {getSvgImages} from 'src/shared/styles/svgImages';
import {useTheme} from 'src/shared/styles/ThemeProvider';
import { TouchableOpacity } from 'react-native';
import { ScreensConstants } from 'src/constants';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AuthorDefault from 'src/assets/images/icons/authorDefault.svg';


export interface OpinionWritersCardViewProps {
  imageUrl:string
  writerTitle:string
  headLine:string
  subHeadLine:string
  audioLabel:string
  duration:string
  nid:string
  isBookmarked:boolean
  mediaVisibility:boolean
  onPressBookmark:()=>void
}

const OpinionWritersCardView = ({
  imageUrl,
  writerTitle,
  headLine,
  subHeadLine,
  audioLabel,
  duration,
  nid,
  isBookmarked,
  mediaVisibility,
  onPressBookmark,
}: OpinionWritersCardViewProps) => {
  const style = useThemeAwareObject(customStyle);
  const theme = useTheme();
  const navigation = useNavigation<StackNavigationProp<any>>()

  const onPress = () => {
    if (nid) {
        navigation.navigate(ScreensConstants.OPINION_ARTICLE_DETAIL_SCREEN,{nid:nid})
    }
}

  return (
    <TouchableOpacity style={style.container} onPress={()=>onPress()}>
      <View style={style.topImageWithLabelContainer}>
        <Image
          size={normalize(43)}
          url={imageUrl}
          type="round"
          resizeMode="cover"
          fallback={true}
          fallbackContent={<AuthorDefault
          style={{backgroundColor:Styles.color.cyanGreen}}
          width={normalize(43)} 
          height={normalize(43)}/>}
        />
        <Label style={style.writerLabel}>{writerTitle}</Label>
      </View>
      <View style={style.headLineContainer}>
        <Label style={style.headLine} numberOfLines={2}>
          {headLine}
        </Label>
        <Label style={style.subHeadLine} numberOfLines={3}>
          {subHeadLine}
        </Label>
      </View>
      <View style={style.footerContainer}>
        <View style={style.listenArticleContainer}>
          {mediaVisibility && <>
            <ButtonImage
              icon={() => <PlayIcon />}
              style={style.playIcon}
              onPress={() => onPress()}
              testId={'playIconTestId'}
            />
            <Label style={style.footerLabel}>{audioLabel}</Label>
            <Label style={style.duration}>{duration}</Label>
          </>}
        </View>
        <View>
          <ButtonImage
            testId={'bookmarkTestId'}
            icon={() => {
              return isBookmarked
                ? getSvgImages({
                    name: ImagesName.bookMarkActiveSVG,
                    size: normalize(15),
                  })
                : getSvgImages({
                    name: ImagesName.bookMarkSVG,
                    size: normalize(15),
                  });
            }}
            onPress={onPressBookmark}
          />
        </View>
      </View>
      <Divider style={style.divider}/>
    </TouchableOpacity>
  );
};

const customStyle = (theme: CustomThemeType) => {
  const OpinionWritersCardViewStyle = StyleSheet.create({
    container: {
      width: '100%',
      padding: 0.04 * screenWidth,
      backgroundColor: theme.backgroundColor,
    },
    topImageWithLabelContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    writerLabel: {
      fontSize: normalize(14),
      color: theme.primary,
      marginStart: normalize(8),
      lineHeight:normalize(14),
    },
    headLineContainer: {
      marginTop: normalize(10),
    },
    headLine: {
      fontSize: normalize(15),
      fontWeight: 'bold',
      textAlign: 'left',
      lineHeight: normalize(24),
      color: theme.primaryBlack,
    },
    subHeadLine: {
      fontSize: normalize(15),
      textAlign: 'left',
      marginTop: normalize(8),
      lineHeight: normalize(26),
      color: theme.secondaryDavyGrey,
    },
    footerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: normalize(15),
    },
    listenArticleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    playIcon: {
      width: normalize(13),
      height: normalize(13),
    },
    footerLabel: {
      fontSize: normalize(12),
      lineHeight: normalize(36),
      color: theme.primary,
      marginLeft: normalize(10),
      fontWeight: 'bold'
    },
    duration: {
      fontSize: normalize(12),
      lineHeight: normalize(14),
      color: theme.secondaryDavyGrey,
      marginLeft: normalize(10),
    },
    divider: {
      height: 1,
      backgroundColor: theme.dividerColor
    }
  });
  return OpinionWritersCardViewStyle;
};

export default OpinionWritersCardView;
