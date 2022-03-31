import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import { Label} from 'src/components/atoms';
import {ImagesName} from 'src/shared/styles';
import {normalize} from 'src/shared/utils';
import {CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {useTheme} from 'src/shared/styles/ThemeProvider';
import { getSvgImages } from 'src/shared/styles/svgImages';

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
  const style = useThemeAwareObject(customStyle);
  const [isSelected, setIsSelected] = useState(selected);

  const changeStatus = () => {
    onPress(!isSelected);
    setIsSelected(!isSelected)
  };

  useEffect(() => {
    setIsSelected(selected)
  }, [selected])

  return (
    <TouchableOpacity testID={"ImageTestID"} style={style.container}
      onPress={changeStatus}>
      <View>
        {getSvgImages({
          name: isSelected ? ImagesName.notificationSelected : ImagesName.notification,
          width: style.iconStyle.width,
          height: style.iconStyle.height
        })}
      </View>
      <Label style={style.textStyle}>{label}</Label>
    </TouchableOpacity>
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
