import React from 'react';
import {View, FlatList} from 'react-native';
import { ScreenContainer } from '..';
import { PodcastProgramInfo } from 'src/components/organisms';
import {PodcastProgramInfoData} from 'src/constants/SampleData';

export const PodcastProgram = () => {

  const renderItem = () => (
    <View>
      <PodcastProgramInfo data={PodcastProgramInfoData}  />
    </View>
  )
  return (
    <ScreenContainer >
      <FlatList
        style={{ flex: 1, height: '100%' }}
        data={[{}]}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ }) => renderItem()}
        showsVerticalScrollIndicator={false}
      />
    </ScreenContainer>
  )
}