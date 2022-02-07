import React from 'react';
import { MostReadList } from 'src/components/organisms';
import { ScreenContainer } from '..'
import { mostReadData } from 'src/constants/SampleData';
import { horizontalEdge } from 'src/shared/utils';

export const MostReadScreen = () => {
  return (
    <ScreenContainer edge={horizontalEdge}>
      <MostReadList data={mostReadData}/>
    </ScreenContainer>
  )
}