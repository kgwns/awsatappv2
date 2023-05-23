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
import { useAppCommon, useAppPlayer, useBookmark, useLogin, usePhotoGallery } from 'src/hooks';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ArticleFontSize} from 'src/redux/appCommon/types';
import {Edge} from 'react-native-safe-area-context';
import {Styles} from 'src/shared/styles';
import {PopulateWidgetType} from 'src/components/molecules/populateWidget/PopulateWidget';
import {PhotoGalleryDetailWidget} from 'src/components/organisms';
import {LoadingState} from 'src/components/atoms';
import {AlbumDetailType} from 'src/redux/photoGallery/types';

export interface PhotoGalleryDetailScreenProps {
  route: any;
}

export const PhotoGalleryDetailScreen = ({
  route,
}: PhotoGalleryDetailScreenProps) => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const isFocused = useIsFocused();
  const styles = useThemeAwareObject(customStyle);

  const {sendBookmarkInfo, removeBookmarkedInfo, validateBookmark} =
    useBookmark();
  const {albumDetailData, fetchAlbumDetailData, isDetailLoading, emptyAllData} =
    usePhotoGallery();
  const {isLoggedIn} = useLogin();
  const {articleFontSize, storeArticleFontSizeInfo} = useAppCommon();
  const { showMiniPlayer } = useAppPlayer()

  const [fontSize, setFontSize] = useState<ArticleFontSize>(articleFontSize);
  const [albumData, setAlbumData] = useState<AlbumDetailType[]>([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [edge, setEdge] = useState<Edge[]>(horizontalEdge);

  const currentNId = route.params.nid;

  //Disabled for iPad orientation
  // useEffect(() => {
  //   if (isFocused && isTab) {
  //     Orientation.unlockAllOrientations();
  //     Orientation.getDeviceOrientation(updateScreenEdge);
  //     Orientation.addDeviceOrientationListener(updateScreenEdge);
  //   }

  //   return () => {
  //     Orientation.lockToPortrait();
  //     Orientation.removeDeviceOrientationListener(updateScreenEdge);
  //     Orientation.removeAllListeners();
  //   };
  // }, []);

  useEffect(() => {
    fetchAlbumDetailData({nid: parseInt(currentNId)});
    return () => {
      emptyAllData();
    };
  }, []);

  useEffect(() => {
    setAlbumData(albumDetailData);
  }, [albumDetailData]);

  useEffect(() => {
    if (fontSize !== articleFontSize) {
      setFontSize(articleFontSize);
    }
  }, [articleFontSize]);

  useEffect(() => {
    if (isNonEmptyArray(albumData)) {
      if (route.params && route.params.nid && isFocused) {
        const isBookmark = validateBookmark(albumData[0].nid);
        setIsBookmarked(isBookmark);
      }
    }
  }, [albumData]);

  /* We will uncomment the below code when landscape orientation required for mobile
  const updateScreenEdge = (deviceOrientation: OrientationType) => {
    const screenEdge = getScreenEdge(deviceOrientation);
    isNonEmptyArray(screenEdge) && setEdge(screenEdge);
  };

  const getScreenEdge = (deviceOrientation: OrientationType): Edge[] => {
    switch (deviceOrientation) {
      case 'LANDSCAPE-LEFT':
        return ['right'];
      case 'LANDSCAPE-RIGHT':
        return ['left'];
      case 'PORTRAIT':
        return horizontalEdge;
      case 'FACE-UP':
        return [];
      default:
        return horizontalEdge;
    }
  }; */

  const onPressSave = (nid: string) => {
    if (!isLoggedIn) {
      setShowPopUp(true);
      return;
    }

    const newBookmarked = !isBookmarked;
    const data = [...albumData];
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
    
    //Disabled for iPad orientation
    // Orientation.lockToPortrait();
    
    isTab && isIOS
      ? setTimeout(() => {
          navigation.goBack();
        }, 50)
      : navigation.goBack();
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
          data={albumData[0]}
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
      isSignUpAlertVisible={showPopUp}
      onCloseSignUpAlert={onCloseSignUpAlert}
      isLoading={isDetailLoading}
      playerPosition={{
        bottom: isTab ? 104 : isIOS ? normalize(70) : normalize(60),
      }}>
      {isDetailLoading ? (
        <View style={styles.centeredStyle}>
          <LoadingState />
        </View>
      ) : (
        isNonEmptyArray(albumData) && (
          <View style={styles.containerBase}>
            {renderHeader()}
            <FlatList
              data={[{}]}
              keyExtractor={(_, index) => index.toString()}
              renderItem={renderItem}
              style={styles.backgroundStyle}
              showsVerticalScrollIndicator={false}
              bounces={false}
              contentContainerStyle={showMiniPlayer && styles.contentContainer}
            />
            <View style={styles.shadowEffect}>
              <PhotoGalleryDetailFooter
                albumData={albumData[0]}
                isBookmarked={isBookmarked}
                onPressSave={() => onPressSave(albumData[0].nid)}
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
  return StyleSheet.create({
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
    contentContainer: {
      paddingBottom: normalize(80)
    }
  });
};
