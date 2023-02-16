import { View, FlatList, StyleSheet } from 'react-native';
import React from 'react';
import { normalize, screenWidth } from 'src/shared/utils'
import { flatListUniqueKey, TranslateConstants, TranslateKey } from 'src/constants/Constants'
import { ArticleItem } from 'src/components/molecules'
import { ArticleProps } from '..';
import { ImagesName, Styles } from 'src/shared/styles';
import { HeaderElementProps, LabelTypeProp, WidgetHeader } from 'src/components/atoms';
import { CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { getSvgImages } from 'src/shared/styles/svgImages';

const RelatedArticles = () => {
  const style = useThemeAwareObject(customStyle)
  const RELATED_ARTICLE_HEADER_LEFT = TranslateConstants({ key: TranslateKey.RELATED_ARTICLE_HEADER_LEFT });
  const RELATED_ARTICLE_TITLE = TranslateConstants({ key: TranslateKey.RELATED_ARTICLE_TITLE });
  const RELATED_ARTICLE_RIGHT_TITLE = TranslateConstants({ key: TranslateKey.RELATED_ARTICLE_RIGHT_TITLE });
  const RELATED_ARTICLE_LEFT_TITLE = TranslateConstants({ key: TranslateKey.RELATED_ARTICLE_LEFT_TITLE });
  const RELATED_ARTICLE_FLAG = TranslateConstants({ key: TranslateKey.RELATED_ARTICLE_FLAG });

  const sampleRelatedArticle: ArticleProps = {
    image: 'https://picsum.photos/200/300',
    title: RELATED_ARTICLE_TITLE,
    footerInfo: {
      rightTitle: RELATED_ARTICLE_RIGHT_TITLE,
      leftTitle: RELATED_ARTICLE_LEFT_TITLE,
      leftIcon: () => {
        return getSvgImages({
          name: ImagesName.clock,
          size: normalize(12),
          style: { marginRight: normalize(7) }
        })
      },
      hideBookmark: true
    },
    flag: RELATED_ARTICLE_FLAG,
    flagColor: Styles.color.greenishBlue,
    barColor: Styles.color.greenishBlue,
    labelType: LabelTypeProp.h3,
    nid: '',
    author: '',
    created: ''
  }
  const relatedShortArticleHeaderLeft: HeaderElementProps = {
    title: RELATED_ARTICLE_HEADER_LEFT,
    labelType: LabelTypeProp.h2,
    color: Styles.color.greenishBlue
  }
  const data: ArticleProps[] = Array(5).fill(sampleRelatedArticle)
  const renderItem = (item: ArticleProps, index: number) => {
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
