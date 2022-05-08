import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { isTab, normalize, screenWidth } from 'src/shared/utils';
import { Label } from '../atoms';
import { Divider } from 'src/components/atoms';
import { RelatedOpinionCard } from '../molecules/RelatedOpinionCard';
import { useTranslation } from 'react-i18next';
import { OpinionsListItemType } from 'src/redux/opinionArticleDetail/types';
import { useTheme } from 'src/shared/styles/ThemeProvider';
import { isNotEmpty } from 'src/shared/utils/utilities'
import { fonts } from 'src/shared/styles/fonts';

interface RelatedOpinionArticlesWidgetProps {
  data: OpinionsListItemType[];
  onScroll: () => void;
  isLoading: boolean;
  onPress: (nid: string) => void;
}

export const RelatedOpinionArticlesWidget = ({ data, onScroll, isLoading, onPress }: RelatedOpinionArticlesWidgetProps) => {
  const style = useThemeAwareObject(customStyle);
  const [t] = useTranslation();
  const theme = useTheme();

  const renderItem = (item: OpinionsListItemType, index: number) => (
    <View style={style.item}>
      <RelatedOpinionCard item={item} mediaVisibility={isNotEmpty(item.jwplayer)} onPress={() => onPress(item.nid)} />
      {data.length - 1 != index && <Divider style={style.itemDivider} />}
      {isLoading && data.length - 1 == index && (
        <View style={{ margin: normalize(28) }}>
          <ActivityIndicator size={'small'} color={theme.themeData.primary} />
        </View>
      )}
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
          renderItem={({ item, index }) => renderItem(item, index)}
          onEndReached={onScroll}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.5}
          bounces={false}
        />
      </View>
    </View>
  );
};

const customStyle = (theme: CustomThemeType) => {
  const RelatedOpinionArticlesWidgetStyle = StyleSheet.create({
    conatiner: {
      backgroundColor: theme.backgroundColor,
      paddingTop: 0.03 * screenWidth,
      paddingHorizontal: (isTab ? 0.02 : 0.04) * screenWidth,
    },
    header: {
      textAlign: 'left',
      fontSize: normalize(20),
      lineHeight: normalize(42),
      fontFamily: fonts.AwsatDigitalBetav10_Bold,
      color: theme.primary,
      paddingBottom: 0.02 * screenWidth,
    },
    item: {
      paddingTop: 0.07 * screenWidth,
    },
    divider: {
      marginTop: normalize(20),
    },
    itemDivider: {
      height: 1,
      backgroundColor: theme.dividerColor
    },
  });
  return RelatedOpinionArticlesWidgetStyle;
};
