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
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

export interface WriterBannerImageProps {
  data: {
    authorImage: string
    authorName: string
  },
  orientation: string,
  onPressReturn: () => void,
  isFollowed: boolean,
  onPressFollow: () => void,
}

export const WriterBannerImage = ({
  data,
  orientation,
  onPressReturn,
  isFollowed,
  onPressFollow,
}: WriterBannerImageProps) => {
  const [t] = useTranslation()

  const style = useThemeAwareObject(customStyle)

  const FOLLOW = 'تابع';
  const FOLLOWER = 'متابع';

  const ReturnButton = () => (
    <View style={[style.return, orientation == 'LANDSCAPE' && style.landscapeReturn]}>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center' }}
        onPress={onPressReturn}>
        {getSvgImages({
          name: ImagesName.returnSvg,
          size: normalize(12),
        })}
        <Label style={style.returnLabel}>
          {t('opinionArticleDetail.return')}
        </Label>
      </TouchableOpacity>
    </View>
  );

  const SubscribeButton = ({ isFollowed }: { isFollowed: boolean }) => (
    <TouchableWithoutFeedback style={[style.followContainer,
    { backgroundColor: isFollowed ? Styles.color.greenishBlue : Styles.color.cyanGreen, }]}
      onPress={onPressFollow}>
      {
        getSvgImages({
          name: isFollowed ? ImagesName.tickIcon : ImagesName.plusGreen,
          size: normalize(10),
        })
      }
      <Label style={[style.followLabel, { color: isFollowed ? Styles.color.white : Styles.color.greenishBlue, }]}>
        {isFollowed ? FOLLOWER : FOLLOW}</Label>
    </TouchableWithoutFeedback>
  );

  return (
    <View style={style.container}>
      <View style={style.contentContainer}>
        <ReturnButton />
        <View style={orientation == 'LANDSCAPE' ? style.landscapeimageContainer : style.imageContainer}>
          <Image
            url={getImageUrl(data.authorImage)}
            style={orientation == 'LANDSCAPE' ? style.landscapeImage : style.image}
            resizeMode={orientation == 'LANDSCAPE' ? 'stretch' : 'cover'}
            fallback={true}
          />
        </View>
        <View style={[style.labelButtonContainer, { width: orientation == 'LANDSCAPE' ? isTab ? '38%' : '40%' : '35%', }]}>
          <Label style={style.authorName} numberOfLines={3}>
            {data.authorName}
          </Label>
          <SubscribeButton isFollowed={isFollowed} />
        </View>
      </View>
    </View>
  )
}

const containerHeight = isTab ? 0.5 * screenWidth : 0.8 * screenWidth;

const customStyle = (theme: CustomThemeType) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      height: containerHeight,
    },
    contentContainer: {
      flex: 1,
      flexDirection: 'row-reverse',
      width: '100%',
      height: '100%',
      backgroundColor: theme.backgroundColor
    },
    imageContainer: {
      width: '60%',
      height: '100%',
      marginRight: normalize(20),
      marginTop: isIOS ? normalize(2) : normalize(10),
    },
    landscapeImage: {
      width: isTab ? 0.6 * screenWidth : 0.65 * screenWidth,
      height: '100%',
      marginLeft: isTab ? '20%' : '30%',
    },
    image: {
      width: '100%',
      height: '100%',
    },
    landscapeimageContainer: {
      width: '60%',
      height: '100%',
    },
    labelButtonContainer: {
      justifyContent: 'flex-end',
      paddingStart: normalize(15),
      paddingEnd: normalize(5),
    },
    authorName: {
      textAlign: 'left',
      fontSize: normalize(16),
      lineHeight: normalize(25),
      fontWeight: 'bold',
      marginBottom: normalize(18),
      color: theme.primaryBlack
    },
    return: {
      position: 'absolute',
      top: normalize(15),
      right: normalize(20),
      alignContent: 'center',
      marginTop: isIOS ? 0 : normalize(5),
      zIndex: 9999
    },
    landscapeReturn: {
      marginTop: normalize(10),
      marginStart: normalize(5)
    },
    returnLabel: {
      marginStart: normalize(5),
      fontSize: normalize(13),
      lineHeight: normalize(16),
      fontWeight: 'bold',
      color: theme.primaryBlack,
    },
    followContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'flex-start',
      borderRadius: normalize(50 / 2),
      paddingHorizontal: 0.05 * screenWidth,
      marginBottom: normalize(10)
    },
    followLabel: {
      fontSize: normalize(13),
      lineHeight: normalize(35),
      fontWeight: 'bold',
      marginStart: normalize(8),
    },
  })
} 