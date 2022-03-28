import { View, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { getImageUrl } from 'src/shared/utils/utilities'
import { ImagesName, Styles } from 'src/shared/styles'
import { Image, Label } from 'src/components/atoms'
import { CustomThemeType } from 'src/shared/styles/colors'
import { getSvgImages } from 'src/shared/styles/svgImages'
import { isIOS, isTab, normalize, screenWidth } from 'src/shared/utils'
import { useTranslation } from 'react-i18next'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'

export interface WriterBannerImageProps {
  data: {
    authorImage: string
  },
  orientation: string,
  onPressReturn: () => void
}

export const WriterBannerImage = ({
  data,
  orientation,
  onPressReturn
}: WriterBannerImageProps) => {
  const [t] = useTranslation()

  const style = useThemeAwareObject(customStyle)

  const ReturnButton = () => (
    <View style={style.return}>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center' }}
        onPress={onPressReturn}>
        {getSvgImages({
          name: ImagesName.returnBlackSvg,
          size: normalize(12),
        })}
        <Label style={style.returnLabel}>
          {t('opinionArticleDetail.return')}
        </Label>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={style.imageView}>
      <Image
        url={getImageUrl(data.authorImage)}
        style={style.image}
        resizeMode={orientation == 'LANDSCAPE' ? 'contain' : 'cover'}
        backgroundColor={Styles.color.white}
        fallback={true}
    />
      <ReturnButton />
    </View>
  )
}

const containerHeight = isTab ? 0.5 * screenWidth : 0.8 * screenWidth;

const customStyle = (theme: CustomThemeType) => {
  return StyleSheet.create({
    imageView: {
      flex: 1,
      width: '100%',
      height: containerHeight,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    return: {
      position: 'absolute',
      left: normalize(15),
      alignContent: 'center',
      top: isIOS ? normalize(50) : normalize(20),
      flexWrap: 'wrap',
      alignItems: 'center',
    },
    returnLabel: {
      marginStart: normalize(5),
      fontSize: normalize(13),
      lineHeight: normalize(16),
      fontWeight: 'bold',
      color: Styles.color.black,
    }
  })
} 