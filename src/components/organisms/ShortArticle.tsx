import {
  View,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { isTab, normalize, screenWidth, timeAgo } from 'src/shared/utils'
import { Styles } from 'src/shared/styles'
import { TextWithFlag, TextWithFlagProps, Image, WidgetHeader, HeaderElementProps, LabelTypeProp, Divider, Label } from '../atoms'
import { ArticleFooter, articleFooterProps } from 'src/components/molecules'
import { ImagesName } from 'src/shared/styles/images';
import { ImageResize } from 'src/shared/styles/text-styles';
import { flatListUniqueKey } from 'src/constants';
import { useTranslation } from 'react-i18next';
import { decodeHTMLTags, getImageUrl, isNonEmptyArray, isNotEmpty } from 'src/shared/utils/utilities';
import { getSvgImages } from 'src/shared/styles/svgImages';
import { useLogin } from 'src/hooks';
import { CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';

export interface ShortArticleProps extends TextWithFlagProps {
  image: string,
  nid: string,
  author: string,
  created: string,
  isBookmarked: boolean;
  body: string
}

export interface ArticleSectionProps {
  data: ShortArticleProps[];
  headerLeft?: HeaderElementProps;
  onPress: (nid: string) => void;
  labelType?: LabelTypeProp;
  onUpdateBookmark: (nid: string, bookmarkStatus: boolean) => void,
  showSignUpPopUp: () => void,
  listKey?: string,
  numColumns?: number,
  addStyle?: StyleProp<ViewStyle>;
  showBody?: boolean;
  leftContainerStyle?: StyleProp<ViewStyle>
  imageStyleProp?: StyleProp<ViewStyle>
  orientation?: string,
  isFooterOutside?: boolean
}

export const shortArticleFooter: articleFooterProps = {
  leftIcon: () => {
    return getSvgImages({
      name: ImagesName.clock,
      size: normalize(12),
      style: { marginRight: normalize(5) }
    })
  },
  leftTitleColor: Styles.color.silverChalice,
  rightTitleColor: Styles.color.silverChalice,
};

const ShortArticle = ({ data, headerLeft, onPress,
  labelType = LabelTypeProp.h3,
  onUpdateBookmark,
  showSignUpPopUp,
  listKey,
  numColumns = 1,
  addStyle,
  showBody = false,
  leftContainerStyle,
  imageStyleProp,
  orientation,
  isFooterOutside = false
}: ArticleSectionProps) => {
  const [t] = useTranslation();
  const { isLoggedIn } = useLogin()
  const style = useThemeAwareObject(customStyle);
  const [articleData, setArticleData] = useState(data)

  useEffect(() => {
    updateData()
  }, [data])

  const updateData = () => {
    isNonEmptyArray(data) && setArticleData(data)
  }

  const onPressBookmark = (index: number) => {
    const updatedData = [...articleData]
    const bookmarkStatus = !updatedData[index]?.isBookmarked ?? true
    updatedData[index].isBookmarked = bookmarkStatus
    setArticleData(updatedData)
    onUpdateBookmark(updatedData[index].nid, bookmarkStatus)
  }

  const checkAndUpdateBookmark = (index: number) => {
    isLoggedIn ? onPressBookmark(index) : showSignUpPopUp()
  }

  const renderItem = (item: ShortArticleProps, index: number) => {
    shortArticleFooter.rightTitle = t(timeAgo(item.created))
    shortArticleFooter.leftTitle = item.author

    const cardStyle = (numColumns > 1 && index % 2 == 0) ? {marginRight: normalize(20)} : {}
    const showDivider = (numColumns == 1 && index < data.length - 1 || (isTab && numColumns > 1 && index < data.length - 2))
    const imageStyle = (orientation === 'LANDSCAPE-LEFT' || orientation === 'LANDSCAPE-RIGHT') ? style.imageLandscape : style.image
    const imageContainerStyle = (orientation === 'LANDSCAPE-LEFT' || orientation === 'LANDSCAPE-RIGHT') ? style.imageContainerLandscape : style.imageContainer
    return <TouchableWithoutFeedback onPress={() => onPress(item.nid)}>
      <View key={flatListUniqueKey.SHORT_ARTICLE + index}
        style={StyleSheet.flatten([style.cardContainer, cardStyle])}>
        <View style={{ flexDirection: 'row' }}>
          <View style={[style.footerStyle, leftContainerStyle]}>
            <TextWithFlag {...item} numberOfLines={2} labelType={labelType} />
            {isNotEmpty(item.body) && showBody &&
              <Label labelType={LabelTypeProp.p3}
                children={decodeHTMLTags(item.body)}
                color={Styles.color.davyGrey}
                numberOfLines={2}
              />
            }
            {!isFooterOutside && <View style={style.footerContainer}>
              <ArticleFooter {...shortArticleFooter} style={{ flex: 1 }}
                onPress={() => checkAndUpdateBookmark(index)}
                isBookmarked={item.isBookmarked}
              />
            </View>}
          </View>
          <View style={[imageContainerStyle, imageStyleProp]}>
            <Image fallback url={getImageUrl(item.image)} style={imageStyle} resizeMode={ImageResize.COVER} />
          </View>
        </View>
        {isFooterOutside && <View style={style.outsideFooterContainer}>
              <ArticleFooter {...shortArticleFooter} style={{ flex: 1 }}
                onPress={() => checkAndUpdateBookmark(index)}
                isBookmarked={item.isBookmarked}
              />
            </View>}
        {showDivider && <Divider style={style.divider}/>}
      </View>
    </TouchableWithoutFeedback>
  };

  return (
    <View style={[style.container, addStyle]}>
      <WidgetHeader headerLeft={headerLeft} widgetHeaderStyle={{}} />
      <FlatList
        keyExtractor={(_, index) => index.toString()}
        listKey={
          listKey ? listKey : flatListUniqueKey.SHORT_ARTICLE + new Date().getTime().toString()
        }
        data={articleData}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => renderItem(item, index)}
        numColumns={numColumns}
      />
    </View>
  );
};

export default ShortArticle;
const customStyle = (theme: CustomThemeType) => StyleSheet.create({
  container: {
    paddingHorizontal: (isTab ? 0 : 0.04) * screenWidth,
    paddingBottom: normalize(20)
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageLandscape: {
    width: '100%',
    height: 'auto',
    aspectRatio: 16/9
  },
  divider: {
    height: 1,
    backgroundColor: theme.dividerColor,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%'
  },
  outsideFooterContainer: {
    marginTop: normalize(10),
    width: '100%'
  },
  footerStyle: {
    flex: 0.70,
    paddingRight: normalize(12)
  },
  cardContainer: {
    paddingBottom: normalize(20),
    flex: 1,
  },
  imageContainer: {
    flex: 0.30, 
    width: normalize(98),
    height: normalize(65),
  },
  imageContainerLandscape: {
    flex: 0.30, 
    paddingRight: normalize(5),
  }
})

