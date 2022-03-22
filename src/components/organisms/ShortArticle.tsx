import {
  View,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { normalize, screenWidth, timeAgo } from 'src/shared/utils'
import { Styles } from 'src/shared/styles'
import { TextWithFlag, TextWithFlagProps, Image, WidgetHeader, HeaderElementProps, LabelTypeProp, Divider } from '../atoms'
import { ArticleFooter, articleFooterProps } from 'src/components/molecules'
import { ImagesName } from 'src/shared/styles/images';
import { ImageResize } from 'src/shared/styles/text-styles';
import { flatListUniqueKey } from 'src/constants';
import { useTranslation } from 'react-i18next';
import { getImageUrl, isNonEmptyArray } from 'src/shared/utils/utilities';
import { getSvgImages } from 'src/shared/styles/svgImages';
import { useLogin } from 'src/hooks';
import { CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';

export interface ShortArticleProps extends TextWithFlagProps {
  image: string,
  nid: string,
  author: string,
  created: string,
  isBookmarked: boolean
}

export interface ArticleSectionProps {
  data: ShortArticleProps[];
  headerLeft?: HeaderElementProps;
  onPress: (nid: string) => void;
  labelType?: LabelTypeProp;
  onUpdateBookmark: (nid: string, bookmarkStatus: boolean) => void,
  showSignUpPopUp: () => void,
  listKey?: string,
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
    return <TouchableWithoutFeedback onPress={() => onPress(item.nid)}>
      <View key={flatListUniqueKey.SHORT_ARTICLE + index} style={{ paddingBottom: normalize(20) }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 0.70, paddingRight: normalize(5) }}>
            <TextWithFlag {...item} numberOfLines={2} labelType={labelType} />
            <ArticleFooter {...shortArticleFooter} style={{ flex: 1 }}
              onPress={() => checkAndUpdateBookmark(index)}
              isBookmarked={item.isBookmarked}
            />
          </View>
          <View style={{ flex: 0.30, paddingRight: normalize(5), }}>
            <Image fallback url={getImageUrl(item.image)} style={style.image} resizeMode={ImageResize.COVER} />
          </View>
        </View>
        {index < data.length - 1 && <Divider style={style.divider}/>}
      </View>
    </TouchableWithoutFeedback>
  };

  return (
    <View style={style.container}>
      <WidgetHeader headerLeft={headerLeft} />
      <FlatList
        keyExtractor={(_, index) => index.toString()}
        listKey={
          listKey ? listKey : flatListUniqueKey.SHORT_ARTICLE + new Date().getTime().toString()
        }
        data={articleData}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => renderItem(item, index)}
      />
    </View>
  );
};

export default ShortArticle;
const customStyle = (theme: CustomThemeType) => StyleSheet.create({
  container: {
    paddingHorizontal: 0.04 * screenWidth
  },
  image: {
    width: '100%',
    height: normalize(85)
  },
  divider: {
    height: 1,
    backgroundColor: theme.dividerColor,
}
})

