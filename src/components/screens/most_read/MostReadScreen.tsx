import React, { useEffect } from 'react';
import { MostReadList } from 'src/components/organisms';
import { ScreenContainer } from '..'
import { horizontalEdge, isTab } from 'src/shared/utils';
import { useMostRead } from 'src/hooks';

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
      {!isLoading && <MostReadList data={mostReadData} enableTag={!isTab} />}
    </ScreenContainer>
  )
}
