import React from 'react';
import {View, FlatList} from 'react-native';
import { ScreenContainer } from '..';
import { PodcastProgramInfo } from 'src/components/organisms';
import { PodcastVerticalListProps } from 'src/components/molecules';
import {PodcastProgramInfoData} from 'src/constants/SampleData';
import { horizontalEdge } from 'src/shared/utils';
import {useNavigation} from '@react-navigation/native';
import { ScreensConstants } from 'src/constants';
import { StackNavigationProp } from '@react-navigation/stack';

export const PodcastProgram = () => {
  const navigation = useNavigation<StackNavigationProp<any>>()
  const onPressItem = (item:PodcastVerticalListProps)=>{
    if (item.id) {
      navigation.navigate(ScreensConstants.PodcastEpisode, {data: item})
    }
  }

  const renderItem = () => (
    <View style={{flex : 1,}}>
      <PodcastProgramInfo data={PodcastProgramInfoData} onPress={onPressItem}  />
    </View>
  )
  return (
    <ScreenContainer edge={horizontalEdge}>
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