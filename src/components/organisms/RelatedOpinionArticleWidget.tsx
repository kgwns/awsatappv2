import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {normalize, screenWidth} from 'src/shared/utils';
import {Label} from '../atoms';
import {Divider} from 'src/components/atoms';
import {RelatedOpinionCard} from '../molecules/RelatedOpinionCard';
import {useTranslation} from 'react-i18next';

export const RelatedOpinionArticlesWidget = () => {
  const style = useThemeAwareObject(customStyle);
  const data = [{}, {}, {}, {}];
  const [t] = useTranslation();

  const renderItem = (item: any, index: number) => (
    <View style={style.item}>
      <RelatedOpinionCard />
      {data.length - 1 != index && <Divider style={style.itemDivider} />}
    </View>
  );

  const headerComponent = () => (
    <Label style={style.header}>
      {t('opinionArticleDetail.relatedOpinionTitle')}
    </Label>
  );

  return (
    <View>
      <View style={style.conatiner}>
        {headerComponent()}
        <FlatList
          data={data}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item, index}) => renderItem(item, index)}
          showsVerticalScrollIndicator={false}
          bounces={false}
        />
      </View>
      <Divider style={style.divider} />
    </View>
  );
};

const customStyle = (theme: CustomThemeType) => {
  const RelatedOpinionArticlesWidgetStyle = StyleSheet.create({
    conatiner: {
      backgroundColor: theme.backgroundColor,
      paddingTop: 0.03 * screenWidth,
      paddingHorizontal: 0.03 * screenWidth,
    },
    header: {
      textAlign: 'left',
      fontSize: normalize(16),
      lineHeight: normalize(42),
      fontWeight: 'bold',
      color: theme.primary,
      paddingBottom: 0.02 * screenWidth,
    },
    item: {
      paddingTop: 0.03 * screenWidth,
    },
    divider: {
      marginTop: normalize(20),
    },
    itemDivider: {
      marginTop: normalize(5),
    },
  });
  return RelatedOpinionArticlesWidgetStyle;
};
