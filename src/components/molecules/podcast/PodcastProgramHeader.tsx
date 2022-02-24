import {useNavigation} from '@react-navigation/native';
import React, {FunctionComponent} from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import {Image, Label, ButtonImage} from 'src/components/atoms';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {CustomThemeType} from 'src/shared/styles/colors';
import BackIcon from 'src/assets/images/icons/back_icon.svg';
import ShareIcon from 'src/assets/images/icons/share.svg';
import {ImagesName} from 'src/shared/styles/images';
import { normalize } from 'src/shared/utils';
import {useTranslation} from 'react-i18next';
import { useTheme } from 'src/shared/styles/ThemeProvider';
import {getSvgImages} from 'src/shared/styles/svgImages';
import { colors } from 'src/shared/styles/colors';
import CloseIcon from 'src/assets/images/icons/close.svg';

export interface PodcastProgramHeaderProps {
  headerBackIconTestId?: string;
  headerBookmarkIconTestId?: string;
  headerShareIconTestId?: string;
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
  onPressShare,
  onPressSave,
  isSaved,
  showLogo=false,
  isCloseIcon=false,
}) => {
  const navigation = useNavigation();
  const [t] = useTranslation();
  const styles = useThemeAwareObject(createStyles);
  const { themeData } = useTheme()
  const renderLeftComponent = () => {
    return (
      <TouchableOpacity testID={headerBackIconTestId} accessibilityLabel={headerBackIconTestId} onPress={() => {navigation.goBack()}}>
        <View style={styles.itemContainer}>
          {isCloseIcon?
          <CloseIcon height={13} width={13}  fill={colors.white} />:
          <View style={styles.itemContainer}> 
            <BackIcon fill={colors.white} width={normalize(15)} height={normalize(15)}/>
            <Label style={styles.labelStyle} children={t('podcastProgram.return')} />
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
            return isSaved
              ? getSvgImages({
                  name: ImagesName.bookMarkWhiteActive,
                  size: normalize(15),
                })
              : getSvgImages({
                  name: ImagesName.bookMarkWhite,
                  size: normalize(15),
                });
          }}
          onPress={onPressSave}
        />
        <TouchableOpacity style={styles.buttonStyle} testID={headerShareIconTestId} accessibilityLabel={headerShareIconTestId} onPress={onPressShare}>
          <ShareIcon fill={colors.white} width={normalize(15)} height={normalize(15)}/>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={[styles.containerStyle,]}>
      {renderLeftComponent()}
      <View style={styles.titleContainerWrapper}>
        {showLogo&&<Image style={styles.logo} name={ImagesName.headerLogo} />}
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
    paddingHorizontal: normalize(16),
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
    paddingLeft: normalize(5),
    color: colors.white,
  },
  buttonStyle: {
    paddingLeft: normalize(20),
  }
})