import {View, StyleSheet} from 'react-native';
import React from 'react';
import {ButtonImage} from 'src/components/atoms/button-image/ButtonImage';
import {getSvgImages} from 'src/shared/styles/svgImages';
import {ImagesName} from 'src/shared/styles';
import {isIOS, isTab, normalize} from 'src/shared/utils';
import {CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {useTheme} from 'src/shared/styles/ThemeProvider';
import {OpinionArticleDetailItemType} from 'src/redux/opinionArticleDetail/types';
import { onPressShare } from 'src/shared/utils/onPressShare';

export const OpinionArticleDetailFooter = ({
  opinionArticleDetailData,
  isBookmarked,
  onPressSave,
  onPressFontSizeChange,
}: {
  opinionArticleDetailData: OpinionArticleDetailItemType;
  isBookmarked: boolean
  onPressSave: () => void
  onPressFontSizeChange: () => void
}) => {
  const {themeData} = useTheme();
  const style = useThemeAwareObject(opinionCustomStyle);

  const saveTab = getSvgImages({
    name: isBookmarked ? ImagesName.bookMarkActiveSVG : ImagesName.bookmarkBold,
    width: 19,
    height: 33,
  });

  const fontScalingTab = getSvgImages({
    name: ImagesName.fontScalingBold,
    width: 40,
    height: 28,
    fill: themeData.primaryBlack
  });

  const shareTab = getSvgImages({
    name: ImagesName.shareBold,
    width: 37,
    height: 36,
  });

  const saveMobile = getSvgImages({
    name: isBookmarked ? ImagesName.bookMarkActiveSVG : ImagesName.bookmark,
    size: normalize(18),
  });

  const fontScalingMobile = getSvgImages({
    name: ImagesName.fontScaling,
    size: normalize(21),
    fill: themeData.primaryBlack
  });

  const shareMobile = getSvgImages({
    name: ImagesName.share,
    size: normalize(18),
  });

  return (
    <View style={style.opinionContainer}>
      <ButtonImage icon={() => isTab ? fontScalingTab : fontScalingMobile}
        onPress={onPressFontSizeChange}
      />
      <ButtonImage
        icon={() => isTab ? shareTab : shareMobile}
        onPress = {() => onPressShare(opinionArticleDetailData)}
      />
      <ButtonImage icon={() => isTab ? saveTab : saveMobile}
        onPress={onPressSave}
      />
    </View>
  );
};

const opinionCustomStyle = (theme: CustomThemeType) => {
  return StyleSheet.create({
    opinionContainer: {
      width: '100%',
      height: isTab ? 104 : isIOS ? normalize(70) : normalize(60),
      paddingBottom: isIOS ? normalize(15) : 0,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: theme.secondaryWhite,
      position: 'absolute',
      bottom: 0,
      paddingHorizontal: isTab ? '20%' : 0,
    },
  });
};
