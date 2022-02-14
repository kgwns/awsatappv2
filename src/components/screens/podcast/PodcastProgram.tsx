import React from 'react';
import { ScreenContainer } from '..'
import { horizontalEdge } from 'src/shared/utils';
import { PodcastEpisodeList } from 'src/components/organisms';
import {PodcastEpisodeData} from 'src/constants/SampleData'

export const PodcastProgram = () => {
  return (
    <ScreenContainer edge={horizontalEdge}>
      <PodcastEpisodeList data={PodcastEpisodeData} />
    </ScreenContainer>
  )
}