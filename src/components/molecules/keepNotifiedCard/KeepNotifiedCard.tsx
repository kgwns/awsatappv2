import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import { Label } from 'src/components/atoms/label/Label';
import {ImagesName} from 'src/shared/styles';
import {normalize} from 'src/shared/utils';
import {CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import { getSvgImages } from 'src/shared/styles/svgImages';
import { fonts } from 'src/shared/styles/fonts';

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
  return StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row-reverse',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: theme.profileBackground,
      paddingTop: normalize(10),
    },
    textStyle: {
      fontFamily: fonts.AwsatDigital_Bold,
      fontSize: normalize(18),
      lineHeight: normalize(30),
      color: theme.primaryBlack,
    },
    iconStyle: {
      height: normalize(46),
      width: normalize(46),
    },
  });
};

export default KeepNotifiedCard;
