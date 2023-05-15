import { View, StyleSheet, Dimensions, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { decodeHTMLTags, getImageUrl, isNotEmpty } from 'src/shared/utils/utilities'
import { ImagesName, Styles } from 'src/shared/styles'
import { ButtonImage} from 'src/components/atoms/button-image/ButtonImage'
import {Image} from 'src/components/atoms/image/Image'
import {Label } from 'src/components/atoms/label/Label'
import { CustomThemeType } from 'src/shared/styles/colors'
import { getSvgImages } from 'src/shared/styles/svgImages'
import { isAndroid, isIOS, isTab, normalize, screenWidth } from 'src/shared/utils'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { ImageResize } from 'src/shared/styles/text-styles'
import { SocialMediaType } from 'src/navigation/CustomDrawerContent'
import { FACEBOOK_APP_URL, INSTAGRAM_APP_URL, TranslateConstants, TranslateKey, TWITTER_APP_URL } from 'src/constants/Constants'
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
  isFocused?: boolean,
  isWriter?: boolean,
  showIsFollowed?: boolean,
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
  onPressHome,
  isFocused,
  isWriter = false,
  showIsFollowed = true
}: WriterBannerImageProps) => {
  const style = useThemeAwareObject(customStyle)
  
  const FOLLOW = TranslateConstants({key:TranslateKey.FOLLOW})
  const FOLLOWER = TranslateConstants({key:TranslateKey.FOLLOWER})


  const isPortrait = () => {
    const dim = Dimensions.get('screen');
    return dim.height >= dim.width;
  };

  useEffect(() => {
    setOrientation(isPortrait() ? 'PORTRAIT' : 'LANDSCAPE')
  }, [isFocused])

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

  const SubscribeButton = ({ isFollow }: { isFollow: boolean }) => (
    <TouchableWithoutFeedback testID={'subscribeButton'} style={[style.followContainer,
      { backgroundColor: isFollow ? Styles.color.greenishBlue : Styles.color.aquaHaze, }]}
      onPress={onPressFollow}>
      {
        getSvgImages({
          name: isFollow ? ImagesName.tickIcon : ImagesName.plusGreen,
          size: isFollow ? 16 : 10
        })
      }
      <Label style={[style.followLabel, { color: isFollow ? Styles.color.white : Styles.color.greenishBlue, }]}>
        {isFollow ? FOLLOWER : FOLLOW}</Label>
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
      {/* For Navigation Reference
      <View style={style.rowContainer}>
        {visibleHome && <HomeButton containerStyle={style.homeIconContainer} onPress={onPressHome} />}
        <ReturnButton />
      </View> */}
      <View style={style.contentContainer}>
        <View style={!isTab && { flex: isWriter ? 0.33 : currentOrientation === 'PORTRAIT' ? 0.33 : 0.15 }}>
          <TouchableWithoutFeedback testID={'touchableImage'} onPress={onPressWriter}>
            <View style={isTab ? style.imageTabContainer : style.imageContainer}>
              <Image url={getImageUrl(data.authorImage)}
                type={'round'}
                size={isTab ? 130 : normalize(100)}
                resizeMode={ImageResize.COVER}
                fallback={true}
                fallbackName={ImagesName.authorDefaultName}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={{ 
          flex: isTab ? 1 : 
          isWriter ? 0.67 :currentOrientation === 'PORTRAIT' ? 0.67 : 0.85, paddingStart: normalize(10) }}>
          <View style={style.authorSubscribeView}>
              <View style={style.authorNameView}>
                <TouchableWithoutFeedback testID={'touchableLabel'} onPress={onPressWriter}>
                  <Label style={style.authorName} numberOfLines={2}>{data.authorName}</Label>
                </TouchableWithoutFeedback>
              </View>
            

            {showIsFollowed && <View style={style.subscribeView}>
              <SubscribeButton isFollow={isFollowed} />
            </View>}
          </View>
          <Label style={style.authorDescription}>{decode(decodeHTMLTags(data.authorDescription))}</Label>
          <View style={style.rowContainer}>
            {isNotEmpty(data.instagram_url) && <ButtonImage
              icon={() => getSvgImages({
                name: ImagesName.instagramGray,
                size: normalize(13),
              })}
              onPress={() => openSocialMedia(SocialMediaType.instagram, data.instagram_url)}
              style={style.buttonImageStyle}
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
      paddingBottom:normalize(20),
    },
    contentContainer:{
      flexDirection:'row',
      paddingTop: normalize(5),
    },
    imageContainer:{
      overflow: 'hidden',
      width: normalize(100),
      height: normalize(100),
      borderRadius: normalize(50)
    },
    imageTabContainer: {
      overflow: 'hidden',
      width: 130,
      height: 130,
      borderRadius: 65,
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
      fontFamily: fonts.AwsatDigital_Bold,
      textAlign: 'left',
    },
    authorDescription:{
      fontSize: isTab ? 14 : 13,
      lineHeight: isTab ? 24 : 22,
      textAlign: 'left',
      marginBottom:normalize(15),
      color: theme.primaryBlack,
      fontFamily: fonts.Effra_Arbc_Regular,
    },
    returnLabel: {
      marginStart: normalize(5),
      fontSize: normalize(14),
      lineHeight: normalize(32),
      color: theme.primaryBlack,
      fontFamily: fonts.AwsatDigital_Regular,
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
      marginStart: 2,
      fontFamily: fonts.AwsatDigital_Bold,
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
      top: isAndroid ? 5 : 0,
      right: 5,
    },
    rowContainer: {
      flexDirection: 'row' 
    },
    buttonImageStyle: {
      marginEnd: normalize(30) 
    },
    image: {
       flexDirection: 'row', 
       alignItems: 'center' 
    }
  })
} 
