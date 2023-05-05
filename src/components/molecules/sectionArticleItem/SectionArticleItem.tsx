import {
  View,
  Text,
  StyleSheet,
  ImageStyle,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {ButtonImage} from 'src/components/atoms/button-image/ButtonImage';
import { ImageWithLabel} from 'src/components/atoms/imageWithLabel/ImageWithLabel';
import { Label, LabelTypeProp} from 'src/components/atoms/label/Label';
import {isDarkTheme, isNotEmpty, isTab, normalize} from 'src/shared/utils';
import {moleculesTestID, ScreensConstants} from '../../../constants/Constants';
import {Styles} from '../../../shared/styles';
import {ImagesName} from '../../../shared/styles/images';
import {BookMarkColorType} from '../articleFooter/ArticleFooter';
import {useTheme} from 'src/shared/styles/ThemeProvider';
import {Divider, CaptionWithImage} from 'src/components/atoms';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import { getSvgImages } from 'src/shared/styles/svgImages';
import { CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { decode } from 'html-entities';
import { useAppCommon } from 'src/hooks';

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
  showDivider?: boolean
  displayType?: string,
  articleTextStyle?: StyleProp<ViewStyle>
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
    showDivider = true,
    displayType,
    articleTextStyle
}: SectionArticleItemProps) => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const onPress = () => {
    if (nid) {
      navigation.navigate(ScreensConstants.ARTICLE_DETAIL_SCREEN, {nid});
    }
  };
  const style = useThemeAwareObject(customStyle);
  const {themeData} = useTheme();
  const { theme } = useAppCommon();
  const isDarkMode = isDarkTheme(theme)
  return (
    <View style={style.sectionArticleItem}>
      <TouchableWithoutFeedback testID={'onPressTestID'} onPress={onPress}>
        {image && !isTab && <ImageWithLabel url={image} imageStyle={imageStyle} displayType={displayType}/>}
        <View style={style.sectionContent}>
          <Label
            labelType={ isTab ? LabelTypeProp.title4 : LabelTypeProp.h2}
            children={decode(headerTitle)}
            color={themeData.primaryBlack}
            style = {articleTextStyle}
          />
         { !isTab && <Label
            labelType={LabelTypeProp.p3}
            children={body}
            color={ isDarkMode ? themeData.summaryColor : isTab ? Styles.color.green600 : themeData.summaryColor}
            numberOfLines={3}
            testID={'bodyId'}
          />}
        </View>
      </TouchableWithoutFeedback>
      <View
        style={
          !hideFooter
            ? style.container
            : style.hideFooterContainer
        }>
        {!hideFooter && (
          <View style={style.footerContainer} testID={'footerContainerId'}>
            {(leftIcon || isNotEmpty(leftTitle)) &&
              <CaptionWithImage
                title={leftTitle}
                icon={leftIcon}
                color={leftTitleColor}
                style={style.leftTitle}
              />}
            {((isNotEmpty(leftTitle) || leftIcon) && (isNotEmpty(rightTitle) || rightIcon)) &&
              <Text children={'|'} style={style.verticalDivider} testID={'verticalDividerId'} />}
            {(rightIcon || isNotEmpty(rightTitle)) &&
              <CaptionWithImage
                title={rightTitle}
                icon={rightIcon}
                color={rightTitleColor}
                style={style.rightTitle}
              />
            }
          </View>
        )}

        {!hideBookMark && (
          <ButtonImage
          testId={moleculesTestID.storySaveBtn}
            icon={() => {
              return getSvgImages({
                name: isBookmarked ? ImagesName.bookMarkActiveSVG : ImagesName.bookMarkSVG,
                width: 10,
                height: 15
              })
            }}
          onPress={onPressBookmark}
        />
        )}
      </View>
      {showDivider && <Divider style={style.divider}/>}
    </View>
  );
};

export default SectionArticleItem;

const customStyle = (theme: CustomThemeType) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: isTab ? 10 : normalize(20),
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
    paddingHorizontal: 10,
  },
  divider: {
    height: 1,
    backgroundColor: theme.dividerColor
  },
  sectionContent: {
    paddingTop: isTab ? 0 : normalize(10)
  },
  sectionArticleItem: {
    paddingBottom: isTab ? 0 : normalize(20),
    backgroundColor: theme.backgroundColor,
    overflow: 'hidden'
  },
  leftTitle: {
    alignSelf: 'center',
  },
  rightTitle: {
    alignSelf: 'center',
  },
  footerContainer: {
     flexDirection: 'row' 
  }
});
