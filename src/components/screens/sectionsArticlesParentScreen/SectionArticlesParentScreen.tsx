import React, { useEffect, useState } from 'react';
import { horizontalAndTop, isNotEmpty } from 'src/shared/utils';
import { RouteProp, useRoute } from '@react-navigation/native';
import { SectionStoryScreen } from '../category/SectionStoryScreen';
import { useNewsView } from 'src/hooks/useNewsview';
import { ScreenContainer } from '../ScreenContainer/ScreenContainer';
import { TabType } from '../sections/SectionsScreen';
import { OpinionScreen } from '../category/OpinionScreen';
import { PodcastProgram } from '../podcast/PodcastProgram';
import { VideoScreen } from '../category/VideoScreen';
import { GameScreen } from '../games/GameScreen';

export const SectionArticlesParentScreen = () => {
  const { params } = useRoute<RouteProp<any>>();
  const sectionId = params?.sectionId;
  const keyName = params?.keyName || ''

  const { emptyAllListData } = useNewsView();
  const [isShowPlayer, setIsShowPlayer] = useState(false)

  useEffect(() => {
    emptyAllListData();
  }, [sectionId]);

  useEffect(() => {
      setIsShowPlayer(true)  
  },[])

  const renderDynamicScreen = () => {
    if (!isNotEmpty(keyName)) return null;
    switch (keyName) {
      case TabType.opinion:
        return <OpinionScreen />;
      case TabType.podcast:
        return <PodcastProgram />;
      case TabType.video:
        return <VideoScreen />;
      case TabType.games:
        return <GameScreen />
      default:
        return <SectionStoryScreen sectionId={sectionId} />;
    }
  }

  return (
    <ScreenContainer edge={horizontalAndTop} showHeader={true} headerTitle={params?.title} showPlayer={isShowPlayer}>
      {renderDynamicScreen()}
    </ScreenContainer>
  );
};
