import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Image, Label} from 'src/components/atoms';
import {ImagesName} from 'src/shared/styles';
import {normalize} from 'src/shared/utils';
import {colors} from 'src/shared/styles/colors';

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
  return (
    <View style={KeepNotifiedCardStyle.container}>
      <Image
        name={
          isSelected ? ImagesName.notificationSelected : ImagesName.notification
        }
        style={KeepNotifiedCardStyle.iconStyle}
        onPress={() => {
          onPress(isSelected);
          setIsSelected(!isSelected);
        }}
        testID='ImageTestID'
      />
      <Label style={KeepNotifiedCardStyle.textStyle}>{label}</Label>
    </View>
  );
};
const KeepNotifiedCardStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: colors.aquaHaze,
    paddingTop: normalize(10),
  },
  textStyle: {
    fontSize: normalize(18),
    fontWeight: 'bold',
    lineHeight: normalize(30),
  },
  iconStyle: {height: normalize(46), width: normalize(46)},
});

export default KeepNotifiedCard;
