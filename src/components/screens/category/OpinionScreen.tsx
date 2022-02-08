import React from 'react';
import {StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {
  OpinionWritersArticlesSection,
  OpinionWritersSection,
} from 'src/components/organisms';
import {
  opinionWritersArticlesData,
  opinionWritersData,
} from 'src/constants/SampleData';
import {CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';

export const OpinionScreen = () => {
  const style = useThemeAwareObject(customStyle);
  const renderItem = () => (
    <View>
      <OpinionWritersSection data={opinionWritersData} />
      <OpinionWritersArticlesSection data={opinionWritersArticlesData} />
    </View>
  );

  return (
    <View style={style.container}>
      <FlatList
        data={[{}]}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({}) => renderItem()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const customStyle = (theme: CustomThemeType) => {
  const OpinionScreenStyle = StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundColor,
    },
  });
  return OpinionScreenStyle;
};
