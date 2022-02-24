import {
  View,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import { normalize, screenWidth, timeAgo } from 'src/shared/utils'
import { Styles } from 'src/shared/styles'
import { TextWithFlag, Divider, TextWithFlagProps, Image, WidgetHeader, HeaderElementProps, LabelTypeProp } from '../atoms'
import { ArticleFooter, articleFooterProps } from 'src/components/molecules'
import { ImagesName } from 'src/shared/styles/images';
import { ImageResize } from 'src/shared/styles/text-styles';
import { flatListUniqueKey } from 'src/constants';
import { FROM_TWO_HOURS } from 'src/constants/SharedConstants';
import { useTranslation } from 'react-i18next';
import { getImageUrl } from 'src/shared/utils/utilities';
import { getSvgImages } from 'src/shared/styles/svgImages';

export interface ShortArticleProps extends TextWithFlagProps {
  image: string,
  nid: string,
  author: string,
  created: string
}

export interface ArticleSectionProps {
  data: ShortArticleProps[];
  headerLeft?: HeaderElementProps;
  onPress: (nid: string) => void;
  labelType?: LabelTypeProp;
}

export const shortArticleFooter: articleFooterProps = {
  leftTitle: FROM_TWO_HOURS,
  leftIcon: () => {return getSvgImages({
    name: ImagesName.clock,
    size: normalize(12),
    style: { marginRight: normalize(5) }
})},
  leftTitleColor: Styles.color.silverChalice,
  rightTitleColor: Styles.color.silverChalice,
};

const ShortArticle = ({ data, headerLeft,onPress,labelType=LabelTypeProp.h3 }: ArticleSectionProps) => {
  const [t] = useTranslation();

  const renderItem = (item: ShortArticleProps, index: number) => {
    shortArticleFooter.rightTitle =t(timeAgo(item.created)) 
    shortArticleFooter.leftTitle = item.author
    const isLasIndex = index < data.length - 1
    return <TouchableWithoutFeedback onPress={() => onPress(item.nid)}>
      <View key={flatListUniqueKey.SHORT_ARTICLE + index} style={{ paddingBottom: normalize(20) }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 0.70, paddingRight: normalize(5) }}>
            <TextWithFlag {...item} numberOfLines={2} labelType={labelType}/>
            <ArticleFooter {...shortArticleFooter} style={{flex:1}} />
          </View>
          <View style={{ flex: 0.30, paddingRight: normalize(5), }}>
            <Image url={getImageUrl(item.image)} style={ShortArticleStyle.image} resizeMode={ImageResize.COVER} />
          </View>
        </View>
        </View>
      </TouchableWithoutFeedback>
  };

  return (
    <View style={ShortArticleStyle.container}>
      <WidgetHeader headerLeft={headerLeft} />
      <FlatList
        keyExtractor={(_, index) => index.toString()}
        listKey={
          flatListUniqueKey.SHORT_ARTICLE + new Date().getTime().toString()
        }
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => renderItem(item, index)}
      />
    </View>
  );
};

export default ShortArticle;

const ShortArticleStyle = StyleSheet.create({
  container: {
    paddingHorizontal: 0.04 * screenWidth
  },
  image: {
    width: '100%',
    height: normalize(85)
  }
})

