import {
  View,
  Text,
  StyleSheet,
  ImageStyle,
} from 'react-native';
import React, {useState} from 'react';
import {ButtonImage, ImageWithLabel, Label, LabelTypeProp} from 'src/components/atoms';
import {CaptionWithImage} from '../../atoms';
import {normalize} from 'src/shared/utils';
import {moleculesTestID, ScreensConstants} from '../../../constants';
import {Styles} from '../../../shared/styles';
import {ImagesName} from '../../../shared/styles/images';
import {BookMarkColorType} from '../articleFooter/ArticleFooter';
import {useTheme} from 'src/shared/styles/ThemeProvider';
import {Divider} from 'src/components/atoms';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import { getSvgImages } from 'src/shared/styles/svgImages';
import { CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';

export interface SectionArticleItemProps {
  headerTitle?: string;
  body?: string;
  image?: string;
  imageStyle?: ImageStyle;
  hideFooter?: boolean;
  leftTitle?: string;
  leftIcon?: () => void;
  leftTitleColor?: string;
  rightTitle?: string;
  rightIcon?: () => void;
  rightTitleColor?: string;
  hideBookMark?: boolean;
  bookMarkColorType?: string;
  nid?: string;
  isBookmarked: boolean
  onPressBookmark: () => void
}
const SectionArticleItem = ({
    headerTitle,
    body,
    image,
    imageStyle,
    leftTitle,
    leftIcon,
    leftTitleColor,
    rightTitle,
    rightIcon,
    rightTitleColor,
    hideFooter = false,
    hideBookMark = false,
    bookMarkColorType = BookMarkColorType.BLACK,
    nid,
    isBookmarked,
    onPressBookmark,
}: SectionArticleItemProps) => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const onPress = () => {
    if (nid) {
      navigation.navigate(ScreensConstants.ARTICLE_DETAIL_SCREEN, {nid: nid});
    }
  };
  const style = useThemeAwareObject(customStyle);
  const {themeData} = useTheme();
  return (
    <View
      style={{
        paddingBottom: normalize(20),
        backgroundColor: themeData.backgroundColor,
      }}>
      <TouchableWithoutFeedback testID={'onPressTestID'} onPress={onPress}>
        {image && <ImageWithLabel url={image} imageStyle={imageStyle} />}
        <Label
          labelType={LabelTypeProp.h2}
          children={headerTitle}
          color={themeData.primaryBlack}
        />
        <Label
          labelType={LabelTypeProp.p3}
          children={body}
          color={themeData.secondaryDavyGrey}
          numberOfLines={3}
        />
      </TouchableWithoutFeedback>
      <View
        style={
          !hideFooter
            ? style.container
            : style.hideFooterContainer
        }>
        {!hideFooter && (
          <View style={{flexDirection: 'row'}}>
            <CaptionWithImage
              title={leftTitle}
              icon={leftIcon}
              color={leftTitleColor}
            />
            <Text children={'|'} style={style.verticalDivider} />
            <CaptionWithImage
              title={rightTitle}
              icon={rightIcon}
              color={rightTitleColor}
            />
          </View>
        )}

        {!hideBookMark && (
          <ButtonImage
          testId={moleculesTestID.storySaveBtn}
          icon={() => {
            return isBookmarked
              ? getSvgImages({
                  name: ImagesName.bookMarkActiveSVG,
                  width: 10,
                  height: 15
                })
              : getSvgImages({
                  name: ImagesName.bookMarkSVG,
                  width: 10,
                  height: 15
                });
          }}
          onPress={onPressBookmark}
        />
        )}
      </View>
      <Divider style={style.divider}/>
    </View>
  );
};

export default SectionArticleItem;

const customStyle = (theme: CustomThemeType) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: normalize(20),
  },
  hideFooterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: normalize(20),
    alignSelf: 'flex-end',
  },
  verticalDivider: {
    color: Styles.color.silverChalice,
    paddingTop: normalize(2),
  },
  divider: {
    height: 1,
    backgroundColor: theme.dividerColor
  },
});
