import React, {useEffect, useState} from 'react';
import {MostReadList} from 'src/components/organisms';
import {ScreenContainer} from '..';
import {horizontalEdge} from 'src/shared/utils';
import {useSectionArticles} from 'src/hooks';
import {RouteProp, useRoute} from '@react-navigation/native';
import {SectionArticlesBodyGet} from 'src/redux/sectionArticles/types';

export const SectionArticlesScreen = () => {
  const {params} = useRoute<RouteProp<any>>();
  const [page, setPage] = useState(0);

  const {
    isLoading,
    sectionArticlesData,
    fetchSectionArticlesRequest,
    emptySectionArticleData,
  } = useSectionArticles();

  const payload: SectionArticlesBodyGet = {
    sectionId: params.sectionId,
    page: page,
  };

  useEffect(() => {
    emptySectionArticleData();
  }, []);

  useEffect(() => {
    fetchSectionArticlesRequest(payload);
  }, [page]);

  const onScroll = () => {
    setPage(page + 1);
  };

  return (
    <ScreenContainer edge={horizontalEdge} showHeader={true} headerTitle={params.title}>
      {
        <MostReadList
          data={sectionArticlesData}
          onScroll={onScroll}
          isLoading={isLoading}
        />
      }
    </ScreenContainer>
  );
};
