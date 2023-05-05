import {View, StyleSheet} from 'react-native';
import React from 'react';
import {ButtonImage} from 'src/components/atoms/button-image/ButtonImage';
import {getSvgImages} from 'src/shared/styles/svgImages';
import {ImagesName} from 'src/shared/styles';
import {isIOS, isTab, normalize} from 'src/shared/utils';
import {CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {useTheme} from 'src/shared/styles/ThemeProvider';
import {AlbumDetailType} from 'src/redux/photoGallery/types';
import { onPressShare } from 'src/shared/utils/onPressShare';

export const PhotoGalleryDetailFooter = ({
  albumData,
  isBookmarked,
  onPressSave,
  onPressFontChange,
}: {
  albumData: AlbumDetailType;
  isBookmarked: boolean;
  onPressSave: () => void;
  onPressFontChange: () => void;
}) => {

  const {themeData} = useTheme();
  const style = useThemeAwareObject(galleryCustomStyle);

  const galleryShareTab = getSvgImages({
    name: ImagesName.shareBold,
    width: 37,
    height: 36,
  });

  const galleryFontScalingTab = getSvgImages({
    name: ImagesName.fontScalingBold,
    width: 40,
    height: 28,
    fill: themeData.primaryBlack
  });

  const gallerySaveTab = getSvgImages({
    name: isBookmarked ? ImagesName.bookMarkActiveSVG : ImagesName.bookmarkBold,
    width: 19,
    height: 33,
  });

  const galleryShareMobile = getSvgImages({
    name: ImagesName.share,
    size: normalize(18),
  });

  const galleryFontScalingMobile = getSvgImages({
    name: ImagesName.fontScaling,
    size: normalize(21),
    fill: themeData.primaryBlack
  });

  const gallerySaveMobile = getSvgImages({
    name: isBookmarked ? ImagesName.bookMarkActiveSVG : ImagesName.bookmark,
    size: normalize(18),
  });


  return (
    <View style={style.galleryContainer}>
      <ButtonImage icon={() => isTab ? galleryFontScalingTab : galleryFontScalingMobile}
        onPress={onPressFontChange}
      />
      <ButtonImage
        icon={() => isTab ? galleryShareTab : galleryShareMobile}
        onPress={() => onPressShare(albumData)}
      />
      <ButtonImage icon={() => isTab ? gallerySaveTab : gallerySaveMobile}
        onPress={onPressSave}
      />
    </View>
  );
};

const galleryCustomStyle = (theme: CustomThemeType) => {
  return StyleSheet.create({
    galleryContainer: {
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
