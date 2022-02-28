import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {normalize, screenWidth} from 'src/shared/utils';
import {useTheme} from 'src/shared/styles/ThemeProvider';
import {Label} from '../atoms';
import {Divider} from 'src/components/atoms';
import {RelatedOpinionCard} from '../molecules/RelatedOpinionCard';

export const RelatedOpinionArticlesWidget = () => {
  const style = useThemeAwareObject(customStyle);
  const {themeData} = useTheme();
  const data = [{}, {}, {}, {}];

  const renderItem = (item: any, index: number) => (
    <View style={{paddingTop: normalize(0.03 * screenWidth)}}>
      <RelatedOpinionCard />
      {data.length - 1 != index && (
        <Divider style={{marginTop: normalize(5)}} />
      )}
    </View>
  );

  const headerComponent = () => (
    <Label style={style.header}>مقالات ذات صلة</Label>
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
      <Divider style={{marginTop: normalize(20)}} />
    </View>
  );
};

const customStyle = (theme: CustomThemeType) => {
  const RelatedOpinionArticlesWidgetStyle = StyleSheet.create({
    conatiner: {
      backgroundColor: theme.backgroundColor,
      paddingTop: normalize(0.03 * screenWidth),
      paddingHorizontal: normalize(0.03 * screenWidth),
    },
    header: {
      textAlign: 'left',
      fontSize: normalize(16),
      lineHeight: normalize(42),
      fontWeight: 'bold',
      color: theme.primary,
      paddingBottom: 0.02 * screenWidth,
    },
  });
  return RelatedOpinionArticlesWidgetStyle;
};
