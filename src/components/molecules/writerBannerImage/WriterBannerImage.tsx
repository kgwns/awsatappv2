import { View, StyleSheet, TouchableOpacity, Dimensions, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { decodeHTMLTags, getImageUrl, isNotEmpty } from 'src/shared/utils/utilities'
import { ImagesName, Styles } from 'src/shared/styles'
import { ButtonImage, HomeButton, Image, Label } from 'src/components/atoms'
import { CustomThemeType } from 'src/shared/styles/colors'
import { getSvgImages } from 'src/shared/styles/svgImages'
import { isIOS, isTab, normalize, screenWidth } from 'src/shared/utils'
import { useTranslation } from 'react-i18next'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { ImageResize } from 'src/shared/styles/text-styles'
import AuthorDefault from 'src/assets/images/icons/authorDefault.svg';
import DeviceInfo from 'react-native-device-info';
import { SocialMediaType } from 'src/navigation/CustomDrawerContent'
import { FACEBOOK_APP_URL, INSTAGRAM_APP_URL, TWITTER_APP_URL } from 'src/constants/SharedConstants'
import { fonts } from 'src/shared/styles/fonts'
import { decode } from 'html-entities'

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
  hideBackArrow?: boolean;
  visibleHome?: boolean
  onPressHome: () => void,
}

export const WriterBannerImage = ({
  data,
  orientation,
  onPressReturn,
  isFollowed,
  onPressFollow,
  onPressWriter,
  hideBackArrow = false,
  visibleHome = false,
  onPressHome
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

  const ReturnButton = () => {
    if(hideBackArrow) return null
    return (
      <View>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={onPressReturn}>
          {getSvgImages({
            name: ImagesName.returnSvg,
            width: normalize(12),
            height: normalize(8.8), 
            style: style.prevIconStyle
          })}
          <Label style={style.returnLabel}>
            {t('opinionArticleDetail.return')}
          </Label>
        </TouchableOpacity>
      </View>
    )
  }

  const SubscribeButton = ({ isFollowed }: { isFollowed: boolean }) => (
    <TouchableWithoutFeedback testID={'subscribeButton'} style={[style.followContainer,
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
      <View style={style.headerContainer}>
        {visibleHome && <HomeButton containerStyle={style.homeIconContainer} onPress={onPressHome} />}
        <ReturnButton />
      </View>
      <View style={style.contentContainer}>
        <View style={{ flex: isTab ? currentOrientation == 'PORTRAIT' ? 0.15 : 0.10 : currentOrientation == 'PORTRAIT' ? 0.3 : 0.15 }}>
          <TouchableWithoutFeedback testID={'touchableImage'} onPress={onPressWriter}>
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
                fallbackName={ImagesName.authorDefault}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={{ flex: isTab ? currentOrientation == 'PORTRAIT' ? 0.85 : 0.90 : currentOrientation == 'PORTRAIT' ? 0.7 : 0.85, paddingStart: normalize(10) }}>
          <View style={style.authorSubscribeView}>
              <View style={style.authorNameView}>
                <TouchableWithoutFeedback testID={'touchableLabel'} onPress={onPressWriter}>
                  <Label style={style.authorName} numberOfLines={2}>{data.authorName}</Label>
                </TouchableWithoutFeedback>
              </View>
            

            <View style={style.subscribeView}>
              <SubscribeButton isFollowed={isFollowed} />
            </View>
          </View>
          <Label style={style.authorDescription}>{decode(decodeHTMLTags(data.authorDescription))}</Label>
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
      paddingTop: isTab ? normalize(40) : DeviceInfo.hasNotch() ? normalize(40) : normalize(20), 
      paddingBottom:normalize(20),
    },
    contentContainer:{
      flexDirection:'row',
      paddingTop: normalize(30),
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
      alignItems: 'center'
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
      fontSize: 22,
      lineHeight: 36,
      color: theme.primaryBlack,
      fontFamily: fonts.AwsatDigitalBetav10_Bold,
      textAlign: 'left',
    },
    authorDescription:{
      fontSize: 13,
      lineHeight: 22,
      textAlign: 'left',
      marginBottom:normalize(15),
      color: theme.secondaryMediumGrey,
      fontFamily: fonts.Effra_Arbc_Regular,
    },
    returnLabel: {
      marginStart: normalize(5),
      fontSize: normalize(14),
      lineHeight: normalize(32),
      color: theme.primaryBlack,
      fontFamily: fonts.AwsatDigitalBetav10_Regular,
    },
    followContainer: {
      width: 75,
      height: 31,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 16,
    },
    followLabel: {
      fontSize: 13,
      lineHeight: 27,
      marginStart: normalize(5),
      fontFamily: fonts.AwsatDigitalBetav10_Bold,
    },
    prevIconStyle: {
      width: normalize(12),
      height: normalize(8.8),
      paddingTop: isIOS ? 10 : 9,
      alignItems: 'center',
      paddingHorizontal: normalize(10)
    },
    homeIconContainer: {
      position:'absolute',
      right: 5,
    },
    headerContainer: {
      flexDirection: 'row' 
    }
  })
} 