import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageStyle,
} from 'react-native';
import React, {useState} from 'react';
import {ButtonImage, ImageWithLabel, Label, LabelTypeProp} from 'src/components/atoms';
import {CaptionWithImage, ImageName} from '../../atoms';
import {normalize} from 'src/shared/utils';
import {moleculesTestID, ScreensConstants} from '../../../constants';
import {Styles} from '../../../shared/styles';
import {ImagesName} from '../../../shared/styles/images';
import {Image} from '../../atoms';
import {BookMarkColorType} from '../articleFooter/ArticleFooter';
import {useTheme} from 'src/shared/styles/ThemeProvider';
import {Divider} from 'src/components/atoms';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import { getSvgImages } from 'src/shared/styles/svgImages';

export interface SectionArticleItemProps {
  headerTitle?: string;
  description?: string;
  image?: string;
  imageStyle?: ImageStyle;
  hideFooter?: boolean;
  leftTitle?: string;
  leftIcon?: ImageName;
  leftTitleColor?: string;
  rightTitle?: string;
  rightIcon?: ImageName;
  rightTitleColor?: string;
  hideBookMark?: boolean;
  bookMarkColorType?: string;
  nid?: string;
}
const SectionArticleItem = ({
  headerTitle,
  description,
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
}: SectionArticleItemProps) => {
  const [saveState, setSaveState] = useState(false);
  const theme = useTheme();
  const navigation = useNavigation<StackNavigationProp<any>>();

  const onPress = () => {
    if (nid) {
      navigation.navigate(ScreensConstants.ARTICLE_DETAIL_SCREEN, {nid: nid});
    }
  };

  const onPressSave = () => {
    setSaveState(!saveState);
  };
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
          children={description}
          color={themeData.secondaryDavyGrey}
          numberOfLines={3}
        />
      </TouchableWithoutFeedback>
      <View
        style={
          !hideFooter
            ? articleFooterStyle.container
            : articleFooterStyle.hideFooterContainer
        }>
        {!hideFooter && (
          <View style={{flexDirection: 'row'}}>
            <CaptionWithImage
              title={leftTitle}
              icon={leftIcon}
              color={leftTitleColor}
            />
            <Text children={'|'} style={articleFooterStyle.verticalDivider} />
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
            return saveState
              ? getSvgImages({
                  name: ImagesName.bookMarkBlackFillSVG,
                  size: normalize(20),
                  fill: theme.themeData.primaryBlack,
                })
              : getSvgImages({
                  name: ImagesName.bookMarkBlackBdrSVG,
                  size: normalize(20),
                  fill: theme.themeData.primaryBlack,
                });
          }}
          onPress={onPressSave}
        />
        )}
      </View>
      <Divider />
    </View>
  );
};

export default SectionArticleItem;

const articleFooterStyle = StyleSheet.create({
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
});
