import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {horizontalEdge, isNonEmptyArray, normalize} from 'src/shared/utils';
import {OpinionArticleDetailFooter} from 'src/components/molecules';
import {
  OpinionArticleDetailWidget,
  RelatedOpinionArticlesWidget,
} from 'src/components/organisms';
import {ScreenContainer} from '..';
import {useOpinionArticleDetail} from 'src/hooks';
import {Edge} from 'react-native-safe-area-context';
import Orientation, {OrientationType} from 'react-native-orientation-locker';

export interface OpinionArticleDetailScreenProps {
  route: any;
}

export const OpinionArticleDetail = ({
  route,
}: OpinionArticleDetailScreenProps) => {
  const style = useThemeAwareObject(customStyle);
  const [edge, setEdge] = useState<Edge[]>(horizontalEdge);
  const {isLoading, opinionArticleDetailData, fetchOpinionArticleDetail} =
    useOpinionArticleDetail();

  useEffect(() => {
    Orientation.unlockAllOrientations();
    Orientation.getDeviceOrientation(updateScreenEdge);
    Orientation.addDeviceOrientationListener(updateScreenEdge);
    fetchOpinionArticleDetail({nid: route.params.nid});
    return () => {
      Orientation.lockToPortrait();
      Orientation.removeOrientationListener(updateScreenEdge);
    };
  }, []);

  const updateScreenEdge = (deviceOrientation: OrientationType) => {
    const edge = getScreenEdge(deviceOrientation);
    setEdge(edge);
  };

  const getScreenEdge = (deviceOrientation: OrientationType): Edge[] => {
    switch (deviceOrientation) {
      case 'LANDSCAPE-LEFT':
        return ['right'];
      case 'LANDSCAPE-RIGHT':
        return ['left'];
      case 'PORTRAIT':
        return horizontalEdge;
      default:
        return horizontalEdge;
    }
  };

  const renderItem = () => (
    <View style={style.container}>
      {isNonEmptyArray(opinionArticleDetailData) && (
        <OpinionArticleDetailWidget data={opinionArticleDetailData[0]} />
      )}
      {isNonEmptyArray(opinionArticleDetailData) && (
        <RelatedOpinionArticlesWidget />
      )}
    </View>
  );

  return (
    <ScreenContainer edge={edge} isLoading={isLoading}>
      <FlatList
        style={style.flatList}
        data={[{}]}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        bounces={false}
      />
      {isNonEmptyArray(opinionArticleDetailData) && (
        <View style={style.footer}>
          <OpinionArticleDetailFooter
            opinionArticleDetailData={opinionArticleDetailData[0]}
          />
        </View>
      )}
    </ScreenContainer>
  );
};

const customStyle = (theme: CustomThemeType) => {
  const OpinionArticleDetailStyle = StyleSheet.create({
    container: {
      paddingBottom: normalize(80),
      backgroundColor: theme.backgroundColor,
    },
    flatList: {
      flex: 1,
      height: '100%',
    },
    footer: {
      width: '100%',
    },
  });
  return OpinionArticleDetailStyle;
};
