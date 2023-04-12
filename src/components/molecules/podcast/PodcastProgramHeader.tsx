import React, {FunctionComponent} from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import { Label, LabelTypeProp } from 'src/components/atoms/label/Label'
import { ButtonImage } from 'src/components/atoms/button-image/ButtonImage';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {CustomThemeType, colors} from 'src/shared/styles/colors';
import BackIcon from 'src/assets/images/icons/back_icon.svg';
import ShareIcon from 'src/assets/images/icons/share_dark.svg';
import {ImagesName} from 'src/shared/styles/images';
import { isTab, normalize, screenWidth } from 'src/shared/utils';
import {getSvgImages} from 'src/shared/styles/svgImages';
import CloseIcon from 'src/assets/images/icons/close.svg';
import { fonts } from 'src/shared/styles/fonts';
import {  TranslateConstants,TranslateKey } from 'src/constants/Constants';

export interface PodcastProgramHeaderProps {
  headerBackIconTestId?: string;
  headerBookmarkIconTestId?: string;
  headerShareIconTestId?: string;
  onGoBack: ()=> void;
  onPressShare?: ()=> void;
  onPressSave: ()=> void;
  isSaved?: boolean;
  showLogo?: boolean;
  isCloseIcon?: boolean;
}

export const PodcastProgramHeader: FunctionComponent<PodcastProgramHeaderProps> = ({
  headerShareIconTestId,
  headerBookmarkIconTestId,
  headerBackIconTestId,
  onGoBack,
  onPressShare,
  onPressSave,
  isSaved = false,
  showLogo=false,
  isCloseIcon=false,
}) => {
  const CONST_PODCAST_PROGRAM_RETURN = TranslateConstants({key:TranslateKey.PODCAST_PROGRAM_RETURN})
  const styles = useThemeAwareObject(createStyles);

  const renderLeftComponent = () => {
    return (
      <TouchableOpacity testID={headerBackIconTestId} accessibilityLabel={headerBackIconTestId} onPress={onGoBack}>
        <View style={styles.itemContainer}>
          {isCloseIcon ?
            <CloseIcon height={13} width={13} fill={colors.white} /> :
            <View style={styles.itemContainer}>
              <BackIcon fill={colors.white} width={normalize(13)} height={normalize(11)} />
              <Label style={styles.labelStyle} children={CONST_PODCAST_PROGRAM_RETURN} labelType={LabelTypeProp.h4} />
            </View>
          }
        </View>
      </TouchableOpacity>
    );
  };

  const renderRightComponent = () => {
    return (
      <View style={styles.rightItemContainer}>
        <ButtonImage
          testId={headerBookmarkIconTestId}
          icon={() => {
            return getSvgImages({
                  name: isSaved ? ImagesName.bookMarkWhiteActive : ImagesName.bookMarkWhite,
                  width: 11,
                  height: 16
                })
          }}
          onPress={onPressSave}
        />
        <TouchableOpacity style={styles.buttonStyle} testID={headerShareIconTestId} accessibilityLabel={headerShareIconTestId} onPress={onPressShare}>
          <ShareIcon fill={colors.white} width={15} height={15}/>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.containerStyle}>
      {renderLeftComponent()}
      <View style={styles.titleContainerWrapper}>
        {showLogo && getSvgImages({
          name: ImagesName.headerLogoDark,
          width: styles.logo.width,
          height: styles.logo.height,
        })}
      </View>
      {renderRightComponent()}
    </View>
  );
};

const createStyles = (theme: CustomThemeType) =>
StyleSheet.create({
  containerStyle: {
    backgroundColor: colors.black,
    height: normalize(55),
    paddingHorizontal: isTab ? normalize(0.02 * screenWidth): normalize(0.04 * screenWidth),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainerWrapper: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    height: normalize(30),
    width: normalize(140),
    alignItems: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: normalize(32),
    width: normalize(62),
  },
  rightItemContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: normalize(32),
    width: normalize(62),
  },
  labelStyle: {
    marginLeft: normalize(10),
    color: colors.white,
    fontFamily: fonts.AwsatDigital_Bold,
    lineHeight: normalize(26)
  },
  buttonStyle: {
    paddingLeft: normalize(20),
  }
})
