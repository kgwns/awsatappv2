import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {colors, CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {
  horizontalEdge,
  isIOS,
  isNonEmptyArray,
  isNotchDevice,
  isTab,
  normalize,
} from 'src/shared/utils';
import {DetailHeader, PhotoGalleryDetailFooter} from 'src/components/molecules';
import {ScreenContainer} from '..';
import {useAppCommon, useBookmark, useLogin, usePhotoGallery} from 'src/hooks';
import Orientation, {OrientationType} from 'react-native-orientation-locker';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ArticleFontSize} from 'src/redux/appCommon/types';
import {Edge} from 'react-native-safe-area-context';
import {Styles} from 'src/shared/styles';
import {PopulateWidgetType} from 'src/components/molecules/populateWidget/PopulateWidget';
import {PhotoGalleryDetailWidget} from 'src/components/organisms';
import {LoadingState} from 'src/components/atoms';

export interface PhotoGalleryDetailScreenProps {
  route: any;
}

export const PhotoGalleryDetailScreen = ({
  route,
}: PhotoGalleryDetailScreenProps) => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const isFocused = useIsFocused();
  const styles = useThemeAwareObject(customStyle);

  const {sendBookmarkInfo, removeBookmarkedInfo, bookmarkIdInfo} =
    useBookmark();
  const {albumDetailData, fetchAlbumDetailData, isDetailLoading, emptyAllData} =
    usePhotoGallery();
  const {isLoggedIn} = useLogin();
  const {articleFontSize, storeArticleFontSizeInfo} = useAppCommon();

  const [fontSize, setFontSize] = useState<ArticleFontSize>(articleFontSize);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showupUp, setShowPopUp] = useState(false);
  const [edge, setEdge] = useState<Edge[]>(horizontalEdge);

  const currentNId = route.params.nid;

  // For Now Disabled Landscape mode
  // useEffect(() => {
  //   if (isFocused) {
  //     Orientation.unlockAllOrientations();
  //     Orientation.getDeviceOrientation(updateScreenEdge);
  //     Orientation.addDeviceOrientationListener(updateScreenEdge);
  //   }
  // }, [isFocused]);

  useEffect(() => {
    fetchAlbumDetailData({nid: parseInt(currentNId)});
    return () => {
      emptyAllData();
    };
  }, []);

  useEffect(() => {
    if (fontSize != articleFontSize) {
      setFontSize(articleFontSize);
    }
  }, [articleFontSize]);

  useEffect(() => {
    if (isNonEmptyArray(albumDetailData)) {
      if (route.params && route.params.nid && isFocused) {
        const isBookmarked = validateBookmark(albumDetailData[0].nid);
        setIsBookmarked(isBookmarked);
      }
    }
  }, [albumDetailData]);

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

  const validateBookmark = (nid: string): boolean => {
    return isNonEmptyArray(bookmarkIdInfo)
      ? bookmarkIdInfo.some(value => value.nid == nid)
      : false;
  };

  const onPressSave = (nid: string) => {
    if (!isLoggedIn) {
      setShowPopUp(true);
      return;
    }

    const newBookmarked = !isBookmarked;
    const data = [...albumDetailData];
    data[0].isBookmarked = !data[0].isBookmarked;
    setIsBookmarked(newBookmarked);
    onUpdateBookMark(nid, newBookmarked);
  };

  const onUpdateBookMark = (nid: string, hasBookmarked: boolean) => {
    if (isLoggedIn) {
      hasBookmarked
        ? sendBookmarkInfo({nid, bundle: PopulateWidgetType.ALBUM})
        : removeBookmarkedInfo({nid});
    } else {
      setShowPopUp(true);
    }
  };

  const onCloseSignUpAlert = () => {
    setShowPopUp(false);
  };

  const onPressFontChange = () => {
    storeArticleFontSizeInfo();
  };

  const onPressBack = () => {
    navigation.goBack();
  };

  const renderHeader = () => (
    <View style={styles.backContainer}>
      <DetailHeader
        visibleHome={false}
        onHomePress={onPressBack}
        onBackPress={onPressBack}
      />
    </View>
  );

  const renderItem = () => {
    return (
      <View style={[styles.container]}>
        <PhotoGalleryDetailWidget
          data={albumDetailData[0]}
          fontSize={fontSize}
          onPressBack={onPressBack}
        />
      </View>
    );
  };

  return (
    <ScreenContainer
      edge={edge}
      isLandscape
      isSignUpAlertVisible={showupUp}
      onCloseSignUpAlert={onCloseSignUpAlert}
      playerPosition={{
        bottom: isIOS ? normalize(70) : normalize(60),
      }}>
      {isDetailLoading ? (
        <View style={styles.centeredStyle}>
          <LoadingState />
        </View>
      ) : (
        isNonEmptyArray(albumDetailData) && (
          <View style={styles.containerBase}>
            {renderHeader()}
            <FlatList
              data={[{}]}
              keyExtractor={(_, index) => index.toString()}
              renderItem={renderItem}
              style={styles.backgroundStyle}
              showsVerticalScrollIndicator={false}
              bounces={false}
            />
            <View style={styles.shadowEffect}>
              <PhotoGalleryDetailFooter
                albumData={albumDetailData[0]}
                isBookmarked={isBookmarked}
                onPressSave={() => onPressSave(albumDetailData[0].nid)}
                onPressFontChange={onPressFontChange}
              />
            </View>
          </View>
        )
      )}
    </ScreenContainer>
  );
};

const customStyle = (theme: CustomThemeType) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginBottom: normalize(80),
    },
    backgroundStyle: {
      backgroundColor: colors.black,
    },
    containerBase: {
      flex: 1,
    },
    shadowEffect: {
      shadowColor: Styles.color.onyx,
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.5,
      shadowRadius: 4,
      elevation: 15,
    },
    centeredStyle: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    backContainer: {
      width: '100%',
      height: isTab
        ? normalize(100)
        : isIOS
        ? isNotchDevice
          ? normalize(98)
          : normalize(92)
        : normalize(72),
      backgroundColor: theme.secondaryWhite,
      justifyContent: 'center',
    },
  });
  return styles;
};
