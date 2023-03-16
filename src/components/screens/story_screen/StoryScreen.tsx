import React from 'react';
import { ScreenContainer } from '..';
import { storyWidgetData  } from 'src/constants/Constants';
import { StoryListView } from 'src/components/organisms';

export interface StoryPageRouteProps {
  route: any
}

export const StoryScreen = ({
  route
}: StoryPageRouteProps) => {
  console.log(route.params.selectedIndex,'selectedIndex');

  return (
    <ScreenContainer>
      <StoryListView data={storyWidgetData} selectedIndex={route.params.selectedIndex} />
    </ScreenContainer>
  );
};

