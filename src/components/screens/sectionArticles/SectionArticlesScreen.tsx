import React, {useEffect, useState} from 'react';
import {MostReadList} from 'src/components/organisms';
import {ScreenContainer} from '..';
import { horizontalAndTop, isNonEmptyArray, normalize } from 'src/shared/utils';
import {useSectionArticles} from 'src/hooks';
import {RouteProp, useRoute} from '@react-navigation/native';
import {SectionArticlesBodyGet} from 'src/redux/sectionArticles/types';
import { LoadingState } from 'src/components/atoms';
import { ActivityIndicator, View } from 'react-native';
import { useTheme } from 'src/shared/styles/ThemeProvider';

export const SectionArticlesScreen = () => {
  const {params} = useRoute<RouteProp<any>>();
  const [page, setPage] = useState(0);

  const { themeData } = useTheme()
  const {
    isLoading,
    sectionArticlesData,
    fetchSectionArticlesRequest,
    emptySectionArticleData,
  } = useSectionArticles();

  const payload: SectionArticlesBodyGet = {
    sectionId: params?.sectionId,
    page: page,
  };

  useEffect(() => {
    emptySectionArticleData();
  }, []);

  useEffect(() => {
    fetchSectionArticlesRequest(payload);
  }, [page]);

  const onScroll = () => {
    if (!isLoading) {
      setPage(page + 1);
    }
  };

  return (
    <ScreenContainer edge={horizontalAndTop} showHeader={true} headerTitle={params?.title}>
      {
      (isLoading && sectionArticlesData && !isNonEmptyArray(sectionArticlesData.rows)) ? <LoadingState/> :
          <>
            <MostReadList
              data={sectionArticlesData}
              onScroll={onScroll}
              isLoading={isLoading}
            />
            {(isLoading && sectionArticlesData && isNonEmptyArray(sectionArticlesData.rows)) &&
            <View style={{ margin: normalize(28) }}>
                <ActivityIndicator size={'small'} color={themeData.primary} />
            </View>
            }
          </>
      }
    </ScreenContainer>
  );
};
