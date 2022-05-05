import { View, StyleSheet, TouchableOpacity, Dimensions, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getImageUrl, isNotEmpty } from 'src/shared/utils/utilities'
import { ImagesName, Styles } from 'src/shared/styles'
import { ButtonImage, Image, Label } from 'src/components/atoms'
import { CustomThemeType } from 'src/shared/styles/colors'
import { getSvgImages } from 'src/shared/styles/svgImages'
import { isIOS, isTab, normalize, screenHeight, screenWidth } from 'src/shared/utils'
import { useTranslation } from 'react-i18next'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { ImageResize } from 'src/shared/styles/text-styles'
import AuthorDefault from 'src/assets/images/icons/authorDefault.svg';
import DeviceInfo from 'react-native-device-info';
import { SocialMediaType } from 'src/navigation/CustomDrawerContent'
import { FACEBOOK_APP_URL, INSTAGRAM_APP_URL, TWITTER_APP_URL } from 'src/constants/SharedConstants'

export interface WriterBannerImageProps {
  data: {
    authorImage: string
    authorName: string
    authorDescription : string
    facebook_url: any
    twitter_url: any
    instagram_url: any
  },
  orientation?: string,
  onPressReturn: () => void,
  isFollowed: boolean,
  onPressFollow: () => void,
  onPressWriter?: () => void,
}

export const WriterBannerImage = ({
  data,
  orientation,
  onPressReturn,
  isFollowed,
  onPressFollow,
  onPressWriter,
}: WriterBannerImageProps) => {
  const [t] = useTranslation()

  const style = useThemeAwareObject(customStyle)

  const FOLLOW = 'تابع';
  const FOLLOWER = 'متابع';


  const isPortrait = () => {
    const dim = Dimensions.get('screen');
    return dim.height >= dim.width;
  };

  // State to hold the connection status
  const [currentOrientation, setOrientation] = useState<'PORTRAIT' | 'LANDSCAPE'>(
    isPortrait() ? 'PORTRAIT' : 'LANDSCAPE',
  );

  useEffect(() => {
    const callback = () => {
      setOrientation(isPortrait() ? 'PORTRAIT' : 'LANDSCAPE')
    };
    const subscription =  Dimensions.addEventListener('change', callback);
    return () => subscription?.remove();
  }, []);

  const ReturnButton = () => (
    <View>
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
      { backgroundColor: isFollowed ? Styles.color.greenishBlue : Styles.color.aquaHaze, }]}
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

  const openSocialMedia = (type: string,url : string) =>{
    switch (type) {
      case SocialMediaType.facebook:
        Linking.openURL(FACEBOOK_APP_URL).catch(() => {
          Linking.openURL(url)
        });
        return;
      case SocialMediaType.instagram:
        Linking.openURL(INSTAGRAM_APP_URL).catch(() => {
          Linking.openURL(url)
        });
        return;
      case SocialMediaType.twitter:
        Linking.openURL(TWITTER_APP_URL).catch(() => {
          Linking.openURL(url)
        });
        return;
      default:
        return;
    }
  }

  return (
    <View style={style.container}>
      <ReturnButton />
      <View style={style.contentContainer}>
        <View style={{ flex: isTab ? currentOrientation == 'PORTRAIT' ? 0.15 : 0.10 : currentOrientation == 'PORTRAIT' ? 0.3 : 0.15 }}>
          <TouchableWithoutFeedback onPress={onPressWriter}>
            <View style={style.imageContainer}>
              <Image url={getImageUrl(data.authorImage)}
                type={'round'}
                size={normalize(100)}
                resizeMode={ImageResize.COVER}
                fallback={true}
                fallbackContent={<AuthorDefault
                  style={{ backgroundColor: Styles.color.lightCyanBlue }}
                  width={normalize(100)}
                  height={normalize(100)} />}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={{ flex: isTab ? currentOrientation == 'PORTRAIT' ? 0.85 : 0.90 : currentOrientation == 'PORTRAIT' ? 0.7 : 0.85, paddingStart: normalize(10) }}>
          <View style={style.authorSubscribeView}>
              <View style={style.authorNameView}>
                <TouchableWithoutFeedback onPress={onPressWriter}>
                  <Label style={style.authorName} numberOfLines={1}>{data.authorName}</Label>
                </TouchableWithoutFeedback>
              </View>
            

            <View style={style.subscribeView}>
              <SubscribeButton isFollowed={isFollowed} />
            </View>
          </View>
          <Label style={style.authorDescription}>{data.authorDescription}</Label>
          <View style={{ flexDirection: 'row' }}>
            {isNotEmpty(data.instagram_url) && <ButtonImage
              icon={() => getSvgImages({
                name: ImagesName.instagramGray,
                size: normalize(13),
              })}
              onPress={() => openSocialMedia(SocialMediaType.instagram, data.instagram_url)}
              style={{ marginEnd: normalize(30) }}
            />}
            {isNotEmpty(data.twitter_url) && <ButtonImage
              icon={() => getSvgImages({
                name: ImagesName.twitterGray,
                size: normalize(13),
              })}
              onPress={() => openSocialMedia(SocialMediaType.twitter, data.twitter_url)}
            />}
            {isNotEmpty(data.facebook_url) && <ButtonImage
              icon={() => getSvgImages({
                name: ImagesName.facebookGray,
                size: normalize(13),
              })}
              onPress={() => openSocialMedia(SocialMediaType.facebook, data.facebook_url)}
              style={{ marginStart: isNotEmpty(data.twitter_url) ? normalize(35) : normalize(5) }}
            />}
          </View>
        </View>
      </View>
    </View>
  )
}

const customStyle = (theme: CustomThemeType) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      height:'auto',
      backgroundColor: theme.writerBackground,
      width: '100%',
      paddingHorizontal: isTab ? normalize(0.02 * screenWidth) : normalize(0.04 * screenWidth),
      paddingTop: DeviceInfo.hasNotch() ? normalize(40) : normalize(20), 
      paddingBottom:normalize(20),
    },
    contentContainer:{
      flexDirection:'row',
      paddingTop: normalize(20),
    },
    imageContainer:{
      overflow: 'hidden',
      width: normalize(100),
      height: normalize(100),
      borderRadius: normalize(50)
    },
    authorSubscribeView:{
      flex: 1,
      flexDirection: 'row',
      height: normalize(45),
    },
    authorNameView:{
      flex: 0.8,
      alignItems: 'flex-start'
    },
    subscribeView:{
      flex: 0.4,
      alignItems: 'flex-end'
    },
    authorName:{
      fontSize: normalize(22),
      lineHeight: normalize(33),
      fontWeight: 'bold',
      color: theme.primaryBlack,
    },
    authorDescription:{
      fontSize: normalize(13),
      lineHeight: normalize(20),
      textAlign: 'left',
      marginBottom:normalize(15),
      color: theme.primaryBlack,
    },
    returnLabel: {
      marginStart: normalize(5),
      fontSize: normalize(14),
      lineHeight: normalize(17),
      color: theme.primaryBlack,
    },
    followContainer: {
      width: normalize(80),
      height: normalize(40),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: normalize(50 / 2),
    },
    followLabel: {
      fontSize: normalize(13),
      lineHeight: normalize(27),
      fontWeight: 'bold',
      marginStart: normalize(5),
    },
  })
} 