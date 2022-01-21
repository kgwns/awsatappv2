import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { normalize } from 'react-native-elements'
import { ImagesName } from '../../../shared/styles/images'
import { CaptionWithImage, ImageName } from '../../atoms'
import { Image } from '../../atoms'

export interface articleFooterProps {
  leftTitle?: string,
  leftIcon?: ImageName,
  leftTitleColor?: string,
  rightTitle?: string,
  rightIcon?: ImageName,
  rightTitleColor?: string,
  style?: object
}

const ArticleFooter = ({
  leftTitle,
  leftIcon,
  leftTitleColor,
  rightTitle,
  rightIcon,
  rightTitleColor,
  style
}: articleFooterProps) => {
  const [saveState, setSaveState] = useState(false)
  const storySaveIcon = saveState ? ImagesName.save : ImagesName.blackBdrBookMark

  const onPressSave = () => {
    setSaveState(!saveState)
  }

  return (
    <View style={{ ...articleFooterStyle.container, ...style }}>
      <View style={{ flexDirection: 'row' }}>
        <CaptionWithImage title={leftTitle} icon={leftIcon} color={leftTitleColor} />
        <Text children={'|'} style={articleFooterStyle.verticalDivider} />
        <CaptionWithImage title={rightTitle} icon={rightIcon} color={rightTitleColor} />
      </View>
      <TouchableOpacity activeOpacity={0.8} onPress={onPressSave}>
        <Image name={storySaveIcon} size={normalize(20)}
        />
      </TouchableOpacity>
    </View>
  )
}

export default ArticleFooter

const articleFooterStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: normalize(15)
  },
  verticalDivider: {
  }
})
