import React, { useEffect } from 'react';
import { MostReadList } from 'src/components/organisms';
import { ScreenContainer } from '..'
import { horizontalEdge } from 'src/shared/utils';
import { useMostRead } from 'src/hooks';
import { MOST_READ_UNIT_ID } from 'src/hooks/useAds'
import { AdContainer } from 'src/components/atoms/adContainer/AdContainer';

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
      <AdContainer unitId={MOST_READ_UNIT_ID}/>
      {!isLoading && <MostReadList data={mostReadData} enableTag={true} />}
    </ScreenContainer>
  )
}
