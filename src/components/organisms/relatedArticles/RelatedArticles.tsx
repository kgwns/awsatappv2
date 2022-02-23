import { View, FlatList, StyleSheet } from 'react-native';
import React from 'react';
import { normalize, screenWidth } from 'src/shared/utils'
import { flatListUniqueKey } from 'src/constants'
import { ArticleItem } from 'src/components/molecules'
import { articleProps } from '..';
import { ImagesName, Styles } from 'src/shared/styles';
import { HeaderElementProps, LabelTypeProp, WidgetHeader } from 'src/components/atoms';
import { CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { getSvgImages } from 'src/shared/styles/svgImages';

const sampleRelatedArticle: articleProps = {
  image: 'https://picsum.photos/200/300',
  title: `واشنطن تعيد فتح ملف خاطفي الرهائن الأميركيين في بيروت`,
  footerInfo: {
    rightTitle: '3 د قرادة ',
    leftTitle: 'من ساعاتان',
    leftIcon: () => {return getSvgImages({
      name: ImagesName.clock,
      size: normalize(12),
      style: { marginRight: normalize(5) }
  })},
    hideBookmark: true
  },
  flag: 'العالم',
  flagColor: Styles.color.greenishBlue,
  barColor: Styles.color.greenishBlue,
  labelType: LabelTypeProp.h3,
  nid: '',
  author: '',
  created: ''
}

const relatedShortArticleHeaderLeft: HeaderElementProps = {
  title: 'مقالات ذات صلة',
  labelType: LabelTypeProp.h2,
  color: Styles.color.greenishBlue
}


const data: articleProps[] = Array(5).fill(sampleRelatedArticle)

const RelatedArticles = () => {
  const style = useThemeAwareObject(customStyle)
  const renderItem = (item: articleProps, index: number) => {
    return <ArticleItem {...item} showDivider={false} index={index}
      articleItemStyle={style.itemStyle}
      imageStyle={style.itemImage}
    />
  }

  const headerComponent = () => (
    <WidgetHeader headerLeft={relatedShortArticleHeaderLeft} />
  )

  return (
    <View style={style.container}>
      {headerComponent()}
      <FlatList
        horizontal={true}
        keyExtractor={(_, index) => index.toString()}
        listKey={flatListUniqueKey.RELATED_ARTICLE_WIDGET}
        data={data}
        renderItem={({ item, index }) => renderItem(item, index)}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default RelatedArticles;

const customStyle = (theme: CustomThemeType) => {
  return StyleSheet.create({
    container: {
      paddingHorizontal: 0.04 * screenWidth,
      backgroundColor: theme.secondaryGreen
    },
    itemStyle: {
      width: normalize(186),
      marginRight: normalize(15)
    },
    itemImage: {
      width: '100%',
      height: normalize(108)
    }
  })
}
