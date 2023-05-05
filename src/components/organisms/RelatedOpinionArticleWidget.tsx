import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { isTab, normalize, screenWidth } from 'src/shared/utils';
import { Label } from '../atoms';
import { Divider } from 'src/components/atoms';
import { RelatedOpinionCard } from '../molecules/RelatedOpinionCard';
import { OpinionsListItemType } from 'src/redux/opinionArticleDetail/types';
import { useTheme } from 'src/shared/styles/ThemeProvider';
import { isNotEmpty } from 'src/shared/utils/utilities'
import { fonts } from 'src/shared/styles/fonts';
import { TranslateConstants, TranslateKey } from '../../constants/Constants';

interface RelatedOpinionArticlesWidgetProps {
  data: OpinionsListItemType[];
  onScroll: () => void;
  isLoading: boolean;
  onPress: (nid: string) => void;
  togglePlayback?: (nid: string, mediaData: any)=> void,
  selectedTrack?: string,
}

export const RelatedOpinionArticlesWidget = ({ data, onScroll, isLoading, onPress, togglePlayback, selectedTrack }: RelatedOpinionArticlesWidgetProps) => {
  const style = useThemeAwareObject(customStyle);
  const RELATED_OPINION_TITLE = TranslateConstants({key:TranslateKey.OPINION_ARTICLE_DETAIL_RELATED_OPINION_TITLE})
  const theme = useTheme();
  const renderItem = (item: OpinionsListItemType, index: number) => (
    <View style={style.item}>
      <RelatedOpinionCard item={item} mediaVisibility={item.field_jwplayer_id_opinion_export ? isNotEmpty(item.field_jwplayer_id_opinion_export) : isNotEmpty(item.jwplayer)} 
        togglePlayback={togglePlayback} selectedTrack={selectedTrack} 
        jwPlayerID={isNotEmpty(item.field_jwplayer_id_opinion_export) ? item.field_jwplayer_id_opinion_export : (isNotEmpty(item.jwplayer) ? item.jwplayer : null)}
        onPress={() => onPress(item.nid)} 
      />
      {data.length - 1 !== index && <Divider style={style.itemDivider} />}
      {isLoading && data.length - 1 === index && (
        <View style={style.loaderStyle}>
          <ActivityIndicator size={'small'} color={theme.themeData.primary} />
        </View>
      )}
    </View>
  );

  const headerComponent = () => (
    <Label style={style.header}>
      {RELATED_OPINION_TITLE}
    </Label>
  );

  return (
    <View>
      <View style={style.container}>
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
  return StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundColor,
      paddingTop: 0.03 * screenWidth,
      paddingHorizontal: (isTab ? 0.02 : 0.04) * screenWidth,
    },
    header: {
      textAlign: 'left',
      fontSize: normalize(20),
      lineHeight: normalize(42),
      fontFamily: fonts.AwsatDigital_Bold,
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
    loaderStyle: {
       margin: normalize(28) 
    }
  });
};
