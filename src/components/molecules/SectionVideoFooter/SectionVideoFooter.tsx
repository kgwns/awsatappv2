import React, {useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { normalize } from 'react-native-elements'
import { Styles } from '../../../shared/styles'
import { ButtonImage, Image } from '../../atoms'
import { ImagesName } from '../../../shared/styles/images'
import FooterCaptionWithImage from 'src/components/atoms/footerCaptionWithImage/FooterCaptionWithImage'
import { BookMarkColorType } from '../articleFooter/ArticleFooter'
import { getSvgImages } from 'src/shared/styles/svgImages'
import { useTheme } from 'src/shared/styles/ThemeProvider'

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
  bookMarkColorType?: string,
  addBookMark?: boolean
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
  bookMarkColorType = BookMarkColorType.BLACK
}: SectionVideoFooterProps) => {
  
  const [saveState, setSaveState] = useState(false)
  const theme = useTheme()
  let storySaveIcon = saveState ? ImagesName.bookmarkActive : ImagesName.blackBdrBookMark

  if(bookMarkColorType == BookMarkColorType.WHITE) {
    storySaveIcon = saveState ? ImagesName.bookMarkActiveWhite : ImagesName.bookMarkWhiteBdr
  }

  const onPressSave = () => {
    setSaveState(!saveState)
  }

  return (
    <View style={{ ...SectionVideoFooterStyle.container, ...style }}>
      <View style={{ flexDirection: 'row' }}>
                     <FooterCaptionWithImage title={leftTitle} icon={leftIcon} color={leftTitleColor} subTitle={leftViews} subTitleColor={leftViewsColor} />
                     <Text children={'|'} style={SectionVideoFooterStyle.verticalDivider} />
                     <FooterCaptionWithImage title={rightTitle} icon={rightIcon} color={rightTitleColor} subTitle={rightDate} subTitleColor={rightDateColor} />
    </View>
    {addBookMark && 
      <ButtonImage
            testId={'bookmarkTestId'}
            icon={() => {
              return saveState
                ? getSvgImages({
                    name: ImagesName.bookMarkBlackFillSVG,
                    size: normalize(20),
                    fill: theme.themeData.primaryBlack,
                  })
                : getSvgImages({
                    name: ImagesName.bookMarkBlackBdrSVG,
                    size: normalize(20),
                    fill: theme.themeData.primaryBlack,
                  });
            }}
            onPress={onPressSave}
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
    paddingRight: normalize(7),
  },
  footerTextStyle: {
    fontSize:normalize(11), 
    paddingLeft: normalize(5),
  },
})
