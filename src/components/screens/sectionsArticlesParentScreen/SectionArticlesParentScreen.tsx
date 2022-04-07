import React, { useEffect } from 'react';
import { horizontalAndTop } from 'src/shared/utils';
import { RouteProp, useRoute } from '@react-navigation/native';
import { SectionStoryScreen } from '../category/SectionStoryScreen';
import { useNewsView } from 'src/hooks/useNewsview';
import { ScreenContainer } from '../ScreenContainer/ScreenContainer';

export const SectionArticlesParentScreen = () => {
  const { params } = useRoute<RouteProp<any>>();
  const sectionId = params?.sectionId;

  const { emptyAllListData } = useNewsView();

  useEffect(() => {
    emptyAllListData();
  }, [sectionId]);

  return (
    <ScreenContainer edge={horizontalAndTop} showHeader={true} headerTitle={params?.title}>
      <SectionStoryScreen sectionId={sectionId} />
    </ScreenContainer>
  );
};
