import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Image, Label} from 'src/components/atoms';
import {ImagesName} from 'src/shared/styles';
import {normalize} from 'src/shared/utils';
import {CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {useTheme} from 'src/shared/styles/ThemeProvider';

interface KeepNotifiedCardProps {
  label: string;
  selected: boolean;
  onPress: (isSelected: boolean) => void;
}

const KeepNotifiedCard = ({
  label,
  selected,
  onPress,
}: KeepNotifiedCardProps) => {
  const [isSelected, setIsSelected] = useState(selected);
  const style = useThemeAwareObject(customStyle);
  const theme = useTheme();
  return (
    <View style={style.container}>
      <Image
        name={
          isSelected ? ImagesName.notificationSelected : ImagesName.notification
        }
        style={style.iconStyle}
        onPress={() => {
          onPress(isSelected);
          setIsSelected(!isSelected);
        }}
        testID="ImageTestID"
      />
      <Label style={style.textStyle}>{label}</Label>
    </View>
  );
};
const customStyle = (theme: CustomThemeType) => {
  const KeepNotifiedCardStyle = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row-reverse',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: theme.backgroundColor,
      paddingTop: normalize(10),
    },
    textStyle: {
      fontSize: normalize(18),
      fontWeight: 'bold',
      lineHeight: normalize(30),
      color: theme.primaryBlack,
    },
    iconStyle: {
      height: normalize(46),
      width: normalize(46),
    },
  });
  return KeepNotifiedCardStyle;
};

export default KeepNotifiedCard;
