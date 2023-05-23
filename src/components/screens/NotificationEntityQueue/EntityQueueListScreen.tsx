import React, {useEffect} from 'react';
import {MostReadList} from 'src/components/organisms';
import {ScreenContainer} from '..';
import { horizontalAndTop, isNonEmptyArray, normalize } from 'src/shared/utils';
import {RouteProp, useRoute} from '@react-navigation/native';
import { Label, LabelTypeProp } from 'src/components/atoms';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { useTheme } from 'src/shared/styles/ThemeProvider';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import { TranslateConstants, TranslateKey } from 'src/constants/Constants';
import { useEntityQueue } from 'src/hooks'

export const EntityQueueListScreen = () => {
  const {params} = useRoute<RouteProp<any>>();
  const styles = useThemeAwareObject(createStyles);
  const NO_ARTICLES = TranslateConstants({key: TranslateKey.NO_SECTION_ARTICLE});
  const { themeData } = useTheme()
  const {
    isLoading,
    entityQueueList,
    entityQueueRequest
  } = useEntityQueue();

  useEffect(() => {
    if(params && params.id) {
      const payload = {
        id: params.id
      }
      entityQueueRequest(payload);
    }
  }, []);

  return (
    <ScreenContainer edge={horizontalAndTop} showHeader={true} headerTitle={params?.title} isLoading={isLoading}>
      {
      (isLoading && entityQueueList && !isNonEmptyArray(entityQueueList)) ? <View/> :
        isNonEmptyArray(entityQueueList) ?
          <>
            <MostReadList
              data={entityQueueList}
              isLoading={isLoading}
              flag={false}
              isEntityQueueList = {true}
            />
            {isLoading &&
            <View style={styles.loaderStyle}>
                <ActivityIndicator size={'small'} color={themeData.primary} />
            </View>
            }
          </>:
          <View style={styles.container}>
            <Label children={NO_ARTICLES} labelType={LabelTypeProp.h1} style={styles.labelStyle} />
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
    },
    loaderStyle: {
      margin: normalize(28) 
    }
})
