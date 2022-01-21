import { View, StyleSheet, FlatList } from 'react-native'
import React from 'react';
import { Image } from '../atoms/image/Image'
import { normalize, screenWidth } from '../../shared/utils'
import { Divider } from '../atoms/divider/Divider'
import { Styles } from '../../shared/styles'
import { Label, LabelTypeProp } from '../atoms'
import { ArticleFooter } from '../molecules'
import { articleFooterProps } from '../molecules/articleFooter/ArticleFooter'
import { ImagesName } from '../../shared/styles/images';
import { ImageResize } from '../../shared/styles/text-styles';

interface shortArticleProps {
  image: string,
  title: string
}

const shortArticleData: shortArticleProps[] = [
  {
    image: 'https://picsum.photos/200/300',
    title: `لكن لا بد أن أوضح لك أن كل هذه الأفكار المغلوطة حول استنكار `,
  },
  {
    image: 'https://picsum.photos/200/300',
    title: `لكن لا بد أن أوضح لك أن كل هذه الأفكار المغلوطة حول استنكار `,
  },
  {
    image: 'https://picsum.photos/200/300',
    title: `لكن لا بد أن أوضح لك أن كل هذه الأفكار المغلوطة حول استنكار `,
  },
  {
    image: 'https://picsum.photos/200/300',
    title: `لكن لا بد أن أوضح لك أن كل هذه الأفكار المغلوطة حول استنكار `,
  }
]

const shortArticleFooterSample: articleFooterProps = {
  leftTitle: 'يتحمل',
  leftIcon: ImagesName.clock,
  leftTitleColor: Styles.color.silverChalice,
  rightTitle: 'وتمجيد',
  rightTitleColor: Styles.color.silverChalice
}

const ShortArticle = () => {
  const renderItem = (item: shortArticleProps, index: number) => {
    return <View>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1, paddingRight: normalize(15) }}>
          <Label labelType={LabelTypeProp.h3} children={item.title} numberOfLines={2} />
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
        data={shortArticleData}
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

