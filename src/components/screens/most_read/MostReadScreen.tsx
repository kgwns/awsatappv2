import React, { useEffect } from 'react';
import { MostReadList } from 'src/components/organisms';
import { ScreenContainer } from '..'
import { horizontalEdge } from 'src/shared/utils';
import { LoadingState } from 'src/components/atoms';
import { useMostRead } from 'src/hooks';

export const MostReadScreen = () => {
  const {
    isLoading,
    mostReadData,
    fetchMostReadRequest
  } = useMostRead();

  useEffect(() => { fetchMostReadRequest(); }, []);
  return (
    <ScreenContainer edge={horizontalEdge}>
      {isLoading ? <LoadingState /> : <MostReadList data={mostReadData} />}
    </ScreenContainer>
  )
}