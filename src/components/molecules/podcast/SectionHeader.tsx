import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Label} from 'src/components/atoms';
import {CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {normalize} from 'src/shared/utils';
import MoreLeftArrow from 'src/assets/images/icons/more_left_arrow.svg';
import { fonts } from 'src/shared/styles/fonts';

export interface SectionHeaderProps {
  headerLeft?: string;
  headerRight?: string;
}

export const SectionHeader = ({
  headerLeft,
  headerRight,
}: SectionHeaderProps) => {
  const style = useThemeAwareObject(customStyle);
  return (
    <View style={style.headerContainer}>
      {headerRight && <Label style={style.header}>{headerRight}</Label>}
      {headerLeft && (
        <TouchableOpacity
          style={style.moreContainer}
          testID="leftButtonTestId"
          onPress={() => console.log('More pressed')}>
          <Label style={style.moreLabel}>{headerLeft}</Label>
          <MoreLeftArrow />
        </TouchableOpacity>
      )}
    </View>
  );
};

const customStyle = (theme: CustomThemeType) => {
  const PodcastHeader = StyleSheet.create({
    headerContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    header: {
      fontSize: 20,
      lineHeight: 42,
      fontFamily: fonts.AwsatDigital_Bold,
      textAlign: 'left',
      color: theme.primary,
    },
    moreContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginEnd: normalize(10),
    },
    moreLabel: {
      fontSize: normalize(14),
      lineHeight: normalize(36),
      fontFamily: fonts.AwsatDigital_Bold,
      color: theme.secondaryDavyGrey,
      marginEnd: normalize(5),
    },
  });
  return PodcastHeader;
};

export default SectionHeaderProps;
