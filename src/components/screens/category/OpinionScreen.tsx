import React from 'react';
import {View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {
  OpinionWritersArticlesSection,
  OpinionWritersSection,
} from 'src/components/organisms';
import {
  opinionWritersArticlesData,
  opinionWritersData,
} from 'src/constants/SampleData';

export const OpinionScreen = () => {
  const renderItem = () => (
    <View>
      <OpinionWritersSection data={opinionWritersData} />
      <OpinionWritersArticlesSection data={opinionWritersArticlesData} />
    </View>
  );

  return (
    <View>
      <FlatList
        data={[{}]}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({}) => renderItem()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
