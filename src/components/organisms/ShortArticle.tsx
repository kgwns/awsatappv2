import { View, StyleSheet, FlatList, TouchableWithoutFeedback } from 'react-native'
import React from 'react';
import { normalize, screenWidth } from 'src/shared/utils'
import { Styles } from 'src/shared/styles'
import { TextWithFlag, Divider, TextWithFlagProps, Image, WidgetHeader, HeaderElementProps } from '../atoms'
import { ArticleFooter, articleFooterProps } from 'src/components/molecules'
import { ImagesName } from 'src/shared/styles/images';
import { ImageResize } from 'src/shared/styles/text-styles';
import { flatListUniqueKey } from 'src/constants';
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { ScreensConstants } from 'src/constants'

export interface ShortArticleProps extends TextWithFlagProps {
  image: string,
  nid?: string
}

export interface ArticleSectionProps {
  data: ShortArticleProps[],
  headerLeft?: HeaderElementProps,
}


export const shortArticleFooterSample: articleFooterProps = {
  leftTitle: 'يتحمل',
  leftIcon: ImagesName.clock,
  leftTitleColor: Styles.color.silverChalice,
  rightTitle: 'وتمجيد',
  rightTitleColor: Styles.color.silverChalice
}

const ShortArticle = ({ data, headerLeft }: ArticleSectionProps) => {
  const navigation = useNavigation<StackNavigationProp<any>>()

  const renderItem = (item: ShortArticleProps, index: number) => {
    const isLasIndex = index < data.length - 1

    const onPress = () => {
      if (item.nid) {
        navigation.navigate(ScreensConstants.ARTICLE_DETAIL_SCREEN, { nid: item.nid })
      }
    }

    return <TouchableWithoutFeedback onPress={onPress}>
      <View key={flatListUniqueKey.SHORT_ARTICLE + index} style={{ paddingBottom: normalize(20) }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1, paddingRight: normalize(15) }}>
            <TextWithFlag {...item} numberOfLines={2} />
            <View style={ShortArticleStyle.footerContainer}>
              <ArticleFooter {...shortArticleFooterSample} />
            </View>
          </View>
          <Image url={item.image} style={{ width: normalize(110), height: normalize(85) }} resizeMode={ImageResize.COVER} />
        </View>
        {(isLasIndex) && <Divider />}
      </View>
    </TouchableWithoutFeedback>
  }

  return (
    <View style={ShortArticleStyle.container}>
      <WidgetHeader headerLeft={headerLeft} />
      <FlatList
        style={ShortArticleStyle.listContainer}
        keyExtractor={(_, index) => index.toString()}
        listKey={flatListUniqueKey.SHORT_ARTICLE + new Date().getTime().toString()}
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => renderItem(item, index)}
      />
    </View>
  );
};

export default ShortArticle

const ShortArticleStyle = StyleSheet.create({
  container: {
    paddingHorizontal: 0.04 * screenWidth
  },
  listContainer: {

  },
  footerContainer: {
    flex: 1,
    width: '100%',
    position: 'absolute',
    left: 0,
    bottom: 0
  }
})

