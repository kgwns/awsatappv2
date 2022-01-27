import { View, StyleSheet, FlatList } from 'react-native'
import React from 'react';
import { Image } from '../atoms/image/Image'
import { normalize, screenWidth } from '../../shared/utils'
import { Styles } from '../../shared/styles'
import { TextWithFlag, Divider } from '../atoms'
import { ArticleFooter } from '../molecules'
import { articleFooterProps } from '../molecules/articleFooter/ArticleFooter'
import { ImagesName } from '../../shared/styles/images';
import { ImageResize } from '../../shared/styles/text-styles';
import { flatListUniqueKey } from '../../constants';
import { ShortArticleProps } from '../../constants/types'

const shortArticleFooterSample: articleFooterProps = {
  leftTitle: 'يتحمل',
  leftIcon: ImagesName.clock,
  leftTitleColor: Styles.color.silverChalice,
  rightTitle: 'وتمجيد',
  rightTitleColor: Styles.color.silverChalice
}

const ShortArticle = ({ data }: { data: ShortArticleProps[] }) => {
  const renderItem = (item: ShortArticleProps, index: number) => {
    return <View key={flatListUniqueKey.SHORT_ARTICLE + index}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1, paddingRight: normalize(15) }}>
          <TextWithFlag
            title={item.title} titleColor={item.titleColor}
            flag={item.flag} flagColor={item.flagColor}
            barColor={item.barColor} numberOfLines={2}
            labelType={item.labelType}
          />
          <View style={ShortArticleStyle.footerContainer}>
            <ArticleFooter {...shortArticleFooterSample} />
          </View>
        </View>
        <Image url={item.image} style={{ width: normalize(110), height: normalize(85) }} resizeMode={ImageResize.COVER} />
      </View>
      <Divider />
    </View>
  }

  return (
    <View style={ShortArticleStyle.container}>
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

