import React, { useEffect } from 'react';
import { MostReadList } from 'src/components/organisms';
import { ScreenContainer } from '..'
import { horizontalEdge } from 'src/shared/utils';
import { useMostRead } from 'src/hooks';
import { standardBanner } from 'src/hooks/useAdMob';

export const MostReadScreen = () => {
  const {
    isLoading,
    mostReadData,
    fetchMostReadRequest
  } = useMostRead();

  useEffect(() => { 
    fetchMostReadRequest(); 
  }, []);
  return (
    <ScreenContainer edge={horizontalEdge} isLoading={isLoading}>
      {standardBanner()}
      {!isLoading && <MostReadList data={mostReadData} enableTag={true} />}
    </ScreenContainer>
  )
}
