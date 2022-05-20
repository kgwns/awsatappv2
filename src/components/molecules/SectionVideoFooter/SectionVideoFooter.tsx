import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { normalize } from 'react-native-elements'
import { Styles } from '../../../shared/styles'
import { ButtonImage } from '../../atoms'
import { ImagesName } from '../../../shared/styles/images'
import FooterCaptionWithImage from 'src/components/atoms/footerCaptionWithImage/FooterCaptionWithImage'
import { getSvgImages } from 'src/shared/styles/svgImages'
import { isIOS, isTab } from 'src/shared/utils'
import { fonts } from 'src/shared/styles/fonts'

export interface SectionVideoFooterProps {
  leftTitle?: string,
  leftIcon?: () => void,
  leftViews?: string
  leftTitleColor?: string,
  leftViewsColor?: string,
  rightTitle?: string,
  rightIcon?: () => void,
  rightDate?: string,
  rightTitleColor?: string,
  style?: object,
  rightDateColor?: string,
  addBookMark?: boolean
  isBookmarked: boolean
  onPressBookmark: () => void
}

const SectionVideoFooter = ({
  leftTitle,
  leftIcon,
  leftViews,
  leftViewsColor,
  leftTitleColor,
  rightTitle,
  rightIcon,
  rightTitleColor,
  rightDateColor,
  rightDate,
  style,
  addBookMark,
  isBookmarked,
  onPressBookmark,
}: SectionVideoFooterProps) => {
  const bookmarkIcon = isBookmarked ? ImagesName.bookMarkActiveSVG : ImagesName.bookMarkSVG
  return (
    <View style={{ ...SectionVideoFooterStyle.container, ...style }}>
      <View style={{ flexDirection: 'row' }}>
        {(leftTitle || leftViews) && <View style={SectionVideoFooterStyle.leftViewStyle}><FooterCaptionWithImage title={leftTitle} icon={leftIcon}
          color={leftTitleColor}
          subTitle={leftViews}
          subTitleColor={leftViewsColor}
          labelStyle={SectionVideoFooterStyle.leftStyle}
        /></View>}
        {(leftTitle || leftViews) && (rightDate || rightTitle) && <Text children={'|'} style={SectionVideoFooterStyle.verticalDivider} />}
        {(rightDate || rightTitle) && <FooterCaptionWithImage labelStyle={SectionVideoFooterStyle.rightTitleStyle} title={rightTitle} icon={rightIcon} color={rightTitleColor} subTitle={rightDate} subTitleColor={rightDateColor} />}
      </View>
    {addBookMark && 
      <ButtonImage
            testId={'bookmarkTestId'}
            icon={() => {
              return getSvgImages({
                name: bookmarkIcon,
                width: 10,
                height: 15
              });
            }}
            onPress={onPressBookmark}
          />
    }
    </View>
  )
}

export default SectionVideoFooter

const SectionVideoFooterStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: normalize(5)
  },
  verticalDivider: {
    color: Styles.color.silverChalice,
    paddingHorizontal: normalize(10),
  },
  footerTextStyle: {
    fontSize:normalize(11), 
    paddingLeft: normalize(5),
  },
  leftStyle: {
    paddingRight: normalize(4),
    fontFamily: fonts.AwsatDigitalBetav10_Bold,
    paddingLeft: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  leftViewStyle: {
    maxWidth: isTab ? '80%' : '60%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  rightTitleStyle: {
    fontFamily: fonts.IBMPlexSansArabic_Regular,
    fontSize: isTab ? normalize(11) : normalize(11)
  }
})
