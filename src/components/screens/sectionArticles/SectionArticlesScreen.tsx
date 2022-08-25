import React, {useEffect, useState} from 'react';
import {MostReadList} from 'src/components/organisms';
import {ScreenContainer} from '..';
import { horizontalAndTop, isNonEmptyArray, normalize } from 'src/shared/utils';
import {useSectionArticles} from 'src/hooks';
import {RouteProp, useRoute} from '@react-navigation/native';
import {SectionArticlesBodyGet} from 'src/redux/sectionArticles/types';
import { Label, LabelTypeProp } from 'src/components/atoms';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { useTheme } from 'src/shared/styles/ThemeProvider';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';

export const SectionArticlesScreen = () => {
  const {params} = useRoute<RouteProp<any>>();
  const [page, setPage] = useState(0);
  const styles = useThemeAwareObject(createStyles);

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
    <ScreenContainer edge={horizontalAndTop} showHeader={true} headerTitle={params?.title} isLoading={isLoading}>
      {
      (isLoading && sectionArticlesData && !isNonEmptyArray(sectionArticlesData.rows)) ? <View/> :
          isNonEmptyArray(sectionArticlesData.rows)?
          <>
            <MostReadList
              data={sectionArticlesData}
              onScroll={onScroll}
              isLoading={isLoading}
              flag={false}
            />
            {(isLoading && sectionArticlesData && isNonEmptyArray(sectionArticlesData.rows)) &&
            <View style={{ margin: normalize(28) }}>
                <ActivityIndicator size={'small'} color={themeData.primary} />
            </View>
            }
          </>:
          <View style={styles.container}>
            <Label children={'لا يوجد مقالات تحت هذه الخانة'} labelType={LabelTypeProp.h1} style={styles.labelStyle} />
          </View>
      }
    </ScreenContainer>
  );
};

const createStyles = () =>
  StyleSheet.create({
    container: {
      flex: 0.88,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: normalize(20),
    },
    labelStyle: {
      textAlign: 'center',
    }
})
