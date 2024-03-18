import React, {useEffect, useState} from 'react';
import {isNonEmptyArray, isTab, screenWidth} from 'src/shared/utils';
import {View, StyleSheet, FlatList, ListRenderItem, Animated} from 'react-native';
import {useBookmark, useLogin} from 'src/hooks';
import {useNavigation} from '@react-navigation/native';
import {ScreensConstants, TranslateConstants, TranslateKey} from 'src/constants/Constants';
import {PopUp} from 'src/components/organisms';
import {PopUpType} from 'src/components/organisms/popUp/PopUp';
import {StackNavigationProp} from '@react-navigation/stack';
import {PhotoGalleryItem, PopulateWidgetType} from 'src/components/molecules';
import {Label, LabelTypeProp, LoadingState} from 'src/components/atoms';
import {Styles} from 'src/shared/styles';
import {fonts} from 'src/shared/styles/fonts';
import {
  AlbumListBodyGet,
  AlbumListItemType,
} from 'src/redux/photoGallery/types';
import {fetchAlbumListApi} from 'src/services/photoGalleryService';
import {AxiosError} from 'axios';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { CustomThemeType } from 'src/shared/styles/colors';
import { PHOTO_UNIT_ID, isArticleCategoryIndex } from 'src/hooks/useAds'
import { AdContainer, AdContainerSize } from 'src/components/atoms/adContainer/AdContainer';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export const PhotoGalleryScreen = React.memo(
  ({tabIndex, currentIndex, scrollY}: {tabIndex?: number; currentIndex?: number, scrollY?: any}) => {
    const ref = React.useRef(null);
    const navigation = useNavigation<StackNavigationProp<any>>();
    const scrollYValue = scrollY ? scrollY : new Animated.Value(0);
    const styles = useThemeAwareObject(customStyle);

    const { sendBookmarkInfo, removeBookmarkedInfo,
      bookmarkIdInfo, validateBookmark
    } = useBookmark();
    const {isLoggedIn} = useLogin();

    const [showupUp, setShowPopUp] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [albumData, setAlbumData] = useState<AlbumListItemType[]>([]);
    const [albumDataInfo, setAlbumDataInfo] = useState<AlbumListItemType[]>([]);

    const CONST_PHOTO_GALLERY = TranslateConstants({key:TranslateKey.PHOTO_GALLERY_TITLE})

    useEffect(() => {
      fetchPhotoList(page);
    }, []);

    useEffect(() => {
      if (page !== 0) {
        fetchPhotoList(page);
      }
    }, [page]);

    useEffect(() => {
      if (tabIndex === currentIndex) {
        global.refFlatList = ref;
      }
    }, [currentIndex]);

    useEffect(() => {
      updateAlbumListData();
    }, [albumData, bookmarkIdInfo]);

    const updateAlbumListData = () => {
      if (isNonEmptyArray(albumData)) {
        const updatedAlbumData = updateBookmark(albumData);
        setAlbumDataInfo(updatedAlbumData);
      }
    };

    const updateBookmark = (data: AlbumListItemType[]) => {
      return data.map((item: AlbumListItemType) => ({
        ...item,
        isBookmarked: validateBookmark(item.nid),
      }));
    };

    const fetchPhotoList = async (pageProps: number) => {
      setIsLoading(true);
      const albumBody: AlbumListBodyGet = {
        page: pageProps,
        items_per_page: isTab ? 12 : 10,
      };
      try {
        const albumList = await fetchAlbumListApi(albumBody);
        const albumListData = albumList.rows ?? [];
        setIsLoading(false);
        if (albumData !== albumListData) {
          setAlbumData((data: AlbumListItemType[]) => [
            ...data,
            ...albumListData,
          ]);
        }
      } catch (error) {
        setIsLoading(false);
        const errorResponse: AxiosError = error as AxiosError;
        if (errorResponse.response) {
          const errorMessage: {message: string} = errorResponse.response.data;
          console.log('🚀 getAlbumList ~ errorMessage', errorMessage);
        }
      }
    };

    const loadMoreData = () => {
      setPage(page + 1);
    };

    const onPressSignUp = () => {
      setShowPopUp(false);
      navigation.reset({
        index: 0,
        routes: [{name: ScreensConstants.AuthNavigator}],
      });
    };

    const makeSignUpAlert = () => {
      setShowPopUp(true);
    };

    const onClosePopUp = () => {
      setShowPopUp(false);
    };

    const onPress = (nId: string) => {
      nId &&
        navigation.navigate(ScreensConstants.PHOTO_GALLERY_DETAIL_SCREEN, {
          nid: nId,
        });
    };

    const updateBookmarkInfo = (nid: string, isBookmarked: boolean) => {
      if (isLoggedIn) {
        isBookmarked
          ? sendBookmarkInfo({nid, bundle: PopulateWidgetType.ALBUM})
          : removeBookmarkedInfo({nid});
      } else {
        makeSignUpAlert();
      }
    };

    const renderHeader = () => (
      <View style={styles.headerStyle}>
        <Label
          children={CONST_PHOTO_GALLERY}
          labelType={LabelTypeProp.h2}
          color={Styles.color.greenishBlue}
        />
      </View>
    );

    const renderFooterComponent = () => {
      if (isNonEmptyArray(albumData)) {
        return (
          <View style={styles.loaderStyle}>
            {isLoading && <LoadingState />}
          </View>
        );
      }
      return null;
    };

    const renderItem: ListRenderItem<any> = ({item, index}) => {
      return (
        <>
          <PhotoGalleryItem
            onPress={onPress}
            onUpdateBookmark={updateBookmarkInfo}
            index={index}
            item={item}
            title={item.title}
            nid={item.nid}
            created={item.created}
            imageUrl={item.field_album_img_export}
            isBookmarked={item.isBookmarked}
          />
          { isArticleCategoryIndex(index) && 
            <AdContainer style={{marginTop: -20, marginBottom: 20}} unitId={PHOTO_UNIT_ID} size={AdContainerSize.MEDIUM}/>
          }
        </>
      );
    };

    return (
      <View style={styles.container}>
        {isNonEmptyArray(albumDataInfo) && (
          <AnimatedFlatList
            ref={ref}
            testID="photo_gallery_list"
            onScrollBeginDrag={() => (global.refFlatList = ref)}
            onScroll={Animated.event(
              [{nativeEvent: { contentOffset: {y: scrollYValue}}}],
              {useNativeDriver: false}
            )}
            scrollEventThrottle={16}
            data={albumDataInfo}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={renderHeader}
            onEndReached={loadMoreData}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooterComponent}
          />
        )}
        {isLoading && !isNonEmptyArray(albumDataInfo) && (
          <View style={styles.centeredStyle}>
            <LoadingState />
          </View>
        )}
        <PopUp
          type={PopUpType.rbSheet}
          onPressButton={onPressSignUp}
          showPopUp={showupUp}
          onClosePopUp={onClosePopUp}
        />
      </View>
    );
  },
);

const customStyle = (theme: CustomThemeType) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
    },
    headerStyle: {
      paddingLeft: isTab ? 0.02 * screenWidth : 0.04 * screenWidth,
      paddingVertical: 5,
    },
    labelStyle: {
      fontFamily: fonts.AwsatDigital_Bold,
      fontSize: 20,
      lineHeight: 40,
      textAlign: 'left',
      paddingVertical: 8,
    },
    centeredStyle: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    loaderStyle: {
      width: '100%',
      height: 80,
      alignItems: 'center',
      justifyContent: 'center',
    }
  });
}
