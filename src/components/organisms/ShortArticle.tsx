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

interface shortArticleProps {
  image: string,
  title: string
}

const shortArticleData: shortArticleProps[] = [
  {
    image: 'https://picsum.photos/200/300',
    title: `Punjab CM Channi says ED raids meant to frame him`
  },
  {
    image: 'https://picsum.photos/200/300',
    title: `India vs South Africa LIVE: On-song Bavuma`
  },
  {
    image: 'https://picsum.photos/200/300',
    title: `Punjab CM Channi says ED raids meant to frame him`
  },
  {
    image: 'https://picsum.photos/200/300',
    title: `India vs South Africa LIVE: On-song Bavuma`
  }
]

const shortArticleFooterSample: articleFooterProps = {
  leftTitle: '3hour ago',
  leftIcon: ImagesName.clock,
  leftTitleColor: Styles.color.greyDark,
  rightTitle: 'Author',
  rightTitleColor: Styles.color.greyDark
}

const ShortArticle = () => {
  const renderItem = (item: shortArticleProps, index: number) => {
    return <View>
      <View style={{ flexDirection: 'row' }}>
        <Image url={item.image} size={normalize(80)} />
        <View style={{ flex: 1, paddingLeft: normalize(15) }}>
          <Label labelType={LabelTypeProp.h3} children={item.title} />
          <ArticleFooter {...shortArticleFooterSample} />
        </View>
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

  }
})

