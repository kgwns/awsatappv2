import React, {FunctionComponent} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Image, ImageName} from 'src/components/atoms/image/Image';
import {Label} from 'src/components/atoms/label/Label'
import {normalize} from 'src/shared/utils/dimensions';
import {menuButtonStyle} from 'src/components/atoms/menu-Button/MenuButton.style';

const {container, titleStyle, iconStyle} = menuButtonStyle;

interface MenuButtonProps {
  icon: ImageName;
  title: string;
  onPress(screenName: string): void;
  screenName: string;
  component?: any;
}

export const MenuButton: FunctionComponent<MenuButtonProps> = ({
  icon,
  title,
  onPress,
  screenName,
}) => {
  return (
    <TouchableOpacity testID='menuArticleId' onPress={() => onPress(screenName)}>
      <View style={container}>
        <Image style={iconStyle} name={icon} size={normalize(24)} />
        <Label labelType="caption9" style={titleStyle}>
          {title}
        </Label>
      </View>
    </TouchableOpacity>
  );
};
