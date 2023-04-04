import {View, StyleSheet} from 'react-native';
import React from 'react';
import {ButtonImage} from 'src/components/atoms/button-image/ButtonImage';
import {getSvgImages} from 'src/shared/styles/svgImages';
import {ImagesName} from 'src/shared/styles';
import {isIOS, normalize} from 'src/shared/utils';
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
  const articleSaveIcon = isBookmarked
    ? ImagesName.bookMarkActiveSVG
    : ImagesName.bookmark;

  const {themeData} = useTheme();
  const style = useThemeAwareObject(customStyle);
  return (
    <View style={style.container}>
      <ButtonImage
        icon={() => {
          return getSvgImages({
            name: ImagesName.fontScaling,
            size: normalize(21),
            fill: themeData.primaryBlack,
          });
        }}
        onPress={onPressFontChange}
      />
      <ButtonImage
        icon={() => {
          return getSvgImages({
            name: ImagesName.share,
            size: normalize(18),
          });
        }}
        onPress={() => onPressShare(albumData)}
      />
      <ButtonImage
        icon={() => {
          return getSvgImages({
            name: articleSaveIcon,
            size: normalize(18),
          });
        }}
        onPress={onPressSave}
      />
    </View>
  );
};

const customStyle = (theme: CustomThemeType) => {
  return StyleSheet.create({
    container: {
      width: '100%',
      height: isIOS ? normalize(70) : normalize(60),
      paddingBottom: isIOS ? normalize(15) : 0,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: theme.secondaryWhite,
      position: 'absolute',
      bottom: 0,
    },
  });
};
